demo.state2 = function() {};
demo.state2.prototype = {
    preload: function(){},
    create: function(){
        game.stage.backgroundColor = '#00ff00';
        console.log('You are in state two');
    },
    update: function(){}
};
