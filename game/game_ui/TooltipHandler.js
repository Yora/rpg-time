'use strict';

var Tooltip = require('../game_ui/Tooltip'); 

var TooltipHandler = function (game, starting_slot, g_player_1) {

    Phaser.Group.call(this, game);

    this.g_player_1 = g_player_1;
    this.starting_slot = starting_slot;

    for (var i = 0; i < 1; i++) {
        var tooltip = new Tooltip(game, 0, 0, '', this.starting_slot, this.g_player_1);
        tooltip.visible = false;
        tooltip.exists = false;
        this.add(tooltip);
    }

};

TooltipHandler.prototype = Object.create(Phaser.Group.prototype);
TooltipHandler.prototype.constructor = TooltipHandler;

module.exports = TooltipHandler;