'use strict';

var InventoryEquipmentSlot = function (game, x, y, index) {

    Phaser.Sprite.call(this, game, x, y, 'inventory_slot');

    this.r_slot = new Phaser.Rectangle(this.x, this.y, 75, 75);
    this.index = index;
    this.data = 0;
    this.type = "equipment_slot";
    this.starting_X = this.x;
    this.occupied = false;
};

InventoryEquipmentSlot.prototype = Object.create(Phaser.Sprite.prototype);
InventoryEquipmentSlot.prototype.constructor = InventoryEquipmentSlot;

module.exports = InventoryEquipmentSlot;