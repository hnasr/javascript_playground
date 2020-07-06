const app = require("express")();
const pg = require("pg");
const PGHOST = process.env.PGHOST

const PORT = process.env.PORT || 8080
console.log("this is a new message.")
const pool = new pg.Pool({
    "host": PGHOST,
    "port": 5432,
    "user":"postgres",
    "password" : "postgres",
    "database" : "postgres",
    "max": 20,
    "connectionTimeoutMillis" : 0,
    "idleTimeoutMillis": 0
}) 


app.get("/", async (req, res) => {

    const result = await pool.query("select * from seats")
    res.send(result.rows)
})

app.listen(PORT, () => console.log (`listening on ${PORT}`))



console.log(`PGHOST ${PGHOST}`)


init();


async function init() {
    try{
          
        const chk = await pool.query(`SELECT * FROM pg_catalog.pg_tables where tablename = 'seats'`)
        //if table is not there.. create it
        if (chk.rowCount === 0) {
            console.log("Creating table ... ")
            const res = await pool.query("CREATE TABLE SEATS (id serial primary key, isbooked int)")
            console.log(res)
            for (let i =0 ; i < 15; i++)
                await pool.query("INSERT INTO SEATS (isbooked) VALUES(0); ")
        }
        
        console.log("DB initialized successfully")
    }
    catch(ex){
        console.error(ex)
        process.exit(1);
    }
  
}
