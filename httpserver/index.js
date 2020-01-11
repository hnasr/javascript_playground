const http = require("http");

//create a raw http server (this will help us create the TCP which will then pass to the websocket to do the job)
const httpserver = http.createServer((req, res) => {

    console.log("we have received a request");
    res.statusCode = 200
    res.end("hello")
})
 
httpserver.listen( 8080, "0.0.0.0", () => console.log("My server is listening on port 8080"))

 
//client code 
//let ws = new WebSocket("ws://localhost:8080");
//ws.onmessage = message => console.log(`Received: ${message.data}`);
//ws.send("Hello! I'm client")