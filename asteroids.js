demo.asteroids = function() {};
let ship = [], weapon, beams, asteroids = [];
let asteroidsSprite = ['asteroid1', 'asteroid2', 'asteroid3'];
// Events
let shootButton, rotateLeftButton, rotateRightButton, accelerateButton;
demo.asteroids = {
    preload: function() {
        game.load.image('ship', 'img/asteroids/shipBig.png');
        game.load.image('bullets', 'img/asteroids/bulletsBig.png');
        game.load.image('asteroid1', 'img/asteroids/asteroid1Big.png');
        game.load.image('asteroid2', 'img/asteroids/asteroid2Big.png');
        game.load.image('asteroid3', 'img/asteroids/asteroid3Big.png');
        game.load.image('space', 'img/monitorBig.png')
    },
    create: function() {
        game.stage.backgroundColor = '#142337';
        background = game.add.sprite(0, 0, 'space');

        // Sprites
        // ship = game.add.sprite(game.width/2, game.height/2, 'ship');
        // Game world has center attribues and theyre
        // faster than calculating width/height
        ship = game.add.sprite(game.world.centerX, game.world.centerY, 'ship');
        ship.scale.set(0.3, 0.3);
        ship.anchor.set(0.5, 0.5);

        // Physics
        game.physics.enable(ship, Phaser.Physics.ARCADE);

        for (let i = 0; i < 10; i++) {
            asteroids[i] = game.add.sprite(0, 0, asteroidsSprite[Math.floor(Math.random() * 2)]);
            asteroids[i].position = new Phaser.Point(game.rnd.frac() * 700,
                                                    game.rnd.frac() * 500);
            asteroids[i].scale.set(0.2, 0.2);
            asteroids[i].anchor.set(0.5, 0.5);
        }

        // let screenCenter = new Phaser.Point(game.world.centerX, game.world.centerY);

        // for (var i = 0; i < 10; i++) {
        //     asteroids[i].body.velocity = Phaser.Point.subtract(screenCenter, asteroidsSprite[i].position).normalize().setMagnitude(game.rnd.frac() * 30);
        //     asteroids[i].body.angularVelocity = game.rnd.frac() * 300;
        // }

        // Movement
        shootButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        rotateLeftButton = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        rotateRightButton = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        accelerateButton = game.input.keyboard.addKey(Phaser.Keyboard.UP);

        // Create weapon and initialise its properties
        weapon = game.add.weapon(100, 'bullets');
        weapon.trackSprite(ship, 15, 0);
        weapon.bulletSpeed = 460;
        weapon.fireRate = 300;
        game.physics.enable(asteroids, Phaser.Physics.ARCADE);
    },
    update: function() {
        // change the acceleration on input
        if (accelerateButton.isDown) {
            let acceleration = new Phaser.Point(100, 0);
            acceleration = Phaser.Point.rotate(acceleration, 0, 0, ship.angle, true);
            ship.body.acceleration = acceleration;
        }
        else {
            ship.body.acceleration = new Phaser.Point(0, 0);
        }

        // rotate the ship
        if (rotateLeftButton.isDown) {
            ship.angle -= 2;
        }
        if (rotateRightButton.isDown) {
            ship.angle += 2;
        }

        // shoot
        if (shootButton.isDown && ship.visible) {
            weapon.fireAngle = ship.angle;
            var bullet = weapon.fire();
        }

        // check collision between ship and asteroids
        if (game.physics.arcade.overlap(ship, asteroids)) {
            ship.visible = false;
        }
        game.physics.arcade.overlap(weapon.bullets, asteroids, function(obj1, obj2) {
            obj1.kill();
            obj2.kill();
        });
    }
}
