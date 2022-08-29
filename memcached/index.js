const MEMCACHED = require("memcached");
const serverPool = new MEMCACHED(["husseinmac:11211", "husseinmac:11212", "husseinmac:11213", "husseinmac:11214"]);

function run () {
    [1,2,3,4,5,6,7,8,9].forEach(a=> serverPool.set("foo"+ a, "bar"+a, 3600, err => console.log(err)));

}

//run();

function read(){
   
    [1,2,3,4,5,6,7,8,9].forEach(a=> serverPool.get("foo"+ a, (err, data)  => console.log(data)));
}

read();


