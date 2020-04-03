const {Client} = require('pg')
const Cursor = require ('pg-cursor')

const client = new Client( {
    user: "postgres",
    password: "postgres",
    host: "husseinmac",
    port: 5432,
    database: "husseindb"
})

execute()

 
async function execute_tx() {
    try{
    
    await client.connect()
    console.log("Connected successfully.")
    //await client.query("insert into employees values (1, 'John')")
    await client.query("BEGIN");
    const {rows} = await client.query("select * from employees")
    console.table(rows)
    await client.query("COMMIT");
    }
    catch (ex)
    {
        console.log(`Something wrong happend ${ex}`)
    }
    finally 
    {
        await client.query("ROLLBACK");
        await client.end()
        console.log("Client disconnected successfully.")    
    }
    
}



async function execute() {
try {
    const cursor = new Cursor("select * from employees")
    await client.connect()
    const cursorFilled = await client.query(cursor)
    cursorFilled.read(5, (err, rows) => {
        console.table(rows)
    })
}
catch (ex){
    console.log(`Failed to execute something ${ex} this is not cool`)
   
}
finally{
    await client.end()
    console.log("Cleaned.")
}
}