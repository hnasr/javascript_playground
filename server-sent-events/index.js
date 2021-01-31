/* Client Code 

let sse = new EventSource("http://localhost:8080/stream");
sse.onmessage = console.log

*/

const app = require("express")();

app.get("/", (req, res) => res.send("hello!"));

app.get("/stream", (req,res) => {

    res.setHeader("Content-Type", "text/event-stream");
    send(res);

})

let i = 0;
function send (res) {
    
    res.write("data: " + `hello!${i++}\n\n`);


    setTimeout(() => send(res), 1000);
}

app.listen(8888)
console.log("Listening on 8888")