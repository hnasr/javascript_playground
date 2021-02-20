//set offer const offer = ...
const remoteConnection = new RTCPeerConnection()

remoteConnection.onicecandidate = e =>  {
console.log(" NEW ice candidnat!! on localconnection reprinting SDP " )
 console.log(JSON.stringify(remoteConnection.localDescription) )
}

 
remoteConnection.ondatachannel= e => {

      const receiveChannel = e.channel;
      receiveChannel.onmessage =e =>  console.log("messsage received!!!"  + e.data )
      receiveChannel.onopen = e => console.log("open!!!!");
      receiveChannel.onclose =e => console.log("closed!!!!!!");
      remoteConnection.channel = receiveChannel;

}


remoteConnection.setRemoteDescription(offer).then(a=>console.log("done"))

//create answer
await remoteConnection.createAnswer().then(a => remoteConnection.setLocalDescription(a)).then(a=>
console.log(JSON.stringify(remoteConnection.localDescription)))
//send the anser to the client 