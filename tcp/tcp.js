const net = require("net")

const server = net.createServer(socket => {
    socket.write("Hello.")
    socket.on("data", data => {
        console.log(data.toString())
    })
})

server.listen(8080)
