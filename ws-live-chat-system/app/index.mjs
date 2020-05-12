import http from "http";
import ws from "websocket"
import redis from "redis";
const APPID = process.env.APPID;
let connections = [];
const WebSocketServer = ws.server


const subscriber = redis.createClient({
  port      : 6379,              
  host      : 'rds'} );

const publisher = redis.createClient({
  port      : 6379,              
  host      : 'rds'} );
  
 
subscriber.on("subscribe", function(channel, count) {
  console.log(`Server ${APPID} subscribed successfully to livechat`)
  publisher.publish("livechat", "a message");
});
 
subscriber.on("message", function(channel, message) {
  try{
  //when we receive a message I want t
  console.log(`Server ${APPID} received message in channel ${channel} msg: ${message}`);
  connections.forEach(c => c.send(APPID + ":" + message))
    
  }
  catch(ex){
    console.log("ERR::" + ex)
  }
});


subscriber.subscribe("livechat");


//create a raw http server (this will help us create the TCP which will then pass to the websocket to do the job)
const httpserver = http.createServer()

//pass the httpserver object to the WebSocketServer library to do all the job, this class will override the req/res 
const websocket = new WebSocketServer({
    "httpServer": httpserver
})


httpserver.listen(8080, () => console.log("My server is listening on port 8080"))

//when a legit websocket request comes listen to it and get the connection .. once you get a connection thats it! 
websocket.on("request", request=> {

    const con = request.accept(null, request.origin)
    con.on("open", () => console.log("opened"))
    con.on("close", () => console.log("CLOSED!!!"))
    con.on("message", message => {
        //publish the message to redis
        console.log(`${APPID} Received message ${message.utf8Data}`)
        publisher.publish("livechat", message.utf8Data)
    })

    setTimeout(() => con.send(`Connected successfully to server ${APPID}`), 5000)
    connections.push(con)
  

})
  
//client code 
//let ws = new WebSocket("ws://localhost:8080");
//ws.onmessage = message => console.log(`Received: ${message.data}`);
//ws.send("Hello! I'm client")


/*
    //code clean up after closing connection
    subscriber.unsubscribe();
    subscriber.quit();
    publisher.quit();
    */
