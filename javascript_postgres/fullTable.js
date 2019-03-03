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
.then(() => client.query("insert into employees values ($1, $2)",[1001, 'John']))
.then(() => client.query("select * from employees"))
.then(results => console.table(results.rows))
.catch(e => console.log(e))
.finally(() => client.end())