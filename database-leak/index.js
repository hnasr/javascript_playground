const {Pool} = require("pg")
const express = require("express")
const app = express()
app.use(express.json())

app.get("/todos", async (req,res) => {
    res.setHeader("content-type", "application/json")
    
    //pull a connection from pool
    const client = await pool.connect();
    client.query("begin")
    //this was incorrectly set as pool.query in the video should be client.query 
    //https://youtu.be/KGbwkbaCwss
    //const result = await pool.query("select id, todo from todos") 
    const result = await client.query("select id, todo from todos")
    client.query("commit");
    //client.release(); 
    //proper way to release is to have a finally block capture failures
    res.send(JSON.stringify({result}))
})


app.get("/", (req, res )=> res.sendFile(__dirname + "/index.html"))
app.listen(8080, () => console.log("listening "))
 
async function connect () {
try { 
   
    pool = new Pool({
        "host" : "husseinmac",
        "user": "postgres",
        "password": "password",
        "database": "postgres",
        "port" : 5432,
        "max": 4
    })
   
}
catch(e)
{
    console.error(e)

}
}

connect();
