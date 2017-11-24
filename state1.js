demo.state1 = function() {};
var cursors, catcher, vel = 500, rocks, grass;
demo.state1.prototype = {
    preload: function(){
        game.load.tilemap('field', 'img/state1/field.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('grassTiles', 'img/state1/grassTiles.png');
        game.load.image('rockTiles', 'img/state1/rockTiles.png');
        game.load.image('catcher', 'img/catcherBig.png');
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        // Phaser plugin addons
        game.plugins.screenShake = game.plugins.add(Phaser.Plugin.ScreenShake);

        var map = game.add.tilemap('field');
        map.addTilesetImage('grassTiles');
        map.addTilesetImage('rockTiles');

        grass = map.createLayer('grass');
        rocks = map.createLayer('rocks');

        map.setCollisionBetween(1, 9, true, 'rocks');
        map.setCollision(11, true, 'grass');


        catcher = game.add.sprite(300, 200, 'catcher');
        game.physics.enable(catcher);
        catcher.anchor.setTo(0.5, 0.5);
        catcher.scale.setTo(0.4, 0.4);

        cursors = game.input.keyboard.createCursorKeys();
    },
    update: function(){
        game.physics.arcade.collide(catcher, grass);
        game.physics.arcade.collide(catcher, rocks);

        if (cursors.up.isDown) {
            catcher.body.velocity.y = -vel;

            // Changing default screenShake settings
            game.plugins.screenShake.setup({
                shakeX: true,
                shakeY: true
            });

            //Triggering a screenshake
            game.plugins.screenShake.shake(7);
        } else if (cursors.down.isDown) {
            catcher.body.velocity.y = vel;
        }
        else {
            catcher.body.velocity.y = 0;
        }
        if (cursors.left.isDown) {
            catcher.body.velocity.x = -vel;
        } else if (cursors.right.isDown) {
            catcher.body.velocity.x = vel;
        }
        else {
            catcher.body.velocity.x = 0;
        }
    }
};
