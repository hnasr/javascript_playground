const app = require ("express")();
const {fork} = require("child_process") 

app.get("/isprime", (req, res) => {
    
    const childProcess = fork('./isprime.js');
    childProcess.send({"number": parseInt(req.query.number)})
    childProcess.on("message", message => res.send(message))
} )

app.listen(8081, ()=>console.log("Listening on 8081") )


/*

2367949 (16 ms)
43686389 (200 ms)
93686687 (500 ms)
936868033(4 seconds)
29355126551 (very long time)

*/
