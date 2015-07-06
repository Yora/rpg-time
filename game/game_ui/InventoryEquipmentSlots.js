'use strict';

var LineUI = require('../game_ui/LineUI'); 
var InventorySlot = require('../game_ui/InventorySlot'); 
var InventoryEquipmentSlot = require('../game_ui/InventoryEquipmentSlot'); 
var InventoryItem = require('../game_ui/InventoryItem'); 

var InventoryEquipmentSlots = function (game, tooltip, player, g_item) {

    Phaser.Group.call(this, game);

    this.tooltip = tooltip;
    this.player = player;
    this.g_item = g_item;
    this.name = "Equipment Slots";




    // -------------------- VARIABLES --------------------
    this.slot_count = 0;
    this.item_count = 0;
    this.scroll_count = 0;
    this.max_scroll_count = 0;
    this.flag_contains_slot = false;
    this.scroll_limiter = 0;
    this.extended_stat_height = -20;
    this.momentum_y = 0;
    this.prev_pointer_y = 0;
    this.touch_update_flag_extended_stats = false;




    // ----------------------- UI ------------------------
    this.ui_equipment = this.create(-480, 0, 'ui_back_02');
    this.ui_equipment.starting_X = this.ui_equipment.x;
    this.ui_equipment.width = 480;
    this.ui_equipment.height = 612;
    this.ui_equipment.name = "ui-left";

    // Extended stat info background UI
    this.extended_stat_ui = this.create(this.ui_equipment.x + 269, this.ui_equipment.y + 360, 'extended_stat_ui');





    // Pretty scrolling backgrounds
    this.back_lines_equipment = new LineUI(game, this.ui_equipment.x - 28, this.ui_equipment.y + 30, 480, 546);
    this.back_lines_equipment.name = 'equipment_lines';
    this.add(this.back_lines_equipment);





    // --------------------- Groups ---------------------
    this.g_equipment_slot = this.game.make.group();
    this.add(this.g_equipment_slot);


    this.g_ui_stats = this.game.make.group();
    for (var i = 0; i < 5; i++) 
        this.g_ui_stats.create(this.ui_equipment.x + 106 - (i * 3), 360 + (i * 43), 'stat_ui_back');
    this.add(this.g_ui_stats);


    this.g_extended_stat_text = this.game.make.group();
    this.add(this.g_extended_stat_text);
    this.INIT_TEXT();


 

    // ------------------Scroll bar/arrows------------------
    this.extended_stat_scroll_bar = this.create(this.ui_equipment.x + 446, this.ui_equipment.y + 405, 'scroll_bar');
    this.extended_stat_scroll_bar.scrollable = true;
    this.extended_stat_scroll_bar.scroll_amount = 500;
    this.extended_stat_scroll_bar.height = 210;
    this.extended_stat_scroll_bar.height = this.extended_stat_scroll_bar.height / (this.max_scroll_count - 5);
    this.extended_stat_scroll_bar.width = 8;    




    // Initiate eqipment slots
    this.init_equipment_slots();




    this.game.time.events.loop(16, this.f_update_text, this);




    // Sets enter/exit screen tweens for whole menu
    //this.SET_enter_exit_tween(this);
};

InventoryEquipmentSlots.prototype = Object.create(Phaser.Group.prototype);
InventoryEquipmentSlots.prototype.constructor = InventoryEquipmentSlots;




InventoryEquipmentSlots.prototype.load_item = function (slot, x, y) {

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

    //item.onInputOver.add(this.game.state.callbackContext.OVER_ITEM, this.game.state.callbackContext);
    
    // ----- Data -----
    item.data = this.game.itemDataObj[item_name];


    // Gives the slot the item inhibits a property reflecting that item
    slot.child_item = item;

    if (slot.out_of_menu) {
        item.alpha = 0;
    }
}




InventoryEquipmentSlots.prototype.INIT_TEXT = function () {

    this.rare_color = { font: '24px Righteous', fill: "#990066", align: "center" };  
    this.white = { font: '30px Righteous', fill: "#FFFFFF", align: "center" };
    this.yellow = { font: '30px Righteous', fill: "#FFFF00", align: "center" };
    this.grey = { font: '30px Righteous', fill: "#CCCCCC", align: "center" };
    this.green = { font: '30px Righteous', fill: "#00FF00", align: "center" };
    this.extended_text_style = { font: '26px Agency FB', fill: "ADE9E9", align: "center" };
    this.extended_text_style_yellow = { font: '26px Agency FB', fill: "FFFF00", align: "center" };
    this.extended_text_style_red = { font: '26px Agency FB', fill: "FF0000", align: "center" };

    this.t_LVL = this.game.make.text(this.ui_equipment.x + 360, this.ui_equipment.y + 320, 'Lv:  ', this.grey);
    this.t_STR = this.game.make.text(this.ui_equipment.x + 120, 360, 'STR: ', this.white);
    this.t_VIT = this.game.make.text(this.ui_equipment.x + 120, this.t_STR.y + 43, 'VIT: ', this.white);
    this.t_DEX = this.game.make.text(this.ui_equipment.x + 120, this.t_VIT.y + 43, 'DEX: ', this.white);
    this.t_INT = this.game.make.text(this.ui_equipment.x + 120, this.t_DEX.y + 43, 'INT: ', this.white);
    this.t_LUK = this.game.make.text(this.ui_equipment.x + 120, this.t_INT.y + 43, 'LUK: ', this.white);
    this.t_LVL_data = this.game.make.text(this.t_LVL.x + this.t_LVL.width, this.t_LVL.y, this.player.level + "  ", this.yellow);
    this.t_STR_data = this.game.make.text(this.t_STR.x + this.t_STR.width, this.t_STR.y, this.player.strength + "  ", this.yellow);
    this.t_VIT_data = this.game.make.text(this.t_VIT.x + this.t_VIT.width, this.t_VIT.y, this.player.vitality + "  ", this.yellow);
    this.t_DEX_data = this.game.make.text(this.t_DEX.x + this.t_DEX.width, this.t_DEX.y, this.player.dexterity + "  ", this.yellow);
    this.t_INT_data = this.game.make.text(this.t_INT.x + this.t_INT.width, this.t_INT.y, this.player.intelligence + "  ", this.yellow);
    this.t_LUK_data = this.game.make.text(this.t_LUK.x + this.t_LUK.width, this.t_LUK.y, this.player.luck + "  ", this.yellow);

    this.t_LVL.setShadow(2, 2, 'rgba(0,0,0,1)', 0);
    this.t_STR.setShadow(2, 2, 'rgba(0,0,0,1)', 0);
    this.t_VIT.setShadow(2, 2, 'rgba(0,0,0,1)', 0);
    this.t_DEX.setShadow(2, 2, 'rgba(0,0,0,1)', 0);
    this.t_INT.setShadow(2, 2, 'rgba(0,0,0,1)', 0);
    this.t_LUK.setShadow(2, 2, 'rgba(0,0,0,1)', 0);
    this.t_LVL_data.setShadow(2, 2, 'rgba(0,0,0,1)', 0);
    this.t_STR_data.setShadow(2, 2, 'rgba(0,0,0,1)', 0);
    this.t_VIT_data.setShadow(2, 2, 'rgba(0,0,0,1)', 0);
    this.t_DEX_data.setShadow(2, 2, 'rgba(0,0,0,1)', 0);
    this.t_INT_data.setShadow(2, 2, 'rgba(0,0,0,1)', 0);
    this.t_LUK_data.setShadow(2, 2, 'rgba(0,0,0,1)', 0);

    this.add(this.t_LVL);
    this.add(this.t_STR);
    this.add(this.t_VIT);
    this.add(this.t_DEX);
    this.add(this.t_INT);
    this.add(this.t_LUK);
    this.add(this.t_LVL_data);
    this.add(this.t_STR_data);
    this.add(this.t_VIT_data);
    this.add(this.t_DEX_data);
    this.add(this.t_INT_data);
    this.add(this.t_LUK_data);


    // Extended stat info
    this.stat_index = 0;
    this.init_extended_stat_text('t_damage', 'Damage:  ');
    this.init_extended_stat_text('t_magic_damage', 'Magic Damage:  ');
    this.init_extended_stat_text('t_attack_speed', 'Attack Speed:  ');
    this.init_extended_stat_text('t_move_speed', 'Move Speed:  ');
    this.init_extended_stat_text('t_critical_rating', 'Critical Rating:  ');
    this.init_extended_stat_text('t_defense', 'Defense:  ');
    this.init_extended_stat_text('t_magic_defense', 'Magic Defense:  ');
    this.init_extended_stat_text('t_evade', 'Evade:  ');
    this.init_extended_stat_text('t_health_regen', 'HP/min:  ');
    this.init_extended_stat_text('t_magic_regen', 'MP/min:  ');
    this.init_extended_stat_text('t_bonus_exp', 'Bonus EXP:  ');
    this.init_extended_stat_text('t_bonus_gold', 'Bonus Gold:  ');
}
InventoryEquipmentSlots.prototype.init_extended_stat_text = function (name, text) {

    var index = this.stat_index;
    var x = this.extended_stat_ui.x + 8;

    // Starting position, everything else cascades based off index
    if (index == 0)
        var y = this.extended_stat_ui.y + 10;
    else
        var y = this.prev_text_obj.y + this.prev_text_obj.height - 3;

    // The clump group
    this['g_extended_stat_grouping_' + index] = this.game.add.group();

    // Adds a line below the stat
    this[name + '_line'] = this.init_extended_stat_line(0, 30 + (index * 30), 160, 30 + (index * 30));

    // The name of the stat
    this[name] = this.game.add.text(x, y, text, this.extended_text_style);
    this.prev_text_obj = this[name];

    // The dynamic numerical value of the stat in yellow text
    this[name + '_data'] = this.game.add.text(this.prev_text_obj.x + this.prev_text_obj.width, this.prev_text_obj.y, '0  ', this.extended_text_style_yellow);
    this[name + '_data'].name = name;
    //this.set_extended_stat_data(this[name + '_data']);

    this['g_extended_stat_grouping_' + index].mod = index * 30;

    this['g_extended_stat_grouping_' + index].add(this[name + '_line']);
    this['g_extended_stat_grouping_' + index].add(this[name]);
    this['g_extended_stat_grouping_' + index].add(this[name + '_data']);
    this.g_extended_stat_text.add(this['g_extended_stat_grouping_' + index]);

    this.stat_index++;
    if (index >= 7) 
        this.extended_stat_height -= 30;
}
InventoryEquipmentSlots.prototype.init_extended_stat_line = function (start_x, start_y, to_x, to_y, line) {

    // Make a line for the extended stat menu
    line = this.game.add.graphics(this.extended_stat_ui.x + 9, this.extended_stat_ui.y + 9);
    line.lineStyle(2, 0x425D5D, 1);
    line.moveTo(start_x, start_y);
    line.lineTo(to_x, to_y);
    return line;
}
InventoryEquipmentSlots.prototype.set_extended_stat_data = function (extended_stat_group) {

    if (!(extended_stat_group instanceof Phaser.Group)) return;

    text_obj = extended_stat_group.getAt(2);

    name = text_obj.name;
    
    switch (name.slice(2, name.length)) {
        case 'damage':
        text_obj.setText(this.player.min_attack + "-" + this.player.max_attack);
        break;
        case 'damage':
        text_obj.setText(this.player.min_attack + "-" + this.player.max_attack);
        break;
    }
}




InventoryEquipmentSlots.prototype.update = function () {   

    this.back_lines_equipment.tilePosition.x -= 1;
    this.back_lines_equipment.tilePosition.y += 0.1;
}
InventoryEquipmentSlots.prototype.update_text = function (q) {

    // If stat scrolled off the top
    if (q.y < 5 - q.mod && q.y >= -20 - q.mod) {
        q.alpha = 1 + Math.sin((q.y + 5 + q.mod) / 20) * 3;

    //If stat scrolled off the bottom
    } else if (q.y > 155 - q.mod && q.y <= 170 - q.mod) {
        q.alpha = Math.cos((q.y - 155 + q.mod) / 10);        
    }

    // If it's in the guud zone, make it 1
    if (q.y < 165 - q.mod && q.y > 10 - q.mod) {
        q.alpha = 1;

    // If it's far off the top or bottom, keep it invisible
    } else if (q.y > 170 - q.mod || q.y < -10 - q.mod) {
        q.alpha = 0;
    } 
}
InventoryEquipmentSlots.prototype.f_update_text = function (q) {

    this.g_extended_stat_text.forEach(this.update_text, this);

    //  ----- Inventory menu updates ----- 

    // If not scrolling off the top or bottom (-160)
    if (this.g_extended_stat_text.getAt(0).y <= 0 && this.g_extended_stat_text.getAt(0).y >= -170) {
        this.g_extended_stat_text.forEach(this.update_momentum, this);
        this.update_momentum_scroll_bar(this.extended_stat_scroll_bar);
    
        if (this.touch_update_flag_extended_stats)
            this.touch_update();

        if (this.momentum_y != 0)
            this.momentum_y /= 1.05;

    // Else, stop the momentum and undo any movement.
    } else {

        if (this.momentum_y < 0)
            this.scroll_limiter = 1;
        if (this.momentum_y >= 0)
            this.scroll_limiter = -1;

        this.g_extended_stat_text.forEach(this.stop_momentum, this);   
        this.stop_momentum_scroll_bar(this.extended_stat_scroll_bar);
             
    }
}
InventoryEquipmentSlots.prototype.update_momentum = function (q) {

        q.y -= this.momentum_y;
}
InventoryEquipmentSlots.prototype.stop_momentum = function (q) {

    this.momentum_y = 0;

    if (this.scroll_limiter == 1)
        q.y = 0;
    if (this.scroll_limiter == -1)
        q.y = this.extended_stat_height;
}
InventoryEquipmentSlots.prototype.update_momentum_scroll_bar = function (q) {

    //scroll bar goes opposite way
    q.y += this.momentum_y;
}
InventoryEquipmentSlots.prototype.stop_momentum_scroll_bar = function (q) {

    if (this.scroll_limiter == 1)
        q.y = this.ui_equipment.y + 405;
    if (this.scroll_limiter == -1)
        q.y = this.ui_equipment.y + 405 - this.extended_stat_height;
}




InventoryEquipmentSlots.prototype.touchInputUp = function () {

    this.touch_update_flag_extended_stats = false;
}
InventoryEquipmentSlots.prototype.touchInputDown = function () {

    this.scroll_limiter = 0;
    this.prev_pointer_y = this.game.input.activePointer.y;

    if (this.extended_stat_ui.getBounds().contains(this.game.input.activePointer.x, this.game.input.activePointer.y))
        this.touch_update_flag_extended_stats = true;
}
InventoryEquipmentSlots.prototype.touch_update = function () {

    if (this.scroll_limiter == 1) {
        if (this.prev_pointer_y > this.game.input.activePointer.y) {
            this.scroll_limiter = 0;
            this.momentum_y = (this.prev_pointer_y - this.game.input.activePointer.y) / 3;
        }  
    this.prev_pointer_y = this.game.input.activePointer.y;
    }

    if (this.scroll_limiter == -1) {
        if (this.prev_pointer_y < this.game.input.activePointer.y) {
            this.scroll_limiter = 0;
            this.momentum_y = (this.prev_pointer_y - this.game.input.activePointer.y) / 3;
        }  
    this.prev_pointer_y = this.game.input.activePointer.y;
    }

    if (this.scroll_limiter == 0) {

        if (this.prev_pointer_y != this.game.input.activePointer.y) {
            this.momentum_y = (this.prev_pointer_y - this.game.input.activePointer.y) / 3;
            this.prev_pointer_y = this.game.input.activePointer.y;
        }   
    }

    if (this.momentum_y > 4)
        this.momentum_y = 4;
    if (this.momentum_y < -4)
        this.momentum_y = -4;
}




InventoryEquipmentSlots.prototype.SET_enter_exit_tween = function () {

    this.tween_enter = this.game.add.tween(this);
    this.tween_enter.to({ x: this.x + 370 }, 800, Phaser.Easing.Quadratic.Out);
    this.tween_enter.onComplete.add(this.f_enter_complete, this);

    this.tween_exit = this.game.add.tween(this);
    this.tween_exit.to({ x: this.x - 370 }, 800, Phaser.Easing.Quadratic.In);
    this.tween_exit.onComplete.add(this.f_exit_complete, this);
}
InventoryEquipmentSlots.prototype.SET_scroll_bar_tween = function (obj) {

    var scroll_amt = -(this.scroll_bar.height / (this.max_scroll_count - 5));

    obj.tween_scroll_up = this.game.add.tween(obj);
    obj.tween_scroll_up.to({ y: obj.y + scroll_amt }, 500, Phaser.Easing.Quadratic.Out);
    obj.tween_scroll_up.onComplete.add(this.SET_scroll_bar_tween, this);

    obj.tween_scroll_down = this.game.add.tween(obj);
    obj.tween_scroll_down.to({ y: obj.y - scroll_amt }, 500, Phaser.Easing.Quadratic.Out);
    obj.tween_scroll_down.onComplete.add(this.SET_scroll_bar_tween, this);

    this.scrolling = false;
}
InventoryEquipmentSlots.prototype.f_enter_complete = function (obj) {

    this.scrolling = false;

    if (obj.r_slot != undefined) {
        obj.r_slot.x = obj.x;  
    } 
}
InventoryEquipmentSlots.prototype.f_exit_complete = function (obj) {

    this.scrolling = false;
    obj.exists = false;
    this.visible = false;
    this.exists = false;
}




InventoryEquipmentSlots.prototype.init_equipment_slots = function () {

    //Equipment slots
    this.head_slot = new InventoryEquipmentSlot(this.game, -253, 53, 0);
    this.g_equipment_slot.add(this.head_slot);

    this.body_slot = new InventoryEquipmentSlot(this.game, -253, 164, 1);
    this.g_equipment_slot.add(this.body_slot);

    this.pants_slot = new InventoryEquipmentSlot(this.game, -253, 261, 2);
    this.g_equipment_slot.add(this.pants_slot);

    this.feet_slot = new InventoryEquipmentSlot(this.game, -160, 253, 3);
    this.g_equipment_slot.add(this.feet_slot);

    this.amulet_slot = new InventoryEquipmentSlot(this.game, -145, 59, 4);
    this.amulet_slot.width = 45;
    this.amulet_slot.height = 45;
    this.g_equipment_slot.add(this.amulet_slot);

    this.artifact_slot = new InventoryEquipmentSlot(this.game, -332, 59, 5);
    this.artifact_slot.width = 45;
    this.artifact_slot.height = 45;
    this.g_equipment_slot.add(this.artifact_slot);

    this.ring_1_slot = new InventoryEquipmentSlot(this.game, -332, 246, 6);
    this.ring_1_slot.width = 45;
    this.ring_1_slot.height = 45;
    this.g_equipment_slot.add(this.ring_1_slot);

    this.ring_2_slot = new InventoryEquipmentSlot(this.game, -332, 305, 7);
    this.ring_2_slot.width = 45;
    this.ring_2_slot.height = 45;
    this.g_equipment_slot.add(this.ring_2_slot);

    this.weapon_slot = new InventoryEquipmentSlot(this.game, -349, 147, 8);
    this.g_equipment_slot.add(this.weapon_slot);

    this.offhand_slot = new InventoryEquipmentSlot(this.game, -160, 137, 9);
    this.g_equipment_slot.add(this.offhand_slot);
}

module.exports = InventoryEquipmentSlots;