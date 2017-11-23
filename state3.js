demo.state3 = function() {};
demo.state3.prototype = {
    preload: function(){},
    create: function(){
        game.stage.backgroundColor = '#dddddd';
        console.log('You are in state three');
    },
    update: function(){}
};
