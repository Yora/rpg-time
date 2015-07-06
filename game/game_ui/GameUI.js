'use strict';

var InventoryMenu = require('../game_ui/inventory/InventoryMenu'); 
var BattleMenu = require('../game_ui/BattleMenu'); 
var InventorySlots = require('../game_ui/inventory/InventorySlots'); 

var GameUI = function (game) {

    Phaser.Group.call(this, game);

    // ----- UI ------
    //this.skill_1 = new SkillButton(855, 545, 'weapon-blood-sword', g_player_1);
    //this.add(this.skill_1);

    //this.skill_UI = this.game.add.sprite(690, 370, 'skill_UI');
    //this.add(this.skill_UI);

    
};

GameUI.prototype = Object.create(Phaser.Group.prototype);
GameUI.prototype.constructor = GameUI;


GameUI.prototype.open_inventory = function () {
/*
    if (!this.inventory.scrolling)
        this.inventory_icon.trigger = !this.inventory_icon.trigger;
    else
        return;

    if (this.inventory_icon.trigger) {
        this.inventory.forEach(this.inventory.enter_screen, this.inventory);
    } else {
        this.inventory.forEach(this.inventory.exit_screen, this.inventory);
    }
    */
}

module.exports = GameUI;