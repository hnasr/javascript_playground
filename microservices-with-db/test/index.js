//testing against all flavors of databases
const fetch = require("node-fetch");

const OBPORT = process.env.OBPORT;
const OBHOST = process.env.OBHOST;
console.log("Testing App started on PORT " + OBHOST + OBPORT)
async function run () {
    try{
        const res = await fetch(`http://${OBHOST}:${OBPORT}/`)
        const js = await res.json();
        console.log(JSON.stringify(js));
    }
    catch(ex)
    {
        console.error(ex)
        process.exit(1)
    }
    
}

run();