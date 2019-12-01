var ConsistentHash = require('./index.js')
var nbins = [2, 3, 5, 10, 16, 17, 20, 32, 40, 50, 100, 127, 128, 256, 257]
var nbins = [4, 10, 100];

function distribute( data, nbins ) {
    var i, hr = new ConsistentHash()

    // add nbins nodes distributed uniformly around the ring
    // note: random control points will badly skew the distribution
    //for (i=0; i<nbins; i++) hr.add(i, 1, [(i / nbins * hr._range) >>> 0])
    for (i=0; i<nbins; i++) hr.add(i)

    // create bins to count the number of times each node showed up
    var bins = new Array(nbins)
    for (i=0; i<bins.length; i++) bins[i] = 0

    // hash the data to nodes, track distribution in the bins
    for (i=0; i<data.length; i++) {
        var node = hr.get(data[i])
        bins[node] += 1
    }

    return bins
}

function testDistribution( t, fn ) {
    var i, data = []
    for (i=0; i<10000; i++) {
        data[i] = fn(i)
    }
console.log(fn.toString())
    for (var j=0; j<nbins.length; j++) {
        var bins = distribute(data, nbins[j])
        bins.sort(function(a, b) { return a - b })
        var empty = 0;
        for (var i=0; i<bins.length; i++) if (!bins[i]) empty += 1
        empty = (empty / bins.length * 100) >>> 0
console.log("AR: %d nodes %d%% empty", bins.length, empty, bins.slice(0, 10), "...", bins.slice(-10))
        //t.ok(bins[0] * 10 > bins[bins.length - 1])
    }
}

function str_repeat( s, n ) {
    var ret = ""
    for (var i=0; i<n; i++) ret += s
    return ret
}

module.exports = {
    'numbers': function(t) {
        testDistribution(t, function(i) { return Math.random() * 1000000 >>> 0 })
        testDistribution(t, function(i) { return "" + i })
        testDistribution(t, function(i) { return "" + i + i + i + i})
        testDistribution(t, function(i) { return "12345678" + i })
        t.done()
    },

    'numeric suffixes': function(t) {
        testDistribution(t, function(i) { return 'a' + i })
        testDistribution(t, function(i) { return 'someLongishPrefix' + i })
        testDistribution(t, function(i) { return 'someLongishPrefix' + i + i + i + i})
        t.done()
    },

    'various length strings': function(t) {
        testDistribution(t, function(i) { return str_repeat(String.fromCharCode(0x65 + i%26), 1 + i/26) })
        testDistribution(t, function(i) { return str_repeat('abcdefghij', 1 + i/20) })
        t.done()
    },

    'random strings': function(t) {
        testDistribution(t, function(i) { x = (Math.random() * 100000).toString(36).replace(/[0-9]/, ''); return x })
        testDistribution(t, function(i) { x = (Math.random() * 100000).toString(36).replace(/[0-9]/, ''); return x + x + x + x })
        t.done()
    },
}
