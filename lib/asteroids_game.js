(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  //set up game assets & engine
  Asteroids.game = new ex.Engine();
  Asteroids.game.backgroundColor = ex.Color.Black;
  Asteroids.game.addScene('menu', startMenu(Asteroids.game));
  Asteroids.game.addScene('mainGame', new Asteroids.MainGame());
  Asteroids.game.goToScene('menu');
  Asteroids.game.start();

  function startMenu(game) {
    var menu = new ex.Scene();

    startButton = new ex.Label("Asteroids+", game.getWidth()/2 - 150, game.getHeight()/4, '72px Arial');
    startButton.color = ex.Color.White;
    startButton.on('space', function (event) {
      game.goToScene('mainGame');
    });

    startMessage = new ex.Label("Press Space to Start!", (game.getWidth()/2) - 300, game.getHeight()/2, '72px Arial');
    startMessage.color = ex.Color.White;

    menu.addChild(startButton);
    menu.addChild(startMessage);
    return menu;
  }

})();
