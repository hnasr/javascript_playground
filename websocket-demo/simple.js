const http = require("http");
let PORT = process.argv[2] | 8080
console.log(`port is ${PORT} `)

//create a raw http server (this will help us create the TCP which will then pass to the websocket to do the job)
const httpserver = http.createServer()
httpserver.listen(8080, () => console.log("My server is listening on port 8080"))


function longresponse(res) {
    res.write("another response "  + Date.now() + "");
    setTimeout(()=> longresponse(res), 1000);

}
httpserver.on("request", (req, res) => {
    console.log(req);
    if (req.method === "GET") get(req,res);

    res.writeHead(200, "ok", {"Content-Type": "text/plain"}); 
    longresponse(res);    

});

httpserver.on("connection",connection => {
    console.log("someone connected")

})


