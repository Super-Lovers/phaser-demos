demo.pong = function() {};
var ball, player1, player2, cursors;
// Movement variables
var player1Up, player1Down, player2Up, player1Down;
// Ball variables
var ballSpeedX = 4, ballSpeedY = 3;
demo.pong.prototype = {
    preload: function(){
        game.load.image('paddle', 'img/pong/paddle.png');
        game.load.image('ball', 'img/pong/ball.png');
    },
    create: function(){
        // game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#ffffff';
        ball = game.add.sprite(game.width/2, game.height/2, 'ball');

        player1 = game.add.sprite(50, game.height/2,'paddle');
        player1.anchor.set(0.5,0.5);
        player1.angle = 90;

        player2 = game.add.sprite(game.width - 50, game.height/2,'paddle');
        player2.anchor.set(0.5,0.5);
        player2.angle = 90;

        ball.anchor.set(0.5 ,0.5);

        // Assigning the key values for each player
        player1Up = game.input.keyboard.addKey(Phaser.Keyboard.W);
        player1Down = game.input.keyboard.addKey(Phaser.Keyboard.S);

        player2Up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        player2Down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);

        // You can also group them with brackets like an array
        // and afterwards enable physics
        game.physics.enable([player1, player2, ball], Phaser.Physics.ARCADE);
    },
    update: function(){
        // Default ball movement
        ball.x += ballSpeedX;
        ball.y += ballSpeedY;

        // Applying movement and preventing the players from leaving the world boundaries
        if (player1Up.isDown && player1.y > 30) {
            player1.y -= 5;
        } else if (player1Down.isDown && player1.y < game.height - 30) {
            player1.y += 5;
        }

        if (player2Up.isDown && player2.y > 30) {
            player2.y -= 5;
        } else if (player2Down.isDown && player2.y < game.height - 30) {
            player2.y += 5;
        }

        // Ball conditions
        if (ball.x > game.width || ball.x < 0) {
            ballSpeedX = -ballSpeedX;
        } else if (ball.y > game.height || ball.y < 0) {
            ballSpeedY = -ballSpeedY;
        }

        // Collision detection between ball and players
        if (game.physics.arcade.overlap(ball, player1) && ballSpeedX < 0) {
            ballSpeedX = -ballSpeedX;
        } else if (game.physics.arcade.overlap(ball, player2) && ballSpeedX > 0) {
            ballSpeedX = -ballSpeedX;
        }
    }
};
