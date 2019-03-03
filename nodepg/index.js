const test = {movie: {title: "Shawnshank", rating: 4}}
const {movie} = test;
console.log(movie.title)

const pg = require('pg') 
const ClientClass = pg.Client

//const {Client} = require('pg')
const client = new ClientClass({
    user: 'postgres',
    host: 'husseinmac',
    database: 'husseindb',
    password: 'postgres',
    port: 5432,
  })


async function connect(client) {
try {


    await client.connect()
    console.log(`Client connected.`)
   // await client.query("BEGIN")
   // await client.query('insert into EMPLOYEES (id, name) values ($1, $2)', [99, 'Hussein'])
    const {rows} = await client.query('SELECT * FROM EMPLOYEES')
    console.table(rows)
   // await client.query("COMMIT")
    client.end()
}
catch(ex){
    console.log("Some error" + ex)
}
finally {
    client.end()
}
}

connect(client)




 
