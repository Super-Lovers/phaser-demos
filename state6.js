demo.state6 = function() {};
demo.state6.prototype = {
    preload: function(){
        game.load.image('volcano', 'img/state6/volcano.png');
        game.load.image('redBall', 'img/state6/redBall.png');
        game.load.image('orBall', 'img/state6/orBall.png');
    },
    create: function(){
        game.stage.backgroundColor = '#dddddd';
        console.log('You are in state six');

        let volcano = game.add.sprite(game.width / 2, 1000, 'volcano');
        volcano.anchor.set(0.5, 1);

        let emitter = game.add.emitter(game.width/2, 500, 2000);
        emitter.makeParticles(['redBall', 'orBall'], 0, 5000, false, true);
        emitter.maxParticleSpeed.set(300, -300);
        emitter.minParticleSpeed.set(-300, -100);
        emitter.gravity = 300;

        game.time.events.add(2000, function() {
            emitter.start(false, 5000, 20);
            game.time.events.loop(500, function() {
                if (emitter.on) {
                    emitter.on = false;
                } else {
                    emitter.on = true;
                }
            });
        });
    },
    update: function(){}
};
