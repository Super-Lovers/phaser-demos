demo.state5 = function() {};
let accel = 400, platform, platformGroup;
demo.state5.prototype = {
    preload: function(){
        game.load.image('platform', 'img/state5/platform.png');
        game.load.image('catcher', 'img/catcherBig.png');
    },
    create: function(){
        game.stage.backgroundColor = '#dddddd';
        console.log('You are in state five');

        catcher = game.add.sprite(game.width / 2, 500, 'catcher');
        platform = game.add.sprite(0, 800, 'platform');
        platformGroup = game.add.group();
        platformGroup.create(650, 400, 'platform');
        platformGroup.create(1300, 400, 'platform');

        game.physics.enable([catcher, platform, platformGroup]);

        catcher.body.gravity.y = 500;
        catcher.body.bounce.y = 0.3;
        catcher.body.drag.x = 400;
        catcher.body.collideWorldBounds = true;
        platform.body.immovable = true;
        platformGroup.setAll('body.immovable', true);
    },
    update: function(){
        game.physics.arcade.collide(catcher, [platform, platformGroup]);
        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            catcher.body.acceleration.x = -accel;
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            catcher.body.acceleration.x = accel;
        } else {
            catcher.body.acceleration.x = 0;
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            catcher.body.velocity.y = -300;
        }
    }
};
