var xmpp = require('simple-xmpp');

xmpp.on('online', function(data) {
	console.log('Connected with JID: ' + data.jid.user);
	console.log('Yes, I\'m connected!');
	//send a message every 3 second
	send()
});

function send(){

	xmpp.send(`hussein@localhost`, `yo!${Date.now()}`) 
	setTimeout(send, 10000)
}
xmpp.on('chat', function(from, message) {
	console.log(`Got message! ${message} from ${from}`)
});

xmpp.on('error', function(err) {
	console.error(err);
});
 

xmpp.connect({
	jid: "admin@localhost",
	password: "password",
	host: 'localhost',
	port: 5222
});

