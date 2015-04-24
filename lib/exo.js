(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  //exo for Exogorth! http://starwars.wikia.com/wiki/Exogorth
  var exo = Asteroids.Exo = function (game) {
    this.segLength = 20;
    this.segments = [];
    this.head = this.setHead(game, this.segments);
    this.segDist = 6;

    this.speed = Asteroids.randomNum(200, 400);
    this.rotationSpeed = Asteroids.randomNum(0.0005, 0.01, {negative: true});

    for(var i = 1; i < this.segLength + 1; i++) {
      this.setBodySegment(game, this.segments, i);
    }
  };

  exo.prototype.setHead = function (game, segments) {
    var startX = Asteroids.randomNum(200, game.width-200);
    var startY = Asteroids.randomNum(100, game.height-100);
    head = new ex.Actor(startX, startY, 50, 50, ex.Color.White);
    head.trail = [];
    head.dx = 0;
    head.dy = 0;
    head.collisionType = ex.CollisionType.Passive;
    this.setGraphic(head, game);
    this.setHeadUpdate(head);
    segments.push(head);
    game.addChild(head);
    return head;
  };

  exo.prototype.setBodySegment = function (game, segments, segNum) {
    head = segments[0];

    seg = new ex.Actor(
      head.x,
      head.y,
      50,
      50,
      ex.Color.White
    );
    seg.trail = [];
    seg.segNum = segNum;
    seg.collisionType = ex.CollisionType.Passive;
    this.setGraphic(seg, game);
    this.setUpdate(seg);
    segments.push(seg);
    game.addChild(seg);
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

  exo.prototype.setHeadUpdate = function (actor) {
    var that = this;

    actor.update = function(engine, delta) {
      ex.Actor.prototype.update.call(this, engine, delta);
        that.updateTrail(that.head);

        this.rotation += (that.rotationSpeed * Math.PI);
        this.dx = Math.cos(this.rotation) * that.speed;
        this.dy = Math.sin(this.rotation) * that.speed;

        console.log('rotation: ' + this.rotation.toString());
        console.log('dx: ' + this.dx.toString());
        console.log('dy: ' + this.dy.toString());

    };

    // actor.dx = Math.cos(actor.rotation);
    // actor.dy = Math.sin(actor.rotation);
  };

  exo.prototype.setUpdate = function (actor) {
    var that = this;

    actor.update = function(engine, delta) {
      ex.Actor.prototype.update.call(this, engine, delta);
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
