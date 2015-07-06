'use strict';

var InventorySlots = require('../game_ui/InventorySlots'); 
var LineUI = require('../game_ui/LineUI'); 


var InventoryMenu = function (game) {

    Phaser.Group.call(this, game);

    this.tween_trigger = 1;
    this.scroll_limiter = 0;
    this.extended_stat_height = -10;
    this.momentum_y = 0;
    this.y = 0;
    this.exists = false;

    this.ui_inventory_01 = this.create(-480, 0, 'ui_back_02');
    this.ui_inventory_01.starting_X = this.ui_inventory_01.x;
    this.ui_inventory_01.width = 480;
    this.ui_inventory_01.height = 612;
    this.ui_inventory_01.name = "ui-left";
    this.ui_inventory_01.exists = false;
    this.r_ui_inventory_01 = new Phaser.Rectangle(this.ui_inventory_01.x + 340, this.ui_inventory_01.y + 63, this.ui_inventory_01.width, this.ui_inventory_01.height - 180);

    this.ui_inventory_02 = this.create(960, 0, 'ui_back_02'); // 960
    this.ui_inventory_02.starting_X = this.ui_inventory_02.x;
    this.ui_inventory_02.width = 590;
    this.ui_inventory_02.height = 612;
    this.ui_inventory_02.right_side_tween = true;
    this.ui_inventory_02.name = "ui-right";
    this.r_ui_inventory_02 = new Phaser.Rectangle(this.ui_inventory_02.x - 498, this.ui_inventory_02.y + 63, this.ui_inventory_02.width - 118, this.ui_inventory_02.height - 147);

    this.line_1 = this.create(-500, 355, 'tooltip_line');
    this.line_1.width = this.ui_inventory_01.width;


    // Stat UI
    //this.ui_stats = new StatUI(game, this.ui_inventory_01.x + 106, 360);
    //this.add(this.ui_stats);


    // Extended stat info background UI
    this.extended_stat_ui = this.create(this.ui_inventory_01.x + 269, this.ui_inventory_01.y + 360, 'extended_stat_ui');
    this.r_extended_stat_ui = new Phaser.Rectangle(this.ui_inventory_01.x + 269 + 370, this.ui_inventory_01.y + 360, this.extended_stat_ui.width, this.extended_stat_ui.height);


    // INIT TEXT
    this.g_extended_stat_text = this.game.make.group();
    this.add(this.g_extended_stat_text);
    //this.INIT_TEXT();

    // Tooltip handler
    
    //this.tooltip_handler = new TooltipHandler(this.inv_slots.icons['_' + 0]);
    //this.tooltip_handler.x = -555;//-this.r_ui_inventory_02.width + 80;
    //this.tooltip_handler.y = 0;
    //this.add(this.tooltip_handler);
    

    //this.forEach(this.init_tweens, this);

    this.max_scroll_count = 0;

    
    this.extended_stat_scroll_bar = this.g_extended_stat_text.create(this.ui_inventory_01.x + 446, this.ui_inventory_01.y + 405, 'scroll_bar');
    this.extended_stat_scroll_bar.scrollable = true;
    this.extended_stat_scroll_bar.scroll_amount = 500;
    this.extended_stat_scroll_bar.height = 210;
    this.extended_stat_scroll_bar.height = this.extended_stat_scroll_bar.height / (this.max_scroll_count - 5);
    this.extended_stat_scroll_bar.width = 8;  
};

InventoryMenu.prototype = Object.create(Phaser.Group.prototype);
InventoryMenu.prototype.constructor = InventoryMenu;

/*
InventoryMenu.prototype.update = function () {

    if (this.ui_inventory_01.exists) {
        this.g_extended_stat_text.forEach(this.update_text, this);

        this.inv_slots.back_lines_equipment.tilePosition.x -= 1;
        this.inv_slots.back_lines_equipment.tilePosition.y += 0.1;
        this.inv_slots.back_lines_inventory.tilePosition.x -= 1;
        this.inv_slots.back_lines_inventory.tilePosition.y += 0.1;
    }
    
}
*/
InventoryMenu.prototype.update_text = function (q) {

    if (q instanceof Phaser.Group) {

            // If stat scrolled off the top
        if (q.y < -10 - q.mod && q.y >= -40 - q.mod) {
            q.alpha = 1 + Math.sin((q.y + 10 + q.mod) / 20) * 2;

            //If stat scrolled off the bottom
        } else if (q.y > 165 - q.mod && q.y <= 195 - q.mod) {
            q.alpha = Math.cos((q.y - 165 + q.mod) / 10);        
        }

        // If it's in the guud zone, make it 1
        if (q.y < 165 - q.mod && q.y > -10 - q.mod) {
            q.alpha = 1;

            // If it's far off the top or bottom, keep it invisible
        } else if (q.y > 195 - q.mod || q.y < -40 - q.mod) {
            q.alpha = 0;
            
        } 
    }
}
InventoryMenu.prototype.update_momentum = function (q) {
    if (q instanceof Phaser.Group)
        q.y -= this.momentum_y;
    else
        //scroll bar goes opposite way
        q.y += this.momentum_y;
}
InventoryMenu.prototype.stop_momentum = function (q) {

    this.momentum_y = 0;

    if (q instanceof Phaser.Group) {
        if (this.scroll_limiter == 1)
            q.y = 0;
        if (this.scroll_limiter == -1)
            q.y = this.extended_stat_height;
    } else {
        if (this.scroll_limiter == 1)
            q.y = this.ui_inventory_01.y + 405;
        if (this.scroll_limiter == -1)
            q.y = this.ui_inventory_01.y + 405 - this.extended_stat_height;
    }
}

InventoryMenu.prototype.INIT_TEXT = function () {

    this.rare_color = { font: '24px Righteous', fill: "#990066", align: "center" };  
    this.white = { font: '30px Righteous', fill: "#FFFFFF", align: "center" };
    this.yellow = { font: '30px Righteous', fill: "#FFFF00", align: "center" };
    this.grey = { font: '30px Righteous', fill: "#CCCCCC", align: "center" };
    this.green = { font: '30px Righteous', fill: "#00FF00", align: "center" };
    this.extended_text_style = { font: '26px Agency FB', fill: "ADE9E9", align: "center" };
    this.extended_text_style_yellow = { font: '26px Agency FB', fill: "FFFF00", align: "center" };
    this.extended_text_style_red = { font: '26px Agency FB', fill: "FF0000", align: "center" };

    this.t_LVL = this.game.add.text(this.ui_inventory_01.x + 360, this.ui_inventory_01.y + 320, 'Lv:  ', this.grey);
    this.t_STR = this.game.add.text(this.ui_inventory_01.x + 120, 360, 'STR: ', this.white);
    this.t_VIT = this.game.add.text(this.ui_inventory_01.x + 120, this.t_STR.y + 43, 'VIT: ', this.white);
    this.t_DEX = this.game.add.text(this.ui_inventory_01.x + 120, this.t_VIT.y + 43, 'DEX: ', this.white);
    this.t_INT = this.game.add.text(this.ui_inventory_01.x + 120, this.t_DEX.y + 43, 'INT: ', this.white);
    this.t_LUK = this.game.add.text(this.ui_inventory_01.x + 120, this.t_INT.y + 43, 'LUK: ', this.white);
    this.t_LVL_data = this.game.add.text(this.t_LVL.x + this.t_LVL.width, this.t_LVL.y, player_body.level + "  ", this.yellow);
    this.t_STR_data = this.game.add.text(this.t_STR.x + this.t_STR.width, this.t_STR.y, player_body.strength + "  ", this.yellow);
    this.t_VIT_data = this.game.add.text(this.t_VIT.x + this.t_VIT.width, this.t_VIT.y, player_body.vitality + "  ", this.yellow);
    this.t_DEX_data = this.game.add.text(this.t_DEX.x + this.t_DEX.width, this.t_DEX.y, player_body.dexterity + "  ", this.yellow);
    this.t_INT_data = this.game.add.text(this.t_INT.x + this.t_INT.width, this.t_INT.y, player_body.intelligence + "  ", this.yellow);
    this.t_LUK_data = this.game.add.text(this.t_LUK.x + this.t_LUK.width, this.t_LUK.y, player_body.luck + "  ", this.yellow);

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
    this.ext_x = this.extended_stat_ui.x + 8;
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

InventoryMenu.prototype.init_extended_stat_text = function (name, text, index, x, y, style) {

    index = this.stat_index;
    x = this.ext_x;
    style = this.extended_text_style;

    // Starting position, everything else cascades based off index
    if (index == 0)
        y = this.extended_stat_ui.y + 10;
    else
        y = this.prev_text_obj.y + this.prev_text_obj.height - 3;

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
InventoryMenu.prototype.init_extended_stat_line = function (start_x, start_y, to_x, to_y, line) {

    // Make a line for the extended stat menu
    line = game.add.graphics(this.extended_stat_ui.x + 9, this.extended_stat_ui.y + 9);
    line.lineStyle(2, 0x425D5D, 1);
    line.moveTo(start_x, start_y);
    line.lineTo(to_x, to_y);
    return line;
}
InventoryMenu.prototype.set_extended_stat_data = function (extended_stat_group) {

    if (!(extended_stat_group instanceof Phaser.Group)) return;

    text_obj = extended_stat_group.getAt(2);

    name = text_obj.name;
    
    switch (name.slice(2, name.length)) {
        case 'damage':
        text_obj.setText(player_body.min_attack + "-" + player_body.max_attack);
        break;
        case 'damage':
        text_obj.setText(player_body.min_attack + "-" + player_body.max_attack);
        break;
    }
}


InventoryMenu.prototype.init_tweens = function (obj) {

    if (obj instanceof InventorySlots) {

        for (var i = 0; i < obj.children.length; i++) {

            //Adding tooltips over all other UI elements
            if (obj.getAt(i) instanceof Tooltip)
                this.add(obj.getAt(i));

            if (obj.getAt(i).type == 'scroll_bar') {
                this.SET_common_tweens(obj.getAt(i), 555, true);

            } else if (obj.getAt(i) instanceof LineUI) {
                // Set left-side LineUI tweens
                if (obj.getAt(i).name == 'equipment_lines')
                    this.SET_common_tweens(obj.getAt(i), -370);
                // Set right-side LineUI tweens
                if (obj.getAt(i).name == 'inventory_lines')
                    this.SET_common_tweens(obj.getAt(i), 555);


            } else if (obj.getAt(i).index >= 100) {
                // Set equipment slot tweens
                this.SET_common_tweens(obj.getAt(i), -370);

                // If the equipment slot has an item, give it a tween too
                if (obj.getAt(i).child_icon) 
                    this.SET_common_tweens(obj.getAt(i).child_icon, -370);                   
    

            } else if (obj.getAt(i).name == 'g_slot') {
                this.SET_common_tweens(obj.getAt(i), 555);
                obj.getAt(i).forEach(this.set_slot_tweens, this);

            } else {
                // Set misc. tweens (scroll arrows)
                this.SET_common_tweens(obj.getAt(i), 555);
            }
        }

    } else if (obj.name == 'ui-right') {
        // Right UI (inv)
        this.SET_common_tweens(obj, 555);
    } else {
        // Left UI (equip) (tooltip lines)
        this.SET_common_tweens(obj, -370);
    }
}
InventoryMenu.prototype.set_slot_tweens = function (q) {

    // Set slot tweens
    this.SET_common_tweens(q, 555);
    
    // If the slot has an item, give it a tween too
    if (q.child_icon) 
        this.SET_common_tweens(q.child_icon, 555); 
}


InventoryMenu.prototype.SET_common_tweens = function (obj, amt, is_scroll_bar) {


    if (obj instanceof Tooltip || obj == -1)
        return;

    // Applys the most common tweens to a UI item
    this.SET_tween_fade(obj, 'tween_fade_in', 1, Phaser.Easing.Quadratic.In);
    this.SET_tween_fade(obj, 'tween_fade_out', 0, Phaser.Easing.Quadratic.Out);

    this.SET_tween(obj, 'tween_up', amt, this.exit_complete,false);
    this.SET_tween(obj, 'tween_down', -amt, this.enter_complete, false);

    // Scroll bar mathz!
    if (is_scroll_bar)
        scroll_amt = -(this.inv_slots.scroll_bar.height / (this.inv_slots.max_scroll_count - 5));
    else
        scroll_amt = 80;

    if (obj.type == 'scroll_bar' || obj instanceof InventoryItem || obj instanceof InventorySlot || obj.name == 'g_slot' ) {

        this.SET_tween_scroll(obj, 'tween_scroll_up', scroll_amt);
        this.SET_tween_scroll(obj, 'tween_scroll_down', -scroll_amt);

    }
}
InventoryMenu.prototype.SET_tween = function (obj, tween_name, amt, callback, starting_outside, tween_type) {


    if (tween_name == 'tween_up') {
        if (starting_outside) 
            amt = amt;
        else
            amt -= amt;
        tween_type = Phaser.Easing.Quadratic.In;
    }
    if (tween_name == 'tween_down')
        tween_type = Phaser.Easing.Quadratic.Out;

    // If the tweens are being applied in the menu's opened state ( they're in opposite positions in this case! :( )
    obj[tween_name] = game.add.tween(obj);
    obj[tween_name].to({ x: obj.x + amt }, 800, tween_type);
    obj[tween_name].onComplete.add(callback, this);
}
InventoryMenu.prototype.SET_tween_scroll = function (obj, tween_name, amt) {
    obj[tween_name] = game.add.tween(obj);
    obj[tween_name].to({ y: obj.y + amt }, 500, Phaser.Easing.Quadratic.Out);
    obj[tween_name].onComplete.add(this.scroll_complete, this);
}
InventoryMenu.prototype.SET_tween_fade = function (obj, tween_name, amt, tween_type) {
    obj[tween_name] = game.add.tween(obj);
    obj[tween_name].to({ alpha: amt }, 300, tween_type);
}


InventoryMenu.prototype.scroll = function (dir) {

    // Return if at the bottom of the inventory
    if (dir == 'down' && this.inv_slots.scroll_count == this.inv_slots.max_scroll_count - 6)
        return;
    if (dir == 'up' && this.inv_slots.scroll_count == 0)
        return;
    // Return if already scrolling
    if (this.scrolling)
        return;
        
    // Set directionally specific variables
    if (dir == 'up') {
        this.inv_slots.scroll_count--;
        this.start_1 = this.inv_slots.scroll_count * 6;
        this.end_1 = this.inv_slots.scroll_count * 6 + 6;
        this.count_1 = this.inv_slots.scroll_count * 6 + 6;
        this.start_2 = (this.inv_slots.scroll_count * 6) + 36;
        this.end_2 = (this.inv_slots.scroll_count * 6) + 42;
    }
    if (dir == 'down') {
        this.inv_slots.scroll_count++;
        this.start_1 = this.inv_slots.scroll_count * 6 + 29;
        this.end_1 = this.inv_slots.scroll_count * 6 + 36;
        this.count_1 = this.inv_slots.slot_count;
        this.start_2 = this.inv_slots.scroll_count - 1;
        this.end_2 = this.inv_slots.scroll_count * 6;
    }

    // Set newly visible slots to exist if it's within the total number of slots
    for (var i = this.start_1; i < this.end_1; i++) {

        // Fade in new slots/icons
        this.inv_slots.slots[i].tween_fade_in.start();
        if (this.inv_slots.slots[i].child_icon) {
            this.inv_slots.slots[i].child_icon.tween_fade_in.start();
        }
    }

    // Scroll up slots/icons
    if (dir == 'up')
        this.inv_slots.forEach(this.start_scroll_tween_up, this, true);
    if (dir == 'down')
        this.inv_slots.forEach(this.start_scroll_tween_down, this, true);
    this.scrolling = true;

    // Fade out top slots/icons
    for (var i = this.start_2; i < this.end_2; i++) {
        this.inv_slots.slots[i].tween_fade_out.start();

        // If the slot has an item in it, fade it out too
        if (this.inv_slots.slots[i].child_icon) {
            this.inv_slots.slots[i].child_icon.tween_fade_out.start();
        }
    }
}


InventoryMenu.prototype.scroll_up = function () {

    this.scroll('up');
}
InventoryMenu.prototype.scroll_down = function () {

    this.scroll('down');
}

//Called on every child of InventoryMenu when Inventory button pressed
InventoryMenu.prototype.enter_screen = function (obj) {

    this.scrolling = true;
    obj.exists = true;

    if (obj instanceof InventorySlots) {

        for (var i = 0; i < obj.children.length; i++) {
            obj.getAt(i).exists = true;
            if (obj.getAt(i).tween_down != undefined) 
                obj.getAt(i).tween_down.start();
        }
        
    } else {
        if (obj.tween_down != undefined) 
            obj.tween_down.start();
    }
}
InventoryMenu.prototype.exit_screen = function (obj) {

    this.scrolling = true;

    if (obj instanceof InventorySlots) {

        for (var i = 0; i < obj.children.length; i++) {
            obj.getAt(i).tween_up.start();
        }
        
    } else {
        obj.tween_up.start();
    }
}


InventoryMenu.prototype.start_scroll_tween_up = function (obj) {

    if (!obj.scrollable)
        return;

    if (this.scrolling)
        this.scroll_complete(obj);

    if (obj.tween_scroll_up && (obj instanceof InventorySlot || obj.index < 100 || obj.type == 'scroll_bar')) 
        obj.tween_scroll_up.start();

    if (obj.name == 'g_slot') {
        obj.forEach(this.start_scroll_tween_up, this);
    }
}
InventoryMenu.prototype.start_scroll_tween_down = function (obj) {

    if (!obj.scrollable)
        return;

    if (this.scrolling)
        this.scroll_complete(obj);

    if (obj.tween_scroll_down && (obj instanceof InventorySlot || obj.index < 100 || obj.type == 'scroll_bar'))
        obj.tween_scroll_down.start();

    if (obj.name == 'g_slot') 
        obj.forEach(this.start_scroll_tween_down, this); 
}


// SCROLL AS IN ON AND OFF THE SCREEN!
InventoryMenu.prototype.enter_complete = function (obj) {

    this.scrolling = false;

    if (obj.r_slot != undefined) {
        obj.r_slot.x = obj.x;  
    } 
    if (obj.name == 'g_slot') {
        obj.forEach(this.r_slot_reset, this);
    }
}
InventoryMenu.prototype.r_slot_reset = function (q) {

    q.r_slot.x = this.inv_slots.g_slot.getAt(q.index).open_inventory_x;
}
InventoryMenu.prototype.exit_complete = function (obj) {

    this.scrolling = false;
    obj.exists = false;
}


// SCROLL AS IN SCROLL BAR!
InventoryMenu.prototype.scroll_complete = function (obj) {

    if (obj.r_slot)
        obj.r_slot.y = obj.y;

    if (obj.type == 'scroll_bar')
        obj.scroll_amt = -(this.inv_slots.scroll_bar.height / (this.inv_slots.max_scroll_count - 5));
    else
        obj.scroll_amt = 80;

    obj.tween_scroll_up = this.game.add.tween(obj);
    obj.tween_scroll_up.to({ y: obj.y + obj.scroll_amt }, 500, Phaser.Easing.Quadratic.Out);
    obj.tween_scroll_up.onComplete.add(this.scroll_complete, this);

    obj.tween_scroll_down = this.game.add.tween(obj);
    obj.tween_scroll_down.to({ y: obj.y - obj.scroll_amt }, 500, Phaser.Easing.Quadratic.Out);
    obj.tween_scroll_down.onComplete.add(this.scroll_complete, this);

    this.scrolling = false;
}


InventoryMenu.prototype.color_change_above_base_stats = function () {

    if (player_body.strength != player_body.base_strength)
        this.t_STR_data.setStyle(this.green);
    else
        this.t_STR_data.setStyle(this.yellow);

    if (player_body.vitality != player_body.base_vitality)
        this.t_VIT_data.setStyle(this.green);
    else
        this.t_VIT_data.setStyle(this.yellow);

    if (player_body.dexterity != player_body.base_dexterity)
        this.t_DEX_data.setStyle(this.green);
    else
        this.t_DEX_data.setStyle(this.yellow);

    if (player_body.intelligence != player_body.base_intelligence)
        this.t_INT_data.setStyle(this.green);
    else
        this.t_INT_data.setStyle(this.yellow);

    if (player_body.luck != player_body.base_luck)
        this.t_LUK_data.setStyle(this.green);
    else
        this.t_LUK_data.setStyle(this.yellow);

    this.t_STR_data.setShadow(2, 2, 'rgba(0,0,0,1)', 0);
    this.t_VIT_data.setShadow(2, 2, 'rgba(0,0,0,1)', 0);
    this.t_DEX_data.setShadow(2, 2, 'rgba(0,0,0,1)', 0);
    this.t_INT_data.setShadow(2, 2, 'rgba(0,0,0,1)', 0);
    this.t_LUK_data.setShadow(2, 2, 'rgba(0,0,0,1)', 0);
    
    this.t_STR_data.updateText();
    this.t_VIT_data.updateText();
    this.t_DEX_data.updateText();
    this.t_INT_data.updateText();
    this.t_LUK_data.updateText();
}

module.exports = InventoryMenu;