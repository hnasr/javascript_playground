var HashRing = require('hashring');
 
var ring = new HashRing({
  '127.0.0.1:11211': 200,
  '127.0.0.2:11211': 200, // same as above
  '127.0.0.3:11211': 200
});

console.log(ring.get("fasdfdf"))

