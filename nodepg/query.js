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
    //We don't need to close the connection twice
    //since we are already closing it in finally
    //We found this in the wireshark video 
    //while inspecting the FIN packets
    //await client.end()
}
catch(ex){
    console.log("Some error" + ex)
}
finally {
    await client.end()
}
}

connect(client)




 
