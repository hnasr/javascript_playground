const pg = require('pg') 
const ClientClass = pg.Client
const pgUrl = "postgres://gdrejvxb:xawo_xfwWQZQaYkBOP_-OCiKFw-n1IgW@ruby.db.elephantsql.com:5432/gdrejvxb";
const client = new ClientClass(pgUrl)

async function connect(client) {
try {
    await client.connect()
    console.log(`Client connected.`)
    let where = "where id = 1";
    for (let i = 0;i  < 1000000; i ++) where += ` or id = ${i}`;

    const sql = `SELECT * FROM EMPLOYEES ${where}`
    console.log(sql + "\n" + (sql.length / 1024) + "kb" )
    const {rows} = await client.query(sql)
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




 
