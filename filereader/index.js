const fs  = require("fs");
const http = require("http");
const httpServer = http.createServer();
httpServer.on("listening", () => console.log("listening"));
httpServer.on("request", (req, res) => {
    //console.log(req.url)
    if (req.url === "/"){  res.end(fs.readFileSync("index.html")); return;}
    const filename = req.headers["upload-id"];
    req.on('data', chunk => {
        fs.appendFileSync(filename,chunk )
        console.log(`Received ${chunk.length} bytes of data.`);
    });
  
    res.end("done");
})

httpServer.listen(8080);