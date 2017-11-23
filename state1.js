demo.state1 = function() {};
demo.state1.prototype = {
    preload: function(){},
    create: function(){
        game.stage.backgroundColor = '#dddddd';
        console.log('You are in state one');

    },
    update: function(){}
};
