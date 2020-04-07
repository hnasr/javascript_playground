//Method 3
//Store salted password hash in the database 
import Express from "express";
import crypto from 'crypto';

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
    const sql = "select * from auth_method3 where username = $1"
    const result = await pool.query(sql,
                             [req.body.user]);
    
    
    //fail
    if (result.rowCount === 0)
        res.send({"error": "Incorrect username or password"})
    else {
        //compare salted password
        const saltedPassword = result.rows[0].password  ;
        const saltedUserPassword = sha256(req.body.password + result.rows[0].salt) ;
        if (saltedPassword === saltedUserPassword)
            res.send({"success": "Logged in successfully!"})
        else
            res.send({"error": "Incorrect username or password"})

    }
       
})

//register post request
app.post("/register", async (req, res) => {
    //check if user exist 
    const sql = "select username from auth_method3 where username = $1"
    const result = await pool.query(sql,
                             [req.body.user]);
    
    //success, user is not there create it 
    if (result.rowCount === 0)
    {
        const salt  = await randomSalt();
        await pool.query("insert into auth_method3 (username, password, salt) values ($1,$2, $3)",
        [req.body.user,sha256(req.body.password + salt), salt]);
        res.send({"success": "User created successfully"})

    }
       
    else
        res.send({"error": "User already exists.."})
})

 
  
app.listen(port, () => 
console.log("Auth Method 3 - Listening on " + port))


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
