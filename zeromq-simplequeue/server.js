const zmq = require("zeromq");

const sock = new zmq.Push();
run();
async function run () {

    await sock.bind("tcp://127.0.0.1:7000");
    console.log("Server is ready listening on port 7000");
    console.log("Press any key to start sending the jobs!")
    process.stdin.once("data", send); 
}

//sending the jobs to the workers
async function send () {

    console.log("About to send jobs!");
    for (let i = 0 ;i < 100; i ++) {
        await sock.send(`sending job ${i}`);
        //wait 500ms
        await new Promise(resolve => setTimeout(resolve, 500))
    }
}

