describe('Hashring distributions', function () {
  "use strict";

  var Hashring = require('../')
    , assume = require('assume');

  this.timeout(60000);

  it('hashes to the exact same output as hash_ring for python', function () {
    var fixture = require('fs').readFileSync(__dirname +'/fixtures/hash_ring.txt')
                               .toString().split('\n');

    var ring = new Hashring({
        '0.0.0.1' : 1,
        '0.0.0.2' : 2,
        '0.0.0.3' : 3,
        '0.0.0.4' : 4,
        '0.0.0.5' : 5
    }, 'md5', { compatibility: 'hash_ring' });

    for (var i=0; i < 100000; i++){
      assume(i + ' ' + ring.get(i)).equals(fixture[i]);
    }
  });

  it('hashes to the exact same output as ketama for python', function () {
    var fixture = require('fs').readFileSync(__dirname +'/fixtures/ketama.txt')
                               .toString().split('\n');

    var ring = new Hashring({
        '0.0.0.1' : 1,
        '0.0.0.2' : 2,
        '0.0.0.3' : 3,
        '0.0.0.4' : 4,
        '0.0.0.5' : 5
    }, 'md5');

    for (var i=0; i < 100000; i++){
      assume(i + ' ' + ring.get(i)).equals(fixture[i]);
    }
  });

  it('hashes to the exact same output as pylibmc', function () {
    var fixture = require('fs').readFileSync(__dirname +'/fixtures/pylibmc.txt')
                               .toString().split('\n');

    var ring = new Hashring([
        '0.0.0.1:11211',
        '0.0.0.2:11211',
        '0.0.0.3',
        '0.0.0.4:11213',
        '0.0.0.5:11212'
    ], 'md5', { 'default port': 11211 });

    for (var i=0; i < 100000; i++){
      assume(i + ' ' + ring.get(i)).equals(fixture[i]);
    }
  });

  it('has an even distribution', function () {
    var iterations = 100000
      , nodes = {
            '192.168.0.102:11212': 1
          , '192.168.0.103:11212': 1
          , '192.168.0.104:11212': 1
        }
      , ring = new Hashring(nodes);

    function genCode (length) {
      length = length || 10;
      var chars = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890"
        , numChars = chars.length
        , ret = ""
        , i = 0;

      for (; i < length; i++) {
          ret += chars[parseInt(Math.random() * numChars, 10)];
      }

      return ret;
    }

    var counts = {}
      , node
      , i
      , len
      , word;

    for (i = 0, len = nodes.length; i < len; i++) {
        node = nodes[i];
        counts[node] = 0;
    }

    for (i = 0, len = iterations; i < len; i++) {
      word = genCode(10);
      node = ring.get(word);
      counts[node] = counts[node] || 0;
      counts[node]++;
    }

    var total = Object.keys(counts).reduce(function reduce (sum, node) {
      return sum += counts[node];
    }, 0.0);

    var delta = 0.05
      , lower = 1.0 / 3 - 0.05
      , upper = 1.0 / 3 + 0.05;

    for (node in counts) {
      assume(counts[node] / total).is.within(lower, upper);
    }
  });
});
