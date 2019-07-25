var GameTitle = function (game) {
};
var e = 1;
GameTitle.prototype = {

    create: function () {
        var me = this;

        game.add.tileSprite﻿(-20, 0, 1080, 960, 'background');
        me.logo = game.add.tileSprite﻿(game.world.centerX, 250, 605, 225, 'logo');
        me.logo.scale.setTo(0.8, 0.8);
        me.logo.anchor.setTo(0.5, 0.5);
        me.stateText = game.add.text(500, 300, ' ', {font: '50px Fredoka One', fill: '#F2F2F2'});
        me.stateText.anchor.setTo(1.1, 0.2);

        // me.music = game.add.audio('backVoice');
        // me.music.play();

    },
    update: function () {
        var me = this;
        var pButton = game.add.button(game.world.centerX, 600, 'playButton', me.startGame, this, 2, 1, 0);
        pButton.anchor.setTo(0.5, 0.5);
        pButton.width = 400;
        pButton.height = 200;
        var mButton = game.add.button(game.world.centerX + 290, 100, 'musicButton', me.musicOf, this, 2, 1, 0);
        mButton.anchor.setTo(0.5, 0.5);
        mButton.width = 150;
        mButton.height = 150;

    },

    startGame: function () {
        this.game.state.start("Main");
    },

    musicOf: function () {
        e++;
        var me = this;
        if (e % 2 == 0) {
            game.music.pause();
        } else {

            game.music.play();
        }

    }

}