//Method 4
//Store salted password with bcrypt
//no additional column
import Express from "express";
import crypto from 'crypto';
import bcrypt from 'bcrypt'

const port = process.env.PORT || 8080;
const app = new Express(); 
app.use(Express.json());
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

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/login.html");
})

//login post request
app.post("/login", async (req, res) => {
    try { 
    const sql = "select * from auth_method4 where username = $1"
    const result = await pool.query(sql,[req.body.user]);
    
    
    //fail
    if (result.rowCount === 0)
        res.send({"error": "Incorrect username or password"})
    else {
        //compare salted password
        const saltedPassword = result.rows[0].password  ;
        
        const successResult = await bcrypt.compare(req.body.password, saltedPassword)
     

        if (successResult === true)
            res.send({"success": "Logged in successfully!"})
        else
            res.send({"error": "Incorrect username or password"})

    }
}
  catch  (ex){
      console.error(ex)
  }    
})

//register post request
app.post("/register", async (req, res) => {
    //check if user exist 
    const sql = "select username from auth_method4 where username = $1"
    const result = await pool.query(sql,
                             [req.body.user]);
    
    //success, user is not there create it 
    if (result.rowCount === 0)
    {
        //the hash has the salt
        const hash =  await bcrypt.hash(req.body.password, 10)
       
        await pool.query("insert into auth_method4 (username, password) values ($1,$2)",
        [req.body.user,hash]);
        res.send({"success": "User created successfully"})

    }
       
    else
        res.send({"error": "User already exists.."})
})

 
  
app.listen(port, () => 
console.log("Auth Method 4 - Listening on " + port))


async function randomSalt() {
    return crypto.randomBytes(64).toString('hex');
}
function sha256(txt){
    const secret = 'abcdefg';
    const hash = crypto.createHmac('sha256', secret)
                    .update(txt)
                    .digest('hex');
   return hash;
}


 