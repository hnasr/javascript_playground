const http = require("http");
const WebSocketServer = require("websocket").server;
const httpServer = http.createServer();
const websocketServer = new WebSocketServer( 
        {"httpServer": httpServer})
const PORT = process.argv[2] || 8080;
let connection = null;
httpServer.listen(PORT, () => console.log(`Listening on port ${PORT}`))

websocketServer.on("request", request => {

    connection = request.accept(null, request.origin);
    connection.on("message", data => {
        console.log(`Hey I received a message ${data.utf8Data}`);
        connection.send(`Hey Client! Received your message  ${data.utf8Data} on ${PORT}`)
    })
})