var GameOver = function (game) {
};

GameOver.prototype = {

    create: function () {
        var me = this;
        game.add.tileSprite﻿(-20, 0, 1080, 960, 'background');
        me.stateText = game.add.text(game.world.centerX, 400, ' ', {
            font: '50px Fredoka One',
            fill: '#f2c0a0',
            stroke: "#99541a",
            strokeThickness: 15
        });
        me.stateWidth = me.stateText.width;
        me.stateText.align = 'center';
        // stateText.y = game.world.centerY;
        me.stateText.anchor.setTo(0.5, 0.5);

    },

    update: function () {
        var me = this;
        me.stateText.text = `GAME OVER \n Your score:${parseInt(localStorage.getItem('score'))} \n High score: ${parseInt(localStorage.getItem('highScore'))} \n  Click to restart`;
        me.stateText.visible = true;
        me.timeLimit = 10;
        //the "click to restart" handler
        game.input.onTap.addOnce(function () {
            game.state.start('GameTitle');
        });

    }

}