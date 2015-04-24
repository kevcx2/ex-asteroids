(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  //set thrust & rotation speed (* PI)
  var THRUST = 5;
  var ROTATION_SPEED = 0.06;
  Asteroids.RELOADED = true;
  var PARTICLE_SPEED = 250;
  var SPEED = 0;

  Asteroids.addAsteroidsShip = function (game) {
    //initialize ship actor, add to game
    var ship = new ex.Actor(game.getWidth()/2 - 10, game.getHeight()/2 - 10, 25, 20, ex.Color.White);
    defineShipGraphic(ship);
    defineShipMovement(game, ship);
    Asteroids.makeWrappable(game, ship);
    attachShooter(game, ship);
    attachParticleEmitter(game, ship);
    game.addChild(ship);
  };

  function defineShipGraphic(ship) {
    var shipPolyPoints = [
      new ex.Point(0, 0),
      new ex.Point(ship.getWidth(), ship.getHeight()/2),
      new ex.Point(0, ship.getHeight())
    ];

    var shipPoly = new ex.Polygon(shipPolyPoints);
    shipPoly.lineColor = ex.Color.White;
    shipPoly.lineWidth = 2;
    rotationAxis = new ex.Point(-(ship.getWidth()/3),-(ship.getHeight()/2));
    shipPoly.transformAboutPoint(rotationAxis);
    ship.addDrawing('shipPoly',shipPoly);
    ship.setDrawing('shipPoly');
  }

  function defineShipMovement(game, ship) {

    ship.on('up', function () {
      ship.dx += Math.cos(ship.rotation) * THRUST;
      ship.dy += Math.sin(ship.rotation) * THRUST;
      SPEED = Math.sqrt( (ship.dx-=0)*ship.dx + (ship.dy-=0)*ship.dy );
      // console.log(SPEED);
    }.bind(ship));

    game.on('right', function () {
      ship.rotation += ROTATION_SPEED * Math.PI;
      // console.log(ship.rotation % 2*Math.PI);
    }.bind(ship));

    game.on('left', function () {
      ship.rotation -= ROTATION_SPEED * Math.PI;
      // console.log(ship.rotation % 2*Math.PI);
    }.bind(ship));

  }

  function attachShooter(game, ship) {
    game.on('space', function (ev) {
      var shipHolder = ship;
      var gameHolder = game;
      if (Asteroids.RELOADED === true) {
        ev.target.addChild(Asteroids.newBullet(ev.target, ship));
        Asteroids.RELOADED = false;
        setTimeout( function (){
          Asteroids.RELOADED = true;
        }, 100);
      }
    }.bind(ship));
  }

  function attachParticleEmitter(game, ship) {
    var particle = new ex.ParticleEmitter(ship.x, ship.y, 1, 1);
    particle.isEmitting = false;
    particle.minAngle = 0;
    particle.maxAngle = 2 * Math.PI;
    particle.acceleration = new ex.Vector(1,1);
    particle.endColor = ex.Color.Orange;
    particle.particleLife = 150;
    particle.fadeFlag = true;
    // particle.emitRate = 5000;

    game.addChild(particle);

    ship.on('up', function (ev) {
      particleRange = 0.08 * Math.PI;
      particle.minVel = 100 + SPEED;
      particle.maxVel = 100 + SPEED;
      particle.particleLife = 100 + (Math.random() * 75);
      particle.minAngle = ((ev.target.rotation + Math.PI) % (2*Math.PI)) - particleRange;
      particle.maxAngle = ((ev.target.rotation + Math.PI) % (2*Math.PI)) + particleRange;
      particle.x = ev.target.x;
      particle.y = ev.target.y;
      particle.emit(15);
    }.bind(particle));
  }


})();
