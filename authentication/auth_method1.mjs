//Method 1
//Store password in the database as plain text
import Express from "express";
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
    const sql = "select username from auth_method1 where username = $1 and password = $2"
    const result = await pool.query(sql,
                             [req.body.user, req.body.password]);
    
    //fail
    if (result.rowCount === 0)
        res.send({"error": "Incorrect username or password"})
    else
        res.send({"success": "Logged in successfully!"})
})

//register post request
app.post("/register", async (req, res) => {
    //check if user exist 
    const sql = "select username from auth_method1 where username = $1"
    const result = await pool.query(sql,
                             [req.body.user]);
    
    //success, user is not there create it 
    if (result.rowCount === 0)
    {
        await pool.query("insert into auth_method1 (username, password) values ($1,$2)",
        [req.body.user,req.body.password]);
        res.send({"success": "User created successfully"})

    }
       
    else
        res.send({"error": "User already exists.."})
})


//book a seat give the seatId and your name
app.put("/:id/:name", async (req, res) => {
    try{
        const id = req.params.id 
        const name = req.params.name;
 
        const conn = await pool.connect();
        //begin transaction
        await conn.query("BEGIN");
        //getting the row to make sure it is not booked
        const sql = "SELECT * FROM seats where id = $1 and isbooked = 0 FOR UPDATE"
        const result = await conn.query(sql,[id])
        //if no rows found then the operation should fail can't book
        if (result.rowCount === 0) {
            res.send({"error": "Seat already booked"})
            return;
        } 
        //if we get the row, we are safe to update
        const sqlU= "update seats set isbooked = 1, name = $2 where id = $1"
        const updateResult = await conn.query(sqlU,[id, name]);
        
        //end transaction
        await conn.query("COMMIT");
        conn.release();
        res.send(updateResult)
    }
    catch(ex){
        console.log(ex)
        res.send(500);
    }
   
    
}) 

 

 

app.listen(port, () => 
console.log("Auth Method 1 - Listening on " + port))

