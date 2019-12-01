'use strict';

var parse = require('../')
  , address = parse.address;

/**
 * Assertations.
 */
var chai = require('chai')
  , expect = chai.expect;

chai.Assertion.includeStack = true;

describe('connection-parse()', function () {
  var weight = 1;

  it('accepts multiple arguments', function () {
    var res = parse('1.1.1.1:1111', '11.11.11:1111');

    expect(res).to.be.a('object');
    expect(res.servers).to.be.a('array');
    expect(res.regular).to.be.a('array');

    Object.keys(res.weights).forEach(function (server) {
      expect(res.weights[server]).to.equal(weight);
    });

    res.servers.forEach(function (server) {
      expect(server.host).to.be.a('string');
      expect(server.port).to.be.a('number');
      expect(server.string).to.be.a('string');
      expect(server.weight).to.equal(weight);
    });

    res.regular.forEach(function (server) {
      expect(server).to.be.a('string');
    });
  });

  it('accepts an array', function () {
    var res = parse(['1.1.1.1:1111', '11.11.11:1111']);

    expect(res).to.be.a('object');
    expect(res.servers).to.be.a('array');
    expect(res.regular).to.be.a('array');

    Object.keys(res.weights).forEach(function (server) {
      expect(res.weights[server]).to.equal(weight);
    });

    res.servers.forEach(function (server) {
      expect(server.host).to.be.a('string');
      expect(server.port).to.be.a('number');
      expect(server.string).to.be.a('string');
      expect(server.weight).to.equal(weight);
    });

    res.regular.forEach(function (server) {
      expect(server).to.be.a('string');
    });
  });

  it('accepts an object', function () {
    var res = parse({ '1.1.1.1:1111': 100 });

    expect(res).to.be.a('object');
    expect(res.servers).to.be.a('array');
    expect(res.regular).to.be.a('array');
    expect(res.weights).to.be.a('object');

    Object.keys(res.weights).forEach(function (server) {
      expect(server).to.equal('1.1.1.1:1111');
      expect(res.weights[server]).to.equal(100);
    });

    res.servers.forEach(function (server) {
      expect(server.host).to.be.a('string');
      expect(server.port).to.be.a('number');
      expect(server.string).to.be.a('string');
      expect(server.weight).to.equal(100);
    });

    res.regular.forEach(function (server) {
      expect(server).to.be.a('string');
    });
  });

  it('accepts an object in a object', function () {
    var res = parse({ '1.1.1.1:1111': { weight: 100 }});

    expect(res).to.be.a('object');
    expect(res.servers).to.be.a('array');
    expect(res.regular).to.be.a('array');
    expect(res.weights).to.be.a('object');

    Object.keys(res.weights).forEach(function (server) {
      expect(server).to.equal('1.1.1.1:1111');
      expect(res.weights[server]).to.equal(100);
    });

    res.servers.forEach(function (server) {
      expect(server.host).to.be.a('string');
      expect(server.port).to.be.a('number');
      expect(server.string).to.be.a('string');
      expect(server.weight).to.equal(100);
    });

    res.regular.forEach(function (server) {
      expect(server).to.be.a('string');
    });

    res = parse({ '1.1.1.1:1111': { foo: 100 }});
    res.servers.forEach(function (server) {
      expect(server.weight).to.equal(weight);
    });
  });

  it('accepts an string', function () {
    var res = parse('1.1.1.1:1111');

    expect(res).to.be.a('object');
    expect(res.servers).to.be.a('array');
    expect(res.regular).to.be.a('array');

    Object.keys(res.weights).forEach(function (server) {
      expect(res.weights[server]).to.equal(weight);
    });

    res.servers.forEach(function (server) {
      expect(server.port).to.equal(1111);
      expect(server.string).to.equal('1.1.1.1:1111');
      expect(server.host).to.equal('1.1.1.1');
      expect(server.weight).to.equal(weight);
    });

    res.regular.forEach(function (server) {
      expect(server).to.equal('1.1.1.1:1111');
    });
  });

  it('allows custom parsers', function () {
    parse.extension('vnode', function (data) {
      data.vnode = 11;
    });

    var res = parse('1.1.1.1:1111');

    Object.keys(res.vnode).forEach(function (server) {
      expect(res.vnode[server]).to.equal(11);
    });

    res.servers.forEach(function (server) {
      expect(server.port).to.equal(1111);
      expect(server.string).to.equal('1.1.1.1:1111');
      expect(server.host).to.equal('1.1.1.1');
      expect(server.weight).to.equal(weight);
      expect(server.vnode).to.equal(11);
    });
  });

  it('does not die when you parse nothing', function () {
    var res = parse();

    expect(res.servers).to.have.lengthOf(0);
  });
});
