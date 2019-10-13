const app = require("express")();
const {Pool} = require("pg");
const {Client} = require("pg");

let oldCount = 0;
let oldSum = 0;
let poolCount = 0;
let poolSum = 0;

const pool = new Pool({
    "host": "husseinmac.local",
    "port": 5432,
    "user":"postgres",
    "password" : "postgres",
    "database" : "husseindb",
    "max": 10
})


app.get("/old", async (req, res) => {
    const fromDate = new Date();
    oldCount++;
   
    const client = new Client({
        "host": "husseinmac.local",
        "port": 5432,
        "user":"postgres",
        "password" : "postgres",
        "database" : "husseindb"
    })

    //connect
    await client.connect();
    //return all rows
    const results = await client.query("select * from employees")
    console.table(results.rows)
    //end
    client.end();

    const toDate = new Date();
    const elapsed = toDate.getTime() - fromDate.getTime();
    oldSum += elapsed;

    //send it to the wire
    res.send({"rows": results.rows, "elapsed": elapsed, "avg" : Math.round(oldSum/ oldCount), "method": "old"})
})



app.get("/pool", async (req, res) => {
    const fromDate = new Date();
    poolCount ++;
    //return all rows
    const results = await pool.query("select * from employees")
    console.table(results.rows)
    

    const toDate = new Date();
    const elapsed = toDate.getTime() - fromDate.getTime();
    poolSum += elapsed;
    //send it to the wire
    res.send({"rows": results.rows, "elapsed": elapsed, "avg": Math.round(poolSum/poolCount), "method": "pool"})
})

app.listen(9000, () => console.log("Listening on port 9000"))

/*

for (let i = 0; i < 1000; i++) fetch(`http://localhost:9000/old`).then(a=>a.json()).then(console.log).catch(console.error);
for (let i = 0; i < 1000; i++) fetch(`http://localhost:9000/pool`).then(a=>a.json()).then(console.log).catch(console.error);

*/