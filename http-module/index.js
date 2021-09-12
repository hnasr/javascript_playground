const http = require ("http");
const httpserver = http.createServer();

let connCount = 0;
function getCount() {
    httpserver.getConnections( (err_, connectionCount)=> {
         countCount = connectionCount;
         console.log(`Number of connections = ${connectionCount}`)
    
    })
    
    setTimeout(getCount, 1000);

}
getCount();

function streamit(res){
    
    res.write("stream : " + Date.now() + "Con#=" + countCount + "\n");
    setTimeout(()=>streamit(res), 1000);
}

httpserver.on("request", (req, res) => {
    console.log(req);
    res.setHeader("Content-Type", "text/html")
    if (req.url === "/stream") {
         streamit(res);

    }
    else {
        res.write("got request!")
        res.end()
    }
})

//stream /stream 

httpserver.on("connection", connection=> {
     console.log("Someone just connected!")
})

httpserver.listen(8080, ()=>console.log("Listening on port 8080"));
