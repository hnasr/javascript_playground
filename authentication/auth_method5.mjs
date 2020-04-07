//Method 5
//No password stored!
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
    const sql = "select * from auth_method5 where username = $1"
    const result = await pool.query(sql,
                             [req.body.user]);
    
    
    //fail
    if (result.rowCount === 0)
        res.send({"error": "User doesn't exist"})
    else {
        //get the encrypted data
        const encryptedData = result.rows[0].userdata  ;
        //attempt to decrypt using the user password
        const data = decryptAES(encryptedData, req.body.password);
        //send the data to the user
        res.send({"data": data});
    }
}  
)

//register post request
app.post("/register", async (req, res) => {
    //check if user exist 
    const sql = "select username from auth_method5 where username = $1"
    const result = await pool.query(sql,
                             [req.body.user]);
    
    //success, user is not there create it 
    if (result.rowCount === 0)
    {
        const data = encryptAES(req.body.user, req.body.password)
        await pool.query("insert into auth_method5 (username, userdata) values ($1,$2)",
        [req.body.user, data]);
        res.send({"success": "User created successfully"})

    }
       
    else
        res.send({"error": "User already exists.."})
})

 
  
app.listen(port, () => 
console.log("Auth Method 5 - Listening on " + port))


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



function encryptAES(plainText, key){
 
    const encrypt = crypto.createCipher('aes256', key);
    let encrypted = encrypt.update(plainText, 'utf8', 'hex');
    encrypted += encrypt.final('hex')
    return encrypted;
}




function decryptAES(encryptedText, key){
 try{
    const decrypt = crypto.createDecipher('aes256', key);
    let decrypted = decrypt.update(encryptedText, 'hex', 'utf8')
    decrypted += decrypt.final()
    return decrypted
 }
 catch(ex)
{
    return ex;
}
 
}

