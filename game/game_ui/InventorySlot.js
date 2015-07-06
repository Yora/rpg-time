'use strict';

var InventorySlot = function (game, _x, _y, array_x, array_y, slot_count, data) {

    Phaser.Sprite.call(this, game, 0, 0, 'inventory_slot');

    this.x = _x;//array_x * 80;// + 1000;
    this.y = _y;//array_y * 80;// + 60;
    this.array_x = array_x;
    this.array_y = array_y;
    this.index = slot_count;
    this.data = data;

    //this.width = 75;
    //this.height = 75;
    this.name2 = "slot";
    this.r_slot = new Phaser.Rectangle(this.x, this.y, 80, 80);
    this.scrollable = true;
    //this.data = this.item_map[array_y][array_x];
    this.slot_X = array_x;
    this.slot_Y = array_y;
    this.starting_X = this.x;
    this.starting_Y = this.y;
    this.tween_X = this.x;
    this.open_inventory_tween_amount = -555;
    this.open_inventory_x = this.x + this.open_inventory_tween_amount;
    this.row = array_y;

};

InventorySlot.prototype = Object.create(Phaser.Sprite.prototype);
InventorySlot.prototype.constructor = InventorySlot;

module.exports = InventorySlot;