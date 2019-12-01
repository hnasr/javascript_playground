'use strict';

/**
 * Benchmark dependencies.
 */
var benchmark = require('benchmark');

/**
 * Different hashring drivers.
 */
var HashRing = require('../')
//  , Hash_ring = require('hash_ring')
  , nodes = {'192.168.0.102:11212': 1, '192.168.0.103:11212': 1, '192.168.0.104:11212': 1};

/**
 * Logger.
 */
var logger = new(require('devnull'))({ timestamp: false, namespacing: 0 });

/**
 * prebuild hashrings.
 */
var ring1 = new HashRing(nodes);
  //, ring2 = new Hash_ring(nodes);

/**
 * Benchmark the constructing and generating of a hashring.
 */
(
  new benchmark.Suite()
).add('hashring', function(){
  var r = new HashRing(nodes);
//}).add('hash_ring', function(){
//  var r = new Hash_ring(nodes);
}).on('cycle', function cycle(e) {
  var details = e.target;

  logger.log('Finished benchmarking: "%s"', details.name);
  logger.metric('Count (%d), Cycles (%d), Elapsed (%d), Hz (%d)'
    , details.count
    , details.cycles
    , details.times.elapsed
    , details.hz
  );
}).on('complete', function completed() {
  logger.info('Benchmark: "%s" is was the fastest.'
    , this.filter('fastest').pluck('name')
  );
}).run();

(
  new benchmark.Suite()
).add('hashring', function(){
  ring1.get('key' + Math.random());
//}).add('hash_ring', function(){
//  ring2.getNode('key' + Math.random());
}).on('cycle', function cycle(e) {
  var details = e.target;

  logger.log('Finished benchmarking: "%s"', details.name);
  logger.metric('Count (%d), Cycles (%d), Elapsed (%d), Hz (%d)'
    , details.count
    , details.cycles
    , details.times.elapsed
    , details.hz
  );
}).on('complete', function completed() {
  logger.info('Benchmark: "%s" is was the fastest.'
    , this.filter('fastest').pluck('name')
  );
}).run();

(
  new benchmark.Suite()
).add('hashring', function(){
  ring1.get('key');
//}).add('hash_ring', function(){
//  ring2.getNode('key');
}).on('cycle', function cycle(e) {
  var details = e.target;

  logger.log('Finished benchmarking: "%s"', details.name);
  logger.metric('Count (%d), Cycles (%d), Elapsed (%d), Hz (%d)'
    , details.count
    , details.cycles
    , details.times.elapsed
    , details.hz
  );
}).on('complete', function completed() {
  logger.info('Benchmark: "%s" is was the fastest.'
    , this.filter('fastest').pluck('name')
  );
}).run();
