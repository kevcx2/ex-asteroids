(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var SIZE = 40;
  var COLOR = ex.Color.White;
  var MIN_SPEED = 15;
  var MAX_SPEED = 20;
  var MAX_ROTATION = 2.5;
  var MIN_SIZE = 0;
  var MAX_SIZE = 0;

  Asteroids.addAsteroid = function (game, scene, initialState) {
    var asteroid = new ex.Actor(0, 0, SIZE, SIZE, COLOR);
    randomizeStart(game, asteroid, initialState);
    defineAsteroidGraphics(asteroid);
    Asteroids.makeWrappable(game, asteroid);
    asteroid.collisionType = ex.CollisionType.Elastic;
    asteroid.addCollisionGroup('bulletsAndAsteroids');
    asteroid.addCollisionGroup('playerCollisions');
    scene.addChild(asteroid);
  };

  function defineAsteroidGraphics(asteroid) {
    var asteroidPolyPoints = genRandomAsteroid(asteroid);

    var asteroidPoly = new ex.Polygon(asteroidPolyPoints);
    asteroidPoly.lineColor = ex.Color.White;
    asteroidPoly.lineWidth = 1;
    rotationAxis = new ex.Point(-(asteroid.getWidth()/2),-(asteroid.getHeight()/2));
    asteroidPoly.transformAboutPoint(rotationAxis);
    asteroidPoly.setRotation = 0.1 * Math.PI;
    asteroid.addDrawing('asteroidPoly',asteroidPoly);
    asteroid.setDrawing('asteroidPoly');
  }

  function randomizeStart(game, asteroid, initialState) {
    if (initialState === true) {
      if (Asteroids.randomNum(0,2) > 1) {
        asteroid.x = Asteroids.randomNum(0, 0.3 * game.getWidth());
      }
      else {
        asteroid.x = Asteroids.randomNum(0.6 * game.getWidth(), game.getWidth());
      }
      if (Asteroids.randomNum(0,2) > 1) {
        asteroid.y = Asteroids.randomNum(0, 0.3 * game.getHeight());
      }
      else {
        asteroid.y = Asteroids.randomNum(0.3 * game.getHeight(), game.getHeight());
      }
      asteroid.dx = Asteroids.randomNum(MIN_SPEED, MAX_SPEED, {negative: true});
      asteroid.dy = Asteroids.randomNum(MIN_SPEED, MAX_SPEED, {negative: true});
    }
    else {
      if (Asteroids.randomNum(0,2) > 1) {
        asteroid.x = Math.random()  * game.getWidth();
        if (Asteroids.randomNum(0,2) > 1) {
          asteroid.y = 0;
        }
        else {
          asteroid.y = game.getHeight();
        }
      }
      else {
        asteroid.y = Math.random()  * game.getHeight();
        if (Asteroids.randomNum(0,2) > 1) {
          asteroid.x = 0;
        }
        else {
          asteroid.x = game.getWidth();
        }
      }
    }
    asteroid.dx = Asteroids.randomNum(
      MIN_SPEED,
      MAX_SPEED + Asteroids.DIFFICULTY_SPEED_INCREASE,
      {negative: true}
    );
    asteroid.dy = Asteroids.randomNum(
      MIN_SPEED,
      MAX_SPEED + Asteroids.DIFFICULTY_SPEED_INCREASE,
      {negative: true}
    );
  }

  function genRandomAsteroid(asteroid) {
    w = asteroid.getWidth();
    h = asteroid.getHeight();
    var points = [];
    var exPoints = [];

    //debug bounding box
    // points.push([0, 0]);
    // points.push([w, 0]);
    // points.push([w, h]);
    // points.push([0, h]);
    // points.push([0, 0]);

    //set points ranomly within bounding 'zones' this makes a random asteroid-like shape;
    points.push([getRandomInt(0,      w*0.25),  getRandomInt(0, h*0.25) - 10]);
    points.push([getRandomInt(w*0.25, w*0.5),  getRandomInt(0,  h*0.25) - 10]);
    points.push([getRandomInt(w*0.5,  w*0.75), getRandomInt(0,  h*0.25) - 10]);
    points.push([getRandomInt(w*0.75, w) + 10,      getRandomInt(0,  h*0.25)]);

    points.push([getRandomInt(w*0.75, w) + 10, getRandomInt(h*0.25, h*0.5)]);
    points.push([getRandomInt(w*0.75, w) + 10, getRandomInt(h*0.5,  h*0.75)]);

    points.push([getRandomInt(w*0.75, w),      getRandomInt(h*0.75, h) + 10]);
    points.push([getRandomInt(w*0.5,  w*0.75), getRandomInt(h*0.75, h) + 10]);
    points.push([getRandomInt(w*0.25, w*0.5),  getRandomInt(h*0.75, h) + 10]);
    points.push([getRandomInt(0,      w*0.25) - 10, getRandomInt(h*0.75, h)]);

    points.push([getRandomInt(0,     w*0.25) - 10, getRandomInt(h*0.5,  h*0.75)]);
    points.push([getRandomInt(0,     w*0.25) - 10, getRandomInt(h*0.25, h*0.5)]);

    for (var i = 0; i < points.length; i ++) {
      var newPoint = new ex.Point(points[i][0] + 15, points[i][1] + 15);
      exPoints.push(newPoint);
    }
    return exPoints;
}

  function getRandomInt(min, max) {
  return Math.random() * (max - min) + min;
}

})();
