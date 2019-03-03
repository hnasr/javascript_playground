const {Client} = require('pg')
const client = new Client({
    user: "postgres",
    password: "postgres",
    host: "husseinmac",
    port: 5432,
    database: "husseindb"
})



//listEmployees1()
listEmployees2()
function listEmployees2() {
    client.connect()
    .then(() => console.log("Connected successfully"))
    .then(() => client.query("insert into employees select max(id)+1,$1 from employees", ['Nada']))
    .then(() => client.query("select count(id) as count from employees"))
    .then(results => console.table(results.rows))
    .catch(console.error)
    .finally(() => client.end())
}
async function listEmployees1() {
try {
    await client.connect()
    console.log("Connected successfully.")
    const results = await client.query("select * from employees where name = $1", ['Hussein'])
    console.table(results.rows)
}
catch(ex)
    {
        console.error(ex)
    }
finally
    {
        await client.end()
    }
}   