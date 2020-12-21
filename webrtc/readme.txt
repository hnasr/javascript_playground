Open two browsers
Open DevTools on both
Paste peerA.js content in first browser dev tools
Copy the SDP offer generated JSON
Got to the second browser and create "offer" object and set it to the SDP you copied (signled) 
Paste peerB.js content in second browser dev tools
Go back to First browser (peer A) and paste the content of peerA_Final.js
use sendChannel.send() to send data from peerA 
use remoteConnection.channel.send() to send data from peerB


Watch video here 
https://www.youtube.com/watch?v=FExZvpVvYxA
minute 46:00

