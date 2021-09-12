const http = require("http");

const WebSocketServer = require("websocket").server
//create a raw http server (this will help us create the TCP which will then pass to the websocket to do the job)
const httpserver = http.createServer(
            (req, res) => {
                if (req.url === "/chat"){

                     //pass the httpserver object to the WebSocketServer library to do all the job, this class will override the req/res 
                    const websocket = new WebSocketServer({
                        "httpServer": httpserver
                    })

                                    
                //when a legit websocket request comes listen to it and get the connection .. once you get a connection thats it! 
                websocket.on("request", request=> {

                    connection = request.accept(null, request.origin)
                    connection.on("open", () => console.log("Opened!!!"))
                    connection.on("close", () => console.log("CLOSED!!!"))
                    connection.on("message", message => {

                        console.log(`Received message ${message.utf8Data}`)
                        connection.send(`got your message: ${message.utf8Data}`)
                        
                    
                    })


    

})
                    console.log(` web socket`)

                }
                else
                {

                res.end("ok")
                    console.log("Normal request")
                }
                
            });


httpserver.on("connection",stream => console.log("someone connected"))
httpserver.listen(8080, () => console.log("My server is listening on port 8080"))

