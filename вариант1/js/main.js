var Main = function (game) {

};
Main.prototype = {

    create: function () {
        var me = this;
        me.game.scale.pageAlignHorizontally = true;
        me.game.scale.pageAlignVertically = true;
        me.game.scale.refresh();
        game.add.tileSprite﻿(-20, 0, 1080, 960, 'background');
        me.tileTypes = [
            'red',
            'blue',
            'green',
            'lightBlue',
            'yellow',
            'pink'
        ];
        me.score = 0;
        me.highScore = 0;

        me.emmiter = game.add.emitter(0, 0, 100);
        me.emmiter.makeParticles('particle');
        me.emmiter.gravity = 200;

        me.tile1 = null;
        me.tile2 = null;
        me.gameover = false;
        me.canMove = false;
        me.musicPause = game.music.paused;

        if (game.musicPause === true) {
            game.music.paused = true;
        } else {
            game.music.paused = false;
        }


        me.tileWidth = me.game.cache.getImage('blue').width - 15;
        me.tileHeight = me.game.cache.getImage('blue').height - 15;

        me.tiles = me.game.add.group();
        me.moveTile = me.game.add.group();
        me.moveTile.add(me.tiles);
        me.moveTile.y = 150;
        me.moveTile.x = 40;

        me.tileGrid = [
            [null, null, null, null, null],
            [null, null, null, null, null],
            [null, null, null, null, null],
            [null, null, null, null, null],
            [null, null, null, null, null],
            [null, null, null, null, null],
            [null, null, null, null, null],
            [null, null, null, null, null]

        ];

        me.nameGrid = [];
        var scoreSprite1 = me.game.add.sprite(200, 110, 'scorePic');
        scoreSprite1.anchor.set(0.5);


        me.i = 0;
        me.myInt;

        function myInterval() {
            myInt = setInterval(function () {
                if (game.paused) {
                    me.i = me.i;
                } else if (me.gameover == true) {
                    clearInterval(myInt);
                } else if (me.i == 60) {
                    clearInterval(myInt);
                } else {
                    me.i += 1;
                }
            }, 1000);
        }


        me.seed = Date.now();
        me.random = new Phaser.RandomDataGenerator([me.seed]);

        me.initTiles();
        myInterval();
        me.createScore();

        var me = this;
        me.tweens = new Phaser.TweenManager(game);

        me.startTime = new Date();
        me.totalTime = 30;
        me.timeElapsed = 0;
        me.w = 820;
        me.h = 960;
        me.createTimer();
        me.pause_label = game.add.text(me.game.world.centerX + 100, 50, 'PAUSE', {
            font: '80px Fredoka One',
            fill: '#fff'
        });

        me.pause_label.inputEnabled = true;
        me.pause_label.events.onInputUp.add(function () {
            game.paused = true;

            // Then add the menu
            menu = game.add.sprite(0, 0, 'backg');
            menu.anchor.setTo(0.5, 0.5);
            menu.scale.setTo(9.5, 9.5);

            choiseLabel = game.add.text(me.w / 2, me.h - 150, 'Click outside menu to continue', {
                font: '30px Fredoka One',
                fill: '#fff'
            });
            choiseLabel.anchor.setTo(0.5, 0.5);

            choise1 = game.add.text(me.w / 2, me.h / 2 - 100, 'NEW', {
                font: '100px Fredoka One',
                fill: '#fff'
            });
            choise1.anchor.setTo(0.5, 0.5);
            choise1.inputEnabled = true;
            choise1.events.onInputUp.add(function () {
                this.game.state.start('Main');
            });

            choise2 = game.add.text(me.w / 2, me.h / 2 - 250, 'MAIN MENU', {
                font: '100px Fredoka One',
                fill: '#fff'
            });
            choise2.anchor.setTo(0.5, 0.5);
            choise2.inputEnabled = true;
            choise2.events.onInputUp.add(function () {
                this.game.state.start('GameTitle');
            });

            choise3 = game.add.text(me.w / 2, me.h / 2 + 50, 'HELP:', {
                font: '100px Fredoka One',
                fill: '#fff'
            });
            if (game.showHelp) {
                choise3.text = 'HELP:ON';
            } else {
                choise3.text = 'HELP:OFF';
            }
            choise3.anchor.setTo(0.5, 0.5);
            choise3.inputEnabled = true;
            choise3.events.onInputUp.add(function () {
                me.musicRadio();
            });

            choise4 = game.add.text(me.w / 2, me.h / 2 + 200, 'MUSIC:', {
                font: '100px Fredoka One',
                fill: '#fff'
            });
            if (game.musicPause) {
                game.music.pause();
                choise4.text = 'MUSIC:OFF';
            } else {
                game.music.play();
                choise4.text = 'MUSIC:ON';
            }
            choise4.anchor.setTo(0.5, 0.5);
            choise4.inputEnabled = true;
            choise4.events.onInputUp.add(function () {
                // this.game.state.start('GameTitle');
            });
        });

        game.input.onDown.add(me.unpause, self);
        if (game.showHelp) {
            me.showSuggestion();
        };

        me.emmiter = game.add.emitter(0, 0, 100);
        me.emmiter.makeParticles('particle');
        me.emmiter.gravity = 200;

    },

    update: function () {
        var me = this;
        me.game.scale.setShowAll();
        me.game.scale.refresh();
        me.countDownTimer();
        // if (me.timeElapsed >= me.totalTime) {
        //     setTimeout(this.game.state.start('GameOver'), 3000);
        // };
        if (!game.showHelp) {
            me.hand.visible = false;
        }

        if (me.tile1 && !me.tile2) {
            if (game.musicPause === false) {
                game.select.play();
            }
            ;
            me.hand.visible = false;
            me.tiles.moveUp(me.tile1);
            if (game.showHelp && me.handTween) {
                me.handTween.stop();
            }
            ;
            me.emmiter.start(false,0, 100);

            me.tile1.scale.x += 0.01;
            me.tile1.scale.y += 0.01;
            if (me.tile1.scale.x > 1.5) {
                me.game.add.tween(me.tile1.scale).to({x: 1, y: 1}, 500, Phaser.Easing.Linear.In, true);
            }
            ;

            var hoverX = me.game.input.x - 40;
            var hoverY = me.game.input.y - 160;

            var hoverPosX = Math.floor(hoverX / me.tileWidth);
            var hoverPosY = Math.floor(hoverY / me.tileHeight);

            var difX = (hoverPosX - me.startPosX);
            var difY = (hoverPosY - me.startPosY);
            if (!(hoverPosY > me.tileGrid[0].length - 1 || hoverPosY < 0) && !(hoverPosX > me.tileGrid.length - 1 || hoverPosX < 0)) {
                if ((Math.abs(difY) == 1 && difX == 0) || (Math.abs(difX) == 1 && difY == 0)) {
                    // me.tile1.scale.x = 1;
                    // me.tile1.scale.y = 1;
                    me.game.add.tween(me.tile1.scale).to({x: 1, y: 1}, 500, Phaser.Easing.Linear.In, true);
                    me.canMove = false;
                    me.tile2 = me.tileGrid[hoverPosX][hoverPosY];
                    me.emmiter.kill();

                    me.swapTiles();
                    me.game.time.events.add(500, function () {
                        me.checkMatch();
                    });
                }

            }

        }
        ;
    },


    unpause: function (event) {
        var me = this;
        // Only act if paused
        if (game.paused) {
            // Calculate the corners of the menu
            var x1 = 820 / 2 - choise1.width / 2,
                x2 = 820 / 2 + choise1.width / 2,
                y1 = 960 / 2 - choise1.height / 2 - 100,
                y2 = 960 / 2 + choise1.height / 2 - 100;
            var x3 = 820 / 2 - choise2.width / 2,
                x4 = 820 / 2 + choise2.width / 2,
                y3 = 960 / 2 - choise2.height / 2 - 250,
                y4 = 960 / 2 + choise2.height / 2 - 250;
            var x5 = 820 / 2 - choise3.width / 2,
                x6 = 820 / 2 + choise3.width / 2,
                y5 = 960 / 2 - choise3.height / 2 + 50,
                y6 = 960 / 2 + choise3.height / 2 + 50;
            var x7 = 820 / 2 - choise4.width / 2,
                x8 = 820 / 2 + choise4.width / 2,
                y7 = 960 / 2 - choise4.height / 2 + 200,
                y8 = 960 / 2 + choise4.height / 2 + 200;

            choise2.events.onInputUp.add(function () {
                this.game.state.start('GameTitle');
            });

            choise1.events.onInputUp.add(function () {
                this.game.state.start('Main');
            });

            // Check if the click was inside the menu
            if (event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2) {
                game.paused = false;
                me.gameover = true;
                clearInterval(myInt);
                this.game.state.start('Main');
            } else if (event.x > x3 && event.x < x4 && event.y > y3 && event.y < y4) {
                game.paused = false;
                me.gameover = true;
                clearInterval(myInt);
                this.game.state.start('GameTitle');
            } else if (event.x > x5 && event.x < x6 && event.y > y5 && event.y < y6) {
                if (game.showHelp) {
                    game.showHelp = false;
                    choise3.text = 'HELP:OFF';
                } else {
                    game.showHelp = true;
                    choise3.text = 'HELP:ON';
                }
            } else if (event.x > x7 && event.x < x8 && event.y > y7 && event.y < y8) {
                if (game.musicPause) {
                    game.music.play();
                    game.musicPause = false;
                    choise4.text = 'MUSIC:ON';

                } else {
                    game.music.pause();
                    game.musicPause = true;
                    choise4.text = 'MUSIC:OFF';
                }
            }
            else {
                choiseLabel.destroy();
                choise1.destroy();
                choise2.destroy();
                choise3.destroy();
                choise4.destroy();
                menu.destroy();
                if (game.showHelp) {
                    me.showSuggestion;
                }
                ;
                game.paused = false;
            }
        }
    },

    musicRadio: function () {
        return game.music.paused;

    },

    countDownTimer: function () {
        var me = this;
        // me.i = 0;
        me.timeLimit = 30;

        me.timeLabel.text = Math.floor(me.timeLimit - me.i);

        if (me.timeLabel.text <= 0) {
            // time is up
            timesUp = 'Time is up!';
            me.timeLabelUp.text = '';
            me.timeLabel.x = me.game.world.centerX;
            me.timeLabel.y = 850;
            me.timeLabel.text = 'Time is up!';
            // console.log(me.highScore);
            game.time.events.loop(Phaser.Timer.SECOND + 1, me.gameOver, this);


        }
        ;
    },

    createTimer: function () {

        var me = this;


        me.timeLabel = me.game.add.text(me.game.world.centerX + 150, 860, "00:00", {
            font: "80px Fredoka One",
            fill: "#db1e1a"
        });
        me.timeLabel.anchor.setTo(0.5, 0);
        me.timeLabel.align = 'center';

        me.timeLabelUp = me.game.add.bitmapText(me.game.world.centerX - 100, 870, 'myFont', '0', 80);
        me.timeLabelUp.anchor.setTo(0.5, 0);
        me.timeLabelUp.align = 'center';
        me.timeLabelUp.text = 'Time left:';
    },

    gameOver: function () {
        var me = this;
        me.gameover = true;
        var stringScore = me.score;
        var stringH = parseInt(localStorage.getItem('highScore'));
        localStorage.setItem('score', stringScore);
        if (stringH === NaN) {
            localStorage.setItem('highscore', '0');
        } else {
            localStorage.setItem('highscore', stringH);
        }
        console.log(parseInt(stringScore));
        console.log(parseInt(stringH));

        if (stringH < stringScore) {
            me.highScore = me.score;
            localStorage.setItem('highScore', stringScore);
        }
        ;
        clearInterval(myInt);
        this.game.state.start('GameOver');
    },

    tileDown: function (tile, pointer) {

        var me = this;

        if (me.canMove) {

            me.tile1 = tile;


            me.startPosX = (tile.x - me.tileWidth / 2) / me.tileWidth;
            me.startPosY = (tile.y - me.tileHeight / 2) / me.tileHeight;

        }

    },

    initTiles: function () {

        var me = this;

        for (var i = 0; i < me.tileGrid.length; i++) {

            for (var j = 0; j < me.tileGrid.length; j++) {

                var tile = me.addTile(i, j);

                me.tileGrid[i][j] = tile;

            }
        }

        me.game.time.events.add(600, function () {
            me.checkMatch();
        });
        me.hand = game.add.sprite(0, 0, "hand");
        me.hand.anchor.set(0.5);
        me.hand.visible = false;

    },

    addTile: function (x, y) {

        var me = this;
        var tileToAdd = me.tileTypes[me.random.integerInRange(0, me.tileTypes.length - 1)];
        var tile = me.tiles.create((x * me.tileWidth) + me.tileWidth / 2, 0, 'shadow');
        me.game.add.tween(tile).to({y: y * me.tileHeight + (me.tileHeight / 2)}, 500, Phaser.Easing.Linear.In, true);
        tile.anchor.setTo(0.45, 0.35);
        tile.inputEnabled = true;
        tile.tileType = tileToAdd;
        tile.events.onInputDown.add(me.tileDown, me);
        var shadowSpite = game.add.sprite(-6, -10, tileToAdd);
        shadowSpite.anchor.setTo(0.45, 0.35);
        tile.addChild(shadowSpite);
        return tile;

    },
    swapTiles: function () {

        var me = this;
        if (me.tile1 && me.tile2) {

            var tile1Pos = {
                x: (me.tile1.x - me.tileWidth / 2) / me.tileWidth,
                y: (me.tile1.y - me.tileHeight / 2) / me.tileHeight
            };
            var tile2Pos = {
                x: (me.tile2.x - me.tileWidth / 2) / me.tileWidth,
                y: (me.tile2.y - me.tileHeight / 2) / me.tileHeight
            };

            me.tileGrid[tile1Pos.x][tile1Pos.y] = me.tile2;
            me.tileGrid[tile2Pos.x][tile2Pos.y] = me.tile1;

            me.game.add.tween(me.tile1).to({
                x: tile2Pos.x * me.tileWidth + (me.tileWidth / 2),
                y: tile2Pos.y * me.tileHeight + (me.tileHeight / 2)
            }, 200, Phaser.Easing.Linear.In, true);
            me.game.add.tween(me.tile2).to({
                x: tile1Pos.x * me.tileWidth + (me.tileWidth / 2),
                y: tile1Pos.y * me.tileHeight + (me.tileHeight / 2)
            }, 200, Phaser.Easing.Linear.In, true);

            me.tile1 = me.tileGrid[tile1Pos.x][tile1Pos.y];
            me.tile2 = me.tileGrid[tile2Pos.x][tile2Pos.y];

        }

    },
    tileUp: function () {
        var me = this;


        // me.tile1.scale = game.tileScale;

        me.tile1 = null;
        me.tile2 = null;

    },


    getTilePos: function (tileGrid, tile) {
        var pos = {x: -1, y: -1};

        for (var i = 0; i < tileGrid.length; i++) {
            for (var j = 0; j < tileGrid[i].length; j++) {
                if (tile == tileGrid[i][j]) {
                    pos.x = i;
                    pos.y = j;
                    break;
                }
            }
        }

        return pos;
    },

    removeTileGroup: function (matches) {
        var me = this;
        if (game.musicPause === false) {
            game.kill.play();
        }
        // game.kill.play();
        if (game.showHelp && me.handTween) {
            me.handTween.stop();
        }
        ;
        // me.handTween.stop();

        console.log('stoped');
        for (var i = 0; i < matches.length; i++) {
            var tempArr = matches[i];
            for (var j = 0; j < tempArr.length; j++) {
                var tile = tempArr[j];
                var tilePos = me.getTilePos(me.tileGrid, tile);
                me.tiles.remove(tile);
                me.incrementScore();
                if (tilePos.x != -1 && tilePos.y != -1) {
                    me.tileGrid[tilePos.x][tilePos.y] = null;
                }
            }
        }
    },


    showSuggestion: function () {
        var me = this;
        var matchFound = false;
        for (var i = 2; i < me.tileGrid.length - 1; i++) {
            for (var j = 2; j < me.tileGrid.length - 1; j++) {
                me.tmpSwap(i, j, i + 1, j);
                if (me.matchInBoard()) {
                    me.hand.visible = true;
                    console.log(i + '' + j);
                    me.hand.x = me.tileGrid[i + 1][j].x + 50;
                    me.hand.y = me.tileGrid[i + 1][j].y + 240;
                    me.handTween = game.add.tween(me.hand).to({
                        y: me.hand.y,
                        x: me.hand.x + 100
                    }, 500, Phaser.Easing.Linear.None, true, 0, -1, true);

                    console.log('Added X');
                    matchFound = true;
                }
                me.tmpSwap(i, j, i + 1, j);
                if (matchFound) {
                    return;
                }
                me.tmpSwap(i, j, i, j + 1);
                if (me.matchInBoard()) {
                    me.hand.visible = true;

                    console.log(i + '' + j);
                    me.hand.x = me.tileGrid[i][j + 1].x + 60;
                    me.hand.y = me.tileGrid[i][j + 1].y + 230;
                    me.handTween = game.add.tween(me.hand).to({
                        x: me.hand.x,
                        y: me.hand.y + 100
                    }, 500, Phaser.Easing.Linear.None, true, 0, -1, true);

                    console.log('Added Y');
                    matchFound = true;
                }
                me.tmpSwap(i, j, i, j + 1);
                if (matchFound) {
                    return;
                }
            }
        }
        console.log("no match");
    },

    tmpSwap: function (row1, col1, row2, col2) {
        var me = this;
        var tmp = me.tileGrid[row1][col1];
        me.tileGrid[row1][col1] = me.tileGrid[row2][col2];
        me.tileGrid[row2][col2] = tmp;
    },

    getMatches: function (tileGrid) {

        var matches = [];
        var groups = [];

        for (var i = 0; i < tileGrid.length; i++) {
            var tempArr = tileGrid[i];
            groups = [];
            for (var j = 0; j < tempArr.length; j++) {
                if (j < tempArr.length - 2)
                    if (tileGrid[i][j] && tileGrid[i][j + 1] && tileGrid[i][j + 2]) {
                        if (tileGrid[i][j].tileType == tileGrid[i][j + 1].tileType && tileGrid[i][j + 1].tileType == tileGrid[i][j + 2].tileType) {
                            if (groups.length > 0) {
                                if (groups.indexOf(tileGrid[i][j]) == -1) {
                                    matches.push(groups);
                                    groups = [];
                                }
                            }

                            if (groups.indexOf(tileGrid[i][j]) == -1) {
                                groups.push(tileGrid[i][j]);
                            }
                            if (groups.indexOf(tileGrid[i][j + 1]) == -1) {
                                groups.push(tileGrid[i][j + 1]);
                            }
                            if (groups.indexOf(tileGrid[i][j + 2]) == -1) {
                                groups.push(tileGrid[i][j + 2]);
                            }
                        }
                    }
            }
            if (groups.length > 0) matches.push(groups);
        }

        for (j = 0; j < tileGrid.length; j++) {
            var tempArr = tileGrid[j];
            groups = [];
            for (i = 0; i < tempArr.length; i++) {
                if (i < tempArr.length - 2)
                    if (tileGrid[i][j] && tileGrid[i + 1][j] && tileGrid[i + 2][j]) {
                        if (tileGrid[i][j].tileType == tileGrid[i + 1][j].tileType && tileGrid[i + 1][j].tileType == tileGrid[i + 2][j].tileType) {
                            if (groups.length > 0) {
                                if (groups.indexOf(tileGrid[i][j]) == -1) {
                                    matches.push(groups);
                                    groups = [];
                                }
                            }

                            if (groups.indexOf(tileGrid[i][j]) == -1) {
                                groups.push(tileGrid[i][j]);
                            }
                            if (groups.indexOf(tileGrid[i + 1][j]) == -1) {
                                groups.push(tileGrid[i + 1][j]);
                            }
                            if (groups.indexOf(tileGrid[i + 2][j]) == -1) {
                                groups.push(tileGrid[i + 2][j]);
                            }
                        }
                    }
            }
            if (groups.length > 0) matches.push(groups);
        }

        return matches;

    },

    gemAt: function (row, col) {
        var me = this;
        if (row < 0 || row >= me.tileGrid.length || col < 0 || col >= me.tileGrid.length) {
            return -1;
        }
        return me.tileGrid[row][col];
    },

    isHorizontalMatch: function (i, j) {
        var me = this;
        // console.log(me.gemAt(i,j).tileType);
        // if(tileGrid[i][j] && tileGrid[i][j - 1] && tileGrid[i][j - 2]) {
        return me.gemAt(i, j).tileType == me.gemAt(i, j - 1).tileType && me.gemAt(i, j - 1).tileType == me.gemAt(i, j - 2).tileType;
        // } else {
        //     return false;
        // }

    },

    isVerticalMatch: function (i, j) {
        var me = this;
        // if(tileGrid[i][j] && tileGrid[i - 1][j] && tileGrid[i - 2][j]) {
        return me.gemAt(i, j).tileType == me.gemAt(i - 1, j).tileType && me.gemAt(i - 1, j).tileType == me.gemAt(i - 2, j).tileType;
        // } else {
        //     return false;
        // }
    },

    isMatch: function (row, col) {
        var me = this;
        return me.isHorizontalMatch(row, col) || me.isVerticalMatch(row, col);
    },

    matchInBoard: function () {
        var me = this;
        for (var i = 0; i < me.tileGrid.length; i++) {
            for (var j = 0; j < me.tileGrid.length; j++) {
                if (me.isMatch(i, j)) {
                    return true;
                }
            }
        }
        return false;
    },

    checkMatch: function () {

        var me = this;

        var matches = me.getMatches(me.tileGrid);

        if (matches.length > 0) {

            me.removeTileGroup(matches);
            me.resetTile();
            me.fillTile();
            me.game.time.events.add(500, function () {
                me.tileUp();
            });

            me.game.time.events.add(600, function () {
                me.checkMatch();
            });

        }
        else {
            me.swapTiles();

            me.game.time.events.add(500, function () {
                me.tileUp();
                me.canMove = true;
                if (game.showHelp) {
                    me.showSuggestion();
                }
                ;
            });
        }

    },

    resetTile: function () {

        var me = this;

        for (var i = 0; i < me.tileGrid.length; i++) {

            for (var j = me.tileGrid[i].length - 1; j > 0; j--) {

                if (me.tileGrid[i][j] == null && me.tileGrid[i][j - 1] != null) {
                    //Move the tile above down one
                    var tempTile = me.tileGrid[i][j - 1];
                    me.tileGrid[i][j] = tempTile;
                    me.tileGrid[i][j - 1] = null;

                    me.game.add.tween(tempTile).to({y: (me.tileHeight * j) + (me.tileHeight / 2)}, 200, Phaser.Easing.Linear.In, true);

                    j = me.tileGrid[i].length;
                }
            }
        }

    },
    fillTile: function () {

        var me = this;

        for (var i = 0; i < me.tileGrid.length; i++) {

            for (var j = 0; j < me.tileGrid.length; j++) {

                if (me.tileGrid[i][j] == null) {
                    var tile = me.addTile(i, j);

                    me.tileGrid[i][j] = tile;
                }

            }
        }
        ;

        if (game.showHelp && me.handTween) {
            me.handTween.stop();
        }
        // me.handTween.stop();
        console.log('stoped');
        // me.showSuggestion();

    },
    createScore: function () {

        var me = this;
        me.scoreLabel = me.game.add.bitmapText(200, 10, 'myFont', '0', 80);
        me.scoreLabel.anchor.setTo(0.5, -0.5);
        me.scoreLabel.align = 'center';

    },

    incrementScore: function () {

        var me = this;

        me.score += 10;
        me.scoreLabel.text = me.score;

    },


};