'use strict';

var LineUI = require('../game_ui/LineUI'); 
var InventorySlot = require('../game_ui/InventorySlot'); 
var InventoryEquipmentSlot = require('../game_ui/InventoryEquipmentSlot'); 
var InventoryItem = require('../game_ui/InventoryItem'); 

var InventorySlots = function (game, g_player_1, tooltip, g_item, equipment_slots) {

    Phaser.Group.call(this, game);

    this.g_player_1 = g_player_1;
    this.tooltip = tooltip;
    this.g_item = g_item;
    this.name = "Inventory Slots";
    this.x = 0;
    this.equipment_slots = equipment_slots;

    this.ui_inventory_02 = this.create(960, 0, 'ui_back_02'); // 960
    this.ui_inventory_02.starting_X = this.ui_inventory_02.x;
    this.ui_inventory_02.width = 590;
    this.ui_inventory_02.height = 612;
    this.ui_inventory_02.right_side_tween = true;
    this.ui_inventory_02.name = "ui-right";


    // Pretty scrolling backgrounds
    this.back_lines_inventory = new LineUI(game, this.ui_inventory_02.x + 28, this.ui_inventory_02.y + 30, this.ui_inventory_02.width - 70, this.ui_inventory_02.height - 64);
    this.back_lines_inventory.name = 'inventory_lines';
    this.add(this.back_lines_inventory);




    // ------------------- INVENTORY --------------------
    this.item_map = [[1, 0, 0, 0, 0],
                     [0, 0, 1, 0, 0],
                     [0, 0, 0, 0, 0],
                     [0, 0, 0, 0, 0],
                     [0, 0, 0, 0, 0],
                     [1, 0, 0, 0, 0],
                     [0, 0, 0, 0, 0],
                     [0, 0, 0, 0, 0],
                     [0, 0, 0, 0, 0],
                     [0, 0, 0, 0, 0],
                     [0, 0, 0, 0, 0]
                     ];




    // --------------------- Groups ---------------------
    this.g_slot = this.game.make.group();
    this.g_slot.name = 'g_slot';
    this.g_slot.x = 0;//ui_inventory_02.x + 38;
    this.g_slot.y = 0;//ui_inventory_02.y + 61;
    this.add(this.g_slot);

    for (var i = 0; i < this.item_map.length; i++) {
        var g_slot_row = this.game.make.group();
        this.g_slot.add(g_slot_row);
    }



    // --------------------- Variables ---------------------
    this.slot_count = 0;
    this.item_count = 0;
    this.scroll_count = 0;
    this.max_scroll_count = 0;
    this.tween_trigger = 1;
    this.flag_contains_slot = false;
    this.flag_equipment_contains_slot = false;
    this.allow_open = true;



    // ----------------------- Slots -----------------------
    for (var y = 0, len_height = this.item_map.length; y < len_height; y++) {

        for (var x = 0, len_width = this.item_map[0].length; x < len_width; x++) {
            
            var _x = this.ui_inventory_02.x + 38 + x * 80;
            var _y = this.ui_inventory_02.y + 61 + y * 80;

            // Loads the inventory slots and their proprties
            var slot = new InventorySlot(this.game, _x, _y, x, y, this.slot_count, this.item_map[y][x]);
            this.g_slot.getAt(y).add(slot);

            if (x == 0) {
                this.g_slot.getAt(y).row = y;

                this.g_slot.getAt(y).tween_fade_out = this.game.add.tween(this.g_slot.getAt(y));
                this.g_slot.getAt(y).tween_fade_out.to({ alpha: 0 }, 300, Phaser.Easing.Quadratic.Out);

                this.g_slot.getAt(y).tween_fade_in = this.game.add.tween(this.g_slot.getAt(y));
                this.g_slot.getAt(y).tween_fade_in.to({ alpha: 1 }, 300, Phaser.Easing.Quadratic.Out);
            }

            // Disable out of window slots
            if (y > 5) {
                this.g_slot.getAt(y).alpha = 0;
                this.g_slot.getAt(y).exists = false;
            }

            // Loads items into the slots based on existing inventory
            this.load_item(slot, x, y);

            this.slot_count++;

        }
        // On each new row, add to the max scroll count
        this.max_scroll_count++;
    } 



    // ------------------Scroll bar/arrows------------------
    this.scroll_bar = this.create(436 + 960, 97, 'scroll_bar');
    this.scroll_bar.height = 405;
    this.scroll_bar.width = this.scroll_bar.width - 2;

    this.active_scroll_bar = this.create(436 + 960, 97, 'scroll_bar');
    this.active_scroll_bar.scrollable = true;
    this.active_scroll_bar.scroll_amount = 500;
    this.active_scroll_bar.height = 436;
    this.active_scroll_bar.height = this.active_scroll_bar.height / (this.max_scroll_count - 5);
    this.active_scroll_bar.width = this.active_scroll_bar.width - 2;
    this.SET_scroll_bar_tween(this.active_scroll_bar);

    var scroll_arrow_up = this.game.make.button(430 + 960, 55, 'scroll_arrow', this.f_scroll_bar_up, this);
    var scroll_arrow_down = this.game.make.button(430 + 960, 540, 'scroll_arrow', this.f_scroll_bar_down, this, 'test');
    scroll_arrow_down.scale.setTo(1, -1);
    this.add(scroll_arrow_up);
    this.add(scroll_arrow_down);




    // Sets each row and item to have it's own fade in/out and up/down scrolling tweens.
    this.g_slot.forEach(this.SET_scroll_tween, this);
    this.g_item.forEach(this.SET_scroll_tween, this);
};

InventorySlots.prototype = Object.create(Phaser.Group.prototype);
InventorySlots.prototype.constructor = InventorySlots;




InventorySlots.prototype.update = function () {
    this.back_lines_inventory.tilePosition.x -= 1;
    this.back_lines_inventory.tilePosition.y += 0.1;
}




InventorySlots.prototype.load_item = function (slot, x, y) {

    var item_name;


    // If slot has an item, get the name of the item to load into the item
    switch (slot.data) {
        case 1:
            item_name = 'weapon_blood_sword';
        break;
    }


    // If slot is empty, return
    if (slot.data == 0)
        return;



    // Loads item item and all its properties
    var item = new InventoryItem(this.game, slot.x, slot.y, this.release_item, this, item_name);
    this.g_item.add(item);
    item.set_properties(slot);


    // ----- Data -----
    item.data = this.game.itemDataObj[item_name];
}



InventorySlots.prototype.f_enter_complete = function (obj) {

    //this.allow_open = true;

    if (obj.r_slot != undefined) {
        obj.r_slot.x = obj.x;  
    } 
}
InventorySlots.prototype.f_exit_complete = function (obj) {

    //this.allow_open = true;

    this.scrolling = false;
    obj.exists = false;
    this.exists = false;
    this.visible = false;
}
InventorySlots.prototype.scroll = function (dir) {

    //console.log(this.scrolling + " " + dir + " " + this.scroll_count + " " + this.max_scroll_count)

    // Return if at the bottom of the inventory
    if (dir == 'down' && this.scroll_count == this.max_scroll_count - 6)
        return;
    else if (dir == 'up' && this.scroll_count == 0)
        return;
    // Return if already scrolling
    else if (this.scrolling)
        return;
        
    // Set directionally specific variables
    if (dir == 'up') {

        this.g_slot.forEach(this.f_scroll_up, this, false);
        this.scroll_count--;
        this.g_slot.getAt(this.scroll_count + 6).tween_fade_out.start();
        this.g_slot.getAt(this.scroll_count).tween_fade_in.start();

        this.g_item.forEach(this.f_scroll_up_item, this, false);

        this.active_scroll_bar.tween_scroll_up.start();
    }
    else if (dir == 'down') {

        this.g_slot.forEach(this.f_scroll_down, this, false);
        this.scroll_count++;
        this.g_slot.getAt(this.scroll_count + 5).tween_fade_in.start();
        this.g_slot.getAt(this.scroll_count - 1).tween_fade_out.start();

        this.g_item.forEach(this.f_scroll_down_item, this, false);

        this.active_scroll_bar.tween_scroll_down.start();
    }

    this.scrolling = true;
}
InventorySlots.prototype.f_scroll_bar_up = function () {

    this.scroll('up');
}
InventorySlots.prototype.f_scroll_bar_down = function () {

    this.scroll('down');
}
InventorySlots.prototype.f_scroll_up = function (q) {

    q.tween_scroll_up.start();
}
InventorySlots.prototype.f_scroll_down = function (q) {

    q.tween_scroll_down.start();
}
InventorySlots.prototype.f_scroll_up_item = function (q) {

    if (q.equipped)
        return;

        q.tween_scroll_up.start();

    if (q.row == this.scroll_count + 6) {
        q.tween_fade_out.start();
        q.input.draggable = false;
    }
    if (q.row == this.scroll_count) {
        q.tween_fade_in.start();
        q.input.draggable = true;
    }
}
InventorySlots.prototype.f_scroll_down_item = function (q) {

    if (q.equipped)
        return;

        q.tween_scroll_down.start();

    if (q.row == this.scroll_count + 5) {
        q.tween_fade_in.start();
        q.input.draggable = true;
    }
    if (q.row == this.scroll_count - 1) {
        q.tween_fade_out.start();
        q.input.draggable = false;
    }
}
InventorySlots.prototype.f_scroll_update_item_prev_Y = function (item, g_row) {

    if (item.row == g_row.row)
    item.prev_Y = g_row.y;
}




InventorySlots.prototype.f_check_contain_inventory = function (slot, item) {

    if (slot.getBounds().contains(this.game.input.activePointer.x, this.game.input.activePointer.y)
        && (slot.row >= this.scroll_count && slot.row <= this.scroll_count + 5)) {


        this.flag_contains_slot = true;



        // Item released on another item.
        if (this.item_map[slot.slot_Y][slot.slot_X] != 0) {
            
            this.return_to_original_slot_inventory(item);
            return;
        }        



        // Update slot/item.
        this.item_map[slot.slot_Y][slot.slot_X] = item.num_data;

        item.prev_slot_X = item.slot_X;
        item.prev_slot_Y = item.slot_Y;


        item.slot_X = slot.slot_X;
        item.slot_Y = slot.slot_Y;
        item.index = slot.index;
        item.x = slot.x - 475;
        item.y = slot.y - (this.scroll_count * 80);
        item.prev_X = item.x + 475;
        item.prev_Y = item.y;
        item.row = slot.row;

        if (item.equipped) {

            this.equip_remove_item(item, -1);
            item.equipped = false;
        }

        this.update_tooltip_location(item, this.tooltip);

        item.SET_tweens(item.equipped);

        // After release, re-sets the item tweens to reflect its new Y location.
        this.SET_scroll_tween(item);
    }
}
InventorySlots.prototype.f_check_contain_equipment = function (slot, item) {

    if (slot.getBounds().contains(this.game.input.activePointer.x, this.game.input.activePointer.y)) {

        // Slot is occupied.
        if (slot.data != 0 || !this.equip_item_check(slot, item)) {
            if (!item.equipped)
                this.return_to_original_slot_inventory(item);
            else
                this.return_to_original_slot_equipment(item);
            return;
        }



        // Equip item.
        if (!item.equipped) {
            item.equipped = true;
            this.equip_remove_item(item, 1);
        }



        // Update tooltip location.
        this.update_tooltip_location(item, this.tooltip);



        // Slot/item data.
        slot.data = item.num_data;

        item.prev_slot_X = item.slot_X;
        item.prev_slot_Y = item.slot_Y;

        item.slot_X = slot.slot_X;
        item.slot_Y = slot.slot_Y;
        item.index = slot.index;

        item.x = slot.x + 370;
        item.y = slot.y;
        item.prev_X = item.x;
        item.prev_Y = item.y;
        item.row = slot.row;
        this.flag_equipment_contains_slot = true;

        item.SET_tweens(item.equipped);
    }
}




InventorySlots.prototype.equip_item_check = function (slot, item) {

    var slot_index = slot.index;

    switch (slot_index) {
        case 0:
        if (item.item_type != 'head')
            return false;
        else
            return true;
        break;
        case 1:
        if (item.item_type != 'body')
            return false;
        else
            return true;
        break;
        case 2:
        if (item.item_type != 'pants')
            return false;
        else
            return true;
        break;
        case 3:
        if (item.item_type != 'feet')
            return false;
        else
            return true;
        break;
        case 4:
        if (item.item_type != 'amulet')
            return false;
        else
            return true;
        break;
        case 5:
        if (item.item_type != 'artifact')
            return false;
        else
            return true;
        break;
        case 6:
        if (item.item_type != 'ring')
            return false;
        else
            return true;
        break;
        case 7:
        if (item.item_type != 'ring')
            return false;
        else
            return true;
        break;
        case 8:
        if (item.item_type != 'weapon')
            return false;
        else
            return true;
        break;
        case 9:
        if (item.item_type != 'offhand')
            return false;
        else
            return true;
        break;
    }
}
InventorySlots.prototype.equip_remove_item = function (item, mod) {

    var g_player_1 = this.g_player_1;
    var equipment_slots = this.equipment_slots;
    var item = item.data;

    for (var i = 1; i < 10; i++) {
        if (item['mod_' + i]) {
            
            switch (item['mod_' + i].split("_")[0]) {
                case "STR":
                g_player_1.strength += parseInt(item['mod_' + i].split("_")[1]) * mod;
                break;

                case "VIT":
                g_player_1.vitality += parseInt(item['mod_' + i].split("_")[1]) * mod;
                break;

                case "DEX":
                g_player_1.dexterity += parseInt(item['mod_' + i].split("_")[1]) * mod;
                break;

                case "INT":
                g_player_1.intelligence += parseInt(item['mod_' + i].split("_")[1]) * mod;
                break;

                case "VAMP":
                g_player_1.health_steal += parseInt(item['mod_' + i].split("_")[1]) * mod;
                break;
            }
        }
    }

    g_player_1.max_hp = g_player_1.vitality * 10;
    g_player_1.min_attack = g_player_1.strength * 2 + g_player_1.min_attack;
    g_player_1.max_attack = g_player_1.strength * 2 + g_player_1.max_attack;

    // Update HP bar to reflect g_players changed max HP
    g_player_1.hp_bar.getAt(1).r_crop.before_width = g_player_1.hp_bar.getAt(1).r_crop.width;
    g_player_1.hp_bar.getAt(1).r_crop.width = (g_player_1.hp_bar.max_width * (g_player_1.hp / g_player_1.max_hp));
    g_player_1.hp_bar.getAt(1).r_crop.after_width = g_player_1.hp_bar.getAt(1).r_crop.width;

    equipment_slots.t_STR_data.setText(g_player_1.strength + "  ");
    equipment_slots.t_VIT_data.setText(g_player_1.vitality + "  ");
    equipment_slots.t_DEX_data.setText(g_player_1.dexterity + "  ");
    equipment_slots.t_INT_data.setText(g_player_1.intelligence + "  ");
    equipment_slots.t_LUK_data.setText(g_player_1.luck + "  ");

    //this.g_extended_stat_text.forEach(this.set_extended_stat_data, this)

    this.color_change_above_base_stats();
}
InventorySlots.prototype.color_change_above_base_stats = function () {

    var equipment_slots = this.equipment_slots;
    var g_player_1 = this.g_player_1;

    if (g_player_1.strength != g_player_1.base_strength)
        equipment_slots.t_STR_data.setStyle(equipment_slots.green);
    else
        equipment_slots.t_STR_data.setStyle(equipment_slots.yellow);

    if (g_player_1.vitality != g_player_1.base_vitality)
        equipment_slots.t_VIT_data.setStyle(equipment_slots.green);
    else
        equipment_slots.t_VIT_data.setStyle(equipment_slots.yellow);

    if (g_player_1.dexterity != g_player_1.base_dexterity)
        equipment_slots.t_DEX_data.setStyle(equipment_slots.green);
    else
        equipment_slots.t_DEX_data.setStyle(equipment_slots.yellow);

    if (g_player_1.intelligence != g_player_1.base_intelligence)
        equipment_slots.t_INT_data.setStyle(equipment_slots.green);
    else
        equipment_slots.t_INT_data.setStyle(equipment_slots.yellow);

    if (g_player_1.luck != g_player_1.base_luck)
        equipment_slots.t_LUK_data.setStyle(equipment_slots.green);
    else
        equipment_slots.t_LUK_data.setStyle(equipment_slots.yellow);

    equipment_slots.t_STR_data.setShadow(2, 2, 'rgba(0,0,0,1)', 0);
    equipment_slots.t_VIT_data.setShadow(2, 2, 'rgba(0,0,0,1)', 0);
    equipment_slots.t_DEX_data.setShadow(2, 2, 'rgba(0,0,0,1)', 0);
    equipment_slots.t_INT_data.setShadow(2, 2, 'rgba(0,0,0,1)', 0);
    equipment_slots.t_LUK_data.setShadow(2, 2, 'rgba(0,0,0,1)', 0);
    
    equipment_slots.t_STR_data.updateText();
    equipment_slots.t_VIT_data.updateText();
    equipment_slots.t_DEX_data.updateText();
    equipment_slots.t_INT_data.updateText();
    equipment_slots.t_LUK_data.updateText();
}




InventorySlots.prototype.return_to_original_slot_inventory = function (item) {

    // Item was equipped
    if (item.equipped) {
        this.return_to_original_slot_equipment(item);
        return;
    }

    // Sets the item coords/position back to its previous coords/position
    item.slot_X = item.prev_slot_X;
    item.slot_Y = item.prev_slot_Y;

    // Dropped in no slot.
    item.x = item.prev_X - 475;
    item.y = item.prev_Y;

    

    // Update the inventory slot item was moved back into
    this.item_map[item.slot_Y][item.slot_X] = item.num_data; 
}
InventorySlots.prototype.return_to_original_slot_equipment = function (item) {

    // Dropped in no slot.
    item.x = this.equipment_slots.g_equipment_slot.getAt(item.index).x + 370;
    item.y = this.equipment_slots.g_equipment_slot.getAt(item.index).y;

    item.equipped = true;
    this.equipment_slots.g_equipment_slot.getAt(item.index).data = item.data;
}



InventorySlots.prototype.SET_enter_exit_tween = function () {

    this.tween_enter = this.game.add.tween(this);
    this.tween_enter.to({ x: this.x - 475 }, 800, Phaser.Easing.Quadratic.Out);
    this.tween_enter.onComplete.add(this.f_enter_complete, this);

    this.tween_exit = this.game.add.tween(this);
    this.tween_exit.to({ x: this.x + 475 }, 800, Phaser.Easing.Quadratic.In);
    this.tween_exit.onComplete.add(this.f_exit_complete, this);
}
InventorySlots.prototype.SET_scroll_tween = function (obj) {

    this.scrolling = false;

    if (obj.name = "g_slot")
        this.g_item.forEach(this.f_scroll_update_item_prev_Y, this, false, obj);

    obj.tween_scroll_up = this.game.add.tween(obj);
    obj.tween_scroll_up.to({ y: obj.y + 80 }, 500, Phaser.Easing.Quadratic.Out);
    obj.tween_scroll_up.onComplete.add(this.SET_scroll_tween, this);

    obj.tween_scroll_down = this.game.add.tween(obj);
    obj.tween_scroll_down.to({ y: obj.y - 80 }, 500, Phaser.Easing.Quadratic.Out);
    obj.tween_scroll_down.onComplete.add(this.SET_scroll_tween, this);
}
InventorySlots.prototype.SET_scroll_bar_tween = function (obj) {

    var scroll_amt = -(this.scroll_bar.height / (this.max_scroll_count - 5));

    obj.tween_scroll_up = this.game.add.tween(obj);
    obj.tween_scroll_up.to({ y: obj.y + scroll_amt }, 500, Phaser.Easing.Quadratic.Out);
    obj.tween_scroll_up.onComplete.add(this.SET_scroll_bar_tween, this);

    obj.tween_scroll_down = this.game.add.tween(obj);
    obj.tween_scroll_down.to({ y: obj.y - scroll_amt }, 500, Phaser.Easing.Quadratic.Out);
    obj.tween_scroll_down.onComplete.add(this.SET_scroll_bar_tween, this);

    this.scrolling = false;
}





InventorySlots.prototype.update_tooltip_location = function (item, tooltip) {

    tooltip.visible = true;
    tooltip.update_stat_text(item.data);


    var open_slot_x = item.x + 80;


    // Do an initial position reset so we can tell if the tooltip goes offscreen
    tooltip.x = open_slot_x;
    tooltip.y = item.y;


    var right_side = tooltip.getAt(0).width + tooltip.x;
    var left_side = tooltip.x;
    var bottom_side = tooltip.getAt(0).height + tooltip.y;
    var top_side = tooltip.y;


    // Tooltip off right side
    if (right_side > this.game.width) {
        tooltip.x -= tooltip.getAt(0).width + 80;
    }


    // Tooltip off left side
    if (left_side < -10) 
        tooltip.x = 0;


    // Tooltip off bottom side
    if (bottom_side > this.game.height) 
        tooltip.y -= bottom_side - this.game.height;


    // Tooltip off top side
    if (top_side < this.game.world.x)
        tooltip.y = 0;
}





module.exports = InventorySlots;