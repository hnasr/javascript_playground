const app = require('express')();
const fs = require('fs');  
const pg = require( 'pg');

const pool = new pg.Pool({
    "host": "husseinmac.local",
    "port": 5433,
    "user":"postgres",
    "password" : "password",
    "database" : "postgres",
    "max": 20,
    "connectionTimeoutMillis" : 0,
    "idleTimeoutMillis": 0
}) 



app.get("/", (req,res) => {

    res.sendFile(__dirname + "/index.html")
})
let id = 0;
app.post("/", async (req,res) => {

    try { 
        const txtIndex = fs.readFileSync(__dirname + "/index.html")
        const sql = "insert into orders (username) values ($1)";
        
        const result = await pool.query(sql, ['hussein']);
       id++;
        const updatedIndexHtml = txtIndex.toString().replace("<!-- ORDER -->", `<h1>Order ${id} placed successfully</h1>`)
        
        //res.headers.add("")
        res.send(updatedIndexHtml)
    }
    catch(ex){
        console.error(ex)
        res.send(ex)
    }
  
})

app.listen(8080);