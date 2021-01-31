require("sslkeylog").hookAll();

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017"

const client = new MongoClient(uri, { useNewUrlParser: true });
connect();
async function connect() {
    try {
        await client.connect({ useNewUrlParser: true });
        await sleep(1000);

        

        const db = await client.db("thunderbolt");
        console.log(`Connected to database ${db.databaseName}`)
        
        const employees = await db.collection("employees");
       
       
        const searchCursor = await employees.find({"name": "Hussein"}); 
       
        const result = await searchCursor.next();

        //const result = await searchCursor.toArray();
        

        console.table(result) 
        
        await client.close();
        await sleep(1000);
        console.log("closed.")
        process.exit();

    }
    catch (ex){
        console.error(ex.toString())
    }
} 


function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }   