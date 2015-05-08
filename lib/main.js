(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

    Asteroids.MainGame = ex.Scene.extend({

      onActivate: function () {
        Asteroids.DIFFICULTY_SPEED_INCREASE = 0;
        this.asteroidCount = 0;

        Asteroids.score = 0;
        this.score = new ex.Label("Score: ", 10, 20, '18px Arial');
        this.score.color = ex.Color.White;
        this.addChild(this.score);

        for (var i = 0; i < Asteroids.NUM_ASTEROIDS; i++) {
          Asteroids.addAsteroid(Asteroids.game, this, true);
          this.asteroidCount += 1;
        }
        Asteroids.addAsteroidsShip(Asteroids.game, this);
        new Asteroids.Exo(Asteroids.game, this);
        this.nextExo = setTimeout(function () {
          new Asteroids.Exo(Asteroids.game, this);
        }.bind(this), 25000);
      },

      onDeactivate: function () {
        this.children.forEach(function (child) {
          this.removeChild(child);
        }.bind(this));
        this.removeChild(this.score);

        clearTimeout(this.nextExo);
      },

      update: function (engine, delta) {
        ex.Scene.prototype.update.apply(this, [engine, delta]);

        this.score.text = "Score: " + Asteroids.score;

        if (Asteroids.DIFFICULTY_SPEED_INCREASE < Asteroids.MAX_DIFFICULTY) {
          Asteroids.DIFFICULTY_SPEED_INCREASE += 1/delta;
        }

        while(this.asteroidCount < Asteroids.NUM_ASTEROIDS) {
          setTimeout(function () {
            Asteroids.addAsteroid(Asteroids.game, this, false);
          }.bind(this), 1000);
          this.asteroidCount += 1;
        }
      },

  });

})();
