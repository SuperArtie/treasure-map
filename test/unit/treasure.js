/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Treasure  = require('../../app/models/treasure'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'treasure-map-test';

describe('Treasure', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Treasure object', function(){
      var o = {name:['diamond'], hints:['it\'s around the waterfall', 'it\'s not a diamond', 'i love you'], tags:['indiana jones, blood moon, gold rock'], order:['1'], diff:['2'], loc:['brazil', '2', '3'], photos:['0.jpg', '1.png', '2.gif']};
      var t = new Treasure(o);
      expect(t).to.be.instanceof(Treasure);
      expect(t.hints.length).to.equal(3);
    });
  });

  describe('.findById', function(){
    it('should find treasure by _id', function(done){
      Treasure.findById('000000000000000000000001', function(err, treasure){
        expect(treasure.hints.length).to.equal(3);
        console.log(treasure);
        done();
      });
    });
  });

  describe('.all', function(){
    it('should get all treasure', function(done){
      Treasure.all(function(err, treasures){
        expect(treasures).to.have.length(3);
        done();
      });
    });
  });

  describe('.found', function(){
    it('should find treasure', function(done){
      Treasure.found('000000000000000000000003', function(err, treasure){
        expect(treasure.isFound).to.equal.true;
        done();
      });
    });
  });
});

