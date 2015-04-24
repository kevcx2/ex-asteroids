(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var SIZE = 40;
  var COLOR = ex.Color.White;
  var MAX_SPEED = 20;
  var MAX_ROTATION = 2.5;

  Asteroids.addAsteroid = function (game) {
    var asteroid = new ex.Actor(0, 0, SIZE, SIZE, COLOR);
    randomizeStart(game, asteroid);
    defineAsteroidGraphics(asteroid);
    Asteroids.makeWrappable(game, asteroid);
    asteroid.collisionType = ex.CollisionType.Elastic;
    asteroid.addCollisionGroup('bulletsAndAsteroids');
    game.addChild(asteroid);
  };

  function defineAsteroidGraphics(asteroid) {
    var asteroidPolyPoints = genRandomAsteroid(asteroid);

    var asteroidPoly = new ex.Polygon(asteroidPolyPoints);
    asteroidPoly.lineColor = ex.Color.White;
    asteroidPoly.lineWidth = 1;
    rotationAxis = new ex.Point(-(asteroid.getWidth()/2),-(asteroid.getHeight()/2));
    asteroidPoly.transformAboutPoint(rotationAxis);
    asteroid.addDrawing('asteroidPoly',asteroidPoly);
    asteroid.setDrawing('asteroidPoly');
  }

  function randomizeStart(game, asteroid) {
    asteroid.x = Math.random()  * game.getWidth();
    asteroid.y = Math.random()  * game.getHeight();
    asteroid.dx = Math.random() * MAX_SPEED;
    asteroid.dy = Math.random() * MAX_SPEED;


    if (Math.random() > 0.5) {
      asteroid.rx = Math.random() * MAX_ROTATION;
    }
    else {
      asteroid.rx = Math.random() * -MAX_ROTATION;
    }
  }

  function genRandomAsteroid(asteroid) {
    w = asteroid.getWidth();
    h = asteroid.getHeight();
    var points = [];
    var exPoints = [];

    points.push([getRandomInt(0,      w*0.25),  getRandomInt(0, h*0.25)]);
    points.push([getRandomInt(w*0.25, w*0.5),  getRandomInt(0,  h*0.25)]);
    points.push([getRandomInt(w*0.5,  w*0.75), getRandomInt(0,  h*0.25)]);
    points.push([getRandomInt(w*0.75, w),      getRandomInt(0,  h*0.25)]);

    points.push([getRandomInt(w*0.75, w), getRandomInt(h*0.25, h*0.5)]);
    points.push([getRandomInt(w*0.75, w), getRandomInt(h*0.5,  h*0.75)]);

    points.push([getRandomInt(w*0.75, w),      getRandomInt(h*0.75, h)]);
    points.push([getRandomInt(w*0.5,  w*0.75), getRandomInt(h*0.75, h)]);
    points.push([getRandomInt(w*0.25, w*0.5),  getRandomInt(h*0.75, h)]);
    points.push([getRandomInt(0,      w*0.25), getRandomInt(h*0.75, h)]);

    points.push([getRandomInt(0,     w*0.25), getRandomInt(h*0.5,  h*0.75)]);
    points.push([getRandomInt(0,     w*0.25), getRandomInt(h*0.25, h*0.5)]);

    for (var i = 0; i < 12; i ++) {
      var newPoint = new ex.Point(points[i][0], points[i][1]);
      exPoints.push(newPoint);
    }

    return exPoints;
}

  function getRandomInt(min, max) {
  return Math.random() * (max - min) + min;
}

})();
