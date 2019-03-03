const {Client} = require('pg')

const client = new Client({
    user : "postgres",
    password : "postgres",
    host : "husseinmac",
    port : 5432,
    database : "husseindb"
})


client.connect()
.then(console.log("Connected successfully"))
.then(() => client.query ("select * from employees"))
.then(result => console.table(result.rows))
.catch(console.error)
.finally()