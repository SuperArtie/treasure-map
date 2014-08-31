'use strict';

var Treasure = require('../models/treasure'),
    helper   = require('../helpers/helper'),
    mp       = require('multiparty');

exports.init = function(req, res){
  res.render('treasures/init');
};

exports.query = function(req, res){
  Treasure.query(req.query, function(err, treasures){
    res.render('treasures/index', {treasures:treasures, helper:helper, query:req.query});
  });
};

exports.create = function(req, res){
  var form = new mp.Form();
  form.parse(req, function(err, fields, files){
    Treasure.create(fields, files, function(){
      console.log(fields);
      console.log(files);
      res.redirect('/treasures');
    });
  });
};

exports.show = function(req, res){
  Treasure.findById(req.params.id, function(err, treasure){
    res.render('treasures/show', {treasure:treasure});
});
};

exports.found = function(req, res){
  //Treasure.findById(req.params.id, function(err, treasure){
    Treasure.found(req.params.id, function(){
      res.redirect('/treasures');
    });
  //});
};
