const app = require("express")();
const {Client} = require("pg");
app.get("/all", async (req, res) => {
    const fromDate = new Date();

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

    //send it to the wire
    res.send({"rows": results.rows, "elapsed": elapsed, "method": "old"})
})

app.listen(9000, () => console.log("Listening on port 9000"))