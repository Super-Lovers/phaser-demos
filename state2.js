demo.state2 = function() {};
var barrel, bullets, velocity = 1000, nextFire = 0, fireRate = 200, bullet, enemyGroup;
demo.state2.prototype = {
    preload: function(){
        game.load.image('base', 'img/state2/cannonBase.png');
        game.load.image('barrel', 'img/state2/cannonBarrel.png');
        game.load.image('bullet', 'img/state2/bullet.png');
        game.load.image('catcher', 'img/catcherBig.png');
    },
    create: function(){
        game.stage.backgroundColor = '#ffffff';
        var base = game.add.sprite(game.width/2, game.height/2, 'base');
        base.anchor.setTo(0.5);
        base.scale.setTo(0.4);

        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(50, 'bullet');
        bullets.setAll('anchor.y', 0.5);
        bullets.setAll('scale.x', 0.85);


        barrel = game.add.sprite(game.width/2, game.height/2, 'barrel');
        barrel.anchor.setTo(0.5);
        barrel.scale.setTo(0.7, 0.5);

        // If the bullets escape the game space they
        // are to be removed from RAM
        bullets.setAll('checkWorldBounds', true);
        bullets.setAll('outOfBoundsKill', true);

        enemy = game.add.sprite(50, 100, 'catcher');
        game.physics.enable(enemy);
        enemyGroup = game.add.group();
        enemyGroup.enableBody = true;
        enemyGroup.physicsBodyType = Phaser.Physics.ARCADE;

        for (var i = 0; i < 3; i++) {
            enemyGroup.create(1400, 350 * i + 100, 'catcher');
        }
        enemyGroup.setAll('anchor.x', 0.5);
        enemyGroup.setAll('anchor.y', 0.5);
        enemyGroup.setAll('scale.x', 0.5);
        enemyGroup.setAll('scale.y', 0.5);
    },
    update: function(){
        barrel.rotation = game.physics.arcade.angleToPointer(barrel);
        if (game.input.activePointer.isDown) {
            this.fire();
        }

        game.physics.arcade.overlap(bullets, enemy, this.hitEnemy);
        game.physics.arcade.overlap(bullets, enemyGroup, this.hitGroup);
    },
    fire: function() {
        if (game.time.now > nextFire) {
            // Delay in milliseconds for the player to fire
            // another bullet
            nextFire = game.time.now + fireRate;
            bullet = bullets.getFirstDead();
            bullet.reset(barrel.x, barrel.y);

            game.physics.arcade.moveToPointer(bullet, velocity);
            bullet.rotation = game.physics.arcade.angleToPointer(bullet);
        }
    },
    hitEnemy: function() {
        console.log('hit');
        enemy.kill();
        bullet.kill();
    },
    hitGroup: function(b, e) {
        b.kill();
        e.kill();
    }
};
