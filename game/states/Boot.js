'use strict';

function Boot () {

}


Boot.prototype = {

    preload: function () {

        this.game.load.image('loaderEmpty', 'assets/UI/loaderEmpty.png');
        this.game.load.image('loaderFull', 'assets/UI/loaderFull.png');
    },

    init: function (SAFE_ZONE_WIDTH, SAFE_ZONE_HEIGHT) {

        this.SAFE_ZONE_WIDTH = SAFE_ZONE_WIDTH;
        this.SAFE_ZONE_HEIGHT = SAFE_ZONE_HEIGHT;
    },

    create: function () {


        //if (navigator.isCocoonJS) {
        //}
        //else {
        //        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //        this.game.scale.pageAlignHorizontally = true;
        //        this.game.scale.pageAlignVertically = true;
        //        this.game.scale.forceOrientation(false, true, 'orientation');
        //    }
        //}


        if (this.game.device.desktop) {

            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.maxWidth = 960;
            this.game.scale.maxHeight = 640;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;

            this.game.SCALE_WIDTH = 1;
            this.game.SCALE_HEIGHT = 1;
        } else {

            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.setShowAll();
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVeritcally = true;
            this.game.scale.refresh();

            //this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
            //this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            //this.game.scale.setScreenSize(true);

            //this.game.SCALE_WIDTH = 0.5;
            //this.game.SCALE_HEIGHT = 0.5;
        }

        //if (this.game.device.desktop)
        //    this.game.add.plugin(Phaser.Plugin.Debug);

        this.game.input.touch.preventDefault = true;
        this.game.state.start('Preloader', true, false, this.SAFE_ZONE_WIDTH, this.SAFE_ZONE_HEIGHT);

        this.SAFE_ZONE_HEIGHT = null;
        this.SAFE_ZONE_WIDTH = null;
    }
}

module.exports = Boot;





//if (screen.orientation.lock)
//    screen.orientation.lock('landscape');

//this.setupScaling();

//this.game.scale.maxWidth = 960;
//this.game.scale.maxHeight = 640;

//if (this.game.device.android && this.game.device.chrome == false) {
//    this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
//    this.game.stage.scale.maxIterations = 1;
//}

/*

getRatio: function (type, w, h) {

    var width = navigator.isCocoonJS ? window.innerWidth : w,
        height = navigator.isCocoonJS ? window.innerHeight : h;

    var dips = window.devicePixelRatio;
    width = width * dips;
    height = height * dips;

    var scaleX = width / w,
        scaleY = height / h,
        result = {
            x: 1,
            y: 1
        };

    switch (type) {
        case 'all':
            result.x = scaleX > scaleY ? scaleY : scaleX;
            result.y = scaleX > scaleY ? scaleY : scaleX;
            break;
        case 'fit':
            result.x = scaleX > scaleY ? scaleX : scaleY;
            result.y = scaleX > scaleY ? scaleX : scaleY;
            break;
        case 'fill':
            result.x = scaleX;
            result.y = scaleY;
            break;
    }

    return result;
},

setupScaling: function () {

    if (navigator.isCocoonJS) {

        var ratio = this.getRatio('git', 960, 640);
        this.game.world.scale.x = ratio.x;
        this.game.world.scale.y = ratio.y;
        this.game.world.updateTransform();
    }
    else {
        if (this.game.device.desktop) {
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            this.game.scale.setScreenSize(true);
        }
        else {
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            this.game.scale.forceOrientation(false, true, 'orientation');
            this.game.scale.setScreenSize(true);
        }
    }

    this.game.world.setBounds(0, 0, 960, 640);
},
*/







/*
        if (this.game.device.desktop) {

            this.game.scale.maxWidth = 960;
            this.game.scale.maxHeight = 640;
            this.global_mobile_enabled = false;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        } else {

            this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
            this.game.scale.setMinMax(480, 260, 960, 640);
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            this.game.scale.forceOrientation(true, false);
            //this.game.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            //this.game.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
        }
*/
