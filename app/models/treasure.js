'use strict';

var Mongo = require('mongodb'),
    fs    = require('fs'),
    path  = require('path');

/*****************
 * CONSTRUCTOR   *
 *****************/
function Treasure(o){
  this.name     = o.name[0];
  this.hints    = o.hints;
  this.tags     = o.tags[0].split(',');
  this.order    = o.order[0]*1;
  this.diff     = o.diff[0]*1;
  this.loc      = {};
  this.loc.name = o.loc[0];
  this.loc.lat  = o.loc[1];
  this.loc.lng  = o.loc[2];
  this.photos   = [];
  this.isFound  = false;
}

/*****************
 * GETTER        *
 *****************/
Object.defineProperty(Treasure, 'collection', {
  get: function(){return global.mongodb.collection('treasures');}
});

/******************
 * SAVE           *
 ******************/
Treasure.prototype.save = function(cb){
  Treasure.collection.save(this, cb);
};

/******************
 * CREATE         *
 ******************/
Treasure.create = function(fields, files, cb){
  var t = new Treasure(fields);
  t.save(function(){
    t.addPhoto(files, cb);
  });
};

/*****************
 * FIND ALL      *
 *****************/
Treasure.query = function(query, cb){
  var filter = query.tag ? {tags: query.tag} : {},
      sort   = {};
  if(query.sort){ sort[query.sort] = query.direction * 1; }
  Treasure.collection.find(filter).sort(sort).toArray(cb);
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

/*********************
 * ADD PHOTO         *
 *********************/
Treasure.prototype.addPhoto = function(files, cb){
  var dir   = __dirname + '/../static/img/' + this._id,
      exist = fs.existsSync(dir),
      self  = this;
  if(!exist){
    fs.mkdirSync(dir);
  }
  files.photos.forEach(function(photo){
    var ext      = path.extname(photo.path),
        relative = '/img/' + self._id + '/' + self.photos.length + ext,
        absolute = dir + '/' + self.photos.length + ext;
    fs.renameSync(photo.path, absolute);
    self.photos.push(relative);
  });
  console.log(self);
  Treasure.collection.save(self, cb);
};

/*********************
 * IS FOUND          *
 *********************/
Treasure.found = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Treasure.collection.update({_id:_id}, {$set:{isFound:true}}, cb);
};

module.exports = Treasure;
