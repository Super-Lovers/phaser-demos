var demo = {}; // Game state constructor
var catcher;
var speed = 6;
demo.state0 = function() {}; // property method of game state constructor
demo.state0.prototype = { // sub methods of the state0 method
    preload: function(){
        // Adding images to the game RAM
        game.load.image('catcher', 'img/catcherBig.png');
        game.load.image('background', 'img/bgBig.png');
    },
    create: function(){
        // Always initialize the game physics in the first line
        game.physics.startSystem(Phaser.Physics.ARCADE);
        // Setting the boundaries of the game window so that the
        // camera knows to follow the player until they are reached
        game.world.setBounds(0, 0, 2500, 1000);

        // Applying the background color or image
        // game.stage.backgroundColor = '#dddddd';
        var bgBig = game.add.sprite(0, 0, 'background');
        console.log('You are in state zero');

        // Making the game scale to the browser window
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        // Upload the image to the canvas in the center of the game screen

        catcher = game.add.sprite(game.width / 2, game.height / 2, 'catcher');

        // Set the point of origin of the sprite in the center of it
        // so that it centers properly instead of the top left corner
        catcher.anchor.setTo(0.5, 0.5);

        // Decrease the scale of the image by 30% percent so its smaller
        catcher.scale.setTo(0.7, 0.7);

        // Enabling physics for the character and setting game boundaries
        // collision to true
        game.physics.enable(catcher);
        catcher.body.collideWorldBounds = true;

        // instruct the camera to follow the player character
        game.camera.follow(catcher);
    },
    update: function(){
        // Check if a key is pressed and if this key is the one
        // in the statement then run the code inside it
        if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            catcher.x += speed;
            catcher.scale.setTo(-0.7, 0.7);
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            catcher.x -= speed;
            catcher.scale.setTo(0.7, 0.7);
            if (catcher.x < 200) {
                catcher.x = 200;
            }
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            catcher.y -= speed;
            if (catcher.y < 125) {
                catcher.y = 125;
            }
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            catcher.y += speed;
        }
    }
};
