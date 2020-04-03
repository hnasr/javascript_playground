import Express from "express";
import pg from "pg";
const port = process.env.PORT || 8080;
const app = new Express(); 
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

    res.sendFile(__dirname + "/index.html");
})
//get all seats 
app.get("/seats", async (req, res) => {
    const result = await pool.query("select * from seats");
    res.send(result.rows)
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
console.log("Listening on " + port))

