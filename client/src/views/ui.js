var Games = require('../models/games');

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
