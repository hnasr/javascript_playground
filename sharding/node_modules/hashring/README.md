# HashRing

The HashRing module provides consistent hashing that is compatible with the
original libketama library that was developed at last.fm. In addition to beeing
compatible with `libketama` it's also compatible with the `hash_ring` module for
Python. See the compatiblity section of the API for more details on this.

### Build status

[![BuildStatus](https://secure.travis-ci.org/3rd-Eden/node-hashring.png?branch=master)](http://travis-ci.org/3rd-Eden/node-hashring)

## Installation

The advised installation of module is done through the Node package manager (npm).

```
npm install hashring --save
```

The `--save` parameter tells npm that it should automatically add the module to
the `dependencies` field in your package.json.

## Usage

```js
var HashRing = require('hashring');
```

The HashRing constructor is designed to handle different argument types as a
consistent hash ring can be use for different use cases. You can supply the
constructor with:

#### String

A single server, possible, but pointless in most cases if you only use one
server, then done use the HashRing at all, it only adds overhead.

```js
var ring = new HashRing('127.0.0.1:11211');
```

#### Array

Multiple servers for the HashRing.

```js
var ring = new HashRing(['127.0.0.1:11211', '127.0.0.2:11211']);
```

#### Object

An Object where the keys of the Object are the servers and the value can be a
`Number` and it will be seen as weight for server. The value can also be an
Object. Where the key can be a weight or a vnode.

Weights or vnodes are used to give servers a bigger distribution in the
HashRing. For example you have 3 servers where you want to distribute your keys
over but not all servers are equal in capacity as 2 of those machines have 200mb
of memory and the other has 3.2 gig of memory. The last server is substantially
bigger and there for should receive a greater distrubtion in the ring.

For a rule of thumb use the amount of memory as weight:

```js
var HashRing = require('hashring');

var ring = new HashRing({
  '127.0.0.1:11211': 200,
  '127.0.0.2:11211': { weight: 200 }, // same as above
  '127.0.0.3:11211': 3200
});
```

If you want create a server with multiple vnodes (virtual nodes):

```js
var HashRing = require('hashring');

var ring = new HashRing({
  '127.0.0.1:11211': { vnodes: 50 },
  '127.0.0.2:11211': { vnodes: 200 },
  '127.0.0.3:11211': { vnodes: 100 }
});
```

### Algorithm

With the second argument you can configure the algorithm that is used to hash
the keys. It defaults to `md5` and can only contain values that are accepted in
Node's `crypto` API. Alternatively you can supply it with a function for a
custom hasher. But do note that the hashValue will be calculated on the result.

### Options

- `vnode count` The amount of virtual nodes per server, defaults to 40 as this
  generates 160 points per server as used by ketama hashing.
- `compatiblity` Allows you to force a compatibility mode of the HashRing. It
  default to ketama hash rings but if you are coming from a python world you
  might want compatibility with the `hash_ring` module. There's a small diff
  between `hash_ring` and `ketama` and that's the amount of replica's of a server.
  Ketama uses 4 and `hash_ring` uses 3. Set this to `hash_ring` if you want to
  use 3.
- `replicas` The amount of replicas per server. Defaults to 4.
- `max cache size` We use a simple LRU cache inside the module to speed up
  frequent key lookups, you can customize the amount of keys that need to be
  cached. It defaults to 5000.
- `default port` The default port number which will removed from the server
  address to provide ketama compatibility.

```js
'use strict';

// require the module, it returns a HashRing constructor
var HashRing = require('hashring');

// Setup hash rings with your servers, in this example I just assume that all
// servers are equal, and we want to bump the cache size to 10.000 items.
var ring = new HashRing([
    '127.0.0.1',
    '127.0.0.2',
    '127.0.0.3', 
    '127.0.0.4'
  ], 'md5', {
    'max cache size': 10000
  });

// Now we are going to get some a server for a key
ring.get('foo bar banana'); // returns 127.0.0.x

// Or if you might want to do some replication scheme and store/fetch data from
// multiple servers
ring.range('foo bar banana', 2).forEach(function forEach(server) {
  console.log(server); // do stuff with your server
});

// Add or remove a new a server to the ring, they accept the same arguments as
// the constructor
ring.add('127.0.0.7').remove('127.0.0.1');
```

### API's Table of Contents

- [HashRing.continuum()](#hashringcontinuum)
- [HashRing.get()](#hashringgetkey)
- [HashRing.range()](#hashringrangekey-size-unique)
- [HashRing.swap()](#hashringswapfrom-to)
- [HashRing.add()](#hashringaddserver)
- [HashRing.remove()](#hashringremoveserver)
- [HashRing.reset()](#hashringreset)
- [HashRing.end()](#hashringend)

#### HashRing.continuum()

Generates the continuum of server a.k.a as the Hash Ring based on their weights
and virtual nodes assigned.

---

#### HashRing.get(**key**)

Find the correct node for the key which is closest to the point after what the
given key hashes to.

- **key** String, Random key that needs to be searched in the hash ring

**returns:** The matching server address.

---

#### HashRing.range(**key**, **size**, **unique**)

Returns a range of servers. Could be useful for replication.

- **key** String, Random key that needs to be searched in the hash ring
- **size** Number, Amount items to be returned (maximum). Defaults to the amount
  of servers that are in the hashring.
- **unique** Boolean, Don't return duplicate servers. Defaults to true.

**returns:** The array of servers that we found.

---

#### HashRing.swap(**from*, **to**)

Hotswap identical servers with each other. This doesn't require the cache to be
completely nuked and the hash ring distribution to be re-calculated.

Please note that removing the server and a new adding server could potentially
create a different distribution.

- **from** String, The server that needs to be replaced
- **to** String. The server that replaces the server

---

#### HashRing.add(**server**)

Add a new server to ring without having to re-initialize the hashring. It
accepts the same arguments as you can use in the constructor.

- **server** Server that need to be added to the ring.

---

#### HashRing.remove(**server**)

Remove a server from the hash ring.

- **server** Server that need to be removed from the ring.

---

#### HashRing.has(**server**)

Checks if a given server exists in the hash ring.

- **server** Server for whose existence we're checking.

---

#### HashRing.reset()

Reset the HashRing and clean up it's references.

---

### HashRing.end()

Reset's the HashRing and closes the ring.

---

#### HashRing.find(**hashValue**) (private)

Finds the correct position of the given hashValue in the hashring.

- **hashValue** Number, The hashValue from the HashRing#hashValue method.

**returns:** Index of the value in the ring.

---

#### HashRing.hash(**key**) (private)

Generates the hash for the key.

- **key** String, Random key that needs to be hashed.

**returns:** The hashed valued.

---

#### HashRing.digest(**key**) (private)

Digest hash so we can make a numeric representation from the hash. So it can be
fed in to our hashValue.

- **key** String, Random key that needs to be hashed.

**returns:** An array of charCodeAt(0) converted chars.

---

#### HashRing.hashValue(**key**) (private)

Get the hashed value of the given key, it does the digesting, hashing yo.

- **key** String, Random key that needs to be hashed.

**returns:** The hash value of the key.

---

#### HashRing.points(**servers**)

Returns the points per server.

- **servers** Optional server that you want to filter for

**returns:** A Object with server -> Array of points mapping

## Upgrading from 0.0.x to 1.x.x

The 0.0.x releases had some serious flaws that causes it to be incompatible
with the 1.0.0 release. These flaws are the reason that 1.0.0 got released. They
are not backwards compatible as they change the way that keys are hashed. The
following incompatible changes have been made for the sake of consistency:

- Only accepts hashers that are build in to node (for now). As it can only
  guarantee proper hashing of values.
- The replace function was actually doing swaps of keys, so it's original
  functionality has been renamed to `swap`. The replace API is now removing the
  given server and adds it again. As this causes the servers to be properly
  re-hashed.
- The module now requires a C++ compiler to be installed on your server as
  hashing the value requires support for 64bit bitshifting and JavaScript as a
  language only supports 32bit bitshifting.
- It adds 4 replica's instead 3 for the servers. This is how libketama
  originally did it, if you want to have 3 replica's in the hash ring you can
  set the compatibility option to `hash_ring`.
- The API's have be renamed, deprecation notices are added in to place and they
  will be removed in the next minor version bump (1.1.0)
- Added human readable configuration options instead of camelcase. This
  increases readability of the module.
- CRC32 was removed as crypto engine because it was to unstable.
