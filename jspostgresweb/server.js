const {Client} = require("pg")
const express = require("express")
const app = express()
app.use(express.json())
let client; 


app.delete("/todos", async (req, res) => {
    const {id} = req.body;  
    const result = await deleteTodo(id)
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify({result: result}))

})
app.post("/todos", async (req, res) => {
     
    const todoText = req.body;
    const result = await create(todoText.todoText)
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify({result: result}))
})
app.get("/todos", async (req,res) => {
    res.setHeader("content-type", "application/json")
    const rows = await query()
    res.send(JSON.stringify(rows))
})
app.listen(8080, () => console.log("listening "))
async function query () {
    const res = await client.query("select id, text from todos")
    return res.rows; 
}
async function connect () {
try {

    client = new Client({
        "host" : "husseinmac",
        "user": "postgres",
        "password": "postgres",
        "database": "todo",
        "port" : 5432
    })
    
    await client.connect()
   
}
catch(e)
{
    console.error(e)

}
}



async function deleteTodo(todoId) {
    try {

        await client.query(`DELETE FROM TODOS where id = $1`, [todoId] )
        return true
    }
    catch (e){
        return false;
    }
}

async function create(todoText) {
    try {

        await client.query(`INSERT INTO TODOS (text) VALUES ('${todoText}')`)
        return true
    }
    catch (e){
        return false;
    }
}
connect();
query();