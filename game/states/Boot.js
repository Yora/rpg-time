'use strict';

function Boot () {

}


Boot.prototype = {

    preload: function () {

        this.game.load.image('loaderEmpty', 'assets/UI/loaderEmpty.png');
        this.game.load.image('loaderFull', 'assets/UI/loaderFull.png');
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
        } else {

            this.game.scale.maxWidth = 960;
            this.game.scale.maxHeight = 640;
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.setShowAll();
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVeritcally = true;
            this.game.scale.refresh();
        }

        // 7/13/2015 - doesnt look so bad, but going with show_all manual x/y adjustments to be safe
        //this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        //this.game.scale.setScreenSize();

        //if (this.game.device.desktop)
        //    this.game.add.plugin(Phaser.Plugin.Debug);

        this.game.state.start('Preloader', true, false);
    }
}

module.exports = Boot;