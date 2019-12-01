        var ConsistentHash = require('./index')
        var hr = new ConsistentHash()
        hr.add('node1', 10)
	hr.add('node2', 10)

	var node1 = hr.get('firstResource')
console.log(node1)
        var node2 = hr.get('secondResource')
console.log(node2)
