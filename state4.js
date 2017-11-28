demo.state4 = function() {};
let i;
demo.state4 = {
    preload: function(){
        game.load.image('catcher', 'img/catcherBig.png');
    },
    create: function(){
        c1 = game.add.sprite(50, 100, 'catcher');
        c2 = game.add.sprite(350, 100, 'catcher');
        c3 = game.add.sprite(650, 100, 'catcher');;
        c4 = game.add.sprite(950, 100, 'catcher');
        c5 = game.add.sprite(1250, 100, 'catcher');

        /* the boolean is for automatical start
            the fifth argument is the delay
            the sixth is a repeat bool or number
            the last argument is a yoyo effect (goes back)
            you can set it to false and chain the loop method with argument true to loop it
            instead of repeating it */
        game.add.tween(c1).to({y: '+400'}, 2000, 'Quad.easeOut', true);
        i = game.add.tween(c2).to({x: 100, y: 0}, 1000, 'Elastic.easeOut');
        game.add.tween(c3).from({y: 1000}, 1500, 'Circ.easeOut', true);
        game.add.tween(c4.anchor).to({x: 1}, 1000, 'Circ.easeOut', true, 1000, 2, false).loop(true);
        game.add.tween(c5).to({alpha: 0}, 1000, 'Bounce.easeOut', true);
    },
    update: function(){}
};
