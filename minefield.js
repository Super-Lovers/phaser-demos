demo.minefield = function() {};
let plane, mines;
demo.minefield = {
    preload: function() {
        game.load.image('plane', 'img/minefield/boss1.png');
        game.load.image('mine', 'img/minefield/hotdog.png');
        game.load.image('space', 'img/monitorBig.png')
    },
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        background = game.add.sprite(0, 0, 'space');

        plane = game.add.sprite(80, 80, 'plane');
        plane.scale.set(0.6, 0.6);
        game.physics.enable(plane, Phaser.Physics.ARCADE);
        mines = game.add.group();
        mines.enableBody = true;
        mines.physicsBodyType = Phaser.Physics.ARCADE;

        for (let i = 0; i < 10; i++) {
            let mine = mines.create(game.rnd.integerInRange(100, 700),
                                    game.rnd.integerInRange(100, 500),
                                    'mine');
            mine.anchor.set(0.5, 0.5);
            mine.scale.set(0.4, 0.4);
            mine.rotation += 0.1;
        }

        plane.body.velocity.x = 10;
        plane.body.velocity.y = 10;
    },
    update: function() {
        mines.forEach(function(mine) {
            mine.rotation += 0.07;
            // game.debug.body(mine);
        });

        // game.debug.body(plane);

        game.physics.arcade.collide(plane, mines, function(obj1, obj2) {
            obj1.kill();
            obj2.kill();
        });
    }
}
