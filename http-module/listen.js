const http = require("http");
const httpserver = http.createServer();
httpserver.on("request", (req, res) => res.end("ok you are hitting ipv4 server"))
httpserver.on("listening", () => {
    console.log(`Server 4 Listening on port http://127.0.0.1:${httpserver.address().port}/ on ${httpserver.address().address} family ${httpserver.address().family}`)
})
httpserver.on("error", err => console.error(`Error ${err}`))
//:: ipv6 => 0.0.0.0 ipv4
//unspecified address 
httpserver.listen(8888, "127.0.0.1");

const httpserver6 = http.createServer();
httpserver6.on("request", (req, res) => res.end("ok you are hitting ipv6 server"))
httpserver6.on("listening", () => {
    console.log(`Server 6 Listening on port http://[::1]:${httpserver6.address().port}/ on ${httpserver6.address().address} family ${httpserver6.address().family}`)
})
httpserver6.on("error", err => console.error(`Error ${err}`))
//:: ipv6 => 0.0.0.0 ipv4
//unspecified address 
httpserver6.listen(8888, "::1");





httpserver.listen(0);

