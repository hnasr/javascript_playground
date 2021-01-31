import pg from 'pg';
/*
make sure to run the create_partitions.mjs file 
to create partitions before running this
node create_partitions.mjs 

*/
async function run() {
     

    const dbClientCustomers = new pg.Client({
        "user": "postgres",
        "password" : "postgres",
        "host" : "husseinmac",
        "port" : 5432,
        "database" : "customers"
    })

    console.log ("connecting to customers db...")
    await dbClientCustomers.connect(); 
    console.log("inserting customers... ")
    /*
    creating a billion customers
    */
   for (let i =0; i < 100; i ++)
    {   
        /* creates a million row */
        const psql  = `insert into customers(name) (
                        select random() from generate_series(1,10000000)
                        )
                          `;
   
       console.log(`inserting 10m customers...   `)
       await dbClientCustomers.query(psql ); 
    }

    
    console.log("closing connection")
    await dbClientCustomers.end(); 
    console.log("done.")
}

 run();



 
