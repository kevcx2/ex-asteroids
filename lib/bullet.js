(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var BULLET_SPEED = 500;

  Asteroids.newBullet = function (game, ship) {
    startX = ship.x;
    startY = ship.y;

    var bullet = new ex.Actor(startX, startY, 3, 3, ex.Color.White);

    bullet.dx = Math.cos(ship.rotation) * BULLET_SPEED + ship.dx;
    bullet.dy = Math.sin(ship.rotation) * BULLET_SPEED + ship.dy;
    bullet.rotation = ship.rotation;

    bullet.collisionType = ex.CollisionType.Passive;
    addCollision(game, bullet);
    bullet.on('update', function (ev) {
      if (ev.target.x < -1 || ev.target.x > game.getWidth() + 1) {
        game.removeChild(ev.target);
      }
      else if (ev.target.y < -1 || ev.target.y > game.getHeight() + 1) {
        game.removeChild(ev.target);
      }
    });

    return bullet;
  };

  function addCollision(game, bullet) {
    bullet.addCollisionGroup('bulletsAndAsteroids');
    bullet.onCollidesWith('bulletsAndAsteroids', function (other) {
      game.removeChild(bullet);
      game.removeChild(other);
    });
  }

})();
