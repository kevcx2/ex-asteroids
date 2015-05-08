(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  Asteroids.NUM_ASTEROIDS = 10;
  Asteroids.MAX_DIFFICULTY = 50;

  Asteroids.makeWrappable = function (game, actor) {
    actor.on('update', function() {
      if (actor.x > game.getWidth()) {
        actor.x = 0;
      }
      else if (actor.x < (0 - actor.getWidth())) {
        actor.x = game.getWidth();
      }
      else if (actor.y > game.getHeight()) {
        actor.y = 0;
      }
      else if (actor.y < (0 - actor.getHeight())) {
        actor.y = game.getHeight();
      }
    });
  };

  Asteroids.randomNum = function (min, max, options) {
    var randSpeed = min + (Math.random() * (max - min));
    var sign = 1;
    if (options && options.negative === true) {
      if (Math.random() > 0.5) {
        sign = -1;
      }
    }
    return sign * randSpeed;
  };

})();
