/* RabbitMQ */
const amqp = require("amqplib");

const msg = {number: process.argv[2]}
connect();
async function connect() {

    try {
        const amqpServer = "amqp://tkgdqstw:n4jcFi8dJ9FLztUErp_vmwd2y5TPFwsP@gull.rmq.cloudamqp.com/tkgdqstw"        //"amqp://localhost:5672"
        const connection = await amqp.connect(amqpServer)
        const channel = await connection.createChannel();
        await channel.assertQueue("jobs");
        await channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)))
        console.log(`Job sent successfully ${msg.number}`);
        await channel.close();
        await connection.close();
    }
    catch (ex){
        console.error(ex)
    }

}