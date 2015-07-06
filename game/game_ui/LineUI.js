'use strict';

var LineUI = function (game, x, y, width, height) {

    Phaser.TileSprite.call(this, game, x, y, width, height, 'ui_back_lines_04');

};

LineUI.prototype = Object.create(Phaser.TileSprite.prototype);
LineUI.prototype.constructor = LineUI;


module.exports = LineUI;

