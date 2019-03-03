const {Client} = require('pg')

const client = new Client({
    user: "postgres",
    password: "postgres",
    host: "husseinmac",
    port: 5432,
    database: "husseindb"
})

client.connect()
.then(() => console.log("Connected."))
.then(() => client.query("select * from employees"))
.then(results => console.table(results.rows))
.catch(console.error)
.finally(()=> client.end())