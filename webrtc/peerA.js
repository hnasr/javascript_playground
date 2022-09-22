
 /*
//you can specify a STUN server here

const iceConfiguration = { }
iceConfiguration.iceServers = [];
//turn server
iceConfiguration.iceServers.push({
                urls: 'turn:my-turn-server.mycompany.com:19403',
                username: 'optional-username',
                credentials: 'auth-token'
            })
//stun  server
iceConfiguration.iceServers.push({
                urls: 'stun:stun1.l.google.com:19302' 
            })    

const localConnection = new RTCPeerConnection(iceConfiguration)


*/

const localConnection = new RTCPeerConnection()
 

localConnection.onicecandidate = e =>  {
console.log(" NEW ice candidate!! on localconnection reprinting SDP " )
 console.log(JSON.stringify(localConnection.localDescription))
}


const sendChannel = localConnection.createDataChannel("sendChannel");
 sendChannel.onmessage =e =>  console.log("messsage received!!!"  + e.data )
   sendChannel.onopen = e => console.log("open!!!!");
     sendChannel.onclose =e => console.log("closed!!!!!!");


localConnection.createOffer().then(o => localConnection.setLocalDescription(o) )

