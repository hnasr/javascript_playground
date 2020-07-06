const http2 = require ("http2")
const fs = require("fs")

const server = http2.createSecureServer({
    "key": fs.readFileSync("localhost-private.pem"),
    "cert": fs.readFileSync("localhost-cert.pem")
})

server.on("stream", (stream, headers) => {
    console.log(stream.id);
    stream.respond({
        "content-type": "application/json",
        "status": 200
    })

    stream.end(JSON.stringify({
        "user": "Hussein",
        "id": 823
    }))
})


server.listen(443);
console.log("listening on port 443");



