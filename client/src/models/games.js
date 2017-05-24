var Game = require('./game');

var Games = function() {

}

Games.prototype = {

  makeRequest: function ( url, callback ){
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('load', function(){
      if (request.status !== 200) return;
      var jsonString = request.responseText;
      var resultsObject = JSON.parse(jsonString);
      callback(resultsObject);
    });
    request.send();
  },

  makePostRequest: function(url, callback, payload){
    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.setRequestHeader('Content-Type', 'application/json');
    request.addEventListener('load', function (){
      if (request.status !== 200) return;
      var jsonString = request.responseText;
      var resultsObject = JSON.parse(jsonString);
      callback(resultsObject);
    })
    request.send(payload);
  },

  all: function(callback){
    this.makeRequest('http://localhost:3000/api/games', function(results){
      var games = this.populateGames(results)
      console.log(results);
      console.log(games);
      callback(games)
    }.bind(this));
  },

//THE DATA BASE CAN'T STORE METHODS SO WE CHANGE THEM BACK TO FILM OBJECTS. NOW WE CAN ACCESS OUR METHODS AGAIN LIKE ADD REVIEW.
  populateGames: function( results ){
    var games = results.map( function(resultObj) {
      return new Game( resultObj )
    });
    return games
  },

  // add: function(newGame, callback){
  //   console.log("adding Game!");
  //   var filmData = JSON.stringify(newFilm);
  //   this.makePostRequest('http://localhost:3000/api/films', callback, filmData);
  // }

};

module.exports = Games;
