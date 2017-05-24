/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var UI = __webpack_require__(1);
	
	var app = function() {
	  new UI();
	}
	
	window.addEventListener('load', app);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Games = __webpack_require__(2);
	
	var UI = function() {
	  var games = new Games();
	  games.all(function(games){
	    this.render(games);
	  }.bind(this));
	
	  this.createForm();
	  
	}
	
	UI.prototype = {
	  createText: function(text, label) {
	    var p = document.createElement('p');
	    p.innerText = label + text;
	    return p;
	  },
	
	  appendText: function(element, text, label) {
	    var pTag = this.createText(text, label);
	    element.appendChild(pTag);
	  },
	
	  // createReview: function(li, review) {
	  //   this.appendText(li, review.comment, 'Comment: ');
	  //   this.appendText(li, review.rating, 'Rating: ');
	  //   this.appendText(li, review.author, 'Author: ');
	  // },
	
	  render: function(games) {
	    var container = document.getElementById('games');
	    container.innerHTML = ''
	    for (var game of games) {
	      var li = document.createElement('li');
	      this.appendText(li, game.title, 'Game: ');
	      this.appendText(li, game.releaseDate, 'Release Date: ');
	      this.appendText(li, game.genre, 'Genre: ');
	      
	      // for (var review of film.reviews){
	      //   this.createReview(li, review);
	      
	
	      container.appendChild(li);
	    }
	  },
	
	  createForm: function(){  //ADDED
	    //create the form and a div
	    var div = document.createElement('div');
	    var form = document.createElement('form');
	    var body = document.querySelector('body');
	  
	    //append input boxes to the form
	    // var titleInput = document.createElement('input');
	    // titleInput.setAttribute("name", "title");
	    // form.appendChild(titleInput);
	  
	    // var genreInput = document.createElement('input');
	    // genreInput.setAttribute("name", "genre");
	    // form.appendChild(genreInput);
	  
	    // var actorsInput = document.createElement('input');
	    // actorsInput.setAttribute("name", "actors");
	    // form.appendChild(actorsInput);
	  
	    //append a button to submit the form
	    // var button = document.createElement('button');
	    // button.type = 'submit';
	    // button.innerText = 'Add Film';
	    // form.appendChild(button);
	  
	    //add event handler to the onSubmit event of the form
	    // form.onsubmit = function(event){
	    //   event.preventDefault();
	    //   var newFilm = {
	    //     title: event.target.title.value,
	    //     genre: event.target.genre.value,
	    //     actors: event.target.actors.value.split(',')
	    //   }
	  
	    //   var games = new Games(); 
	    //   games.add(newGame, function(data){
	    //     console.log(data);
	    //     this.render(data)
	    //   }.bind(this));
	  
	    // }.bind(this)
	  
	    div.appendChild(form);
	    body.insertBefore( div, body.firstChild );
	  }
	}
	
	
	module.exports = UI;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(3);
	
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


/***/ },
/* 3 */
/***/ function(module, exports) {

	var Game = function(options) {
	  this.title = options.title;
	  this.releaseDate = options.releaseDate;
	  this.genre = options.genre;
	}
	
	// Film.prototype = {
	//   addReview: function(review) {
	//     this.reviews.push(review);
	//   }
	// }
	
	module.exports = Game;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map