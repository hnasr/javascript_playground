//Method 4
//Store salted password with bcrypt
//no additional column
import Express from "express";
import crypto from 'crypto';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';
import fs from 'fs'
//bad idea
const JWT_SECRET = "{8367E87C-B794-4A04-89DD-15FE7FDBFF78}"
const JWT_REFRESH_SECRET = "{asdfasdfdsfa-B794-4A04-89DD-15FE7FDBFF78}"

const port = process.env.PORT || 8080;
const app = new Express(); 
app.use(Express.json());
app.use(cookieParser())
import pg from 'pg'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));


const pool = new pg.Pool({
    "host": "husseinmac.local",
    "port": 5432,
    "user":"postgres",
    "password" : "postgres",
    "database" : "postgres",
    "max": 20,
    "connectionTimeoutMillis" : 0,
    "idleTimeoutMillis": 0
}) 

app.get("/", async( req, res) => {
    //get the session ID from the cookies
    const token = req.cookies.JWT_TOKEN;
    if (token) {
        //if the cookie is set, query the db
        //get the user and role 
        //we are taking a hit everytime a user makes a request
        const user = await validateToken(token, JWT_SECRET);
        //session no longer there, expired etc.. 
        //send back login page
        if (user === null) 
            res.sendFile(__dirname + "/login.html");
        else
            {
            //cook the user page
            let userHtml = fs.readFileSync(__dirname + "/user.html","utf8")

            userHtml = userHtml.replace("%USER%", user.name);
            userHtml = userHtml.replace("%ROLE%", user.role);
            userHtml = userHtml.replace("%COLOR%", user.role === "admin" ? "lightcoral": "lightblue");
            res.setHeader("content-type", ["text/html"])
            res.send(userHtml)
        }
    }
    else //else ask the user to login
        res.sendFile(__dirname + "/login.html");
})

app.post("/token", async (req, res)=> {

    const token = req.body.refreshToken;
    const user = await validateToken(token, JWT_REFRESH_SECRET)
    
    if (user === null) {
        res.sendStatus(403);
        return;
    }
    //now that we know the refresh token is valid 
    //lets take an extra hit the database 
    const result = await pool.query("select * from jwt_auth where token = $1", [token])
    if (result.rowCount == 0)
        res.sendStatus(403);
    else
    {
      //sign my jwt 
      const payLoad = {"name": user.name,
      "role": user.role }
      //sign a brand new accesstoken and update the cookie
     const token = jwt.sign(payLoad, JWT_SECRET , { algorithm: 'HS256', expiresIn: '30s'})
     //maybe check if it succeeds..                          
     res.setHeader("set-cookie", [`JWT_TOKEN=${token}; httponly; samesite=lax`])  
     res.send({
         "message": "Refreshed successfully in successfully"
     })
    }
    

})


//login post request
app.post("/login", async (req, res) => {
    try { 
    const sql = "select * from jwt_auth where username = $1"
    const result = await pool.query(sql,[req.body.user]);
    
    
    //fail
    if (result.rowCount === 0)
        res.send({"error": "Incorrect username or password"})
    else {
        //compare salted password
        const saltedPassword = result.rows[0].password  ;
        
        const successResult = await bcrypt.compare(req.body.password, saltedPassword)
     
        //logged in successfully generate session
        if (successResult === true) 
        {
            //sign my jwt 
            const payLoad = {"name": result.rows[0].username,
             "role": result.rows[0].role }
            const token = jwt.sign(payLoad, JWT_SECRET , { algorithm: 'HS256', expiresIn: '30s'})
            const refreshtoken = jwt.sign(payLoad, JWT_REFRESH_SECRET , { algorithm: 'HS256'})

            //save the refresh token in the database 
            pool.query("update jwt_auth set token = $1 where username = $2", [refreshtoken, result.rows[0].username ])
            //maybe check if it succeeds..                          
            res.setHeader("set-cookie", [`JWT_TOKEN=${token}; httponly; samesite=lax`])
            res.send({"success": "Logged in successfully!", "refreshToken": refreshtoken})
        }
        else
            res.send({"error": "Incorrect username or password"})

    }
}
  catch  (ex){
      console.error(ex)
  }    
})

app.post ("/logout", async (req, res) => {

    //logging out 
    const token = req.body.refreshToken;
    if (token) {
        const sql = "update jwt_auth set token = null where token = $1"
        const result = await pool.query(sql,
                                 [token]);
        
        res.send({"success": "logged out successfully"})
    }


})

//register post request
app.post("/register", async (req, res) => {
    //check if user exist 
    const sql = "select username from jwt_auth where username = $1"
    const result = await pool.query(sql,
                             [req.body.user]);
    
    //success, user is not there create it 
    if (result.rowCount === 0)
    {
        //the hash has the salt
        const hash =  await bcrypt.hash(req.body.password, 10)
       //store user, password and role
        await pool.query("insert into jwt_auth (username, password, role) values ($1,$2,$3)",
        [req.body.user,hash,req.body.role]);
        res.send({"success": "User created successfully"})

    }
       
    else
        res.send({"error": "User already exists.."})
})

 
  
app.listen(port, () => 
console.log("Session Auth - Listening on " + port))


async function validateToken(token, secret) {
    try {
        const result  = jwt.verify(token, secret);
      
        return {
            "name": result.name,
            "role": result.role,
        }
    }
    catch(ex){
        return null;
    }
   
  
}
 
async function randomString() {
    return crypto.randomBytes(64).toString('hex');
}
function sha256(txt){
    const secret = 'abcdefg';
    const hash = crypto.createHmac('sha256', secret)
                    .update(txt)
                    .digest('hex');
   return hash;
}


 