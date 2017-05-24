var express = require('express');
var app = express();
var gameRouter = express.Router();
//models
//since we don't have a database we'll use our front end models at the moment
var games = require('../client/src/models/games')();
var Game = require('../client/src/models/game');

var GameQuery = require('../db/gameQuery.js')
var query = new GameQuery();

//film by id
gameRouter.get('/:id', function(req, res){
  res.json(games[req.params.id]);
});

//film index
gameRouter.get('/', function(req, res) {
  query.all(function (game){
    res.json(games);
  });
});

//film update
gameRouter.put('/:id', function(req, res) {
  var game = new Game({
    title: req.body.title,
    releaseDate: req.body.releaseDate
  });
  games[req.params.id] = game;
  res.json({data: games});
});

//add new film
gameRouter.post('/', function(req, res) {
  var game = new Game({
    title: req.body.title,
    releaseDate: req.body.releaseDate,
    genre: req.body.genre 
  });
  query.add(game, function (results){
    res.json(results)
  })
  // res.json({data: films});
});

//delete film
gameRouter.delete('/:id', function(req, res) {
  games.splice(req.params.id, 1);
  res.json({data: games});
});

// //add review
// gameRouter.post('/:id/reviews', function(req, res) {
//   var game = games[req.params.id];
//   var review1 = new Review({
//     comment: "Amaze",
//     rating: 10,
//     author: "Val"
//   });
//   film.addReview(review1);
//   res.json({data: films});
// });


module.exports = gameRouter;
