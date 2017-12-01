demo.rain = function() {};
let rain, ground;
demo.rain = {
    preload: function() {
        game.load.image('raindrop', 'img/rain/rain.png');
        game.load.image('ground', 'img/rain/ground.png');
    },
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        ground = game.add.sprite(200, 400, 'ground');
        rain = game.add.sprite(200, 10, 'raindrop');
        game.physics.enable([ground, rain], Phaser.Physics.ARCADE);
        rain.body.velocity.y = 600;

        ground.body.immovable = true;

        // Prevent the ground from being applied velocity
    },
    update: function() {
        game.physics.arcade.collide(ground, rain, function(obj1, obj2) {
            obj2.kill();
        });
    }
}
