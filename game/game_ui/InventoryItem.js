'use strict';

var InventoryItem = function (game, x, y, callback, context, item_name) {

    Phaser.Button.call(this, game, x, y, game.cache.getBitmapData(item_name), callback, context);



    this.x = x;
    this.y = y;
    this.item_name = item_name;
    this.context = context;



    this.inputEnabled = true;
    this.input.enableDrag(true);
    this.item_type = this.item_name.split("_")[0];
    this.scrollable = true;
    this.slot_X = x;
    this.slot_Y = y;
    this.prev_slot_X = this.slot_X;
    this.prev_slot_Y = this.slot_Y;
    this.starting_x = this.x;
    this.prev_X = this.x;
    this.prev_Y = this.y;
    this.num_data = 1;  // 1 for bloodsword
    this.equipped = false;



    this.onInputOver.add(this.over_item, this.context);
    this.onInputOut.add(this.out_item, this.context);    
    this.onInputDown.add(this.grab_item, this.context);
    this.onInputUp.add(this.release_item, this.context);



    this.tween_fade_out = this.game.add.tween(this);
    this.tween_fade_out.to({ alpha: 0 }, 300, Phaser.Easing.Quadratic.Out);

    this.tween_fade_in = this.game.add.tween(this);
    this.tween_fade_in.to({ alpha: 1 }, 300, Phaser.Easing.Quadratic.Out);

    this.tween_enter = this.game.add.tween(this);
    this.tween_enter.to({ x: this.x - 475 }, 800, Phaser.Easing.Quadratic.Out);

    this.tween_exit = this.game.add.tween(this);
    this.tween_exit.to({ x: this.x + 475 }, 800, Phaser.Easing.Quadratic.In);
};

InventoryItem.prototype = Object.create(Phaser.Button.prototype);
InventoryItem.prototype.constructor = InventoryItem;



    
InventoryItem.prototype.SET_tweens = function (equipped) {

    if (!equipped) {

        this.tween_enter = this.game.add.tween(this);
        this.tween_enter.to({ x: this.x }, 800, Phaser.Easing.Quadratic.Out);

        this.tween_exit = this.game.add.tween(this);
        this.tween_exit.to({ x: this.x + 475 + 475 }, 800, Phaser.Easing.Quadratic.In);

    } else {

        this.tween_enter = this.game.add.tween(this);
        this.tween_enter.to({ x: this.x }, 800, Phaser.Easing.Quadratic.Out);

        this.tween_exit = this.game.add.tween(this);
        this.tween_exit.to({ x: this.x - 370 - 370 }, 800, Phaser.Easing.Quadratic.In);
    }
}




InventoryItem.prototype.set_properties = function (slot) {

    this.index = slot.index;
    this.row = slot.row;
    this.slot_X = slot.array_x;
    this.slot_Y = slot.array_y;
}




InventoryItem.prototype.get_item_data = function () {
    switch (this.type) {

        case 'armor':
        break;

        case 'weapon':

            GLOBAL_init_weapon(this);

        break;
    }

    if (this.rarity) {
        switch (this.rarity) {
            case 'rare':

            break;
        }
    }
}




InventoryItem.prototype.over_item = function (item) {

    // Updates item tooltip location
    if (item.row < this.scroll_count || item.row > this.scroll_count + 5)
        return;

    //this.tooltip.update_stat_text(item.data); 
    this.update_tooltip_location(item, this.tooltip);
}
InventoryItem.prototype.out_item = function (item) {

    if (item.row < this.scroll_count || item.row > this.scroll_count + 5)
        return;

    this.tooltip.x = 0;
    this.tooltip.y = 0;
    this.tooltip.visible = false;
}
InventoryItem.prototype.grab_item = function (item) {

    this.tooltip.visible = false;
    this.tooltip.exists = false;


    if (item.row < this.scroll_count || item.row > this.scroll_count + 5)
        return;


    item.loadTexture(item.item_name + "_icon");


    // Un-sets the slot and inventory connection with the item
    if (!item.equipped)
        this.item_map[item.slot_Y][item.slot_X] = 0;

    if (item.equipped)
        this.equipment_slots.g_equipment_slot.getAt(item.index).data = 0;


    // Sets the items previous slot
    item.prev_slot_X = item.slot_X;
    item.prev_slot_Y = item.slot_Y;
}
InventoryItem.prototype.release_item = function (item) {

    // Outside visible range
    if (item.row < this.scroll_count || item.row > this.scroll_count + 5)
        return;


    // Removes rarity box so only item is shown
    item.loadTexture(this.game.cache.getBitmapData(item.item_name));



    // If item was released inside the equipment UI
    if (item.x < 300) {
        for (var e = 0; e < 10; e++) 
            this.f_check_contain_equipment(this.equipment_slots.g_equipment_slot.getAt(e), item);    
        


        // No slot contained pointer.
        if (!this.flag_equipment_contains_slot) {

            if (item.equipped)
                this.return_to_original_slot_equipment(item);
            else
                this.return_to_original_slot_inventory(item);

        } else 
            this.flag_equipment_contains_slot = false;

        return;
    }



    // Slot contain mouse pointer?
    for (var e = 0; e < this.max_scroll_count; e++)
        this.g_slot.getAt(e).forEach(this.f_check_contain_inventory, this, true, item);



    // No slot contained pointer.
    if (!this.flag_contains_slot) 
        this.return_to_original_slot_inventory(item);
    else 
        this.flag_contains_slot = false;
}



module.exports = InventoryItem;