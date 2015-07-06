'use strict';

var InventorySlots = require('../game_ui/InventorySlots');
var InventoryEquipmentSlots = require('../game_ui/InventoryEquipmentSlots');
var Tooltip = require('../game_ui/Tooltip');
var Character = require('../states/Character');


function CharacterMenuState() {}

CharacterMenuState.prototype = {

    preload: function() {

        // ***** CHARACTER SCREEN *****
        this.game.load.image('character_screen_ui_top', 'assets/MENU_STATE/UI/character_screen_ui_top.png');
        this.game.load.image('character_screen_ui_option_back', 'assets/MENU_STATE/UI/character_screen_ui_option_back.png');
        this.game.load.spritesheet('back_button_01', 'assets/MENU_STATE/UI/back_button_01.png', 185, 95, 2);


        // ----------------------------- SPRITES -----------------------------
        // **** MID ****
        this.game.load.image('player_image_mid', 'assets/SPRITES/player/player_base/texture_12_mid.png');
        this.game.load.json('player_json_mid', 'assets/SPRITES/player/player_base/texture_12_mid.json');
        this.game.load.atlas('player_atlas_mid', 'assets/SPRITES/player/player_base/texture_12_mid.png', 'assets/SPRITES/player/player_base/texture_12_mid.json');
        this.game.load.json('player_skeleton_mid', 'assets/SPRITES/player/player_base/skeleton_mid.json');

        // **** BIG ****
        this.game.load.image('player_image_big', 'assets/SPRITES/player/player_base/texture_12_big.png');
        this.game.load.json('player_json_big', 'assets/SPRITES/player/player_base/texture_12_big.json');
        this.game.load.atlas('player_atlas_big', 'assets/SPRITES/player/player_base/texture_12_big.png', 'assets/SPRITES/player/player_base/texture_12_big.json');
        this.game.load.json('player_skeleton_big', 'assets/SPRITES/player/player_base/skeleton_big.json');


        // **** MID PRIEST ****
        this.game.load.image('player_image_mid_priest', 'assets/SPRITES/player/player_base_priest/texture_12_mid_priest.png');
        this.game.load.json('player_json_mid_priest', 'assets/SPRITES/player/player_base_priest/texture_12_mid_priest.json');
        this.game.load.atlas('player_atlas_mid_priest', 'assets/SPRITES/player/player_base_priest/texture_12_mid_priest.png', 'assets/SPRITES/player/player_base_priest/texture_12_mid_priest.json');
        this.game.load.json('player_skeleton_mid_priest', 'assets/SPRITES/player/player_base_priest/skeleton_mid_priest.json');


        // **** MID BERZERKER ****
        this.game.load.image('player_image_mid_berzerker', 'assets/SPRITES/player/player_base_berzerker/texture_12_mid_berzerker.png');
        this.game.load.json('player_json_mid_berzerker', 'assets/SPRITES/player/player_base_berzerker/texture_12_mid_berzerker.json');
        this.game.load.atlas('player_atlas_mid_berzerker', 'assets/SPRITES/player/player_base_berzerker/texture_12_mid_berzerker.png', 'assets/SPRITES/player/player_base_berzerker/texture_12_mid_berzerker.json');
        this.game.load.json('player_skeleton_mid_berzerker', 'assets/SPRITES/player/player_base_berzerker/skeleton_mid_berzerker.json');


        // **** MID RANGER ****
        this.game.load.image('player_image_mid_ranger', 'assets/SPRITES/player/player_base_ranger/texture_12_mid_ranger.png');
        this.game.load.json('player_json_mid_ranger', 'assets/SPRITES/player/player_base_ranger/texture_12_mid_ranger.json');
        this.game.load.atlas('player_atlas_mid_ranger', 'assets/SPRITES/player/player_base_ranger/texture_12_mid_ranger.png', 'assets/SPRITES/player/player_base_ranger/texture_12_mid_ranger.json');
        this.game.load.json('player_skeleton_mid_ranger', 'assets/SPRITES/player/player_base_ranger/skeleton_mid_ranger.json');
    },

    create: function() {



        // ------------------------------ VARIABLES ------------------------------
        var a_text = ['INVENTORY', 'SKILLS', 'SPRITES', 'SHOP', 'FIGHT'];
        this.flag_inventory = false;
        this.released_item_index = 0;
        this.first_load = 0;
        this.current_menu = '';
        this.allow_open = true;

        this.init_dragon_bones();

        this.g_player_1 = new Character(this.game, 520, 520, 1);
        this.g_player_2 = new Character(this.game, 870, 490, 2);
        this.g_player_2.scale.setTo(-1, 1);
        this.g_player_3 = new Character(this.game, 770, 370, 3);
        this.g_player_3.scale.setTo(-1, 1);
        this.g_player_4 = new Character(this.game, 620, 400, 4);

        this.g_item = this.game.add.grop();
        this.g_item.name = "g_item";
        this.g_item.x = 0; //38 + 960 - 370;
        this.g_item.y = 0; // 61;

        this.g_ui_selection = this.game.add.group();




        // --------------------------------- UI ----------------------------------

        this.menu_style = {
            font: '60px Eras Bold ITC',
            fill: "#69F1F1",
            align: "center"
        };

        var ui_top = this.game.add.sprite(-10, -4, 'character_screen_ui_top');
        ui_top.scale.setTo(1.1, 1.1);
        ui_top.tint = 0x0000ff;


        // Back button
        this.back_button = this.game.add.sprite(-300, -12, 'back_button_01');
        this.back_button.inputEnabled = true;
        this.back_button.events.onInputUp.add(this.BUTTON_back, this);
        this.back_button.animations.add('select', [1, 0, 1, 0], 20, false);
        this.back_button.frame = 0;
        this.back_button.t_enter = this.game.add.tween(this.back_button).to({
            x: -12
        }, 500, Phaser.Easing.Quadratic.Out, false, 100, false);
        this.back_button.t_exit = this.game.add.tween(this.back_button).to({
            x: -300
        }, 500, Phaser.Easing.Quadratic.In, false, 100, false);

        this.flag_back_button = false;


        // ***** OPTION BARS *****

        for (var i = 0; i < 5; i++) {

            if (i == 0)
                var text = this.game.add.text(80, 8, a_text[i], this.menu_style);
            else
                var text = this.game.add.text(100 + (i * 4), 8, a_text[i], this.menu_style);

            text.alpha = 0.6;

            switch (i) {
                case 0:
                    this.SET_SELECTIONS('b_inventory', 'SELECT_inventory', i, text);
                    break;
                case 1:
                    this.SET_SELECTIONS('b_skills', 'SELECT_skills', i, text);
                    break;
                case 2:
                    this.SET_SELECTIONS('b_sprites', 'SELECT_sprites', i, text);
                    break;
                case 3:
                    this.SET_SELECTIONS('b_shop', 'SELECT_shop', i, text);
                    break;
                case 4:
                    this.SET_SELECTIONS('b_fight', 'SELECT_fight', i, text);
                    break;
            }
        }



        this.tooltip = new Tooltip(this.game, 0, 0, '', '', this.g_player_1);
        this.tooltip.visible = false;
        this.tooltip.exists = false;


        this.equipment_slots = new InventoryEquipmentSlots(this.game, this.tooltip, this.g_player_1, this.g_item);
        this.inventory_slots = new InventorySlots(this.game, this.g_player_1, this.tooltip, this.g_item, this.equipment_slots);


        this.game.world.callAll('SET_enter_exit_tween');


        this.game.world.bringToTop(this.g_item);
        this.game.world.bringToTop(this.back_button);
        this.game.world.bringToTop(this.tooltip);




        // ------------------------------ TIMERS --------------------------------
        this.timer = this.game.time.create(false);
        this.timer.add(500, this.timer_next_menu, this);
        this.game.time.events.loop(1, this.db_update, this);



        // ***** INITIATE TEXT OBJECTS *****
        this.tooltip.set_stat_text(this.inventory_slots.g_item.getAt(0).data);
        this.tooltip.update_stat_text(this.inventory_slots.g_item.getAt(0).data);


        this.game.input.onUp.add(this.equipment_slots.touchInputUp, this.equipment_slots);
        this.game.input.onDown.add(this.equipment_slots.touchInputDown, this.equipment_slots);


        this.equipment_slots.exists = false;
        this.inventory_slots.exists = false;
        this.equipment_slots.visible = false;
        this.inventory_slots.visible = false;
    },




    SET_SELECTIONS: function(_selection, selection_callback, i, text) {

        this[_selection] = this.game.add.button(-600 + i * 12, 82 + (i * 90), 'character_screen_ui_option_back', this[selection_callback], this);
        this[_selection].onInputOver.add(this.OVER_selection, this);
        this[_selection].onInputOut.add(this.OUT_selection, this);
        this[_selection].addChild(text);
        this[_selection].t_enter = this.game.add.tween(this[_selection]).to({
            x: -60 - (i * 12)
        }, 500, Phaser.Easing.Quadratic.Out, false, 100 * i, false);
        this[_selection].t_exit = this.game.add.tween(this[_selection]).to({
            x: -600 - (i * 12)
        }, 500, Phaser.Easing.Quadratic.In, false, 100 * i, false);

        var colorBlend = {
            step: 0
        };
        this[_selection].tint = 0x0000ff;
        this[_selection].color_tween = this.game.add.tween(colorBlend).to({
            step: 100
        }, 1000);

        if (i == 4) {

            this[_selection].t_enter.onComplete.add(this.f_selection_ui_enter_complete, this);
            this[_selection].t_exit.onComplete.add(this.f_selection_ui_exit_complete, this);
        }

        this.f_selection_ui_enter(this[_selection]);

        this.g_ui_selection.add(this[_selection]);
    },

    OVER_selection: function(obj) {

        obj.tint = 0xff0000;
        obj.color_tween.stop();
    },

    OUT_selection: function(obj) {

        this.tweenTint(obj, 0xff0000, 0x0000ff, 1000); // tween the tint of sprite from red to blue over 2 seconds (2000ms)
    },

    SELECT_inventory: function() {

        if (this.allow_open) {
            this.g_ui_selection.forEach(this.f_selection_ui_exit, this);
            this.flag_inventory = !this.flag_inventory;
        } else
            return;

        // Inventory flag.
        if (this.flag_inventory) {

            this.g_player_1.tw_inventory_enter.start();
            this.g_player_1.scale.setTo(1, 1);

            this.current_menu = 'inventory';

            this.equipment_slots.exists = true;
            this.inventory_slots.exists = true;
            this.equipment_slots.visible = true;
            this.inventory_slots.visible = true;

            // Inventory tweens.
            this.equipment_slots.tween_enter.start();
            this.inventory_slots.tween_enter.start();
            this.g_item.forEach(this.f_item_tween_enter, this, true);
            this.back_button.t_enter.start();

            this.allow_open = false;

        } else {
            console.log("start timer!");
            this.back_button.t_exit.start();
            this.timer.start();
            this.g_player_1.tw_inventory_exit.start();
            this.g_player_1.scale.setTo(-1, 1);


            this.allow_open = false;
        }
    },

    SELECT_skills: function() {

        console.log("meowth");
    },

    SELECT_sprites: function() {

        console.log("meowth");
    },

    SELECT_shop: function() {

        console.log("meowth");
    },

    SELECT_fight: function() {

        console.log("meowth");
    },




    update: function() {},

    db_update: function() {
        // For simplicity just using a hardcoded value of 0.02 secs
        // but ideally should evaluate how much time has really passed since last call
        // and send that value through instead
        dragonBones.animation.WorldClock.clock.advanceTime((this.game.time.elapsed / 1000) * 2);
        //dragonBones.animation.WorldClock.clock.advanceTime(game.time.physicsElapsed);
    },




    select_option: function(q) {

        console.log(q.alpha);
    },




    timer_next_menu: function() {

        switch (this.current_menu) {

            case 'inventory':

                console.log("timer complete!");
                this.equipment_slots.exists = true;
                this.inventory_slots.exists = true;
                this.equipment_slots.visible = true;
                this.inventory_slots.visible = true;
                this.g_ui_selection.forEach(this.f_selection_ui_enter, this);
                this.timer.stop();
                this.timer.add(100, this.timer_next_menu, this);
                break;
        }
    },




    BUTTON_back: function() {

        this.back_button.animations.play('select');

        switch (this.current_menu) {

            case 'inventory':

                if (this.allow_open) {
                    this.equipment_slots.tween_exit.start();
                    this.inventory_slots.tween_exit.start();
                    this.g_item.forEach(this.f_item_tween_exit, this, true);
                    this.SELECT_inventory();
                }
                break;
        }
    },





    touchInputUp: function() {

        this.touch_update_flag_extended_stats = false;

        this.input.activePointer.x = 0;
        this.input.activePointer.y = 0;
    },

    touchInputDown: function() {

        this.equipment_slots.scroll_limiter = 0;
        this.prev_pointer_y = this.input.activePointer.y;

        if (this.equipment_slots.extended_stat_ui.getBounds().contains(this.input.activePointer.x, this.input.activePointer.y))
            this.touch_update_flag_extended_stats = true;
    },

    touch_update: function() {

        if (this.equipment_slots.scroll_limiter == 1) {
            if (this.prev_pointer_y > this.input.activePointer.y) {
                this.equipment_slots.scroll_limiter = 0;
                this.equipment_slots.momentum_y = (this.prev_pointer_y - this.input.activePointer.y) / 3;
            }
            this.prev_pointer_y = this.input.activePointer.y;
        }

        if (this.equipment_slots.scroll_limiter == -1) {
            if (this.prev_pointer_y < this.input.activePointer.y) {
                this.equipment_slots.scroll_limiter = 0;
                this.equipment_slots.momentum_y = (this.prev_pointer_y - this.input.activePointer.y) / 3;
            }
            this.prev_pointer_y = this.input.activePointer.y;
        }

        if (this.equipment_slots.scroll_limiter == 0) {

            if (this.prev_pointer_y != this.input.activePointer.y) {
                this.equipment_slots.momentum_y = (this.prev_pointer_y - this.input.activePointer.y) / 3;
                this.prev_pointer_y = this.input.activePointer.y;
            }
        }

        if (this.equipment_slots.momentum_y > 4)
            this.equipment_slots.momentum_y = 4;
        if (this.equipment_slots.momentum_y < -4)
            this.equipment_slots.momentum_y = -4;
    },





    f_item_tween_enter: function(item) {

        if (!item.equipped)
            item.tween_enter.start();
        else
            item.tween_enter.start();
    },
    f_item_tween_exit: function(item) {

        if (!item.equipped)
            item.tween_exit.start();
        else
            item.tween_exit.start();
    },
    f_selection_ui_enter: function(ui) {

        this.allow_open = false;
        ui.t_enter.start();
    },
    f_selection_ui_exit: function(ui) {

        this.allow_open = false;
        ui.t_exit.start();
    },
    f_selection_ui_enter_complete: function(ui) {
        console.log("enter complete!")
        this.allow_open = true;
    },
    f_selection_ui_exit_complete: function(ui) {
        console.log("exit complete!")
        this.allow_open = true;
    },




    tweenTint: function(obj, startColor, endColor, time) {

        // create an object to tween with our step value at 0
        var colorBlend = {
            step: 0
        };

        // create the tween on this object and tween its step property to 100
        obj.color_tween = this.game.add.tween(colorBlend).to({
            step: 100
        }, time);

        // run the interpolateColor function every time the tween updates, feeding it the
        // updated value of our tween each time, and set the result as our tint
        obj.color_tween.onUpdateCallback(function() {
            obj.tint = Phaser.Color.interpolateColor(startColor, endColor, 100, colorBlend.step);
        });

        // set the object to the start color straight away
        obj.tint = startColor;

        // start the tween
        obj.color_tween.start();
    },
    init_dragon_bones: function() {

        //give dragonBones a reference to the game object
        dragonBones.game = this.game;

        this.game.events = dragonBones.events;

        dragonBones.animation.WorldClock.clock.timeScale = 0.5;

        //events = dragonBones.events;
    }



}

module.exports = CharacterMenuState;