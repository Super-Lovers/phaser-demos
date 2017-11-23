var demo = {};
var catcher;
var speed = 6;
demo.state0 = function() {};
demo.state0.prototype = {
    preload: function(){
        // Adding images to the game RAM
        game.load.image('catcher', 'img/catcherBig.png');
    },
    create: function(){
        game.stage.backgroundColor = '#dddddd';
        console.log('You are in state zero');

        // Making the game scale to the browser window
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        // Upload the image to the canvas in the center of the game screen

        catcher = game.add.sprite(game.width / 2, game.height / 2, 'catcher');

        // Set the point of origin of the sprite in the center of it
        // so that it centers properly instead of the top left corner
        catcher.anchor.setTo(0.5, 0.5);
    },
    update: function(){
        // Check if a key is pressed and if this key is the one
        // in the statement then run the code inside it
        if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            catcher.x += speed;
            catcher.scale.x = -1;
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            catcher.x -= speed;
            catcher.scale.x = 1;
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            catcher.y -= speed;
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            catcher.y += speed;
        }
    }
};
