(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  //exo for Exogorth http://starwars.wikia.com/wiki/Exogorth
  var exo = Asteroids.Exo = function (game, scene) {
    this.segLength = Asteroids.randomNum(10, 30);
    this.segments = [];
    this.segDist = 10;
    this.staggerTime = 1000;

    this.speed = Asteroids.randomNum(100, 250);
    this.rotationSpeed = Asteroids.randomNum(0.003, 0.009);

    this.head = this.setHead(game, this.segments, scene);
    for(var i = 1; i < this.segLength + 1; i++) {
      this.setBodySegment(game, this.segments, i, scene);
    }
  };

  exo.prototype.setHead = function (game, segments, scene) {
    var startX = Asteroids.randomNum(0, game.getWidth());
    var startY = -50;
    head = new ex.Actor(startX, startY, 50, 50, ex.Color.White);
    head.trail = [];
    head.dx = 0;
    head.dy = 0;
    head.staggered = false;

    this.setGraphic(head, game);
    this.setHeadUpdate(head, game);

    head.collisionType = ex.CollisionType.Fixed;
    head.addCollisionGroup('playerCollisions');
    head.addCollisionGroup('bulletAndExo');
    head.onCollidesWith('bulletAndExo', function (other) {
      game.removeChild(other);

      if (head.staggered === false) {
        head.staggered = true;
        setTimeout(function () {
          head.staggered = false;
        }, this.staggerTime);
      }
    }.bind(this));

    segments.push(head);
    scene.addChild(head);
    return head;
  };

  exo.prototype.setBodySegment = function (game, segments, segNum, scene) {
    head = segments[0];

    seg = new ex.Actor(head.x, head.y, 50, 50, ex.Color.White);
    seg.trail = [];
    seg.segNum = segNum;
    seg.collisionType = ex.CollisionType.Fixed;
    seg.addCollisionGroup('playerCollisions');
    this.setGraphic(seg, game);
    this.setUpdate(seg);
    segments.push(seg);
    scene.addChild(seg);
  };

  exo.prototype.setGraphic = function (actor, game) {
    actor.draw = function (ctx, delta) {
      ctx.fillStyle = this.color.toString();
      ctx.beginPath();
      ctx.arc((this.x+this.getWidth()/2)-15, (this.y+this.getHeight()/2)-10, 40, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    };
  };

  exo.prototype.setHeadUpdate = function (actor, game) {
    var that = this;

    actor.update = function(engine, delta) {
      ex.Actor.prototype.update.apply(this, [engine, delta]);
        that.updateTrail(that.head);

        var exoVector = this.getCenter();
        var exoDirectionX = Math.sin(this.rotation);
        var exoDirectionY = Math.cos(this.rotation);
        var perpVector = new ex.Vector(exoDirectionY, -exoDirectionX);
        var playerVector = game.mainPlayer.getCenter();
        var diffVector = playerVector.minus(exoVector);

        if ((perpVector.x * diffVector.y + perpVector.y * diffVector.x) < 0) {
          this.turning = (this.staggered ? that.rotationSpeed * Math.PI : -that.rotationSpeed * Math.PI);
        }
        else {
          this.turning = (this.staggered ? -that.rotationSpeed * Math.PI : that.rotationSpeed * Math.PI);
        }

        this.rotation += this.turning;
        this.rotation %= (Math.PI*2);

        this.dx = Math.cos(this.rotation) * that.speed;
        this.dy = Math.sin(this.rotation) * that.speed;
    };
  };

  exo.prototype.setUpdate = function (actor) {
    var that = this;

    actor.update = function(engine, delta) {
      ex.Actor.prototype.update.apply(this, [engine, delta]);
      var prevSeg = that.segments[this.segNum - 1];
      if (prevSeg.trail.length === that.segDist) {
        that.updateTrail(this);
        this.x = prevSeg.trail[0][0];
        this.y = prevSeg.trail[0][1];
      }
    };
  };

  exo.prototype.updateTrail = function (actor) {
    if (actor.trail.length >= this.segDist) {
      actor.trail.shift();
    }
    actor.trail.push([actor.x, actor.y]);
  };


})();
