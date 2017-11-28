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
    },
    create: function() {
        // Physics
        game.physics.enable(ship, Phaser.Physics.ARCADE);
        game.physics.enable(asteroids, Phaser.Physics.ARCADE);

        game.stage.backgroundColor = '#142337';

        // Sprites
        // ship = game.add.sprite(game.width/2, game.height/2, 'ship');
        // Game world has center attribues and theyre
        // faster than calculating width/height
        ship = game.add.sprite(game.world.centerX, game.world.centerY, 'ship');
        ship.scale.set(0.3, 0.3);
        ship.anchor.set(0.5, 0.5);

        for (let i = 0; i < 10; i++) {
            asteroids[i] = game.add.sprite(0, 0, asteroidsSprite[Math.floor(Math.random() * 2)]);
            asteroids[i].position = new Phaser.Point(game.rnd.frac() * 800,
                                                    game.rnd.frac() * 600);
            asteroids[i].scale.set(0.2, 0.2);
            asteroids[i].anchor.set(0.5, 0.5);
        }

        for (i = 0; i < 10; i++) {
            let accelerate = new Phaser.Point(75, 0);
            accelerate = (Phaser.Point.rotate(accelerate, 0, 0, ship.angle, true));
            ship.body.acceleration = accelerate;
        }

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
    },
    update: function() {
        // Rotation of ship
        if (rotateLeftButton.isDown) {
            ship.angle -= 4;
        } else if (rotateRightButton.isDown) {
            ship.angle += 4;
        }

        if (accelerateButton.isDown) {
            // Create a new acceleration point and set it to the ship
            let accelerate = new Phaser.Point(100, 0);
            accelerate = Phaser.Point.rotate(accelerate, 0, 0, ship.angle, );
            ship.body.acceleration = accelerate;
        } else {
            ship.body.accelerate = new.Phaser.Point(0, 0);
        }

        // Shoot
        if (shootButton.isDown) {
            weapon.fireAngle = ship.angle;
            let bullet = weapon.fire();
        }

        // Check bullet collision
        // game.physics.arcade.overlap(weapon.bullets, asteroids, onBulletHit);
        // function onBulletHit(b, a) {
        //     b.kill();
        //     a.kill();
        // }
    }
    // onBulletHit: function(b, a) {
    //     b.kill();
    //     a.kill();
    // }
}
