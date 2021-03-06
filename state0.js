var demo = {}; // Game state constructor
var catcher, cat, score = 0, bigBG;
var catCaught;
var speed = 6;
demo.state0 = { // sub methods of the state0 method
    preload: function(){
        // Adding images to the game RAM
        game.load.spritesheet('catcher', 'img/zombieSheet.png', 170, 276, 3);
        game.load.image('cat', 'img/catBig.png');
        game.load.image('background', 'img/bgBig.png');

        // Music
        game.load.audio('dreamCatcher', 'music/dreamcatcher.m4a');

        // Sound effects
        game.load.audio('catCaught', 'music/sounds/spoopy.ogg');
    },
    create: function(){
        // Always initialize the game physics in the first line
        game.physics.startSystem(Phaser.Physics.ARCADE);
        music = game.add.audio('dreamCatcher');
        catCaught = game.add.audio('catCaught');
        // music.play('', 0.1);
        // Setting the boundaries of the game window so that the
        // camera knows to follow the player until they are reached
        game.world.setBounds(0, 0, 2500, 1000);

        // Applying the background color or image
        // game.stage.backgroundColor = '#dddddd';
        bgBig = game.add.sprite(0, 0, 'background');
        console.log('You are in state zero');

        // Making the game scale to the browser window
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        // Upload the image to the canvas in the center of the game screen

        catcher = game.add.sprite(game.width / 2, game.height / 2, 'catcher');
        game.physics.enable(catcher);

        cat = game.add.sprite(Math.random() * game.width,
                                Math.random() * game.height, 'cat');
        game.physics.enable(cat);

        // Set the point of origin of the sprite in the center of it
        // so that it centers properly instead of the top left corner
        catcher.anchor.setTo(0.5, 0.5);

        // Decrease the scale of the image by 30% percent so its smaller
        catcher.scale.setTo(0.7, 0.7);
        cat.scale.setTo(0.6, 0.6);

        // Enabling physics for the character and setting game boundaries
        // collision to true
        catcher.body.collideWorldBounds = true;

        // Instruct the camera to follow the player character
        game.camera.follow(catcher);

        catcher.animations.add('walk');

        // Spacebar button listeners that change the speed of
        // the character when pressed down
        this.enlargeKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.enlargeKey.onDown.add(this.doSprint, this);
        this.enlargeKey.onUp.add(this.doWalk, this);
    },
    doSprint: function() {
        // catcher.scale.setTo(1.5, 0.5);
        speed = 10;
    },
    doWalk: function() {
        // catcher.scale.setTo(1.5, 0.5);
        speed = 6;
    },
    update: function(){
        // Debugging the physics bodies displays the bounding
        // box of the sprites while playing to play-testing purposes
        // game.debug.body(catcher);
        // game.debug.body(cat);

        // Check if a key is pressed and if this key is the one
        // in the statement then run the code inside it
        if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            catcher.x += speed;
            catcher.scale.setTo(0.7, 0.7);
            catcher.animations.play('walk', 5);
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            catcher.x -= speed;
            catcher.scale.setTo(-0.7, 0.7);
            if (catcher.x < 200) {
                catcher.x = 200;
            }
            catcher.animations.play('walk', 5);
        } else {
            catcher.animations.stop('walk', 5);
            catcher.frame = 1;
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            catcher.y -= speed;
            if (catcher.y < 125) {
                catcher.y = 125;
            }
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            catcher.y += speed;
        }

        // Check if the catcher and cat sprites overlap
        // and execute catCollisionHandler function
        game.physics.arcade.overlap(catcher, cat, catCollisionHandler);

        function catCollisionHandler(catcherObject, catObject) {
            catCaught.play('', 1);
            score++;
            catObject.x = Math.random() * game.width,
            catObject.y = Math.random() * game.height;

            console.log("Score: " + score);
        }
    }
};
