## docker commands

### Spin rabbitmq server docker
docker run --name rabbitmq -p 5672:5672  -d rabbitmq

### Spin rabbitmq server HTTP server docker

docker run --name rabbitmq -p 5672:5672 -p 15672:15672 -d rabbitmq:3-management



HTTP
fetch("http://localhost:15672/api/vhosts”, {headers: {"Authorization" : `Basic ${btoa('guest:guest')}`}}).then(a=>a.json()).then(console.log)


fetch("http://localhost:15672/api/channels", {headers: {"Authorization" : `Basic ${btoa('guest:guest')}`}}).then(a=>a.json()).then(console.log)


fetch("http://localhost:15672/api/queues", {headers: {"Authorization" : `Basic ${btoa('guest:guest')}`}}).then(a=>a.json()).then(console.log)

