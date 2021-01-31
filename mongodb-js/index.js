//create the client class
const {MongoClient} = require("mongodb")
//const MongoClient = require("mongodb").MongoClient

const uri =  "mongodb://localhost:27017"
connect();
async function connect() {
    const client = new MongoClient(uri);
    try {
        await client.connect({ useNewUrlParser: true });
        const db = client.db("thunderbolt");
        console.log(`Connected to database ${db.databaseName}`)
        /*
        //get the collections
        const collections = await db.collections();
        collections.forEach(c=>console.log(c.collectionName));
        */

        const employees = db.collection("employees");
        //const searchCursor = await employees.find({"name": "Hussein"});
        const searchCursor = await employees.find();
        const result = await searchCursor.toArray();
        console.table(result) 
        //result.forEach(r=>console.log(r));
        //console.log(await searchCursor.hasNext());
        /*
        while (await searchCursor.hasNext()){

            console.log(await searchCursor.next())

        }*/


        //Insert into the collection 
        /*
        const insertCursor = await employees.insertMany([
            {
                "name": "Will",
                "ssn": 999
            },
            {
                "name": "Anna",
                "ssn": 998
            }
        ])

        console.log(insertCursor.insertedCount)

        */
      /*
       const updateCursor =  await employees.updateOne(
            {"name": "Will"},
            {"$set": {"DOB": "9-9-1970"}}
            )

       console.log(updateCursor.modifiedCount);
        */

        
       const deleteCursor =  await employees.deleteOne(
            {"ssn": 998}
            )

       console.log(deleteCursor.deletedCount);
       

    }
    catch (ex){
        console.error(`Something bad happend ${ex}`)
    }
    finally {
        client.close();
    }

}