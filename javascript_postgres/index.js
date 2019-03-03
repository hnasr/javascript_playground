const {Client} = require('pg')
const client = new Client({
    user: "postgres",
    password: "postgres",
    host: "husseinmac",
    port: 5432,
    database: "husseindb"
})

client.connect()
.then(() => console.log("Connected successfuly"))
.then(() => client.query("select * from employees where name = $1", ["Edmond"]))
.then(results => console.table(results.rows))
.catch(e => console.log(e))
.finally(() => client.end())