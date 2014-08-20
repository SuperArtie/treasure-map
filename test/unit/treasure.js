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
      var t = new Treasure('diamond', ['it\'s around the waterfall', 'it\'s not a diamond', 'i love you'], ['indiana jones', 'blood moon', 'gold rock'], '1', '2', {name:'brazil', lat:'2', lng:'3'}, ['0.jpg', '1.png', '2.gif']);
      expect(t).to.be.instanceof(Treasure);
    });
  });

  describe('.findById', function(){
    it('should find treasure by _id', function(done){
      Treasure.findById('000000000000000000000001', function(err, treasure){
        expect(treasure.hints.length).to.equal(3);
        done();
      });
    });
  });

  describe('.all', function(){
    it('should get all treasure', function(done){
      Treasure.all(function(err, treasure){
        expect(treasure).to.have.length(3);
        done();
      });
    });
  });
});

