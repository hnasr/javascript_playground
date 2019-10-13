const app = require("express")();
const {Pool} = require("pg");


const pool = new Pool({
    "host": "husseinmac.local",
    "port": 5432,
    "user":"postgres",
    "password" : "postgres",
    "database" : "husseindb",
    "max": 20,
    "connectionTimeoutMillis" : 0,
    "idleTimeoutMillis": 0
})

app.get("/all", async (req, res) => {
    const fromDate = new Date();

    //return all rows
    const results = await pool.query("select * from employees")
    console.table(results.rows)

    const toDate = new Date();
    const elapsed = toDate.getTime() - fromDate.getTime();

    //send it to the wire
    res.send({"rows": results.rows, "elapsed": elapsed, "method": "pool"})
})

app.listen(9000, () => console.log("Listening on port 9000"))