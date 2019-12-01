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

app.get("/employees", async (req, res) => {
    const fromDate = new Date();

    //return all rows
    const results = await pool.query("select employeeid eid,firstname,ssn from employees")
    console.table(results.rows)
    console.log(new Date())
    const toDate = new Date();
    const elapsed = toDate.getTime() - fromDate.getTime();

    //send it to the wire
    res.send({"rows": results.rows, "elapsed": elapsed, "method": "pool"})
})

app.listen(2015, () => console.log("Listening on port 2015"))
