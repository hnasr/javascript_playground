
const {Pool} = require("pg")
const express = require ("express")
const app = express();
app.use(express.json())

const pool = new Pool({
    "user": "postgres",
    "password" : "postgres",
    "host" : "husseinmac",
    "port" : 5433,
    "database" : "postgres"
})

 
app.get("/", (req, res) => res.sendFile(`${__dirname}/index.html`))


app.get("/grades/estimate", async (req, res) => {
    const result = await countGradesBetweenEstimate (req.query.from,req.query.to);

    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(result))
})

app.get("/grades", async (req, res) => {
    const result = await countGradesBetween (req.query.from,req.query.to);

    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(result))
})

async function countGradesBetween(fromG, toG) {

    const result = await pool.query(
        "select count(*) from grades where g between $1 and $2",
         [fromG,toG]);
    const rowCount = result.rows[0].count;
    const obj = {
        "rowCount": parseInt(rowCount),
        "id": `g-${fromG}-${toG}`
    }
    return obj;
}

async function countGradesBetweenEstimate(fromG, toG) {

    const result = await pool.query(
        "explain (format json) select * from grades where g between $1 and $2",
         [fromG,toG]);
    const estimateRowCount = result.rows[0]["QUERY PLAN"][0]["Plan"]["Plan Rows"];
    const obj = {
        "rowCount": estimateRowCount,
        "id": `g-${fromG}-${toG}`
    }
    console.log(estimateRowCount)
    return obj;

}

app.listen(8080, () => console.log("Web server is listening.. on port 8080"))

connect();

async function connect() {
    try {
        await pool.connect(); 
        console.log("Connected successfully")
    }
    catch(e) {
        console.error(`Failed to connect ${e}`)
    }
}


