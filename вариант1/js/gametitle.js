var GameTitle = function (game) {
};
var e = 1;
GameTitle.prototype = {

    create: function () {
        var me = this;
        game.add.tileSprite﻿(-20, 0, 1080, 960, 'background');
        me.logo = game.add.tileSprite﻿(game.world.centerX, 150, 605, 225, 'logo');
        me.logo.scale.setTo(0.8, 0.8);
        me.logo.anchor.setTo(0.5, 0.5);
        me.stateText = game.add.text(500, 300, ' ', {font: '50px Fredoka One', fill: '#F2F2F2'});
        me.stateText.anchor.setTo(1.1, 0.2);

        // me.tutor = game.add.text(me.game.world.centerX , 800, 'TUTORIAL', {
        //     font: '80px Fredoka One',
        //     fill: '#fff'
        // });

        me.tutor = me.game.add.bitmapText(me.game.world.centerX , 650, 'myFont', '0', 80);
        me.tutor.anchor.setTo(0.5, 0.5);
        me.tutor.align = 'center';
        me.tutor.text = 'TUTORIAL';
        me.tutor.inputEnabled = true;
        me.tutor.events.onInputUp.add(function () {
            this.game.state.start('Tutorial')
        });

        me.musiccc = me.game.add.bitmapText(me.game.world.centerX , 750, 'myFont', '0', 80);
        me.musiccc.anchor.setTo(0.5, 0.5);
        me.musiccc.align = 'center';
        if(game.musicPause) {
            me.musiccc.text = 'MUSIC:OFF';
        } else {
            me.musiccc.text = 'MUSIC:ON';
        };
        me.musiccc.inputEnabled = true;
        me.musiccc.events.onInputUp.add(function () {
            me.musicOf()
        });

        me.helpp = me.game.add.bitmapText(me.game.world.centerX , 850, 'myFont', '0', 80);
        me.helpp.anchor.setTo(0.5, 0.5);
        me.helpp.align = 'center';
        if (game.showHelp){
            me.helpp.text = 'HELP:ON';
        } else {
            me.helpp.text = 'HELP:OFF';
        };
        me.helpp.inputEnabled = true;
        me.helpp.events.onInputUp.add(function () {
            me.helpOf();
        });
        game.tileScale = me.helpp.scale;
        console.log(game.tileScale);

        // me.music = game.add.audio('backVoice');
        // me.music.play();

    },
    update: function () {
        var me = this;
        me.pButton = game.add.button(game.world.centerX, 450, 'playButton', me.startGame, this, 2, 1, 0);
        me.pButton.anchor.setTo(0.5, 0.5);
        me.pButton.width = 400;
        me.pButton.height = 200;

        // var mButton = game.add.button(game.world.centerX + 290, 800, 'musicButton', me.musicOf, this, 2, 1, 0);
        // mButton.anchor.setTo(0.5, 0.5);
        // mButton.width = 150;
        // mButton.height = 150;


    },

    startGame: function () {
        var me = this;

        console.log(me.musiccc.scale);
        game.music.paused = game.musicPause;
        this.game.state.start("Main");

    },

    musicOf: function () {
        var me = this;

        if (game.musicPause) {
            me.musiccc.text = 'MUSIC:ON';
            game.music.play();
            game.musicPause = false;
        } else {
            me.musiccc.text = 'MUSIC:OFF';
            game.music.pause();
            game.musicPause = true;
        }

    },

    helpOf: function () {
        var me = this;
        if (game.showHelp) {
            me.helpp.text = 'HELP:OFF';
            game.showHelp = false;
        } else {
            me.helpp.text = 'HELP:ON';
            game.showHelp = true;
        }

    }

}