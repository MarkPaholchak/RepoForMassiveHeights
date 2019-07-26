var Preload = function(game){};

Preload.prototype = {

	preload: function(){ 
		this.game.load.image('red', 'assets/images/game/gem-01.png');
		this.game.load.image('blue', 'assets/images/game/gem-02.png');
		this.game.load.image('green', 'assets/images/game/gem-03.png');
		this.game.load.image('lightBlue', 'assets/images/game/gem-04.png');
		this.game.load.image('yellow', 'assets/images/game/gem-05.png');
		this.game.load.image('pink', 'assets/images/game/gem-06.png');
		this.game.load.image('universal', 'assets/images/game/gem-07.png');
		this.game.load.image('crossAxis', 'assets/images/game/gem-08.png');
		this.game.load.image('axisY', 'assets/images/game/gem-09.png');
		this.game.load.image('axisX', 'assets/images/game/gem-11.png');
		this.game.load.image('timePlus', 'assets/images/game/gem-12.png');
		this.game.load.image('hand', 'assets/images/game/hand.png');
		this.game.load.image('shadow', 'assets/images/game/shadow.png');
		this.game.load.image('background', 'assets/images/backgrounds/background.jpg');
		this.game.load.image('background', 'assets/images/backgrounds/background.jpg');
		this.game.load.image('scorePic', 'assets/images/bg-score.png');
		this.game.load.image('timeUp', 'assets/images/text-timeup.png');
		this.game.load.image('logo', 'assets/images/donuts_logo.png');
		this.game.load.image('playButton', 'assets/images/btn-play.png');
		this.game.load.image('musicButton', 'assets/images/btn-sfx.png');
		this.game.load.image('particle', 'assets/images/particles/particle_ex1.png');
        this.game.load.bitmapFont('myFont', 'assets/font/font.png', 'assets/font/font.xml');
        this.game.load.image('backg', 'assets/images/BACK.png');
        this.game.load.audio('backVoice', 'assets/audio/background.mp3');
        this.game.load.audio('killGem', 'assets/audio/kill.mp3');
        this.game.load.audio('select1', 'assets/audio/select-9.mp3');
        this.game.load.audio('select2', 'assets/audio/select-3.mp3');
        this.time.advacedTiming = true;
        // this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        // this.game.scale.pageAlignHorizontally = true;
        // this.game.scale.pageAlignVertically = true;
        // this.game.scale.setScreenSize(true);
	},

	create: function(){
        game.music = this.game.add.audio('backVoice',true, true);
        game.select = this.game.add.audio('select1', true);
        game.kill = this.game.add.audio('killGem', true);
        game.selectButtons = this.game.add.audio('select2', true);

        game.music.play();
        game.music.paused = false;
        game.musicPause = true;
        game.showHelp = false;
        // this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT ;
        // this.game.scale.pageAlignHorizontally = true;
        // this.game.scale.pageAlignVertically = true;
		this.game.state.start("GameTitle");
	}
}