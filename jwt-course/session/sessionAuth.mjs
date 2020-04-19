//Method 4
//Store salted password with bcrypt
//no additional column
import Express from "express";
import crypto from 'crypto';
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser';
import fs from 'fs'
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
    const sessionId = req.cookies.SESSION_ID;
    if (sessionId) {
        //if the cookie is set, query the db
        //get the user and role 
        //we are taking a hit everytime a user makes a request
        const user = await validateSession(sessionId);
        //session no longer there, expired etc.. 
        //send back login page
        if (user === null) 
            res.sendFile(__dirname + "/login.html");
        else{
            //cook the user page
            let userHtml = fs.readFileSync(__dirname + "/user.html","utf8")

            userHtml = userHtml.replace("%USER%", user.username);
            userHtml = userHtml.replace("%ROLE%", user.role);
            userHtml = userHtml.replace("%COLOR%", user.role === "admin" ? "lightcoral": "lightblue");
            res.setHeader("content-type", ["text/html"])
            res.send(userHtml)
        }
    }
    else //else ask the user to login
        res.sendFile(__dirname + "/login.html");
})

//login post request
app.post("/login", async (req, res) => {
    try { 
    const sql = "select * from session_auth where username = $1"
    const result = await pool.query(sql,[req.body.user]);
    
    
    //fail
    if (result.rowCount === 0)
        res.send({"error": "Incorrect username or password"})
    else {
        //compare salted password
        const saltedPassword = result.rows[0].password  ;
        
        const successResult = await bcrypt.compare(req.body.password, saltedPassword)
     
        //logged in successfully generate session
        if (successResult === true) {
            //generate new session id 
            const sessionId = await randomString();
            //update the table with the new session id 
            const sql = "update session_auth set sessionid = $1 where username = $2"
            const result = await pool.query(sql,
                                     [sessionId, req.body.user]);
            console.log(result)
            //maybe check if it succeeds..                          
            res.setHeader("set-cookie", [`SESSION_ID=${sessionId}; httponly; samesite=lax`])
            res.send({"success": "Logged in successfully!"})
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
    const sessionId = req.cookies.SESSION_ID;
    if (sessionId) {
        const sql = "update session_auth set sessionid = null where sessionid = $1"
        const result = await pool.query(sql,
                                 [sessionId]);
        
        res.send({"success": "logged out successfully"})
    }


})

//register post request
app.post("/register", async (req, res) => {
    //check if user exist 
    const sql = "select username from session_auth where username = $1"
    const result = await pool.query(sql,
                             [req.body.user]);
    
    //success, user is not there create it 
    if (result.rowCount === 0)
    {
        //the hash has the salt
        const hash =  await bcrypt.hash(req.body.password, 10)
       //store user, password and role
        await pool.query("insert into session_auth (username, password, role) values ($1,$2,$3)",
        [req.body.user,hash,req.body.role]);
        res.send({"success": "User created successfully"})

    }
       
    else
        res.send({"error": "User already exists.."})
})

 
  
app.listen(port, () => 
console.log("Session Auth - Listening on " + port))


async function validateSession(sessionid ) {
    console.log("called validate session...")
    const sql = "select * from session_auth where sessionid = $1"
    const result = await pool.query(sql,[sessionid]);
        
    //fail
    if (result.rowCount === 0)
        return null;
    else
        return {
            "username": result.rows[0].username,
            "role": result.rows[0].role,
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


 