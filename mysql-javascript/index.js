const mysql = require("mysql2/promise")

connect();
async function connect() {

    try {

        const con = await mysql.createConnection({
            "host" : "localhost",
            "port": 3306,
            "user": "root",
            "password": "password",
            "database": "test"
        });

        //const [rows,schema] = await con.query("SELECT * FROM EMPLOYEES");
        
       // await con.BeginTransaction();
 
        //insert

         //insert
      
        await con.query("drop table test1,test2,test3,test4"); 
 
        /*
       const insert1  = await con.query("INSERT INTO EMPLOYEES (NAME, SSN) VALUES (?, ?)", 
         ['Lord Valdmore', '888']);
        
        const resultsAll2 = await con.query(
           `SELECT * FROM EMPLOYEES `);

        console.table(resultsAll2[0]);
        
        await con.commit();
            console.log("committed")
        const resultUpdate = await con.query(
            "UPDATE EMPLOYEES SET NAME = CONCAT('MR', NAME) WHERE NAME IN (?, ?, ?, ?)", 
            ['EDMOND', 'Hussein', 'Ali', 'Rick']
        );
        console.log(resultUpdate[0])


        //delete

        const resultDelete = await con.query(
            "DELETE FROM EMPLOYEES WHERE SSN = ?", 
            ['999']
        );
        console.log(resultDelete[0])

        //insert
        const resultInsert = await con.query (
            "INSERT INTO EMPLOYEES (NAME, SSN) VALUES (?, ?)", 
            ['Britney', '999']
        );
        console.log(resultInsert[0])

        const name = "Yara"

        const resultsName = await con.query(
            `SELECT * FROM EMPLOYEES WHERE NAME = ?`, [name]);

        console.table(resultsName[0]);

        const resultsAll = await con.query(
            `SELECT * FROM EMPLOYEES `);
            */
        console.table(resultsAll[0]);
      //  await con.commit();
    }
    catch(ex)
    {
        console.error(ex)
    }

}