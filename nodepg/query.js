const pg = require('pg') 
const ClientClass = pg.Client
const pgUrl = "";
const client = new ClientClass(pgUrl)

async function connect(client) {
try {
    await client.connect()
    console.log(`Client connected.`)
   
    const {rows} = await client.query('SELECT * FROM EMPLOYEES')
    console.table(rows)
    await client.end()
}
catch(ex){
    console.log("Some error" + ex)
}
finally {
    await client.end()
}
}

connect(client)




 
