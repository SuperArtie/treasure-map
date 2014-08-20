'use strict';

function Treasure(o){
  this.name    = o.name;
  this.hints   = [];
  this.tags    = [];
  this.order   = parseInt(o.order);
  this.diff    = parseInt(o.diff);
  this.loc     = {name:o.name, lat:parseFloat(o.lat), lng:parseFloat(o.lng)};
  this.photos  = [];
  this.isFound = false;
}

Object.defineProperty(Treasure, 'collection', {
  get: function(){return global.mongodb.collection('treasures');}
});

Treasure.all = function(cb){
  Treasure.collection.find().toArray(cb);
};

module.exports = Treasure;

