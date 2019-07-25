var Boot = function(game){

};
  
Boot.prototype = {

	preload: function(){
        game.scale.scaleMode = Phaser.ScaleManager.aspectRatio;
        game.scale.pageAlignVertically = true;
        game.scale.pageAlignHorizontally = true;
        game.scale.setShowAll();
        game.scale.refresh();

	},
	
  	create: function(){
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL ;;
		this.game.state.start("Preload");
	}
}