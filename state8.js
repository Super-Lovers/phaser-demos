demo.state8 = function() {};

WebFontConfig = {
    google: { families: [ 'Candal', 'Montserrat' ] }
};

demo.state8.prototype = {
    preload: function(){
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js');
    },
    create: function(){
        game.stage.backgroundColor = '#dddddd';
        console.log('You are in state eight');

        text = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi magnam fugit aperiam consectetur vel rem. Recusandae quis eaque, provident cum! Eos dolor delectus ab voluptas nemo? Distinctio, ea, obcaecati. Placeat!";

        this.spellOutText(100, 100, 500, text, 14, 10, '#000', 'Montserrat');;
    },
    update: function(){},
    spellOutText: function(x, y, width, height, fontSize, speed, fill, font) {
        let sentence = game.add.text(x, y, '', {fontSize: fontSize + 'px', fill: fill, font: font});
        let currentLine = game.add.text(10, 10, '', {fontSize: fontSize + 'px', fill: fill, font: font});
        currentLine.alpha = 0;
        let loop = game.time.events.loop(speed, addChar);

        let index = 0;
        function addChar() {
            sentence.text += text[index];
            currentLine.text += text[index];

            if (currentLine.width > width && text[index] == ' ') {
                sentence.text += '\n';
                currentLine.text = '';
            }
            if (index >= text.length - 1) {
                game.time.events.remove(loop);
            }
            index++;
        }
    }
};
