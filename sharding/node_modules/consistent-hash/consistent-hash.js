/**
 * consistent-hash -- simple, quick, efficient hash ring (consistent hashing)
 *
 * Copyright (C) 2014-2015 Andras Radics
 * Licensed under the Apache License, Version 2.0
 *
 * - O(n log n) insert for any number of nodes, not O(n^2)
 * - fast js string hash computation
 * - fairly uniform hash distribution
 *
 * Based on my PHP version, see lib/Quick/Data/ConsistentHash.php
 * in https://github.com/andrasq/quicklib/
 */

function ConsistentHash( options ) {
    this._nodes = new Array()
    this._nodeKeys = new Array()
    this._keyMap = {}
    this._keys = null
    this.nodeCount = 0
    this.keyCount = 0

    options = options || {}
    if (options.range) this._range = options.range
    if (options.weight || options.controlPoints) this._weightDefault = options.weight || options.controlPoints
}

ConsistentHash.prototype = {
    _nodes: null,               // list of node objects
    _nodeKeys: null,            // list of control points for each node
    _keyMap: null,              // control point to node map
    // sorted keys array will be regenerated whenever set to falsy
    _keys: null,                // array of sorted control points
    _range: 100003,             // hash ring capacity.  Smaller values (1k) distribute better (100k)
                                // ok values: 1009:1, 5003, 9127, 1000003:97
    _weightDefault: 40,         // number of control points to create per node

    /**
     * add n instances of the node at random positions around the hash ring
     */
    add:
    function add( node, n, points ) {
        var i, key
        if (Array.isArray(points)) points = this._copy(points)
        else points = this._makeControlPoints(n || this._weightDefault)
        this._nodes.push(node)
        this._nodeKeys.push(points)
        n = points.length
        for (i=0; i<n; i++) this._keyMap[points[i]] = node
        this._keys = null
        this.keyCount += n
        this.nodeCount += 1
        return this
    },

    _copy:
    function _copy( o ) {
        if (Array.isArray(o)) {
            var i, ret = new Array(o.length)
            for (i=0; i<o.length; i++) ret[i] = o[i]
            return ret
        }
        else {
            var k, ret = {}
            for (k in o) ret[k] = o[k]
            return ret
        }
    },

    _makeControlPoints:
    function _makeControlPoints( n ) {
        var attemptCount = 0
        var i, points = new Array(n)
        for (i=0; i<n; i++) {
            // use probabilistic collision detection: ok for up to millions
            do {
                key = Math.random() * this._range >>> 0
            } while ((this._keyMap[key] !== undefined || points[key] === 'a') && ++attemptCount < 100)
            // adding the always-false ( == 'a') test above doubles throughput ??
            if (attemptCount >= 100) throw new Error("unable to find an unused control point, tried 100")
            // reuse control points after 1000 failed attempts.  This will shadow another node.
            points[i] = key
            // reserve the point to not reuse, not even for this node
            this._keyMap[key] = true
        }
        return points
    },

    /**
     * remove all instances of the node from the hash ring
     */
    remove:
    function remove( node ) {
        var ix
        // note: indexOf() is a very fast O(n) linear search by pointer
        // loop to get duplicate entries too
        while ((ix = this._nodes.indexOf(node)) >= 0) {
            var keys = this._nodeKeys[ix]
            this._nodes[ix] = this._nodes[this._nodes.length - 1]
            this._nodes.length -= 1
            for (var j = 0; j < this._nodeKeys[ix].length; j++) this._keyMap[this._nodeKeys[ix][j]] = undefined;
            this._nodeKeys[ix] = this._nodeKeys[this._nodeKeys.length - 1]
            this._nodeKeys.length -= 1
            this._keys = null
            this.keyCount -= keys.length
            this.nodeCount -= 1
            ix -= 1
        }
        return this
    },

    /**
     * return the first node in the hash ring after name
     */
    get:
    function get( name, count ) {
        if (count) return this._getMany(name, count);
        if (!this.keyCount) return null
        var index = this._locate(name)
        return this._keyMap[this._keys[index]]
    },

    _getMany:
    function _getMany( name, n ) {
        if (!this.keyCount) return null
        var index = this._locate(name)
        var node, nodes = [];
        for (var i=index; i<this.keyCount && nodes.length < n; i++) {
            node = this._keyMap[this._keys[i]];
            if (nodes.indexOf(node) < 0) nodes.push(node);
        }
        for ( ; i<index && nodes.length < n; i++) {
            node = this._keyMap[this._keys[i]];
            if (nodes.indexOf(node) < 0) nodes.push(node);
        }
        return nodes;
    },

    // return the index of the node that handles resource name
    _locate:
    function _locate( name ) {
        if (typeof name !== 'string') name = "" + name
        if (!this._keys) this._buildKeys()
        var h = this._hash(name)

        // scaling up the hash distributes better for larger _range values
        h = h << 5

        // the hash lsbyte too closely tracks the input strings, eg a
        // trailing decimal suffix 'a1234' skews the hash distribution
        // because ascii 0-9 is always in the range 0000-1001
        // Dropping a few of the least significant bits counters this,
        // but makes 'a1', 'a2', 'a3' hash to the same node (however, it
        // does not skip nodes 10-16 for strings /a[0-9]+/)
        //h = h >>> 3

        // Using (hash mod _range) also seems to counter it, esp for small _range
        h = h % this._range

        return this._absearch(this._keys, h)
    },

    // 24-bit PJW string hash variant, see https://en.wikipedia.org/wiki/PJW_hash_function
    // pjw seems to work better than crc24 for the test cases in the unit tests
    _hash:
    function _pjwHash(s) {
        var len = s.length
        var g, h = 0
        // TODO: speed up the hash computation for long strings
        // the hash does not have to be perfect, just well distributed
        for (var i=0; i<len; i++) {
            h = (h << 4) + s.charCodeAt(i)
            g = h & 0xff000000          // isolate high 4 bits and overflow
            // PJW grabs bits 28..31 and xors them into the high nybble bits 4-7
            // we grab bits 24-28 and xor them into the low nybble bits 0-3,
            // seems to result in a less poor distribution taken mod 2^N, N>3.
            if (g) {
                h &= ~g                 // clear high 4 bits
                h ^= (g >>> 24)         // xor high 4 bits into low byte
            }
        }
        // for well distributed input, h has a good distribution in the lsb`s
        // but for correlated input eg /a[0-9]+/ it is skewed and caller must fix
        // Taking h % prime seems to work well, esp for smallish primes (1009, 10007)
        // Conversely, taking h % 2^N (N>3) results in a very skewed distribution.
        return h
    },

    // 24-bit CRC hash variant, see https://www.cs.hmc.edu/~geoff/classes/hmc.cs070.200101/homework10/hashfuncs.html
    _hash2:
    function _crcHash( s ) {
        // rotate left 5 bits, xor in each new byte
        // http://www.cs.hmc.edu/~geoff/classes/hmc.cs070.200101/homework10/hashfuncs.html
        var len = s.length
        var g, h = 0
        for (var i=0; i<len; i++) {
            // 24-bit hash
            g = h & 0xf80000
            h = (((h & ~0xf80000) << 5) | (g >>> 19)) ^ s.charCodeAt(i)
        }
        return h
    },

    // binary search the sorted array for the location of the key
    // returns the index of the first value >= key, or 0 if key > max(array)
    _absearch:
    function _absearch( array, key ) {
        var i, j, mid, gap = 25, len = array.length
        for (i=0, j=len-1; j - i > gap; ) {
            mid = (i + j) >>> 1
            if (array[mid] < key) i = mid + 1
            else j = mid
        }
        // faster to linear search once the location is narrowed to gap items
        // this is the `approximate binary` in the `_absearch`
        for ( ; i<len; i++) if (array[i] >= key) return i
        return array.length === 0 ? -1 : 0
    },

    // regenerate the sorted keys array
    _buildKeys:
    function _buildKeys( ) {
        var i, j, nodeKeys, keys = new Array()
        for (i=0; i<this._nodeKeys.length; i++) {
            nodeKeys = this._nodeKeys[i]
            for (j=0; j<nodeKeys.length; j++) {
                keys.push(nodeKeys[j])
            }
        }
        // note: duplicate keys are not filtered out, but should work ok
        keys.sort(function(a,b){ return a - b })
        return this._keys = keys
    }
}

module.exports = ConsistentHash
