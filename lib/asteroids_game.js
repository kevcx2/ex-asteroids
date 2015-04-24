(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var NUM_ASTEROIDS = 10;

  //set up game assets & engine
  Asteroids.game = new ex.Engine();
  Asteroids.game.backgroundColor = ex.Color.Black;

  for (var i = 0; i < NUM_ASTEROIDS; i++) {
  Asteroids.addAsteroid(Asteroids.game);
  }

  Asteroids.addAsteroidsShip(Asteroids.game);
  // Asteroids.addExo(Asteroids.game);
  new Asteroids.Exo(Asteroids.game);

  Asteroids.game.start();
})();
