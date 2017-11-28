demo.state3 = function() {};
let sound;
demo.state3 = {
    preload: function(){
        game.load.image('button1', 'img/state3/button1.png');
        game.load.image('button2', 'img/state3/button2.png');
        game.load.image('button3', 'img/state3/button3.png');
        game.load.audio('pops', 'music/sounds/buttonPops.mp3');
    },
    create: function(){
        game.stage.backgroundColor = '#0000ff';

        sound = game.add.audio('pops');
        sound.addMarker('lowPop', 0.15, 0.5); // start and end seconds of sound file
        sound.addMarker('highPop', 1.1, 1.5);

        var b1 = game.add.button(100, 100, 'button1');
        var b2 = game.add.button(400, 400, 'button2');
        var b3 = game.add.button(700, 700, 'button3');

        b1.onInputDown.add(this.tint, b1);
        b2.onInputDown.add(this.tint, b2);
        b3.onInputDown.add(this.tint, b3);

        b1.onInputUp.add(this.untint, b1);
        b2.onInputUp.add(this.untint, b2);
        b3.onInputUp.add(this.untint, b3);
    },
    tint: function() {
        this.tint = 0xbbbbbb; // Hex color for tint
        sound.play('lowPop');
    },
    untint: function() {
        this.tint = 0xFFFFFF; // Hex color for tint
        sound.play('highPop');
    },
    update: function(){}
};
