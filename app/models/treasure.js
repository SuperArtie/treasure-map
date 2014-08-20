'use strict';

var Mongo = require('mongodb');

/*****************
 * CONSTRUCTOR   *
 *****************/
function Treasure(o){
  this.name    = o.name;
  this.hints   = [];
  this.tags    = o.tags;
  this.order   = parseInt(o.order);
  this.diff    = parseInt(o.diff);
  this.loc     = {name:o.name, lat:parseFloat(o.lat), lng:parseFloat(o.lng)};
  this.photos  = [];
  this.isFound = false;
}

/*****************
 * GETTER        *
 *****************/
Object.defineProperty(Treasure, 'collection', {
  get: function(){return global.mongodb.collection('treasures');}
});

/*****************
 * FIND ALL      *
 *****************/
Treasure.all = function(cb){
  Treasure.collection.find().toArray(cb);
};

/*****************
 * FIND BY ID    *
 *****************/
Treasure.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Treasure.collection.findOne({_id:_id}, function(err, treasure){
    cb(null, treasure);
  });
};

module.exports = Treasure;

