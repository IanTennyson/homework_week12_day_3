var MongoClient = require('mongodb').MongoClient;

var GameQuery = function(){
  this.url = 'mongodb://localhost:27017/halo_games'
}

GameQuery.prototype = {

  all: function (onQueryFinished){
//THERE IS A CALLBACK BECAUSE IT WILL TAKE TIME TO GET THE INFO FROM MONGO
    MongoClient.connect(this.url, function(err, db){
      if(db) {
        console.log('db connected! Woo!');
        var collection = db.collection('films');
        //ANOTHER CALL BACK
        collection.find().toArray( function(err, docs){
          onQueryFinished(docs);
        });
      }
    });
  },

  // add: function(gameToAdd, onQueryFinished){
  //   MongoClient.connect(this.url, function(err, db){
  //     if (db) {
  //       var collection = db.collection('films');
  //       collection.insert(filmToAdd);
  //       collection.find().toArray( function(err, docs){
  //         console.log(docs);
  //         onQueryFinished(docs);
  //       });
  //     }
  //   });
  // },

};

module.exports = GameQuery;