(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//var fun4 = null; wont collect this variable, but is this variable just a small reference?


window.onload = function () {

    var width = window.innerWidth * window.devicePixelRatio;
    var height = window.innerHeight * window.devicePixelRatio;

    if (window.devicePixelRatio == 1)
        var game = new Phaser.Game(960, 640, Phaser.WEB_GL, '');
    else
        var game = new Phaser.Game(width / (window.devicePixelRatio - 1), height / (window.devicePixelRatio - 1), Phaser.WEB_GL, '');

    // Game States
    game.state.add('Boot', require('./states/Boot'));
    game.state.add('Preloader', require('./states/Preloader'));
    //game.state.add('Transition', require('./misc/Transition'));
    //game.state.add('MainMenuState', require('./states/MainMenuState'));
    //game.state.add('CharacterMenuState', require('./states/CharacterMenuState'));
    //game.state.add('MapState', require('./states/MapState'));
    game.state.add('GameState', require('./states/GameState'));
    game.state.add('BattleState', require('./states/BattleState'));

    game.state.start('Boot', true, false);
};


},{"./states/BattleState":2,"./states/Boot":3,"./states/GameState":7,"./states/Preloader":8}],2:[function(require,module,exports){
'use strict';
var Character = require('../states/Character');
var CharacterUI = require('../states/CharacterUI');
var Enemy = require('../states/Enemy');


function BattleState() {}


BattleState.prototype = {


    preload: function() {

        


        // ----------------------------- SPRITES -----------------------------
        // **** MID ****
        this.game.load.image('player_image_mid', 'assets/SPRITES/player/texture_12_mid.png');
        this.game.load.json('player_json_mid', 'assets/SPRITES/player/texture_12_mid.json');
        this.game.load.atlas('player_atlas_mid', 'assets/SPRITES/player/texture_12_mid.png', 'assets/SPRITES/player/texture_12_mid.json');
        this.game.load.json('player_skeleton_mid', 'assets/SPRITES/player/skeleton_mid.json');

        // **** MID PRIEST ****
        //this.game.load.image('player_image_mid_priest', 'assets/SPRITES/player/player_base_priest/texture_12_mid_priest.png');
        //this.game.load.json('player_json_mid_priest', 'assets/SPRITES/player/player_base_priest/texture_12_mid_priest.json');
        //this.game.load.atlas('player_atlas_mid_priest', 'assets/SPRITES/player/player_base_priest/texture_12_mid_priest.png', 'assets/SPRITES/player/player_base_priest/texture_12_mid_priest.json');
        //this.game.load.json('player_skeleton_mid_priest', 'assets/SPRITES/player/player_base_priest/skeleton_mid_priest.json');


        // **** MID BERZERKER ****
        //this.game.load.image('player_image_mid_berzerker', 'assets/SPRITES/player/player_base_berzerker/texture_12_mid_berzerker.png');
        //this.game.load.json('player_json_mid_berzerker', 'assets/SPRITES/player/player_base_berzerker/texture_12_mid_berzerker.json');
        //this.game.load.atlas('player_atlas_mid_berzerker', 'assets/SPRITES/player/player_base_berzerker/texture_12_mid_berzerker.png', 'assets/SPRITES/player/player_base_berzerker/texture_12_mid_berzerker.json');
        //this.game.load.json('player_skeleton_mid_berzerker', 'assets/SPRITES/player/player_base_berzerker/skeleton_mid_berzerker.json');


        // **** MID RANGER ****
        //this.game.load.image('player_image_mid_ranger', 'assets/SPRITES/player/player_base_ranger/texture_12_mid_ranger.png');
        //this.game.load.json('player_json_mid_ranger', 'assets/SPRITES/player/player_base_ranger/texture_12_mid_ranger.json');
        //this.game.load.atlas('player_atlas_mid_ranger', 'assets/SPRITES/player/player_base_ranger/texture_12_mid_ranger.png', 'assets/SPRITES/player/player_base_ranger/texture_12_mid_ranger.json');
        //this.game.load.json('player_skeleton_mid_ranger', 'assets/SPRITES/player/player_base_ranger/skeleton_mid_ranger.json');
        // *******************TEMPORARY

        // **** SLIME ****
        this.game.load.image('slime_image', 'assets/SPRITES/slime/texture.png');
        this.game.load.json('slime_json', 'assets/SPRITES/slime/texture.json');
        this.game.load.atlas('slime_atlas', 'assets/SPRITES/slime/texture.png', 'assets/SPRITES/slime/texture.json');
        this.game.load.json('slime_skeleton', 'assets/SPRITES/slime/skeleton.json');


        // *** CACHE CLEANUP ***
        //this.game.cache.removeImage('loaderEmpty');
        //this.game.cache.removeImage('loaderFull');
    },


    init: function(enemy_data, enemy_group) {

        this.enemy_data = ["slime", "slime", "slime", "slime", "enemy_formation_2"]; //enemy_data;
        this.enemy_group = "enemy_group_1"; //enemy_group; //"enemy_group_1"
    },


    init_dragon_bones: function() {

        //give dragonBones a reference to the game object
        dragonBones.game = this.game;

        this.game.events = dragonBones.events;

        dragonBones.animation.WorldClock.clock.timeScale = 1;
    },


    create: function() {




        // -------------------------------- PHASER --------------------------------
        this.game.time.advancedTiming = true;
        this.init_dragon_bones();
        this.game.time.events.loop(20, this.update_db, this);
        this.game.world.setBounds(0, 0, 960, 640); // ** Maybe adjust this for camera zooming

        this.green = {
            font: '35px AgencyFB',
            fill: "#00FF00",
            align: "center"
        };




        // ------------------------------ VARIABLES -------------------------------
        this.timer = null;
        this.current_formation = null;
        this.enemy_formation = null;
        this.selection_index = 0;
        this.selection_state = 'start_menu'; // Can eventually be in a cache
        this.touch_update_flag_extended_stats = false;
        this.flag_inventory = false;

        this.num_enemies = 0;
        this.enemy_count = 0;
        this.ani_start_delay = 1;

        this.white_flash = null;
        this.selected_ui = null;
        this.prev_tween_y = 1;
        this.y_adjustment = 0;
        this.prev_y_adjustment = 0;
        this.down_pointer_x = 0;
        this.down_pointer_y = 0;
        //this.red_tint = '0xF87046'; // #F87046
        //this.blue_tint = '0x0087FF';
        //this.green_tint = '0x83FF79';
        //this.yellow_tint = '0xB9A539';


        // ------------------------------- VISUAL --------------------------------
        //this.background = this.game.add.sprite(0, 0, 'battle_background_green');
        //this.background.width = 960;
        //this.background.height = 640;



        // ------------------------------- GROUPS --------------------------------
        //this.g_main = this.game.add.group();
        this.g_player_tiles = this.game.add.group();
        this.g_player_tiles.classType = Phaser.Image;
        this.g_enemy_tiles = this.game.add.group();
        this.g_enemy_tiles.classType = Phaser.Image;
        this.g_sprite_container = this.game.add.group();

        this.g_player_UI_1 = this.game.add.group();
        this.g_player_UI_2 = this.game.add.group();
        this.g_player_UI_3 = this.game.add.group();
        this.g_player_UI_4 = this.game.add.group();

        //this.g_main.add(this.g_player_tiles);
        //this.g_main.add(this.g_enemy_tiles);
        //this.g_main.add(this.g_sprite_container);



        // ------------------------------ CHARACTERS --------------------------------
        this.INIT_FLOOR_TILES();
        this.INIT_CHARACTERS(); //***********LEFT OFF HERE - this is causing a large frame drop on mobile for sure.  armature is huge?
        //**** maybe try taking the whole db/armature out of the character class and not attached as a child to see if anything changes




        // ------------------------------- ENEMIES ----------------------------------
        //this.INIT_ENEMIES();




        // ------------------------------- OBJECTS -------------------------------
        //this.load_objects();
        //this.game.g_damage_text = new DamageNumberManager(this.game);




        // ------------------------------- CAMERA --------------------------------
        //this.game.camera.follow(player_body);
        //this.game.camera.deadzone = new Phaser.Rectangle(350, 0, 320, 700);
        //this.game.camera.bounds.y = 0;



        // ------------------------------ FUNCTIONS -------------------------------
        this.game.input.onUp.add(this.touchInputUp, this);
        this.game.input.onDown.add(this.touchInputDown, this);
        //this.game_functions();
        //this.INIT_CONTROLS();
        this.INIT_UI(); //c.Group in heap jumps way the fuck up here. lag fuckin city.
        // Create black screen
        //this.black = this.game.add.sprite(0, 0, 'black');
        //this.black.width = this.game.width;
        //this.black.height = this.game.height;


        // ------------------------------- TIMERS --------------------------------
        this.timer = this.game.time.create(true);
        this.timer.add(500, this.fade_in, this);
        //this.timer.add(500, this.INIT_ENEMIES, this);
        this.timer.start();
        this.block = this.game.add.sprite(0, 0, 'battle_hexagon')

        //this.game.time.add(this.timer_char_ui, 0, 25, 0, true, this.move_char_ui, this)
        this.test = 0;
    },


    update: function() {

        /*
        this.test++;

        if (this.game.time.fps < 56) {
            this.block.x += 1;
        }

        if (this.test > 2) {

            var num = ((this.game.time.now - this.game.time.prevTime) / 1000);
            dragonBones.animation.WorldClock.clock.advanceTime(num);
            this.test = 0;
        }
        */

        //num = ((this.game.time.now - this.game.time.prevTime) / 1000) * 2;
        //console.log(num);

        //dragonBones.animation.WorldClock.clock.advanceTime(0.03);

        //num = ((this.game.time.now - this.game.time.prevTime) / 1000) * 2;
        //num = ((this.game.time.now - this.game.time.prevTime) / 1000);
        //console.log(num);

        //dragonBones.animation.WorldClock.clock.advanceTime(0.03);

        //dragonBones.animation.WorldClock.clock.advanceTime(num);        
    },


    animation_desync: function(sprite, delay) {

        sprite.armature.animation.gotoAndPlay("idle", 0.2);
    },


    init_DB: function(player_val) {

        var player_string;
        var player_skeleton;
        var armature;
        var armatureName;
        var skeletonId;
        var animationId;
        var skeletonJSON;
        var atlasJson;
        var partsList;
        var texture;
        var atlasId;
        var config;
        var player_display;

        player_string = '';

        player_skeleton = 'player_skeleton_mid' + player_string;
        // ************************* DRAGONBONES *************************
        // hardcoded ids for the dragonBones elements to target
        armatureName = "sprite_base_12";
        skeletonId = "sprite_base_12";
        animationId = "idle";
        // fetch the skeletonData from cache
        skeletonJSON = this.game.cache.getJSON(player_skeleton);
        // fetch the atlas data from cache
        atlasJson = this.game.cache.getJSON('player_json_mid' + player_string);
        // make an array listing the names of which images to use from the atlas
        partsList = [

            
            "Player-parts-armL",
            "Player-parts-armR",
            "Player-parts-armUpperL",
            "Player-parts-armUpperR",
            "Player-parts-body",
            "Player-parts-face",
            "Player-parts-footL",
            "Player-parts-footR",
            "Player-parts-hair",
            "Player-parts-handL",
            "Player-parts-handR",
            "Player-parts-head",
            "Player-parts-hips",
            "Player-parts-legL",
            "Player-parts-legR",
            "Player-parts-upperLegL",
            "Player-parts-upperLegR",
            "Player-parts-weapon"
        ];

        texture = this.game.cache.getImage("player_image_mid" + player_string);
        atlasId = 'player_atlas_mid' + player_string;

        config = {
            armatureName: armatureName,
            skeletonId: skeletonId,
            animationId: animationId,
            atlasId: atlasId,
            partsList: partsList
        };

        // Create the armature
        armature = dragonBones.makeArmaturePhaser(config, skeletonJSON, atlasJson, texture);


        // ----- Start animation! -----
        armature.animation.gotoAndPlay("combat_idle", 0.2);

        return armature;
    },






    // ------------------------- FUNCTIONS ---------------------------

    INIT_CHARACTERS: function() {

        console.log(this.game.cache.getJSON('formation_data'))

        var formations = this.game.cache.getJSON('formation_data');

        this.current_formation = formations.formation_3;

        for (var i = 1; i <= 4; i++) {

            // Positions coinside with INIT_UI (floor tiles)
            var char_x = this.current_formation[i - 1][0] * 92 + (this.current_formation[i - 1][1] * 12) + 657;
            var char_y = this.current_formation[i - 1][1] * 60 - 51 + this.g_player_tiles.y + 100;

            
            this['g_player_' + i] = this.init_DB();

            this['g_player_' + i].getDisplay().x = char_x;
            this['g_player_' + i].getDisplay().y = char_y;
            this['g_player_' + i].getDisplay().scale.setTo(-1, 1);


            //this['g_player_' + i] = new Character(this.game, char_x + 602 + 55, char_y + this.g_player_tiles.y + 100, i);
            //this['g_player_' + i].scale.setTo(-1, 1);

            //Bottom right corner of sprite is 0,0
        }

        //var fun1;

        //for (var i = 1; i <= 20; i++)
        //    fun1 = new Character(this.game, 10 + i * 100, 300, 1);

        //fun1.armature.animation.gotoAndPlay("sit", 0.2);
        //this.init_sprite("g_player_1");
        //this.init_sprite("g_player_2");
        //this.init_sprite("g_player_3");
        //this.init_sprite("g_player_4");
    },
    init_sprite: function(sprite) {

        //**TEMPORARY!!!**
        //this.ani_start_delay = 0;
        //**TEMPORARY!!!**

        this.game.time.events.add(this.ani_start_delay, function() {

            this[sprite].armature.animation.gotoAndPlay("sit", 0.2);
        }, this);

        //this.ani_start_delay += 50;
    },


    INIT_ENEMIES: function() {

        // Set the enemy formation
        this.enemy_formation = this.enemy_data[this.enemy_data.length - 1];

        switch (this.enemy_formation) {

            case "enemy_formation_1":
                break;
        }


        // Increase the enemy counter
        //for (var u = 0; u < this.enemy_data.length - 1; u++) {
        //    this.num_enemies++;
        //}

        this.num_enemies = this.enemy_data.length - 1;

        for (var e = 0; e < this.enemy_data.length - 1; e++) {

            // Create enemy sprite
            var enemy = new Enemy(this.game, 'slime', 25, this.g_enemy_tiles.y - 15);
            enemy.name = "enemy_" + (e + 1);
            enemy.index = e;
            enemy.scale.x = -1;
            enemy.exists = false;
            enemy.visible = false;
            enemy.is_enemy = true;
            enemy.desync_complete = false;

            // Add the enemy to the sprite container
            this.g_sprite_container.add(enemy);

            // Set position of the enemy
            this.init_enemy();

            //**TEMPORARY!!!**
            //this.ani_start_delay = 0;
            //**TEMPORARY!!!**

            // Initial animation delay
            this.game.time.events.add(this.ani_start_delay, this.animation_desync, this, enemy, this.ani_start_delay);
            //this.ani_start_delay += 150;
        }
    },
    init_enemy: function() {

        var enemy;
        var count;
        var enemy_counter;
        var enemy_formation_json;

        count = 0;
        enemy_counter = 0;
        enemy_formation_json = this.game.cache.getJSON('enemy_formation_data');

        for (var u = 0; u <= 12; u++)
            if (enemy_formation_json.enemy_formation_1[0][u] == 1)   //this.game.levelDataObj[this.enemy_formation][0][u]

                enemy_counter++;
            // If there are more enemies than the formation can fit, cut off the enemies from being created.
        if (this.enemy_count == enemy_counter)
            return;

        for (var o = 0; o <= 12; o++) {

            if (enemy_formation_json.enemy_formation_1[0][o] == 1 && this.enemy_count < this.num_enemies) {

                count++;

                enemy = this.g_sprite_container.getFirstExists(false);

                if (enemy) {

                    if (count <= this.enemy_count)
                        continue;

                    this.enemy_count++;

                    enemy.exists = true;
                    enemy.visible = true;
                    switch (o) {

                        case 0:
                            enemy.x += 0;
                            enemy.y += 0;
                            break;

                        case 1:
                            enemy.x += 97;
                            enemy.y += 0;
                            break;

                        case 2:
                            enemy.x += 194;
                            enemy.y += 0;
                            break;

                        case 3:
                            enemy.x += 291;
                            enemy.y += 0;
                            break;

                        case 4:
                            enemy.x += -12;
                            enemy.y += 60;
                            break;

                        case 5:
                            enemy.x += 85;
                            enemy.y += 60;
                            break;

                        case 6:
                            enemy.x += 182;
                            enemy.y += 60;
                            break;

                        case 7:
                            enemy.x += 279;
                            enemy.y += 60;
                            break;

                        case 8:
                            enemy.x += -24;
                            enemy.y += 120;
                            break;

                        case 9:
                            enemy.x += 73;
                            enemy.y += 120;
                            break;

                        case 10:
                            enemy.x += 170;
                            enemy.y += 120;
                            break;

                        case 11:
                            enemy.x += 267;
                            enemy.y += 120;
                            break;
                    }
                    //console.log(enemy.name + " " + enemy.index + " " + enemy.x + " " + enemy.y);
                    return;
                }
            }
        }
    },


    INIT_CONTROLS: function() {
        this.game.stage.disableVisibilityChange = true;

        //if (global_mobile_enabled)
        //    d_pad = new D_pad(70, 228, player_body);

        this.z_key = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
        this.z_key.onDown.add(this.Z_PRESS, this);
        this.left_key = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.left_key.onDown.add(this.LEFT_PRESS, this);
        //this.left_key.onUp.add(this.IDLE, this);
        this.left_key.isUp = true;
        this.right_key = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.right_key.onDown.add(this.RIGHT_PRESS, this);
        //this.right_key.onUp.add(this.IDLE, this);
        this.right_key.isUp = true;
        this.up_key = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.up_key.onDown.add(this.UP_PRESS, this);
        //this.up_key.onUp.add(this.IDLE, this);
        this.up_key.isUp = true;
        this.down_key = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.down_key.onDown.add(this.DOWN_PRESS, this);
        //this.down_key.onUp.add(this.IDLE, this);
        this.down_key.isUp = true;

        //this.game.onResume.add(this.IDLE, this);
        //this.game.onResume.add(this.initControls, this);
    },
    INIT_FLOOR_TILES: function() {
        // Create floor tiles
        this.g_player_tiles.x = 602;
        this.g_player_tiles.y = this.game.height - 350; //227

        for (var i = 0; i < 4; i++) {
            for (var e = 0; e < 3; e++) {

                this.g_player_tiles.create((i * 95) + (e * 12), (e * 61), 'battle_floor_tile');
            }
        }

        this.g_enemy_tiles.scale.x = -1;
        this.g_enemy_tiles.x = 360;
        this.g_enemy_tiles.y = this.game.height - 350; //227

        for (var i = 0; i < 4; i++) {
            for (var e = 0; e < 3; e++) {

                this.g_enemy_tiles.create((i * 95) + (e * 12), (e * 61), 'battle_floor_tile');
            }
        }
    },
    INIT_UI: function() {

        //when visible/exists = false : total textures: 74 Memory: 3.59 MB (wasted 0.85 MB)
        //when visible/exists = true  : total textures: 30 Memory: 3.37 MB (wasted 0.85 MB)


        // Create white flash over character UI
        this.white_flash = this.game.add.sprite(0, -80, 'white_flash');
        this.white_flash.width = 240;
        this.white_flash.height = 650;
        this.white_flash.alpha = 0;


        // BitmapText objects
        this.g_player_UI_1 = new CharacterUI(this.game, 1, this.move_char_ui);
        this.g_player_UI_2 = new CharacterUI(this.game, 2, this.move_char_ui);
        this.g_player_UI_3 = new CharacterUI(this.game, 3, this.move_char_ui);
        this.g_player_UI_4 = new CharacterUI(this.game, 4, this.move_char_ui);


        // Create black screen
        this.black = this.game.add.sprite(0, 0, 'black');
        this.black.width = this.game.width;
        this.black.height = this.game.height;
    },
    update_char_ui: function(ui_group) { // CURRENTLY UNUSED

        var hp_bar;
        var sp_bar;
        var hp_val;
        var sp_val;

        hp_bar = ui_group.getAt(0);
        sp_bar = ui_group.getAt(2);
        hp_val = ui_group.getAt(5);
        sp_val = ui_group.getAt(7);
    },


    INIT_SKILL: function(ui_group, skill, skill_index) {

        var skill_type;
        switch (skill) {

            case "swing":
                skill_type = "battle_skill_physical_attack";
                break;

            case "fireball":
                skill_type = "battle_skill_magical_attack";
                break;

            case "heal":
                skill_type = "battle_skill_support";
                break;

            case "focus":
                skill_type = "battle_skill_neutral";
                break;


            case "physical_attack":
                skill_type = "battle_skill_physical_attack";
                break;

            case "magical_attack":
                skill_type = "battle_skill_magical_attack";
                break;

            case "heal_ally":
                skill_type = "battle_skill_heal_ally";
                break;

            case "basic_skill":
                skill_type = "battle_skill_neutral";
                break;
        }
        this.run_init_skill(ui_group, skill, skill_index, skill_type);
    },
    run_init_skill: function(ui_group, skill, skill_index, skill_type) {

        var skill_back_texture;
        // Colored background of skill UI section
        switch (skill_type) {

            case "battle_skill_physical_attack":
                skill_back_texture = "battle_skill_physical_attack_red";
                break;

            case "battle_skill_magical_attack":
                skill_back_texture = "battle_skill_magical_attack_blue";
                break;

            case "battle_skill_support":
                skill_back_texture = "battle_skill_support_green";
                break;

            case "battle_skill_neutral":
                skill_back_texture = "battle_skill_neutral_yellow";
                break;
        }

        // Switch based on which skill slot index is passed and loads according textures
        switch (skill_index) {
            case 0:
                ui_group.getAt(4).loadTexture("battle_skill_" + skill);
                ui_group.getAt(21).loadTexture("battle_skill_" + skill);
                ui_group.getAt(9).loadTexture(skill_back_texture);
                break;

            case 1:
                ui_group.getAt(10).loadTexture(skill_back_texture);
                ui_group.getAt(22).loadTexture("battle_skill_" + skill);
                ui_group.getAt(10).alpha = 0.4;
                break;

            case 2:
                ui_group.getAt(11).loadTexture(skill_back_texture);
                ui_group.getAt(23).loadTexture("battle_skill_" + skill);
                ui_group.getAt(11).alpha = 0.4;
                break;

            case 3:
                ui_group.getAt(12).loadTexture(skill_back_texture);
                ui_group.getAt(24).loadTexture("battle_skill_" + skill);
                ui_group.getAt(12).alpha = 0.4;
                break;

        }
    },


    update_db: function() {

        var num;

        num = ((this.game.time.now - this.game.time.prevTime) / 1000);

        //dragonBones.animation.WorldClock.clock.advanceTime(0.03);

        dragonBones.animation.WorldClock.clock.advanceTime(num);

        if (this.game.time.fps < 56) {
            this.block.x += 1;
        }
    },


    /*
    load_objects: function () {


        var object_prev = 'door';
        var object_current = 'door';
        var object_string = '';
        var object_count = 0;
        var i;

        // ------------------------- LEVEL OBJECTS / ENEMIES --------------------------

        for (var i = 0, len = map.room_data.length; i < len; i++) {
            object_string = map.room_data[i][0] + "_" + pad(object_count, 2);

            // -- The switch is the newly assigned object name with the _XX sliced off the end.
            switch (object_string.slice(0, (object_string.length - 3))) {
                case "door":
                    map.obj['p' + pad(i, 2)] = this.game.add.sprite(map.room_data[i][1], map.room_data[i][2], map.room_data[i][0]);
                    map.obj['p' + pad(i, 2)].name = object_string;
                    map.obj['p' + pad(i, 2)].next_room = map.room_data[i][3];
                    map.obj['p' + pad(i, 2)].next_startX = map.room_data[i][4];
                    map.obj['p' + pad(i, 2)].next_startY = map.room_data[i][5];
                    map.obj['p' + pad(i, 2)].next_coordX = map.room_data[i][6];
                    map.obj['p' + pad(i, 2)].next_coordY = map.room_data[i][7];
                    break;

                case "enemy":
                    map.obj['p' + pad(i, 2)] = new EnemyCharacter(map.room_data[i][0], map.room_data[i][1], i, map.room_data[i][2], map.room_data[i][3]);
                    console.log(map.obj['p' + pad(i, 2)])

                    // If ranged, assign a bullet group
                    //if (map.obj['p' + pad(i, 2)].entity.ranged)
                    //    g_enemy_bullet_manager.assign_bullet(map.obj['p' + pad(i, 2)].entity);

                    // Changes name after assigning bullet to original name. (FIX THIS!~!~!!~!!~~!~!!~! enemy_01 enemy_01 enemy_02)
                    map.obj['p' + pad(i, 2)].entity.name = object_string;

                    break;
            }

            // -- Used in the name of objects as a number count
            object_count++;

            object_current = map.obj['p' + pad(i, 2)].name.slice(0, (map.obj['p' + pad(i, 2)].name.length - 3));

            // -- If name of next object is different, start the variable name number over (object_count++ needed to avoid _00, _00)
            if (object_prev != object_current) {
                object_count = 0;
                map.obj['p' + pad(i, 2)].entity.name = map.room_data[i][0] + "_" + pad(object_count, 2);

                object_count++;
            }

            // Adding objects to groups here instead to make sure names stay correct...
            switch (object_string.slice(0, (object_string.length - 3))) {
                case "door":
                    g_door.add(map.obj['p' + pad(i, 2)]);
                    break;
                case "enemy":
                    this.g_sprite.add(map.obj['p' + pad(i, 2)]);
                    break;
            }

            object_prev = object_current;
        }

        //light_effect_1 = this.game.add.sprite(-300, -700, 'light');
        //light_effect_1.scale.setTo(3, 3);
        //light_effect_1.blendMode = 10;
    },
    toggle_camera: function () {


        this.game.time.events.repeat(30, 10, function () {
            //console.log((this.g_main.scale.x * ( 1.8 - this.g_main.scale.x )));
            this.g_main.scale.x += .05;//this.g_main.scale.x * ( 2 - this.g_main.scale.x );
            this.g_main.scale.y += .05;//this.g_main.scale.y * ( 2 - this.g_main.scale.y );

            this.g_main.x -= 30;
            this.g_main.y -= 10;


            //this.g_main.scale.x += this.g_main.scale.x * 0.02;
            //this.g_main.scale.y += this.g_main.scale.y * 0.02;
        }, this);
    },
        */






    // ------------------------- INPUT ---------------------------

    touchInputUp: function() {},

    touchInputDown: function() {

        this.down_pointer_x = this.game.input.activePointer.x;
        this.down_pointer_y = this.game.input.activePointer.y;

        // If the pointer is in the character UI field
        if (this.g_player_UI_1.getBounds().contains(this.down_pointer_x, this.down_pointer_y))
            this.selected_ui = this.g_player_UI_1;

        else if (this.g_player_UI_2.getBounds().contains(this.down_pointer_x, this.down_pointer_y))
            this.selected_ui = this.g_player_UI_2;

        else if (this.g_player_UI_3.getBounds().contains(this.down_pointer_x, this.down_pointer_y))
            this.selected_ui = this.g_player_UI_3;

        else if (this.g_player_UI_4.getBounds().contains(this.down_pointer_x, this.down_pointer_y))
            this.selected_ui = this.g_player_UI_4;
        else
            return;

        // Don't move the UI if it's all the way down and the skill button is pressed/held. getAt(4) = hexagon
        if (this.selected_ui.getAt(4).getBounds().contains(this.game.input.activePointer.x, this.game.input.activePointer.y) &&
            !this.selected_ui.open)
            return;

        // if a skill is pressed, set it to the selected skill
        if (this.selected_ui.getAt(5).getBounds().contains(this.game.input.activePointer.x, this.game.input.activePointer.y)) {
            this.selected_ui.skill_selected = true;

            // **SELECTED SKILL SLOT
            this.selected_ui.selected_skill_slot = 1;
            return;

        } else if (this.selected_ui.getAt(6).getBounds().contains(this.game.input.activePointer.x, this.game.input.activePointer.y)) {
            this.selected_ui.skill_selected = true;
            this.selected_ui.selected_skill_slot = 2;
            return;

        } else if (this.selected_ui.getAt(7).getBounds().contains(this.game.input.activePointer.x, this.game.input.activePointer.y)) {
            this.selected_ui.skill_selected = true;
            this.selected_ui.selected_skill_slot = 3;
            return;

        } else if (this.selected_ui.getAt(8).getBounds().contains(this.game.input.activePointer.x, this.game.input.activePointer.y)) {
            this.selected_ui.skill_selected = true;
            this.selected_ui.selected_skill_slot = 4;
            return;

        } else {
            this.selected_ui.skill_selected = false;
        }



        // If pointer is held down on a character UI. this.selected_ui.timer -> move_char_ui.  single call.
        if (this.selected_ui !== null) {

            this.selected_ui.open = true;

            // Make menu assets visible while menu is in use
            for (var i = 5; i <= 24; i++)
                this.selected_ui.getAt(i).visible = true;

            // Start the UI movement timer
            if (!this.selected_ui.timer.running)
                this.selected_ui.timer.start();
            else
                this.selected_ui.timer.resume();
        }
    },
    move_char_ui: function() { // this = ui_group

        // Move the character UI up and down
        var tween_y;
        var loc_x_start;
        var loc_x_end;

        switch (this.index) {

            case 1:
                loc_x_start = 0;
                loc_x_end = 236;
                break;
            case 2:
                loc_x_start = 236;
                loc_x_end = 476;
                break;
            case 3:
                loc_x_start = 476;
                loc_x_end = 714;
                break;
            case 4:
                loc_x_start = 714;
                loc_x_end = 960;
                break;
        }


        // If a skill is currently selected, don't move UI and return
        if (this.skill_selected) {
            this.timer.pause();
            this.y_adjustment = 0;
            return;
        }


        // Amount to move UI by.  If a different UI is selected, set tween_y to 0 and later set y_adjustment to prev_y_adjustment.
        if (this.game.input.activePointer.x > loc_x_start && this.game.input.activePointer.x <= loc_x_end) {
            tween_y = this.game.input.activePointer.y - this.prev_tween_y;
        } else
            tween_y = 0;

        // Continued motion on release
        if (this.game.input.activePointer.isUp) {

            this.y_adjustment = this.y_adjustment * 0.98;
            this.y -= this.y_adjustment;

            if (!(this.y - this.y_adjustment > this.game.height - 560 && this.y - this.y_adjustment < this.game.height - 124)) {

                // If the window goes too high or too low, stop the movement and set the position
                if (this.y < 200)
                    this.y = this.game.height - 560;
                else {
                    // UI window on bottom of the screen, close it and disable assets
                    this.y = this.game.height - 124;
                    this.open = false;
                    // Make menu assets invisible
                    for (var i = 5; i < 24; i++)
                        this.getAt(i).visible = false;
                }

                this.timer.pause();
            }


            if (this.y_adjustment < 1 && this.y_adjustment > -1)
                this.timer.pause();
            return;
        }


        this.prev_y_adjustment = this.y_adjustment;


        if (tween_y != 0)
            this.y_adjustment = ((this.y - tween_y) / 3);
        else
            this.y_adjustment = this.prev_y_adjustment;


        if (this.y - this.y_adjustment > this.game.height - 560 && this.y - this.y_adjustment < this.game.height - 124) {
            // The movement
            this.y -= this.y_adjustment;

        } else {

            // If the window goes too high or too low, stop the movement and set the position
            if (this.y < 200)
                this.y = this.game.height - 560;
            else {
                this.y = this.game.height - 124;
                this.open = false;
            }
        }
    },
    y_adjust: function(prev_selected_ui, prev_y_adjustment) {

        prev_y_adjustment = prev_y_adjustment * 0.98;

        prev_selected_ui.y -= prev_y_adjustment;

        if (!(prev_selected_ui.y - prev_y_adjustment > this.game.height - 560 && prev_selected_ui.y - prev_y_adjustment < this.game.height - 124)) {

            // If the window goes too high or too low, stop the movement and set the position
            if (prev_selected_ui.y < 200)
                prev_selected_ui.y = this.game.height - 560;
            else {
                prev_selected_ui.y = this.game.height - 124;
                prev_selected_ui.open = false;
            }

            prev_selected_ui.timer.pause();
        }


        if (prev_y_adjustment < 1 && prev_y_adjustment > -1)
            prev_selected_ui.timer.pause();
    },


    touch_update: function() {

        console.log("alala");

        /*
            if (game_ui.inventory.scroll_limiter == 1) {
                if (this.prev_pointer_y > this.input.activePointer.y) {
                    game_ui.inventory.scroll_limiter = 0;
                    game_ui.inventory.momentum_y = (this.prev_pointer_y - this.input.activePointer.y) / 3;
                }
            this.prev_pointer_y = this.input.activePointer.y;
            }

            if (game_ui.inventory.scroll_limiter == -1) {
                if (this.prev_pointer_y < this.input.activePointer.y) {
                    game_ui.inventory.scroll_limiter = 0;
                    game_ui.inventory.momentum_y = (this.prev_pointer_y - this.input.activePointer.y) / 3;
                }
            this.prev_pointer_y = this.input.activePointer.y;
            }

            if (game_ui.inventory.scroll_limiter == 0) {

                if (this.prev_pointer_y != this.input.activePointer.y) {
                    game_ui.inventory.momentum_y = (this.prev_pointer_y - this.input.activePointer.y) / 3;
                    this.prev_pointer_y = this.input.activePointer.y;
                }
            }

            if (game_ui.inventory.momentum_y > 4)
                game_ui.inventory.momentum_y = 4;
            if (game_ui.inventory.momentum_y < -4)
                game_ui.inventory.momentum_y = -4;
        */
    },


    OVER_ITEM: function(icon) {

        console.log("funn");

        // Updates icon tooltip location
        var tooltip = this.tooltip_handler.getFirstExists(false);
        if (tooltip) {
            tooltip.visible = true;
            tooltip.icon = icon;
            tooltip.icon.parent_slot = icon.parent_slot;
            icon.tooltip = tooltip;
        }

        this.update_icon_tooltip_location(icon, icon.parent_slot);
    },

    Z_PRESS: function() {

        switch (this.selection_state) {

            case 'start_menu':

                game_ui.battle_menu.selection_arrow.exists = true;
                this.selection_state = 'battle_menu';
                break;

            case 'battle_menu':

                game_ui.battle_menu.selection_arrow.exists = false;
                game_ui.battle_menu.selected_action = game_ui.battle_menu.selection_count;
                this.selection_state = 'start_menu';
                break;
        }
    },

    LEFT_PRESS: function() {},

    RIGHT_PRESS: function() {},

    UP_PRESS: function() {

        switch (this.selection_state) {

            case 'battle_menu':
                if (game_ui.battle_menu.selection_count > 0) {
                    game_ui.battle_menu.selection_arrow.y -= 40;
                    game_ui.battle_menu.selection_count--;
                }

                break;
        }
    },

    DOWN_PRESS: function() {

        switch (this.selection_state) {

            case 'battle_menu':
                if (game_ui.battle_menu.selection_count < 3) {
                    game_ui.battle_menu.selection_arrow.y += 40;
                    game_ui.battle_menu.selection_count++;
                }

                break;
        }
    },


    // not using
    NEXT_SELECTION: function(next_state) {

        switch (next_state) {

            case 'battle_menu':

                this.selection_state = 'battle_menu';
                break;
        }
    },







    // ------------------------------------------------------------------------------------------------------
    // ------------------------------------------------------------------------------------------------------
    // ------------------------------------------------------------------------------------------------------

    game_functions: function() {
        game.checkOverlap = function(spriteA, spriteB) {
            boundsA = spriteA.getBounds();
            boundsB = spriteB.getBounds();

            return Phaser.Rectangle.intersects(boundsA, boundsB);
        }
    },


    fade_in: function(black) {

        this.timer.repeat(10, 20, this.fade_in_repeat, this, black, -1);
        this.timer.onComplete.add(this.fade_in_complete, this);
    },
    fade_in_repeat: function(black, mod) {

        this.black.alpha += mod * 0.05;
    },
    fade_in_complete: function() {

        this.black.alpha = 0;

        // **ADDED THIS BUT DID NOT COMPENSATE FOR YET**
        this.black.visible = false;
        this.black.exists = false;
        //this.toggle_camera();
    },


    render: function() {
        //console.log(this.game.player_armature.getSlot("weapon").getDisplay().rotation);

        //game.debug.text(game.time.fps, 100, 100);

        /*
        this.game.debug.rectangle(d_pad.r_left);
        this.game.debug.rectangle(d_pad.r_right);
        this.game.debug.rectangle(d_pad.r_up);
        this.game.debug.rectangle(d_pad.r_down);
        */

        //this.game.debug.rectangle(game.r_close, 'rgba(255, 255, 0, 0.3)');
        //this.game.debug.rectangle(this.g_player_1.r_body_box, 'rgba(255, 255, 0, 0.3)');

        //this.game.debug.rectangle(this.g_player_1.r_weapon, 'rgba(255, 255, 0, 0.3)');

        // Inventory UI
        //this.game.debug.rectangle(r_crop, 'rgba(255, 255, 0, 0.3)');
        //this.game.debug.rectangle(game_ui.inventory.r_ui_inventory_01, 'rgba(255, 255, 0, 0.3)');
        //this.game.debug.rectangle(game_ui.inventory.r_ui_inventory_02, 'rgba(255, 255, 0, 0.3)');
        // slots
        ///for (var i = 0; i < 40; i++) {
        //if (game_ui.inventory.inventory_slots.g_slot.getAt(i).r_slot)
        //this.game.debug.rectangle(game_ui.inventory.inventory_slots.g_slot.getAt(i).r_slot, 'rgba(255, 255, 0, 0.3)');
        //if (game_ui.inventory.inventory_slots.getAt(i) instanceof EquipmentSlot)
        //this.game.debug.rectangle(game_ui.inventory.inventory_slots.getAt(i).r_slot, 'rgba(255, 255, 0, 0.3)');
        //}

        /*
        if (RENDER_HIT_BOX) {

            this.game.debug.rectangle(this.g_player_1.getAt(1).r_attack_hit_box, 'rgba(255, 255, 0, 0.3)');

            for (var i = 0; i < g_sprite.length; i++) {

                if (g_sprite.children[i].name != 'character' && g_sprite.children[i].name != "bullet_manager") {
                    // Render enemy attack hit boxes
                    this.game.debug.rectangle(g_sprite.children[i].entity.body, 'rgba(255, 0, 255, 0.1)');
                    this.game.debug.rectangle(g_sprite.children[i].entity.r_attack_hit_box, 'rgba(255, 0, 255, 0.1)');
                }

                if (g_sprite.children[i].name != "bullet_manager") {
                    //this.game.debug.rectangle(g_sprite.children[i].entity.r_attack_range, 'rgba(0, 0, 255, 0.05)');
                    this.game.debug.rectangle(g_sprite.children[i].entity.r_body_box, 'rgba(255, 0, 0, 0.3)');
                }
            }

            //Render enemy bullets
            for (var e = 0; e < game.g_enemy_bullet_manager.length; e++)
                this.game.debug.rectangle(game.g_enemy_bullet_manager.getAt(e).r_attack_hit_box, 'rgba(255, 255, 0, 0.7)');
        }
        */

        //for (var y = 0; y < map.map_data.length; y++) {
        //    for (var x = 0; x < map.map_data[0].length; x++) {

        // if (map.coord['p' + y + x].type == 8)
        // this.game.debug.rectangle(map.current_map);
        //    }
        //}

    }
}

module.exports = BattleState;
},{"../states/Character":4,"../states/CharacterUI":5,"../states/Enemy":6}],3:[function(require,module,exports){
'use strict';

function Boot () {

}


Boot.prototype = {

    preload: function () {

        this.game.load.image('loaderEmpty', 'assets/UI/loaderEmpty.png');
        this.game.load.image('loaderFull', 'assets/UI/loaderFull.png');
    },

    create: function () {

        //if (navigator.isCocoonJS) {
        //}
        //else {
        //        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //        this.game.scale.pageAlignHorizontally = true;
        //        this.game.scale.pageAlignVertically = true;
        //        this.game.scale.forceOrientation(false, true, 'orientation');
        //    }
        //}

        if (this.game.device.desktop) {

            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.maxWidth = 960;
            this.game.scale.maxHeight = 640;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
        } else {

            this.game.scale.maxWidth = 960;
            this.game.scale.maxHeight = 640;
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.setShowAll();
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVeritcally = true;
            this.game.scale.refresh();
        }

        // 7/13/2015 - doesnt look so bad, but going with show_all manual x/y adjustments to be safe
        //this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        //this.game.scale.setScreenSize();

        //if (this.game.device.desktop)
        //    this.game.add.plugin(Phaser.Plugin.Debug);

        this.game.state.start('Preloader', true, false);
    }
}

module.exports = Boot;
},{}],4:[function(require,module,exports){
'use strict';
// don't forget.. you're using WEAPON stats here, so when you start changing equips, they need to update here too

var Character = function(game, x, y, player_val) {


    // ----- Init -----
    Phaser.Group.call(this, game);
    this.name = 'character';
    this.x = x;
    this.y = y;
    this.index = player_val;



    // ----- Variables -----
    this.dir = 'right';
    this.x = x;
    this.y = y;
    this.queue_attack = 0;
    this.continue_combo = false;
    this.last_recieved_attack = '';
    this.hit_stunned = false;
    this.active_skill = '';
    this.next_skill = '';
    this.armature = null;


    this.init_DB(1 /*player_val*/ );


    // ----- Stats -----
    var character_json = this.game.cache.getJSON('character_data');

    var data = character_json.player_1;

    this.max_attack = data.max_attack;
    this.level = data.level;
    this.strength = data.strength;
    this.vitality = data.vitality;
    this.dexterity = data.dexterity;
    this.intelligence = data.intelligence;
    this.luck = data.luck;
    this.health_steal = data.health_steal;
    this.speed = data.speed;
    this.hit_stun = data.hit_stun;

    this.base_strength = data.strength;
    this.base_vitality = data.vitality;
    this.base_dexterity = data.dexterity;
    this.base_intelligence = data.intelligence;
    this.base_luck = data.luck;

    this.skills = data.skills;

    data = null;

    this.max_health = this.vitality * 10;
    this.hp = this.max_health;

    // *-*-* DEBUG - error on adding new properties outside constructor (avoiding polymorphic) *-*-*    
    //Object.preventExtensions(this);
};

Character.prototype = Object.create(Phaser.Group.prototype);
Character.prototype.constructor = Character;



Character.prototype.init_DB = function(player_val) {

    var player_string;
    var player_skeleton;
    var armature;
    var armatureName;
    var skeletonId;
    var animationId;
    var skeletonJSON;
    var atlasJson;
    var partsList;
    var texture;
    var atlasId;
    var config;
    var player_display;


    switch (player_val) {
        case 1:
            player_string = '';
            break;
            default:
            player_string = '';
/*
        case 2:
            player_string = '_priest';
            break;

        case 3:
            player_string = '_berzerker';
            break;

        case 4:
            player_string = '_ranger';
            break;
*/
    }

    player_skeleton = 'player_skeleton_mid' + player_string;
    // ************************* DRAGONBONES *************************
    // hardcoded ids for the dragonBones elements to target
    armatureName = "sprite_base_12";
    skeletonId = "sprite_base_12";
    animationId = "idle";
    // fetch the skeletonData from cache
    skeletonJSON = this.game.cache.getJSON(player_skeleton);
    // fetch the atlas data from cache
    atlasJson = this.game.cache.getJSON('player_json_mid' + player_string);
    // make an array listing the names of which images to use from the atlas
    partsList = [

        /*
        "Player-parts-armL",
        "Player-parts-armR",
        "Player-parts-armUpperL",
        "Player-parts-armUpperR",
        "Player-parts-body",
        "Player-parts-face",
        "Player-parts-footL",
        "Player-parts-footR",
        "Player-parts-hair",
        "Player-parts-handL",
        "Player-parts-handR",
        "Player-parts-head",
        "Player-parts-hips",
        "Player-parts-legL",
        "Player-parts-legR",
        "Player-parts-upperLegL",
        "Player-parts-upperLegR",
        "Player-parts-weapon"
        */
    ];

    texture = this.game.cache.getImage("player_image_mid" + player_string);
    atlasId = 'player_atlas_mid' + player_string;

    config = {
        armatureName: armatureName,
        skeletonId: skeletonId,
        animationId: animationId,
        atlasId: atlasId,
        partsList: partsList
    };

    // Create the armature
    this.armature = dragonBones.makeArmaturePhaser(config, skeletonJSON, atlasJson, texture);


    // ----- Start animation! -----
    this.armature.animation.gotoAndPlay("combat_idle", 0.2);


    player_display = this.armature.getDisplay();
    this.add(player_display);
}


module.exports = Character;
},{}],5:[function(require,module,exports){
'use strict';

var CharacterUI = function(game, index, move_char_ui) {

    Phaser.Group.call(this, game);

    var player_group;
    var hp;
    var sp;
    var hp_val;
    var sp_val;
    var name;
    var line;
    var skill_back_1;
    var skill_back_2;
    var skill_back_3;
    var skill_back_4;
    var skill_text_1;
    var skill_text_2;
    var skill_text_3;
    var skill_text_4;
    var skill_color_1;
    var skill_color_2;
    var skill_color_3;
    var skill_color_4;
    var skill_icon_1;
    var skill_icon_2;
    var skill_icon_3;
    var skill_icon_4;
    var skill_power_1;
    var skill_power_2;
    var skill_power_3;
    var skill_power_4;
    var skill_sp_1;
    var skill_sp_2;
    var skill_sp_3;
    var skill_sp_4;
    var name_s;
    var static_text;

    this.classType = Phaser.Image;
    this.index = index;
    this.inputEnabled = true;
    this.move_char_ui = move_char_ui;
    this.name = "ui_group" + index;
    this.open = false;
    this.active = false;
    this.tween_y = 0;
    this.prev_tween_y = 0;
    this.y_adjustment = 0;
    this.prev_y_adjustment = 0;
    this.skill_selected = false;
    this.selected_skill_slot = 0;
    this.test_incrament = index;

    //player_group = this['g_player_' + index];

    this.x = (this.index - 1) * 238;
    this.y = this.game.height - 124;

    this.create(53, 10, 'battle_player_hp_bar'); //getAt(0)
    this.create(53, 10, 'battle_player_hp_border'); //getAt(1)
    this.create(42, 50, 'battle_player_sp_bar'); //getAt(2)
    this.create(40, 47, 'battle_player_sp_border'); //getAt(3)
    this.create(0, 0, 'battle_hexagon'); //getAt(4)

    skill_back_1 = this.create(0, 122, 'battle_char_ui_top');        //getAt(5)
    skill_back_2 = this.create(0, 236, 'battle_char_ui_inner');      //getAt(6)
    skill_back_3 = this.create(0, 348, 'battle_char_ui_inner');      //getAt(7)
    skill_back_4 = this.create(0, 460, 'battle_char_ui_inner');      //getAt(8)
    skill_color_1 = this.create(0, 122, '');                         //getAt(9)
    skill_color_2 = this.create(0, 236, '');                         //getAt(10)
    skill_color_3 = this.create(0, 348, '');                         //getAt(11)
    skill_color_4 = this.create(0, 460, '');                         //getAt(12)
    skill_icon_1 = this.create(10, 172, 'battle_hexagon');           //getAt(13)
    skill_icon_2 = this.create(10, 284, 'battle_hexagon');           //getAt(14)
    skill_icon_3 = this.create(10, 396, 'battle_hexagon');           //getAt(15)
    skill_icon_4 = this.create(10, 508, 'battle_hexagon');           //getAt(16)
    skill_icon_1.scale.setTo(0.6, 0.6);
    skill_icon_2.scale.setTo(0.6, 0.6);
    skill_icon_3.scale.setTo(0.6, 0.6);
    skill_icon_4.scale.setTo(0.6, 0.6);

    ////////////////////////////////////////////////////////////////////////////////////////
    //this.red_tint = '0xF87046';
    //this.blue_tint = '0x0087FF';
    //this.green_tint = '0x83FF79';
    //this.yellow_tint = '0xB9A539';

    // BitmapText objects
    //hp_val = this.game.make.bitmapText(93, -30, 'Agency_54', '123/123', 35);
    //sp_val = this.game.make.bitmapText(93, 85, 'Agency_54', '12/12', 35); 
    //hp_val = this.game.make.text(93, -30, '123/123', { font: "24px Arial", fill: "#ff0044", align: "center" });
    //sp_val = this.game.make.text(93, 85, '12/12', { font: "24px Arial", fill: "#ff0044", align: "center" }); 
    hp_val = this.game.make.sprite(0, 0, '');
    sp_val = this.game.make.sprite(0, 0, '');

    this.text_to_bitmap(13, 125, 'skill', 25, '0xF87046', 1.5, 1.5);              //getAt(17) //orig font size 35
    this.text_to_bitmap(13, 238, 'skill', 25, '0x0087FF', 1.5, 1.5);              //getAt(18) //orig font size 35
    this.text_to_bitmap(13, 350, 'skill', 25, '0x83FF79', 1.5, 1.5);              //getAt(19) //orig font size 35
    this.text_to_bitmap(13, 464, 'skill', 25, '0xB9A539', 1.5, 1.5);              //getAt(20) //orig font size 35
    this.text_to_bitmap(180, 127, '25', 38,   '0xFF5858', 1.5, 1.5);              //getAt(21) // orig font size 54
    this.text_to_bitmap(180, 238, '25', 38,   '0xFF5858', 1.5, 1.5);              //getAt(22) // orig font size 54
    this.text_to_bitmap(180, 350, '25', 38,   '0xFF5858', 1.5, 1.5);              //getAt(23) // orig font size 54
    this.text_to_bitmap(180, 484, '25', 38,   '0xFF5858', 1.5, 1.5);              //getAt(24) // orig font size 54

    this.text_to_bitmap(15, -70, 'Charname', 35);                       //getAt(25)
    this.text_to_bitmap(hp_val.width + 100, -30, 'HP', 35, '0x83FF79'); //getAt(26)
    this.text_to_bitmap(sp_val.width + 100, 85, 'SP', 35, '0x0099FF');  //getAt(27)

    ////////////////////////////////////////////////////////////////////////////////////////

    //optimize?
    /*
    for (var e = 0; e <= player_group.skills.length - 1; e++) {

        var skill;
        var hex_skill_slot;

        skill = player_group.skills[e];

        // Hexagon
        hex_skill_slot = this.getAt(4);

        this.INIT_SKILL(this, skill, e);
    }*/
    // Create UI group timer
    this.timer = this.game.time.create(true);
    this.timer.loop(16, this.move_char_ui, this);

    //line = this.game.make.graphics(15, -30); //getAt(29)
    //line.lineStyle(2, 0xffffff, 1);
    //line.moveTo(0, 0);
    //line.lineTo(215, 0);

    // Make menu assets invisible
    //for (var i = 5; i < 24; i++)
    //    this.getAt(i).visible = false;

    //this.add(line);
    this.add(hp_val);
    this.add(sp_val);

    // *-*-* DEBUG - error on adding new properties outside constructor (avoiding polymorphic) *-*-*    
    //Object.preventExtensions(this);
};

CharacterUI.prototype = Object.create(Phaser.Group.prototype);
CharacterUI.prototype.constructor = CharacterUI;


CharacterUI.prototype.text_to_bitmap = function (x, y, string, font_size, tint, scale_x, scale_y) {

    //TODO: Scan the cache to see if the string already exists, then don't make a new one

    var text;
    var bmd;
    var x
    var width;
    var height;
    var sprite;


    scale_x = scale_x || 1;
    scale_y = scale_y || 1;
    text = this.game.add.text(x + (this.index - 1) * 238, y, string, { font: "24px Arial", fill: "#ff0044", align: "center" }); 
    //text = this.game.make.bitmapText(x, y, 'Agency_54', string, font_size); 
    console.log(text.x + " " + text.y)
    text.visible = false;
    //this.add(text);
    //this.test_incrament 
    /*
    text = this.game.make.bitmapText(0, 0, 'Arial', string, font_size); 
    text.update = null;

    width = Math.round(text.width);
    height = Math.round(text.height);

    bmd = this.game.make.bitmapData(this.get_bitmap_size(width, 16), this.get_bitmap_size(height, 16));
    bmd.drawGroup(text);

    sprite = this.create(x, y, bmd);

    if (tint)
        sprite.tint = tint;

    if (string == 'HP' || string == 'SP' || string == 'Charname')
            sprite.visible = true;
        else
            sprite.visible = false;

        sprite.scale.setTo(scale_x, scale_y);

    text.destroy();
    */
}



CharacterUI.prototype.get_bitmap_size = function (val, div) {


    for (var i = 0; i < 6; i++) {

        if ((div % val) === div) 
            div *= 2;
        else {
            return div;
        }
    }
    
}

module.exports = CharacterUI;
},{}],6:[function(require,module,exports){
'use strict';

var Enemy = function (game, name, x, y) {

    Phaser.Group.call(this, game);

    this.name = name;
    this.x = x;
    this.y = y;
    this.scale_x = 0.75;
    this.scale_y = 0.75;
    this.index = 0;

    /* GameState.js properies */
    this.is_enemy = true;
    this.desync_complete = true;
    this.rnd_x = 0;
    this.rnd_y = 0;
    this.rnd_dur = 0;
    this.rnd_delay = 0;
    this.start_delay = 0;
    this.t_main = this.game.time.create(false);
    this.t_main.start();
    ////////////////////////////

    this.init_DB(name);


    // ----- Data ----
    /*
    this.data = enemiesDataObj[name];
    this.skill_data = skillDataObj[name];
    this.skill_mod = 1;
    this.name = name;
    this.hp = this.data.hp;
    this.max_hp = this.data.hp;
    this.speed = this.data.speed;
    */

    // ----- Sprite variables -----
    this.dir = 'right';
    this._numMin = 1;
    this._numMax = 100;
    this.moveCount = 0;
    this.hostile = true;
    this.last_recieved_attack = '';
    this.last_connected_attack = '';
    this.hit_stunned = false;
    this.active_skill = '';


/*
    // Stat lines
    this.st at_line_diagonal = this.create(_sprite.x + _sprite.width / 2, _sprite.y - _sprite.height / 2, 'enemy_stat_line');//this.create(40, -35, 'enemy_stat_line');
    this.stat_line_diagonal.angle = 315;
    this.stat_line_diagonal.scale.setTo(0, 1);
    this.stat_line_horizontal = this.create(this.stat_line_diagonal.x + 53, this.stat_line_diagonal.y - 41, 'enemy_stat_line');
    this.stat_line_horizontal.scale.setTo(0, 1);
    this.stat_line_horizontal.anchor.setTo(0, 1);

    this.stat_line_diagonal.tw_in_scale = this.game.add.tween( this.stat_line_diagonal.scale ).to({ x: 1, y: 1 }, 500, Phaser.Easing.Quadratic.In, false, 500);
    this.stat_line_diagonal.tw_in_scale.onComplete.add(this.start_stat_horizontal_line_tween, this);
    this.stat_line_diagonal.tw_out_scale = this.game.add.tween( this.stat_line_diagonal.scale ).to({ x: 0, y: 1 }, 500, Phaser.Easing.Quadratic.Out, false);

    this.stat_line_horizontal.tw_in_scale = this.game.add.tween( this.stat_line_horizontal.scale ).to({ x: 1, y: 1 }, 500, Phaser.Easing.Quadratic.Out, false);
    this.stat_line_horizontal.tw_in_scale.onComplete.add(this.start_stat_fade_in, this);
    this.stat_line_horizontal.tw_out_scale = this.game.add.tween( this.stat_line_horizontal.scale ).to({ x: 0, y: 1 }, 500, Phaser.Easing.Quadratic.In, false, 100);
    this.stat_line_horizontal.tw_out_scale.onComplete.add(this.start_stat_diagonal_line_tween_out, this);
*/

// *-*-* DEBUG - error on adding new properties outside constructor (avoiding polymorphic) *-*-*    
//Object.preventExtensions(this);
};

Enemy.prototype = Object.create(Phaser.Group.prototype);

Enemy.prototype.constructor = Enemy;


Enemy.prototype.test = function () {
    console.log("!");
}


Enemy.prototype.init_DB = function (type) {

  var _string;
  var _skeleton;


    switch (type) {
        case 'slime':
        _string = 'slime';
        break;
    }

    var _skeleton = _string + "_skeleton";

    // ************************* DRAGONBONES *************************
    var armatureName = 'slime';
    var skeletonId = 'slime';
    var animationId = "idle";
    var skeletonJSON = this.game.cache.getJSON(_string + "_skeleton");
    var atlasJson = this.game.cache.getJSON(_string + '_json');
    var texture = this.game.cache.getImage(_string + '_image');
    var atlasId = _string + '_atlas';

    var partsList = [

        "SPRITES-enemies-Slime-slime__",
        "SPRITES-enemies-Slime-slime_eye_",
        "SPRITES-enemies-Slime-slime_face_mouth",
        "SPRITES-enemies-Slime-test"
    ];

    var config = {
        armatureName: armatureName,
        skeletonId: skeletonId,
        animationId: animationId,
        atlasId: atlasId,
        partsList: partsList
    };


    // Make armature
    this.armature = dragonBones.makeArmaturePhaser(config, skeletonJSON, atlasJson, texture);


    // ----- Event listeners -----
    //armature.addEventListener(events.AnimationEvent.FADE_IN, this.event_handler);
    //armature.addEventListener(this.game.events.FrameEvent.ANIMATION_FRAME_EVENT, _player.e.frame_event_handler);
    //this.armature.addEventListener(this.game.events.AnimationEvent.COMPLETE, this.complete_event_handler);
    this.armature.addEventListener(this.game.events.AnimationEvent.COMPLETE, this.complete_event_handler);


    // ----- Start animation! -----
    //this.armature.animation.gotoAndPlay("idle", 0.2);

    //this.armature.animation.getAnimationDataList()[0].duration = this.game.rnd.realInRange(0, 1)

    var display_sprite;

    display_sprite = this.armature.getDisplay();

    this.add(display_sprite);
}


Enemy.prototype.init_skills = function () {
    // ~~~ Max 10 attacks

    for (var i = 0; i < 10; i++) {
        if (this.data["skill_" + pad(i, 2)]) {
            this["skill_" + pad(i, 2)] = this.data["skill_" + pad(i, 2)];


            for (var key in this.skill_data) {

            }
        }
    }
    //this.timeEvent();
}



module.exports = Enemy;

},{}],7:[function(require,module,exports){
'use strict';
var Character = require('../states/Character');
var Enemy = require('../states/Enemy');

//@webfonts - cocoonJS : they have done a great job and they will work finde, since you put them into ./fonts and load them via @fontface.

// Bonus for 1st time clearing a floor (added on as a % value at the end of all the exp aquired on that floor per character)
// Bonus EXP for certain acts (combos) in combat towards certain characters after fight
// 'Ancient' item class

// Beginning map: grass field
// into 1st dungeon: has skeletons that tank, heal, cast, dps, hinder, etc
//
// -- Make grass multiple layers of different colored long, long blades that sway

// '#00FFFF' - fancy teal
// DAY OF THE VIKING - very good graphics to look at


//tweens that start on creation of a state will be choppy.. use game.time.events.add(1, fadeIn); to delay the tween
//(it seems that game.time.events will not start before everything is loaded)

/* TODO:

-lower number of steps with changing alpha / movement of main platforms

-glowing enemy level text.  Maybe just number, maybe whole text ("Lv. 1 Slime")
-Setting to allow reverse touch movement
*/


// LEFT OFF:
/*

just try pause/resume tween with a timer

 maybe battle state finally?!?!
*/


/*
*** LINE 1012 && 1317 ***
-prompt engage.  when % chance to spawn tiles are used, change
index >= 6 to >= 5
*/

function GameState() {}

GameState.prototype = {

    preload: function() {

        // **** MID ****
        this.game.load.image('player_image_mid', 'assets/SPRITES/player/texture_12_mid.png');
        this.game.load.json('player_json_mid', 'assets/SPRITES/player/texture_12_mid.json');
        this.game.load.atlas('player_atlas_mid', 'assets/SPRITES/player/texture_12_mid.png', 'assets/SPRITES/player/texture_12_mid.json');
        this.game.load.json('player_skeleton_mid', 'assets/SPRITES/player/skeleton_mid.json');

        // **** SLIME ****
        this.game.load.image('slime_image', 'assets/SPRITES/slime/texture.png');
        this.game.load.json('slime_json', 'assets/SPRITES/slime/texture.json');
        this.game.load.atlas('slime_atlas', 'assets/SPRITES/slime/texture.png', 'assets/SPRITES/slime/texture.json');
        this.game.load.json('slime_skeleton', 'assets/SPRITES/slime/skeleton.json');

        // ---------------------------- GAME STATE ----------------------------
        this.game.load.image('enemy_stat_line', 'assets/GAME_STATE/UI/enemy_stat_line.png');
        this.game.load.image('ui_shade', 'assets/GAME_STATE/UI/ui_shade.png');


        var fileFormat = (this.game.device.cocoonJS) ? '.json' : '.xml';

        this.game.load.bitmapFont('Agency_54', 'assets/fonts/agency_54_0.png', 'assets/fonts/agency_54' + fileFormat);
        //this.game.load.bitmapFont('Agency_35', 'assets/fonts/agency_35_0.png', 'assets/fonts/agency_35' + fileFormat);
        this.game.load.bitmapFont('Agency_28', 'assets/fonts/agency_28_0.png', 'assets/fonts/agency_28' + fileFormat);



        // -------------------------------------------------------------------------------------------
        // ---------------------------------------GAME STATE------------------------------------------
        // -------------------------------------------------------------------------------------------
        // -------------------------------- UI --------------------------------
        this.game.load.image('white_square', 'assets/GAME_STATE/UI/white_square.png');
        this.game.load.image('battle_engage_ui', 'assets/GAME_STATE/UI/battle_engage_ui.png');


        // ------------------------------- MAPS -------------------------------
        this.game.load.tilemap('map', 'assets/MAPS/maps_01.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', 'assets/MAPS/tiles.png');


        // ------------------------------- FLOOR -------------------------------
        this.game.load.image('floor', 'assets/GAME_STATE/cube_floor_01.png');
        this.game.load.image('bridge', 'assets/GAME_STATE/cube_bridge_01.png');
        //this.game.load.image('floor', 'assets/GAME_STATE/floor_bridge_test.png');
        //this.game.load.image('bridge', 'assets/GAME_STATE/floor_bridge_test.png');
    },


    init: function(SAFE_ZONE_WIDTH, SAFE_ZONE_HEIGHT, floor) {

        this.SAFE_ZONE_WIDTH = SAFE_ZONE_WIDTH;
        this.SAFE_ZONE_HEIGHT = SAFE_ZONE_HEIGHT;
        this.floor = floor;
    },


    create: function() {

        //console.log(this.SAFE_ZONE_WIDTH + " " + this.SAFE_ZONE_HEIGHT);

        //this.game.time.desiredFps = 50;

        this.timer = this.game.time.create(false);
        this.timer.add(500, this.timer_next_menu, this);
        this.game.time.events.loop(20, this.update_db, this);
        this.game.time.events.loop(400, this.SORT, this);

        //this.game.time.events.add(2000, function () {this.game.scale.startFullScreen(false)}, this);
        //orientBoot(this.game);

        this.game_functions(this.game);
        this.init_controls();




        // ------------------------------ VARIABLES --------------------------------
        //"#F7F72B"
        this.text_style = {
            font: 'bold 46px Agency_54',
            fill: "#FFFF00",
            align: "center"
        };
        this.text_style_enemy_stat = {
            font: 'bold 40px Agency_54',
            fill: "#CCEDE5",
            align: "center"
        };
        this.a_text = ['ENGAGE?', 'YES', 'NO'];
        this.map = null;
        this.layer = null;
        this.current_tile = null;
        this.selection_state = 'movement';
        this.trigger_alpha = 0;
        this.moving_active = false;
        this.enemy_group_count = 1;
        this.a_temp_enemy = [];
        this.current_dir = 0;
        this.moved_dir = null;
        this.touch_x = 0;
        this.touch_y = 0;
        this.prev_touch_x = 0;
        this.prev_touch_y = 0;
        this.prompt_group = null;

        this.bridge_left = null;
        this.bridge_right = null;
        this.bridge_above = null;
        this.bridge_below = null;

        this.current_formation = null;
        this.platform_x = 352;
        this.platform_y = 251;
        this.platform_scale_x = 0;
        this.center_x = this.game.width / 2;
        this.center_y = this.game.height / 2;

        this.r_minimap_center = new Phaser.Rectangle(785, 65, 32, 21);
        this.r_platform_area = new Phaser.Rectangle(317, 277, 334, 131);
        this.r_bridge_area = new Phaser.Rectangle(460, 360, 70, 30);




        // ------------------------------- GROUPS ----------------------------------
        this.g_main = this.game.add.group();
        this.g_floor_all = this.game.add.group();
        this.g_floor_left = this.game.add.group();
        this.g_floor_above = this.game.add.group();
        this.g_floor_current = this.game.add.group();
        this.g_floor_below = this.game.add.group();
        this.g_floor_right = this.game.add.group();
        this.g_floor_extra_1 = this.game.add.group();
        this.g_floor_extra_2 = this.game.add.group();
        this.g_floor_extra_3 = this.game.add.group();
        this.g_floor_extra_4 = this.game.add.group();
        this.g_enemy_sprite_slime = this.game.add.group();
        this.g_enemy_stat_line = this.game.add.group();
        this.g_enemy_stat_line.exists = false;
        this.g_sprite_container = this.game.add.group();
        this.g_temp_enemy_1 = this.game.add.group();
        this.g_temp_enemy_1.name = 'g_temp_enemy_1';
        this.g_temp_enemy_2 = this.game.add.group();
        this.g_temp_enemy_2.name = 'g_temp_enemy_2';
        this.g_temp_enemy_3 = this.game.add.group();
        this.g_temp_enemy_3.name = 'g_temp_enemy_3';
        this.g_temp_enemy_4 = this.game.add.group();
        this.g_temp_enemy_4.name = 'g_temp_enemy_4';

        this.g_engage_ui = this.game.add.group();

        this.g_main.add(this.g_floor_all);
        this.g_main.add(this.g_sprite_container);
        //this.g_main.pivot.x = this.g_main.width / 2;
        //this.g_main.pivot.y = this.g_main.height / 2;

        // IF RUNNING IN COCOON
        //if (!this.game.device.desktop) {

        //this.g_main.scale.setTo(0.5, 0.5);

        //this.g_main.x = this.game.;
        //this.g_main.y = this.SAFE_ZONE_HEIGHT;
        //}




        // ------------------------------ CHARACTERS --------------------------------
        this.current_formation = this.game.formationDataObj.formation_3;

        for (var i = 1; i <= 4; i++) {

            var char_x = this.current_formation[i - 1][0] * 66 - (i * 5);
            var char_y = this.current_formation[i - 1][1] * 44;

            this['g_player_' + i] = new Character(this.game, 0, 0, i);
            this['g_player_' + i].scale.setTo(0.75, 0.75);
            this['player_' + i] = this.game.add.sprite(char_x + 385, char_y + 305, '');
            this['player_' + i].addChild(this['g_player_' + i]);
            this.g_sprite_container.add(this['player_' + i]);
            this.game.physics.enable(this['player_' + i], Phaser.Physics.ARCADE);
            this['player_' + i].body.drag.x = 40;
            this['player_' + i].body.drag.y = 40;
            // Character positioning seems off depending on the armature..  Bottom right corner of sprite is 0,0
        }

        //this.init_sprite("g_player_1");
        //this.init_sprite("g_player_2");
        //this.init_sprite("g_player_3");
        //this.init_sprite("g_player_4");


        // ------------------------------- ENEMIES ----------------------------------

        for (var e = 0; e <= 20; e++) {

            var enemy = new Enemy(this.game, 'slime', -40, -50);
            enemy.name = "enemy " + (e + 1);

            this.g_enemy_sprite_slime.add(enemy);
            //this.game.physics.enable(enemy.getAt(0), Phaser.Physics.ARCADE);

            enemy.visible = false;
            enemy.exists = false;
        }


        // ------------------------------ FUNCTIONS ---------------------------------
        this.ui_shade = this.game.add.sprite(this.center_x + 490, 0, 'ui_shade'); //670
        this.ui_shade.tw_alpha_in = this.game.add.tween(this.ui_shade).to({
            x: this.game.width - 240
        }, 1000, Phaser.Easing.Quadratic.Out);
        this.ui_shade.tw_alpha_out = this.game.add.tween(this.ui_shade).to({
            x: this.game.width
        }, 1000, Phaser.Easing.Quadratic.Out);
        this.ui_shade.scale.setTo(1.2, 5);
        this.game.world.bringToTop(this.g_enemy_stat_line);

        this.set_map();
        this.init_floor();
        this.init_ui();
        this.init_enemy_stat_line();

        // Handle everything involving tiles in all directions from the new tile
        this.update_floor_extended(1, "getTileLeft", "g_floor_left", "bridge_left", -530, -20, -195, 110, true, -1);
        this.update_floor_extended(2, "getTileRight", "g_floor_right", "bridge_right", 220, 250, 180, 245, false, -1);
        this.update_floor_extended(3, "getTileAbove", "g_floor_above", "bridge_above", 220, -20, 180, 110, true, -1);
        this.update_floor_extended(4, "getTileBelow", "g_floor_below", "bridge_below", -530, 250, -195, 245, false, -1);


        // FULLSCREEN BUTTON
        /*
        if (this.game.scale.compatibility.supportsFullScreen) {
            this.toggle_fs = false;
            this.b_fullscreen = this.game.add.button(0, 0, 'red-block', this.toggle_fullscreen, this);
            this.b_fullscreen.width = 100;
            this.b_fullscreen.height = 100;
            this.b_fullscreen.alpha = 0;
        }
        */

        //this.game.add.bitmapText(150, 0, window.outerWidth, this.text_style_enemy_stat);
        //this.game.add.bitmapText(150, 60, window.outerHeight, this.text_style_enemy_stat);

        this.game.time.advancedTiming = true;
        //this.fps = this.game.add.bitmapText(150, 120, this.game.time.fps, this.text_style_enemy_stat);
        //this.game.time.events.loop(30, function () {this.fps.setText(this.game.time.fps);}, this);

        this.g_main.x = this.center_x - 485; //(this.g_main.width / 2);
        this.g_main.y = this.center_y - (this.g_main.height / 2);

        this.date_num = 0;

        this.date_num_temp = 0;
    },


    update: function() {
        //console.log(this.game.time.fps)
        //if (this.game.time.fps < 40 && this.game.time.fps > 33)
        //    this.b_fullscreen.x += 8;
        /*
        if (checkOverlap(sprite1, sprite2)) {
            text.text = 'Drag the sprite. Overlapping: true';
        } else {
            text.text = 'Drag the sprite. Overlapping: false';
        }

        */
    },

    // -----------------------------------------Update functions-----------------------------------------
    SORT: function() {


        //this.game.world.sort('y', Phaser.Group.SORT_ASCENDING);

        this.g_sprite_container.sort('y', Phaser.Group.SORT_ASCENDING);

        this.g_enemy_sprite_slime.sort('y', Phaser.Group.SORT_ASCENDING);

        if (this.g_temp_enemy_1.children.length >= 1) {
            this.g_temp_enemy_1.sort('y', Phaser.Group.SORT_ASCENDING);
        }
        if (this.g_temp_enemy_2.children.length >= 1) {
            this.g_temp_enemy_2.sort('y', Phaser.Group.SORT_ASCENDING);
        }
        if (this.g_temp_enemy_3.children.length >= 1) {
            this.g_temp_enemy_3.sort('y', Phaser.Group.SORT_ASCENDING);
        }
        if (this.g_temp_enemy_4.children.length >= 1) {
            this.g_temp_enemy_4.sort('y', Phaser.Group.SORT_ASCENDING);
        }
    },


    update_db: function() {

        var num;

        num = this.game.time.now - this.game.time.prevTime;

        dragonBones.animation.WorldClock.clock.advanceTime(num / 1000);
    },



    update_map: function() {

        var up;
        var down;
        var left_x;
        var left_y;
        var right_x;
        var right_y;
        var sight_start_x;
        var sight_start_y;
        var sight_width;
        var sight_height;

        // Values to Control out of bound values
        up = this.current_tile.y - 2;
        if (up <= 0)
            up = 0;


        down = this.current_tile.y + 3;
        if (down >= this.map.height)
            down = this.map.height;


        left_x = this.current_tile.y - 2;
        if (left_x <= 0)
            left_x = 0;
        left_y = this.current_tile.x - 2;
        if (left_y <= 0)
            left_y = 0;


        right_x = this.current_tile.x + 3;
        if (right_x >= this.map.width)
            right_x = this.map.width;
        right_y = this.current_tile.y - 2;
        if (right_y <= 0)
            right_y = 0;


        // Values to Control starting point of vision
        sight_start_x = this.current_tile.x - 2;
        if (sight_start_x <= 0)
            sight_start_x = 0;

        sight_start_y = this.current_tile.y - 2;
        if (sight_start_y <= 0)
            sight_start_y = 0;


        // Values to Control width/height of visible tiles around player.
        sight_width = 5;
        if (this.current_tile.x + 1 >= this.map.width || this.current_tile.x - 1 < 0)
            sight_width = 3;
        else if (this.current_tile.x + 2 >= this.map.width || this.current_tile.x - 2 < 0)
            sight_width = 4;


        sight_height = 5;
        if (this.current_tile.y + 1 >= this.map.height || this.current_tile.y - 1 < 0)
            sight_height = 3;
        else if (this.current_tile.y + 2 >= this.map.height || this.current_tile.y - 2 < 0)
            sight_height = 4;


        // Map tile control
        // Up
        this.map.forEach(this.f_tile_alpha, this, 0, 0, this.map.width, up);

        // Down
        this.map.forEach(this.f_tile_alpha, this, 0, down, this.map.width, (this.map.height - this.current_tile.y) - 3);

        // Left
        this.map.forEach(this.f_tile_alpha, this, 0, left_x, left_y, (this.map.height - this.current_tile.y) + 2);

        // Right
        this.map.forEach(this.f_tile_alpha, this, right_x, right_y, this.map.width - (this.current_tile.x + 3), (this.map.height - this.current_tile.y) + 2);

        // Restore sight around current tile
        this.map.forEach(this.f_tile_restore_alpha, this, sight_start_x, sight_start_y, sight_width, sight_height);
    },


    update_floor: function(dir) {

        // Called by directional key presses
        // Updates adjacent floor tiles and their bridges


        // Left
        if (dir == 0)
            this.f_fade_bridge_floor(1, 1, 'g_floor_left');


        // Right
        else if (dir == 1)
            this.f_fade_bridge_floor(2, 1, 'g_floor_right');


        // Above
        else if (dir == 2)
            this.f_fade_bridge_floor(3, 1, 'g_floor_above');


        // Below
        else if (dir == 3)
            this.f_fade_bridge_floor(4, 1, 'g_floor_below');



        // Handle everything involving tiles in all directions from the new tile
        this.update_floor_extended(dir, "getTileLeft", "g_floor_extra_1", "bridge_extra_1", -530, -20, -195, 110, true, 0);
        this.update_floor_extended(dir, "getTileRight", "g_floor_extra_2", "bridge_extra_2", 220, 250, 180, 245, false, 1);
        this.update_floor_extended(dir, "getTileAbove", "g_floor_extra_3", "bridge_extra_3", 220, -20, 180, 110, true, 2);
        this.update_floor_extended(dir, "getTileBelow", "g_floor_extra_4", "bridge_extra_4", -530, 250, -195, 245, false, 3);
    },
    f_fade_bridge_floor: function(loc, val, name) {

        // Location of the floor+bridge groups
        switch (loc) {

            // Left
            case 1:
                this.game.time.events.repeat(50, 20, this.f_fade_out, this.g_floor_below);
                this.game.time.events.repeat(50, 20, this.f_fade_out, this.g_floor_right);
                this.game.time.events.repeat(50, 20, this.f_fade_out, this.g_floor_above);
                this.game.time.events.repeat(50, 20, this.f_fade_out, this.bridge_below);
                this.game.time.events.repeat(50, 20, this.f_fade_out, this.bridge_right);
                this.game.time.events.repeat(50, 20, this.f_fade_out, this.bridge_above);
                break;

                // Right
            case 2:

                this.game.time.events.repeat(50, 20, this.f_fade_out, this.g_floor_below);
                this.game.time.events.repeat(50, 20, this.f_fade_out, this.g_floor_left);
                this.game.time.events.repeat(50, 20, this.f_fade_out, this.g_floor_above);
                this.game.time.events.repeat(50, 20, this.f_fade_out, this.bridge_below);
                this.game.time.events.repeat(50, 20, this.f_fade_out, this.bridge_left);
                this.game.time.events.repeat(50, 20, this.f_fade_out, this.bridge_above);
                break;

                // Above
            case 3:

                this.game.time.events.repeat(50, 20, this.f_fade_out, this.g_floor_below);
                this.game.time.events.repeat(50, 20, this.f_fade_out, this.g_floor_right);
                this.game.time.events.repeat(50, 20, this.f_fade_out, this.g_floor_left);
                this.game.time.events.repeat(50, 20, this.f_fade_out, this.bridge_below);
                this.game.time.events.repeat(50, 20, this.f_fade_out, this.bridge_right);
                this.game.time.events.repeat(50, 20, this.f_fade_out, this.bridge_left);
                break;

                // Below
            case 4:

                this.game.time.events.repeat(50, 20, this.f_fade_out, this.g_floor_left);
                this.game.time.events.repeat(50, 20, this.f_fade_out, this.g_floor_right);
                this.game.time.events.repeat(50, 20, this.f_fade_out, this.g_floor_above);
                this.game.time.events.repeat(50, 20, this.f_fade_out, this.bridge_left);
                this.game.time.events.repeat(50, 20, this.f_fade_out, this.bridge_right);
                this.game.time.events.repeat(50, 20, this.f_fade_out, this.bridge_above);
                break;
        }
    },
    update_floor_extended: function(dir, get_tile_dir, _floor, _bridge, floor_x, floor_y, bridge_x, bridge_y, is_left_or_above, moved_dir) {

        var _temp_enemy_group;
        var tile;
        var group_index;
        var plat_x;
        var plat_y;
        var rnd_x;
        var rnd_y;

        // Reset the X coord checker array (separates enemies by X if too close)
        //this.a_temp_loc.length = 0;


        // Tile being checked.
        tile = this.map[get_tile_dir](this.map.getLayer(), this.current_tile.x, this.current_tile.y);


        if (tile == undefined)
            return;


        // Property # of tile in TILED
        group_index = tile.properties.TILED_enemy;


        // Find location on the main platform
        plat_x = this.game.rnd.realInRange(this.r_platform_area.x, this.r_platform_area.x + this.r_platform_area.width);
        plat_y = this.game.rnd.realInRange(this.r_platform_area.y, this.r_platform_area.y + this.r_platform_area.height);


        // Get tile DIRECTION newly moved to tile if not off-screen or a wall (index 2)
        if (tile != null && tile.index != 2) {

            // If tile is a forced spawn and unactivated
            if (tile.index >= 7 /*&& tile.data == null*/ && group_index != undefined) {

                // I think this is an example of a property pointing at a variable instead of making a copy.. maybe
                tile.data = this.game.levelDataObj['enemy_group_' + group_index];
                _temp_enemy_group = this['g_temp_enemy_' + (moved_dir + 1)];


                // For initial load. -1 is not a valid moved_dir.  Use of dir property here is different, to indicate g_temp_enemy_# index.
                if (_temp_enemy_group == undefined)
                    _temp_enemy_group = this['g_temp_enemy_' + dir];

                _temp_enemy_group.data = tile.data;
                _temp_enemy_group.group = ('enemy_group_' + group_index);


                for (var i = 1; i <= tile.data.length - 1; i++) {

                    var enemy = this.g_enemy_sprite_slime.getFirstExists(false);
                    var rnd_x = this.game.rnd.integerInRange(165, 441);
                    var rnd_y = this.game.rnd.integerInRange(45, 100);
                    var rnd_dur = this.game.rnd.integerInRange(1000, 1400);
                    //start_delay = this.game.rnd.integerInRange(1500, 8000);

                    enemy.index = i;
                    enemy.exists = true;
                    enemy.visible = true;
                    _temp_enemy_group.add(enemy);
                }

                // Add enemy to platform group so it can imitate tweens/fading.  _floor is g_floor_extra_#
                this[_floor].add(_temp_enemy_group);
            }


            if (enemy) {

                // Randomize location of each enemy on the platform.
                _temp_enemy_group.forEach(this.check_bounds, this, true);


                // Starts idle animation after a random time
                _temp_enemy_group.forEach(this.start_sprite_enemy, this, true);


                // Face a random direction
                _temp_enemy_group.forEach(this.random_dir_enemy, this, true);
            }


            // If it's the initial call, return.  No need for changing alpha.
            if (moved_dir == -1)
                return;


            // Control alpha of platforms and bridges
            switch (dir) {

                // Moved left
                case 0:

                    if (moved_dir != 1)
                        this.f_alpha_control(this[_floor], this[_bridge], floor_x, floor_y, bridge_x, bridge_y, is_left_or_above);
                    break;


                    // Moved right
                case 1:

                    if (moved_dir != 0)
                        this.f_alpha_control(this[_floor], this[_bridge], floor_x + 750, floor_y + 270, bridge_x + 750, bridge_y + 270, is_left_or_above);
                    break;


                    // Moved above
                case 2:

                    if (moved_dir != 3)
                        this.f_alpha_control(this[_floor], this[_bridge], floor_x + 750, floor_y, bridge_x + 750, bridge_y, is_left_or_above);
                    break;


                    // Moved below
                case 3:

                    if (moved_dir != 2)
                        this.f_alpha_control(this[_floor], this[_bridge], floor_x, floor_y + 270, bridge_x, bridge_y + 270, is_left_or_above);
                    break;
            }
        }
    },
    f_alpha_control: function(floor, bridge, floor_x, floor_y, bridge_x, bridge_y, is_left_or_above) {

        // Control positioning and fade in/out of floors and bridges
        floor.x = floor_x;
        floor.y = floor_y;
        this.game.time.events.repeat(50, 20, this.f_fade_in, floor);
        bridge.x = bridge_x;
        bridge.y = bridge_y;
        this.game.time.events.repeat(50, 20, this.f_fade_in, bridge);

        // If its a left/above floor, set Z order
        if (is_left_or_above) {
            this.g_floor_all.sendToBack(bridge);
            this.g_floor_all.sendToBack(floor);
        }
    },
    check_bounds: function(_enemy) {

        var rnd_x;
        var rnd_y;


        // Get a random location for EACH enemy on a platform.
        rnd_x = this.game.rnd.integerInRange(165, 441); // 165, 441
        rnd_y = this.game.rnd.integerInRange(45, 100); // 45, 135

        _enemy.x = 0;
        _enemy.y = 0;

        // Apply the new position to the enemy
        _enemy.x += rnd_x;
        _enemy.y += rnd_y;


        // a_temp_loc is an array of all enemy X values
        /*
        for (var i = 0, len = this.a_temp_loc.length; i < len; i++) {

            // If enemy location is on top of another enemies X position, re-randomize position.
            if (_enemy.x != this.a_temp_loc[i] &&
                (_enemy.x >= this.a_temp_loc[i] - (_enemy.width / 3) &&
                _enemy.x <= this.a_temp_loc[i] + (_enemy.width / 3))) {

                // Restart function
                this.check_bounds(_enemy);
                return;
            }
        }
        */

        // Add the final X position to the enemy X array
        //this.a_temp_loc.push(rnd_x);
    },









    // ----------------------------------------- Functions -----------------------------------------

    toggle_fullscreen: function() {

        this.toggle_fs = !this.toggle_fs;

        if (this.toggle_fs) {
            this.game.scale.startFullScreen();
        } else {
            this.game.scale.stopFullScreen();
        }
    },


    init_ui: function() {

        var _ui;
        var _white;
        var _yes;
        var _no;
        var _engage;
        var _start;
        var _back;


        // Position of 'ENGAGE? YES/NO' window
        this.g_engage_ui.x = this.game.width / 2 - 300;
        this.g_engage_ui.y = this.game.height / 2;
        this.g_engage_ui.alpha = 0;
        this.g_engage_ui.scale.setTo(0.2, 0.01);


        // Create UI background
        _ui = this.game.add.sprite(-132, -147, 'battle_engage_ui');
        //this.g_engage_ui.getAt(0).tint = 16990000; //purple
        //this.g_engage_ui.getAt(0).tint = 16999999; //green


        // Create UI tweens
        // OPEN engage menu
        this.g_engage_ui.tw_in_alpha = this.game.add.tween(this.g_engage_ui).to({
            alpha: 1
        }, 50, Phaser.Easing.Quadratic.InOut);
        this.g_engage_ui.tw_in_scale = this.game.add.tween(this.g_engage_ui.scale).to({
            x: 1.2,
            y: 0.01
        }, 100, Phaser.Easing.Quadratic.In)
            .to({
                x: 1.01,
                y: 1.01
            }, 100, Phaser.Easing.Quadratic.Out)
            .to({
                x: 1,
                y: 1
            }, 50, Phaser.Easing.Quadratic.Out);
        // CLOSE engage menu
        this.g_engage_ui.tw_out_alpha = this.game.add.tween(this.g_engage_ui).to({
            alpha: 1
        }, 50, Phaser.Easing.Quadratic.InOut, false, 80);
        this.g_engage_ui.tw_out_scale = this.game.add.tween(this.g_engage_ui.scale).to({
            x: 1.2,
            y: 0.01
        }, 100, Phaser.Easing.Quadratic.In)
            .to({
                x: 0.2,
                y: 0.01
            }, 150, Phaser.Easing.Quadratic.Out);
        this.g_engage_ui.tw_out_alpha.onComplete.add(this.f_tw_out_alpha_complete, this);



        // White flash
        _white = this.game.add.sprite(-_ui.width / 2, -_ui.height / 2, 'white_square');
        _white.width = _ui.width;
        _white.height = _ui.height;

        _white.tw_out_alpha = this.game.add.tween(_white).to({
            alpha: 0
        }, 150, Phaser.Easing.Quadratic.In);
        _white.tw_in_alpha = this.game.add.tween(_white).to({
            alpha: 1
        }, 350, Phaser.Easing.Quadratic.In);


        // Create YES/NO buttons
        _start = this.game.add.sprite(4 - _ui.width / 2, 64 - _ui.height / 2, '');
        _back = this.game.add.sprite(4 - _ui.width / 2, 180 - _ui.height / 2, '');
        _start.width = _back.width = 252;
        _start.height = _back.height = 111;
        _start.inputEnabled = true;
        _start.events.onInputUp.add(this.YES_engage, this, 'fun');
        _back.inputEnabled = true;
        _back.events.onInputUp.add(this.NO_engage, this);


        // Create text
        _engage = this.game.add.bitmapText(86 - _ui.width / 2, 20 - _ui.height / 2, 'Agency_54', this.a_text[0], 46);
        _yes = this.game.add.bitmapText(112 - _ui.width / 2, 112 - _ui.height / 2, 'Agency_54', this.a_text[1], 46);
        _no = this.game.add.bitmapText(119 - _ui.width / 2, 225 - _ui.height / 2, 'Agency_54', this.a_text[2], 46);


        // Set text alpha
        _engage.alpha = 0.8;
        _yes.alpha = 0.8;
        _no.alpha = 0.8;


        // Add text and buttons to group
        this.g_engage_ui.add(_ui);
        this.g_engage_ui.add(_engage);
        this.g_engage_ui.add(_yes);
        this.g_engage_ui.add(_no);
        this.g_engage_ui.add(_start);
        this.g_engage_ui.add(_back);
        this.g_engage_ui.add(_white);


        // Disable vision
        this.g_engage_ui.visible = false;
        this.g_engage_ui.exists = false;
    },
    f_tw_out_alpha_complete: function() {

        // Hide engage UI
        this.g_engage_ui.exists = false;
        this.g_engage_ui.visible = false;
    },


    init_floor: function() {

        // *****************************

        // Left
        this.create_floor(this.init_tile.x - 1, this.init_tile.y, 0, 'g_floor_left');


        // Above
        this.create_floor(this.init_tile.x, this.init_tile.y - 1, 1, 'g_floor_above');


        // Bridge into left
        this.create_bridge(0, 'bridge_left');


        // Bridge into above
        this.create_bridge(1, 'bridge_above');


        // Current
        this.create_floor(this.init_tile.x, this.init_tile.y, 2, 'g_floor_current');


        // Bridge into below
        this.create_bridge(2, 'bridge_right');


        // Bridge into right
        this.create_bridge(3, 'bridge_below');


        // Right
        this.create_floor(this.init_tile.x + 1, this.init_tile.y, 3, 'g_floor_right');


        // Below
        this.create_floor(this.init_tile.x, this.init_tile.y + 1, 4, 'g_floor_below');


        // Extra bridge 1
        this.create_bridge(4, 'bridge_extra_1');


        // Extra bridge 2
        this.create_bridge(5, 'bridge_extra_2');


        // Extra bridge 3
        this.create_bridge(6, 'bridge_extra_3');


        // Extra bridge 4
        this.create_bridge(7, 'bridge_extra_4');


        // Extra platform 1
        this.create_floor(this.init_tile.x, this.init_tile.y, 5, 'g_floor_extra_1');


        // Extra platform 2
        this.create_floor(this.init_tile.x, this.init_tile.y, 6, 'g_floor_extra_2');


        // Extra platform 3
        this.create_floor(this.init_tile.x, this.init_tile.y, 7, 'g_floor_extra_3');


        // Extra platform 4
        this.create_floor(this.init_tile.x, this.init_tile.y, 8, 'g_floor_extra_4');


        // Are floors/bridges walkable or blocked?  Control tweens
        if (this.map.getTileLeft(this.map.getLayer(), this.current_tile.x, this.current_tile.y) != null &&
            this.map.getTileLeft(this.map.getLayer(), this.current_tile.x, this.current_tile.y).index != 2) {

            //this.g_floor_left.tw_alpha_in.start();
            //this.bridge_left.tw_alpha_in.start();
            this.game.time.events.repeat(50, 20, this.f_fade_in, this.g_floor_left);
            this.game.time.events.repeat(50, 20, this.f_fade_in, this.bridge_left);
        }

        if (this.map.getTileRight(this.map.getLayer(), this.current_tile.x, this.current_tile.y) != null &&
            this.map.getTileRight(this.map.getLayer(), this.current_tile.x, this.current_tile.y).index != 2) {

            //this.g_floor_right.tw_alpha_in.start();
            //this.bridge_right.tw_alpha_in.start();
            this.game.time.events.repeat(50, 20, this.f_fade_in, this.g_floor_right);
            this.game.time.events.repeat(50, 20, this.f_fade_in, this.bridge_right);
        }

        if (this.map.getTileAbove(this.map.getLayer(), this.current_tile.x, this.current_tile.y) != null &&
            this.map.getTileAbove(this.map.getLayer(), this.current_tile.x, this.current_tile.y).index != 2) {

            //this.g_floor_above.tw_alpha_in.start();
            //this.bridge_above.tw_alpha_in.start();
            this.game.time.events.repeat(50, 20, this.f_fade_in, this.g_floor_above);
            this.game.time.events.repeat(50, 20, this.f_fade_in, this.bridge_above);
        }

        if (this.map.getTileBelow(this.map.getLayer(), this.current_tile.x, this.current_tile.y) != null &&
            this.map.getTileBelow(this.map.getLayer(), this.current_tile.x, this.current_tile.y).index != 2) {

            //this.g_floor_below.tw_alpha_in.start();
            //this.bridge_below.tw_alpha_in.start();
            this.game.time.events.repeat(50, 20, this.f_fade_in, this.g_floor_below);
            this.game.time.events.repeat(50, 20, this.f_fade_in, this.bridge_below);
        }

        // Create group tweens
        this.tween_handler();
    },
    create_floor: function(x, y, loc, string) {

        var g_floor;
        var mod_x;
        var mod_y;
        var start_x;
        var start_y;

        g_floor = this[string];
        g_floor.name = string;
        g_floor.alpha = 0;

        // Middle floor group location
        start_x = 220;
        start_y = 250;

        // Add/subtract these from middle floor group x/y to get all other floor group x/y
        mod_x = 375;
        mod_y = 135;

        // Location of the floor+bridge groups
        switch (loc) {

            // Left
            case 0:

                this.g_floor_left.x = start_x - mod_x;
                this.g_floor_left.y = start_y - mod_y;
                break;

                // Above
            case 1:

                this.g_floor_above.x = start_x + mod_x;
                this.g_floor_above.y = start_y - mod_y;
                break;

                // Current
            case 2:
                this.g_floor_current.x = start_x;
                this.g_floor_current.y = start_y;
                break;

                // Right
            case 3:

                this.g_floor_right.x = start_x + mod_x;
                this.g_floor_right.y = start_y + mod_y;
                break;

                // Below
            case 4:

                this.g_floor_below.x = start_x - mod_x;
                this.g_floor_below.y = start_y + mod_y;
                break;
        }

        // Create floor tweens
        g_floor.tw_alpha_in_reset = this.game.add.tween(g_floor).to({
            alpha: 1
        }, 1, Phaser.Easing.Linear.None);
        g_floor.tw_alpha_out_reset = this.game.add.tween(g_floor).to({
            alpha: 0
        }, 1, Phaser.Easing.Linear.None);
        g_floor.tw_alpha_out_reset.onComplete.add(this.f_alpha_out_complete_reset, this, true);
        //this.game.time.events.repeat(50, 20, this.f_fade_in, g_floor);
        //this.game.time.events.repeat(50, 20, this.f_fade_out, g_floor);


        // Fade in the current tile
        if (loc == 2)
            this.game.time.events.repeat(50, 20, this.f_fade_in, this.g_floor_current);


        // Floor sprite
        g_floor.current_tile = g_floor.create(0, 0, 'floor');


        // Add the new floor group to the main floor group
        this.g_floor_all.add(g_floor);
    },
    f_fade_in: function() {

        this.alpha += 0.05;
    },
    f_fade_out: function() {

        if (this.alpha <= 0.05) {
            this.alpha = 0;
            return;
        }

        this.alpha -= 0.05;
    },
    f_alpha_out_complete_reset: function(sprite) {
        // ***** Also where enemy groups are swapped to reset platform groups (g_floor_extra_# to g_floor_<dir>) // ***** CALLED in tween_handler_complete.  Sets ALL g_floor_extra AND g_floor_dir if there's a wall to alpha 0.

        var floor_enemy_data;
        var tile;
        var getTileDir;
        var g_floor_dir;
        var _children;

        this.trigger_alpha++;

        // Only triggers on sprite == g_floor_extra_1
        if (this.trigger_alpha == 1) {


            for (var i = 1; i <= 4; i++) {

                switch (i) {

                    // Left
                    case 1:

                        getTileDir = 'getTileLeft';
                        g_floor_dir = 'g_floor_left';
                        break;

                        // Right
                    case 2:

                        getTileDir = 'getTileRight';
                        g_floor_dir = 'g_floor_right';
                        break;

                        // Above
                    case 3:

                        getTileDir = 'getTileAbove';
                        g_floor_dir = 'g_floor_above';
                        break;

                        // Below
                    case 4:

                        getTileDir = 'getTileBelow';
                        g_floor_dir = 'g_floor_below';
                        break;
                }

                tile = this.map[getTileDir](this.map.getLayer(), this.current_tile.x, this.current_tile.y);


                // If there's an enemy group attached to the platform group
                if (this['g_floor_extra_' + i].getAt(1) != -1) {


                    // The enemy data to be moved from g_extra to g_dir
                    floor_enemy_data = this['g_floor_extra_' + i].getAt(1);
                    this['g_floor_extra_' + i].remove(floor_enemy_data);


                    // If the g_floor_extra tile had data, transfer the enemy group to the g_floor_dir.
                    if (tile.data != null) {


                        // Add the enemy group to the g_floor_dir group
                        this[g_floor_dir].add(floor_enemy_data);


                        // Otherwise if there's no data on the tile, remove the enemy group from the g_floor_dir.
                    } else {

                        this[g_floor_dir].remove(floor_enemy_data);
                        floor_enemy_data.forEach(this.f_swap_group, this, false);
                    }


                    // If theres no enemy data attached to platform group and the tile is not null (a wall)
                } else if (tile != null) {


                    // If there was data on the corresponding g_floor_extra, remove it so it doesn't reappear after shifting main floor group position.
                    if (this[g_floor_dir].getAt(1) != -1) {

                        floor_enemy_data = this[g_floor_dir].getAt(1);
                        floor_enemy_data.forEach(this.f_swap_group, this, false);

                        floor_enemy_data.removeAll();
                        this[g_floor_dir].remove(floor_enemy_data);
                    }


                    // If there is no data and the tile a wall.
                } else {

                }
            }
            this.g_floor_all.x = 0;
            this.g_floor_all.y = 0;

            this.tween_handler();
        }

        // After all directions have been iterated over
        if (this.trigger_alpha == 8) {

            this.g_enemy_sprite_slime.addMultiple(this.a_temp_enemy);
            this.a_temp_enemy.length = 0;
        }
    },
    f_swap_group: function(_enemy) {

        // Reset enemy movement tween and timer
        //_enemy.t_move = null;
        _enemy.t_main.removeAll();

        //**************************DONT USE PUSH!!!!!***********************
        this.a_temp_enemy.push(_enemy);
        _enemy.x = 0;
        _enemy.y = 0;

        _enemy.visible = false;
        _enemy.exists = false;
    },
    create_bridge: function(index, val) {

        var bridge;
        var mod_x;
        var mod_y;
        var start_x;
        var start_y;

        // Create a bridge sprite
        this[val] = this.game.make.sprite(0, 0, 'bridge');
        bridge = this[val];
        bridge.name = val.substr(0, 6);
        bridge.alpha = 0;
        bridge.is_bridge = true;

        // Bridge from middle to left location coordinates
        start_x = 180;
        start_y = 245;

        // Add/subtract these from bridge x/y to get all other bridge x/y
        mod_x = 375;
        mod_y = 135;

        // Location of bridges
        switch (index) {

            // Left
            case 0:

                bridge.x = start_x;
                bridge.y = start_y;
                break;

                // Above
            case 1:

                bridge.x = start_x + mod_x;
                bridge.y = start_y;
                break;

                // Right
            case 2:

                bridge.x = start_x + mod_x;
                bridge.y = start_y + mod_y;
                break;

                // Below
            case 3:

                bridge.x = start_x;
                bridge.y = start_y + mod_y;
                break;

                // Extra 1
            case 4:

                bridge.x = start_x;
                bridge.y = start_y;
                break;

                // Extra 2
            case 5:

                bridge.x = start_x;
                bridge.y = start_y;
                break;

                // Extra 3
            case 6:

                bridge.x = start_x;
                bridge.y = start_y;
                break;

        }

        // Create bridge tweens
        bridge.tw_alpha_in_reset = this.game.add.tween(bridge).to({
            alpha: 1
        }, 1, Phaser.Easing.Linear.None);
        bridge.tw_alpha_out_reset = this.game.add.tween(bridge).to({
            alpha: 0
        }, 1, Phaser.Easing.Linear.None);
        //bridge.tw_alpha_in = this.game.add.tween( bridge ).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None);
        //bridge.tw_alpha_out = this.game.add.tween( bridge ).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None);
        //this.game.time.events.repeat(50, 20, this.f_fade_in, bridge);
        //this.game.time.events.repeat(50, 20, this.f_fade_out, bridge);


        // Add the new bridge to the main floor group
        this.g_floor_all.add(bridge);
    },
    tween_handler: function() {

        this.tw_left = this.game.add.tween(this.g_floor_all).to({
            x: this.g_floor_all.x + 375,
            y: this.g_floor_all.y + 135
        }, 1300, Phaser.Easing.Quadratic.InOut, false);
        this.tw_right = this.game.add.tween(this.g_floor_all).to({
            x: this.g_floor_all.x - 375,
            y: this.g_floor_all.y - 135
        }, 1300, Phaser.Easing.Quadratic.InOut, false);
        this.tw_above = this.game.add.tween(this.g_floor_all).to({
            x: this.g_floor_all.x - 375,
            y: this.g_floor_all.y + 135
        }, 1300, Phaser.Easing.Quadratic.InOut, false);
        this.tw_below = this.game.add.tween(this.g_floor_all).to({
            x: this.g_floor_all.x + 375,
            y: this.g_floor_all.y - 135
        }, 1300, Phaser.Easing.Quadratic.InOut, false);


        this.tw_left.onComplete.add(this.tween_handler_complete, this);
        this.tw_right.onComplete.add(this.tween_handler_complete, this);
        this.tw_above.onComplete.add(this.tween_handler_complete, this);
        this.tw_below.onComplete.add(this.tween_handler_complete, this);
        //this.game.time.events.add(100, function () { this.moving_active = false }, this);
        //this.trigger_alpha = 0;
    },
    tween_handler_complete: function() {

        this.game.time.events.add(100, function() {
            this.moving_active = false
        }, this);


        this.g_floor_extra_1.tw_alpha_out_reset.start();
        this.g_floor_extra_2.tw_alpha_out_reset.start();
        this.g_floor_extra_3.tw_alpha_out_reset.start();
        this.g_floor_extra_4.tw_alpha_out_reset.start();
        this.bridge_extra_1.tw_alpha_out_reset.start();
        this.bridge_extra_2.tw_alpha_out_reset.start();
        this.bridge_extra_3.tw_alpha_out_reset.start();
        this.bridge_extra_4.tw_alpha_out_reset.start();


        // Are floors/bridges walkable or blocked?  Control tweens
        if (this.map.getTileLeft(this.map.getLayer(), this.current_tile.x, this.current_tile.y) != null &&
            this.map.getTileLeft(this.map.getLayer(), this.current_tile.x, this.current_tile.y).index != 2) {


            //
            this.g_floor_left.tw_alpha_out_reset.start();
            this.bridge_left.tw_alpha_out_reset.start();
            //


            this.g_floor_left.tw_alpha_in_reset.start();
            this.bridge_left.tw_alpha_in_reset.start();
        } else {
            this.g_floor_left.tw_alpha_out_reset.start();
            this.bridge_left.tw_alpha_out_reset.start();
        }

        if (this.map.getTileRight(this.map.getLayer(), this.current_tile.x, this.current_tile.y) != null &&
            this.map.getTileRight(this.map.getLayer(), this.current_tile.x, this.current_tile.y).index != 2) {

            //
            this.g_floor_right.tw_alpha_out_reset.start();
            this.bridge_right.tw_alpha_out_reset.start();
            //


            this.g_floor_right.tw_alpha_in_reset.start();
            this.bridge_right.tw_alpha_in_reset.start();
        } else {
            this.g_floor_right.tw_alpha_out_reset.start();
            this.bridge_right.tw_alpha_out_reset.start();
        }

        if (this.map.getTileAbove(this.map.getLayer(), this.current_tile.x, this.current_tile.y) != null &&
            this.map.getTileAbove(this.map.getLayer(), this.current_tile.x, this.current_tile.y).index != 2) {

            //if (this.moved_dir == 3) {
            this.g_floor_above.tw_alpha_out_reset.start();
            this.bridge_above.tw_alpha_out_reset.start();
            //}

            this.g_floor_above.tw_alpha_in_reset.start();
            this.bridge_above.tw_alpha_in_reset.start();
        } else {
            this.g_floor_above.tw_alpha_out_reset.start();
            this.bridge_above.tw_alpha_out_reset.start();
        }

        if (this.map.getTileBelow(this.map.getLayer(), this.current_tile.x, this.current_tile.y) != null &&
            this.map.getTileBelow(this.map.getLayer(), this.current_tile.x, this.current_tile.y).index != 2) {

            //
            this.g_floor_below.tw_alpha_out_reset.start();
            this.bridge_below.tw_alpha_out_reset.start();
            //

            this.g_floor_below.tw_alpha_in_reset.start();
            this.bridge_below.tw_alpha_in_reset.start();
        } else {
            this.g_floor_below.tw_alpha_out_reset.start();
            this.bridge_below.tw_alpha_out_reset.start();
        }

        this.trigger_alpha = 0;
    },


    init_controls: function() {

        this.game.stage.disableVisibilityChange = true;

        //if (global_mobile_enabled)
        //    d_pad = new D_pad(70, 228, player_body);

        this.z_key = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
        this.z_key.onDown.add(this.Z_PRESS, this);
        this.left_key = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.left_key.onDown.add(this.LEFT_PRESS, this);
        //this.left_key.onUp.add(this.IDLE, this);
        this.left_key.isUp = true;
        this.right_key = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.right_key.onDown.add(this.RIGHT_PRESS, this);
        //this.right_key.onUp.add(this.IDLE, this);
        this.right_key.isUp = true;
        this.up_key = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.up_key.onDown.add(this.UP_PRESS, this);
        //this.up_key.onUp.add(this.IDLE, this);
        this.up_key.isUp = true;
        this.down_key = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.down_key.onDown.add(this.DOWN_PRESS, this);
        //this.down_key.onUp.add(this.IDLE, this);
        this.down_key.isUp = true;

        this.game.input.onUp.add(this.TOUCH_UP, this);
        this.game.input.onDown.add(this.TOUCH_DOWN, this);
    },



    init_enemy_stat_line: function() {

        var main_group;
        var _sprite;
        var horizontal_line;
        var diagonal_line;
        var text_sprite;

        main_group = this.g_enemy_stat_line;
        //main_group.scale.setTo(this.game.SCALE_WIDTH, this.game.SCALE_HEIGHT);


        for (var e = 0; e < 10; e++) {

            // Internal sprite holding one of each line.  Also text sprite.
            _sprite = this.game.make.sprite(this.center_x + 230, this.center_y - 50 + (e * 70), '');
            text_sprite = this.game.make.sprite(0, 0, '');
            text_sprite.alpha = 0;


            // Text for stat line
            this.create_stat_text(text_sprite, "Lv. 1  Slime", 'rgb(255, 255, 0)', this.text_style_enemy_stat);

            // Stat lines
            diagonal_line = this.game.make.sprite(0, 0, 'enemy_stat_line');
            _sprite.addChild(diagonal_line);
            diagonal_line.angle = 315;
            diagonal_line.scale.setTo(0, 1);
            horizontal_line = this.game.make.sprite(diagonal_line.x + 53, diagonal_line.y - 41, 'enemy_stat_line');
            _sprite.addChild(horizontal_line);
            horizontal_line.scale.setTo(0, 1);
            horizontal_line.anchor.setTo(0, 1);


            // Tweens
            text_sprite.tw_in_scale = this.game.add.tween(text_sprite.scale).to({
                y: 1
            }, 280, Phaser.Easing.Quadratic.Out, false);
            text_sprite.tw_out_scale = this.game.add.tween(text_sprite.scale).to({
                y: 0.8
            }, 280, Phaser.Easing.Quadratic.In, false);
            text_sprite.tw_in_alpha = this.game.add.tween(text_sprite).to({
                alpha: 1
            }, 300, Phaser.Easing.Quadratic.InOut, false);
            text_sprite.tw_out_alpha = this.game.add.tween(text_sprite).to({
                alpha: 0
            }, 300, Phaser.Easing.Quadratic.InOut, false);

            diagonal_line.tw_in_scale = this.game.add.tween(diagonal_line.scale).to({
                x: 1,
                y: 1
            }, 250, Phaser.Easing.Quadratic.In, false, 300);
            diagonal_line.tw_in_scale.onComplete.add(this.start_stat_horizontal_line_tween, _sprite);
            diagonal_line.tw_out_scale = this.game.add.tween(diagonal_line.scale).to({
                x: 0,
                y: 1
            }, 250, Phaser.Easing.Quadratic.Out, false);
            diagonal_line.tw_out_scale.onComplete.add(this.complete_diagonal_stat_fade_out, _sprite);

            horizontal_line.tw_in_scale = this.game.add.tween(horizontal_line.scale).to({
                x: 2.8,
                y: 1
            }, 250, Phaser.Easing.Quadratic.Out, false);
            horizontal_line.tw_in_scale.onComplete.add(this.start_stat_fade_in, _sprite);
            horizontal_line.tw_out_scale = this.game.add.tween(horizontal_line.scale).to({
                x: 0,
                y: 1
            }, 250, Phaser.Easing.Quadratic.In, false, 300);
            horizontal_line.tw_out_scale.onComplete.add(this.start_stat_diagonal_line_tween_out, _sprite);

            main_group.add(_sprite);

            // Text sprite added to end of group.
            _sprite.addChild(text_sprite);
            _sprite.exists = false;
        }
    },
    create_stat_text: function(sprite, text, num_color, style) {

        var _text;
        var num_text;
        var name_text;

        _text = this.game.make.bitmapText(sprite.x + 54, sprite.y - 82, 'Agency_54', text, 40);
        //_text.anchor.y = 1;

        sprite.addChild(_text);

        // Enemy level color
        //_text.addColor(num_color, 4);
        //_text.addColor('#CCEDE5', 5);
        //_text.setShadow(0, 0, '#CCEDE5', 6);

        //var grd = _text.context.createLinearGradient(0, 0, 0, _text.canvas.height);
        //grd.addColorStop(0, '#8ED6FF');
        //grd.addColorStop(1, '#004CB3');
        //_text.fill = grd;

        // For having multiple shadow colors, tried to divide text objects.  Didn't work.
        /*
        num_text = this.game.make.text(_text.x + 46, _text.y, "1", style);
        num_text.anchor.y = 1;
        num_text.addColor('rgb(255, 0, 0)', 0);

        sprite.addChild(num_text);

        name_text = this.game.make.text(num_text.x + 25, num_text.y, text, style);
        name_text.anchor.y = 1;

        sprite.addChild(name_text);
        */
    },


    start_stat_fade_in: function() {},
    start_stat_diagonal_line_tween_out: function() {

        // After horizonal line recedes, start diagonal line recession
        this.children[0].tw_out_scale.start();
    },
    start_stat_horizontal_line_tween: function() {

        // Fade in "Lv. # <mob>" text
        this.children[2].tw_in_scale.start();
        this.children[2].tw_in_alpha.start();


        // After diagonal line extends, start horizontal line extention
        this.children[1].tw_in_scale.start();
    },
    complete_diagonal_stat_fade_out: function() {

        this.exists = false;
    },


    init_sprite: function(sprite) {

        var rnd;

        // Random delay to desync animations
        rnd = this.game.rnd.realInRange(0, 500);

        this.game.time.events.add(rnd, function() {
            this.random_dir_player(sprite, 0.75, 0.75);
            this[sprite].armature.animation.gotoAndPlay("idle", 0.2);
        }, this);
    },
    random_dir_player: function(sprite, scale_x, scale_y) {

        var rnd;

        // Random delay to desync animations
        rnd = this.game.rnd.realInRange(0, 500);

        if (rnd >= 250) {
            this[sprite].scale.setTo(-scale_x, scale_y);
        } else {
            this[sprite].scale.setTo(scale_x, scale_y);
        }
    },

    start_sprite_enemy: function(sprite) {

        var rnd;

        // Random delay to desync animations
        rnd = this.game.rnd.realInRange(0, 1200);

        this.random_dir_enemy(sprite);

        this.game.time.events.add(rnd, this.animation_desync, this, sprite);

        this.game.time.events.add(rnd, this.game.call_move_enemy, this, sprite);
    },
    animation_desync: function(sprite) {

        sprite.armature.animation.gotoAndPlay("idle", 0.2);
    },


    // ----------------------------------------Minimap / map data----------------------------------------
    set_map: function() {

        var g_map;
        var g_g_map;
        var init_x;
        var init_y;

        g_map = this.game.make.group();
        g_g_map = this.game.make.group();


        // Create a map
        this.map = this.game.add.tilemap('map');
        this.map.addTilesetImage('tiles', 'tiles');

        this.map.forEach(this.f_init_tile_prop, this, 0, 0, this.map.width, this.map.height);
        this.layer = this.map.createLayer('Tile Layer 1');
        this.layer.resizeWorld();


        // Set group and proportions for map
        g_map.add(this.layer);
        g_map.angle = 45;
        g_g_map.add(g_map);
        g_g_map.scale.setTo(1, 0.5);


        // Map container sprite
        this.s_map = this.game.add.sprite(this.game.width / 2 + 350, 80, '');
        this.s_map.addChild(g_g_map);
        //this.s_map.x += 800;
        //this.s_map.y += 60;


        // Find the starting location
        init_x = Math.round(this.map.width / 2);
        init_y = Math.round(this.map.height / 2);
        this.init_tile = this.map.getTile(init_x, init_y, this.layer);
        this.current_tile = this.map.searchTileIndex(3);
        this.map.putTile(4, this.current_tile.x, this.current_tile.y);


        // Adjust minimap starting position based on player spawn point
        this.s_map.x -= this.current_tile.x * 22.5;
        this.s_map.x += this.current_tile.y * 22.5;
        this.s_map.y -= this.current_tile.y * 11.3;
        this.s_map.y -= this.current_tile.x * 11.3;


        // Update the map
        this.update_map();
    },
    f_init_tile_prop: function(tile) {

        tile.data = null;
        tile.name = tile.x + " " + tile.y;
    },
    f_tile_alpha: function(tile) {

        tile.alpha = 0;
    },
    f_tile_restore_alpha: function(tile) {

        if (tile.x - 1 > this.current_tile.x || tile.x + 1 < this.current_tile.x || tile.y - 1 > this.current_tile.y || tile.y + 1 < this.current_tile.y) {
            tile.alpha = 0.7;
        } else {
            tile.alpha = 1;
        }
    },









    // ----------------------------------------------Input----------------------------------------------
    Z_PRESS: function() {

        switch (this.selection_state) {

            case 'start_menu':

                game_ui.battle_menu.selection_arrow.exists = true;
                this.selection_state = 'battle_menu';
                break;

            case 'battle_menu':

                game_ui.battle_menu.selection_arrow.exists = false;
                game_ui.battle_menu.selected_action = game_ui.battle_menu.selection_count;
                this.selection_state = 'start_menu';
                break;
        }
    },


    LEFT_PRESS: function() {

        switch (this.selection_state) {

            case 'movement':
                this.MOVE_INPUT("getTileLeft", "tw_left", 0);
                break;

        }
    },


    RIGHT_PRESS: function() {

        switch (this.selection_state) {

            case 'movement':
                this.MOVE_INPUT("getTileRight", "tw_right", 1);
                break;
        }
    },


    UP_PRESS: function() {



        switch (this.selection_state) {

            case 'movement':
                this.MOVE_INPUT("getTileAbove", "tw_above", 2);
                break;

            case 'engage':
                //if (game_ui.battle_menu.selection_count > 0) {
                //    game_ui.battle_menu.selection_arrow.y -= 40;
                //    game_ui.battle_menu.selection_count--;
                //}
                break;
        }
    },


    DOWN_PRESS: function() {



        switch (this.selection_state) {

            case 'movement':
                this.MOVE_INPUT("getTileBelow", "tw_below", 3);
                break;

            case 'engage':
                //if (game_ui.battle_menu.selection_count < 3) {
                //    game_ui.battle_menu.selection_arrow.y += 40;
                //    game_ui.battle_menu.selection_count++;
                //}
                break;
        }
    },


    MOVE_INPUT: function(_getTileDir, _tween, dir) {
        // **Creates new tweens for INPUT movement of platforms (ie. "tw_left").

        if (!this.moving_active) {

            var _x;
            var _y;

            this.moved_dir = dir;

            // Get minimap tween direction
            if (dir == 0) {
                _x = 22.5;
                _y = 11.3;
            } else if (dir == 1) {
                _x = -22.5;
                _y = -11.3;
            } else if (dir == 2) {
                _x = -22.5;
                _y = 11.3;
            } else if (dir == 3) {
                _x = 22.5;
                _y = -11.3;
            }


            // Check out of bounds
            if (this.map[_getTileDir](this.map.getLayer(), this.current_tile.x, this.current_tile.y) == null ||
                this.map[_getTileDir](this.map.getLayer(), this.current_tile.x, this.current_tile.y).index == 2)
                return;


            // Forced battle location
            if (this.map[_getTileDir](this.map.getLayer(), this.current_tile.x, this.current_tile.y).index >= 7) {
                // Zoom in on enemy
                this.prompt_engage(dir);
                return;
            }


            // Move current tile down and refresh the minimap.
            this.map.putTile(1, this.current_tile.x, this.current_tile.y);
            this.current_tile = this.map[_getTileDir](this.map.getLayer(), this.current_tile.x, this.current_tile.y);
            this.map.putTile(4, this.current_tile.x, this.current_tile.y);


            // Tween move all floors
            this[_tween].start();


            // Start walking animations
            this.move_character(this.g_player_1, "walk_02", dir, this.player_1);
            this.move_character(this.g_player_2, "walk_02", dir, this.player_2);
            this.move_character(this.g_player_3, "walk_02", dir, this.player_3);
            this.move_character(this.g_player_4, "walk_02", dir, this.player_4);


            // Update minimap
            this.update_map();
            this.update_floor(dir);
            this.game.add.tween(this.s_map).to({
                x: this.s_map.x + _x,
                y: this.s_map.y + _y
            }, 1000, Phaser.Easing.Quadratic.Out, true);
            this.activePointer = true;
            this.moving_active = true;
        }
    },
    move_character: function(char, ani, dir, player_sprite) {

        var start_delay;
        var second_move_delay;

        // Get bridge area to tween to
        if (dir == 4) {
            // Stopped; play "idle"
            // Play animation
            char.armature.animation.gotoAndPlay(ani, this.game.rnd.realInRange(0.08, 0.15));
            return;
        }


        // Find random location to cross bridge
        player_sprite.tw_x = this.game.rnd.integerInRange(this.game.width / 2 - 20, this.game.width / 2 - 20);
        player_sprite.tw_y = this.game.rnd.integerInRange(this.game.height / 2 + 70, this.game.height / 2 + 70);


        // Find ending location on the main platform based on formation.
        // **(36 | 22) = square area; (char.index * 5) = small X slide over; (385 | 305) = main platform position
        player_sprite.tw_plat_x = this.current_formation[char.index - 1][0] * 66 - ((char.index - 1) * 5) + 385;
        player_sprite.tw_plat_y = this.current_formation[char.index - 1][1] * 44 + 305;


        // Delay before walking tween starts
        start_delay = this.game.rnd.integerInRange(0, 150);


        // Delay before 2nd movement (from bridge to platform) starts.  time event(f_start_second_movement) uses (2000 - second_move_delay)
        second_move_delay = this.game.rnd.integerInRange(500 - start_delay, 550 - start_delay); // 700, 750


        // Play animation
        this.game.time.events.add(start_delay, this.game.start_animation, this, char, ani, dir);


        // Start 1st movement towards bridge
        this.game.physics.arcade.moveToXY(player_sprite, player_sprite.tw_x, player_sprite.tw_y, 50, 0);


        // Start 2nd movement towards platform after a randomized delay
        this.game.time.events.add(second_move_delay, this.f_start_second_movement, this, player_sprite);
    },
    f_start_second_movement: function(player_sprite) {

        var move_delay = this.game.rnd.integerInRange(600, 1100);

        this.game.physics.arcade.moveToXY(player_sprite, player_sprite.tw_plat_x, player_sprite.tw_plat_y, 0, move_delay);
        this.game.time.events.add(move_delay, this.f_stop_movement, this, player_sprite);
    },
    f_stop_movement: function(player_sprite) {

        player_sprite.body.velocity.x = 0;
        player_sprite.body.velocity.y = 0;

        this.game.start_animation(player_sprite.children[0], 'idle');
    },


    TOUCH_UP: function(input) {
        this.touch_x = input.x;
        this.touch_y = input.y;

        // Move right-side
        if (this.touch_x < this.prev_touch_x && this.prev_touch_x - this.touch_x > 70) {

            // Right
            if (this.touch_y < this.prev_touch_y)
                this.RIGHT_PRESS();

            // Up
            else if (this.touch_y > this.prev_touch_y)
                this.UP_PRESS();
        }


        // Move left-side
        else if (this.touch_x > this.prev_touch_x && this.prev_touch_x - this.touch_x < -70) {

            // Left
            if (this.touch_y > this.prev_touch_y)
                this.LEFT_PRESS();

            // Down
            else if (this.touch_y < this.prev_touch_y)
                this.DOWN_PRESS();
        }
    },


    TOUCH_DOWN: function(input) {

        this.prev_touch_x = input.x;
        this.prev_touch_y = input.y;
    },




    // --------------------------------------------ENGAGE UI--------------------------------------------
    prompt_engage: function(dir) {

        var _enemy;
        var _line;
        var hor;
        var diag;

        // The group sent into the battle state
        this.prompt_group = this['g_temp_enemy_' + (dir + 1)];


        // Disable selections untill UI appears
        this.selection_state = '';


        // Tween in UI shade behind enemy list
        this.ui_shade.tw_alpha_in.start();


        // Set input state and show UI
        this.game.time.events.add(600, this.f_OPEN_engage, this, dir);


        // Start line+stat tweens above each enemy

        for (var i = 1, len = this['g_temp_enemy_' + (dir + 1)].length; i <= len; i++) {
            _enemy = this['g_temp_enemy_' + (dir + 1)].getAt(i - 1);
            _line = this.g_enemy_stat_line.getFirstExists(false);

            if (_line) {

                _line.exists = true;
                _line.visible = true;
                _line.children[0].tw_in_scale.start();
            }
        }



        // Shift camera to enemies
        this.zoom_in();
    },
    f_OPEN_engage: function(dir) {

        // Change the selection state
        this.selection_state = 'engage';


        // Show engage UI
        this.g_engage_ui.exists = true;
        this.g_engage_ui.visible = true;
        this.g_engage_ui.tw_in_alpha.start();
        this.g_engage_ui.tw_in_scale.start();
        this.g_engage_ui.getTop().tw_out_alpha.start();
    },
    check_stat_line_loc: function(_enemy, _line, _line_group) {

        for (var i = 0; i <= _enemy.parent.length; i++) {

            console.log(this.checkOverlap(_line.r_bounds, _line_group.getAt(i).r_bounds));
        }
    },
    zoom_in: function() {
        // Shift camera to enemy platform

        switch (this.moved_dir) {

            // Left
            case 0:
                this.f_zoom_in(300, 90);
                break;

                // Right
            case 1:
                this.f_zoom_in(-400, -90);
                break;

                // Above
            case 2:
                this.f_zoom_in(-400, 90);
                break;

                // Below
            case 3:
                this.f_zoom_in(300, -90);
                break;

        }
    },
    f_zoom_in: function(_x, _y) {

        // To accomodate for scale changes
        _x = _x *= 1.2;
        _y = _y *= 1.2;

        // Tween main group to zoom in on enemies on platform
        this.game.add.tween(this.g_main).to({
            x: _x,
            y: _y
        }, 800, Phaser.Easing.Quadratic.InOut, true);
        this.game.add.tween(this.g_main.scale).to({
            x: 1.2,
            y: 1.2
        }, 800, Phaser.Easing.Quadratic.InOut, true);
    },


    YES_engage: function() {

        console.log(this.prompt_group);
        this.game.state.start('BattleState', true, false, this.prompt_group.data, this.prompt_group.group);
    },


    NO_engage: function() {
        // Calls f_NO_engage after 800ms; Tweens platforms back to original location.


        // Set prompt group to null
        this.prompt_group = null;


        // Set input state
        this.game.time.events.add(800, this.f_NO_engage, this);


        // Tween in UI shade behind enemy list
        this.ui_shade.tw_alpha_out.start();


        // Close enemy list (ENEMY STAT LINES: "Lv. 1 Slime")
        this.g_enemy_stat_line.forEach(this.f_close_stat_tween, this, true);


        // Re-tween engage UI to minimum size.
        this.g_engage_ui.tw_out_alpha.start();
        this.g_engage_ui.tw_out_scale.start();
        this.g_engage_ui.getTop().tw_in_alpha.start();


        // Tween game group back to start
        this.game.add.tween(this.g_main).to({
            x: 0,
            y: 0
        }, 800, Phaser.Easing.Quadratic.InOut, true);
        this.game.add.tween(this.g_main.scale).to({
            x: 1,
            y: 1
        }, 800, Phaser.Easing.Quadratic.InOut, true);
    },
    f_NO_engage: function() {

        // Change the selection state
        this.selection_state = 'movement';
    },
    f_close_stat_tween: function(sprite) {

        // Fade out "Lv. # <mob>" text
        sprite.children[2].tw_out_scale.start();
        sprite.children[2].tw_out_alpha.start();

        sprite.children[1].tw_out_scale.start();
    },





    // --------------------------------------Closure / misc functions--------------------------------------
    checkOverlap: function(spriteA, spriteB) {

        var boundsA = spriteA;
        var boundsB = spriteB;

        return Phaser.Rectangle.intersects(boundsA, boundsB);
    },


    random_dir_enemy: function(sprite) {

        var rnd;

        // Random delay to desync animations
        rnd = this.game.rnd.realInRange(0, 500);

        if (rnd >= 250) {

            sprite.dir = 0;
            sprite.scale.setTo(-sprite.scale_x, sprite.scale_y);
        } else {

            sprite.dir = 2;
            sprite.scale.setTo(sprite.scale_x, sprite.scale_y);
        }
    },







    // ----------------------------------------------Etc----------------------------------------------
    game_functions: function(game) {

        game.call_move_enemy = function(sprite) {

            game.move_enemy(sprite, "walk_02");
        },
        game.move_enemy = function(enemy, ani) {

            var tw_x;
            var tw_y;


            // Find random location
            tw_x = game.rnd.integerInRange(game.width / 2 - 20, game.width / 2 - 20);
            tw_y = game.rnd.integerInRange(game.height / 2 + 70, game.height / 2 + 70);


            // Play animation
            enemy.armature.animation.gotoAndPlay("walk_02", game.rnd.realInRange(0.08, 0.15));


            // Get a random location on a platform.
            enemy.rnd_x = game.rnd.integerInRange(165, 441);
            enemy.rnd_y = game.rnd.integerInRange(45, 100);
            enemy.rnd_dur = game.rnd.integerInRange(1000, 1400);
            enemy.rnd_delay = game.rnd.integerInRange(0, 9000);
            enemy.start_delay = game.rnd.integerInRange(4500, 4500);

            // Create tween
            enemy.t_move = game.add.tween(enemy).to({
                x: enemy.rnd_x,
                y: enemy.rnd_y
            }, enemy.rnd_dur, Phaser.Easing.Linear.None, true /*, 0 enemy.rnd_dur*/ );


            // Match facing to direction of movement on tween start.  NOT WORKING W/ NEW PHASER
            //enemy.t_move.onComplete.add(this.on_start_tween, enemy);
            this.on_start_tween(enemy);

            // Setup next tween
            enemy.t_main.add(enemy.rnd_delay, this.call_move_enemy, this, enemy);
        },
        game.start_animation = function(char, ani, dir) {

            char.armature.animation.gotoAndPlay(ani, game.rnd.realInRange(0.08, 0.15));

            // If no direction change is neccessary, return
            if (dir == undefined)
                return;
            // Moving right or above, face to the right
            if ((dir == 2 || dir == 1) /*&& char.scale.x < 0*/ )
                char.scale.setTo(0.75, 0.75);
            // Moving left or below, face to the left
            else if ((dir == 0 || dir == 3) /*&& char.scale.x > 0*/ )
                char.scale.setTo(-0.75, 0.75);
        },
        game.on_start_tween = function(enemy) {

            enemy.is_moving = true;

            // When movement tween starts, change facing to match direction
            if (enemy.rnd_x >= enemy.x) {
                enemy.dir = 0;
                enemy.scale.setTo(-enemy.scale_x, enemy.scale_y);
            } else {
                enemy.dir = 2;
                enemy.scale.setTo(enemy.scale_x, enemy.scale_y);
            }
        }
    },

    timer_next_menu: function() {

        switch (this.current_menu) {

            case 'inventory':

                console.log("timer complete!");
                this.timer.stop();
                this.timer.add(100, this.timer_next_menu, this);
                break;
        }
    },

    moveSprite: function(pointer) {
        // ***** From rich.  Arrow-like tween

        //char.tw_platform_walk = this.game.add.tween(char).to({ x: tw_x - 126, y: tw_y + 52 }, 0, Phaser.Easing.Linear.None, true)
        //.to({ x: tw_plat_x, y: tw_plat_y }, 0, Phaser.Easing.Linear.None, true);

        if (tween && tween.isRunning) {
            tween.stop();
        }

        sprite.rotation = game.physics.angleToPointer(sprite, pointer);

        //  300 = 300 pixels per second = the speed the sprite will move at, regardless of the distance it has to travel
        var duration = (game.physics.distanceToPointer(sprite, pointer) / 300) * 1000;

        tween = game.add.tween(sprite).to({
            x: pointer.x,
            y: pointer.y
        }, duration, Phaser.Easing.Linear.None, true);
    },

    /*d_pad_update: function () {

        // ----- Move left/right -----

        if (d_pad.r_left.contains(this.input.activePointer.x, this.input.activePointer.y) &&
        player_body.body.velocity.x > -player_body.speed && player_body.e.allowMovement) {
            player_body.body.velocity.x = -player_body.speed;
            this.g_player_1.MOVEpressed();
        }
        if (d_pad.r_right.contains(this.input.activePointer.x, this.input.activePointer.y) &&
        player_body.body.velocity.x < player_body.speed && player_body.e.allowMovement) {
            player_body.body.velocity.x = player_body.speed;
            this.g_player_1.MOVEpressed();
        }
        // ----- If neither left/right are touched -----
        if (!d_pad.r_left.contains(this.input.activePointer.x, this.input.activePointer.y) &&
        !d_pad.r_right.contains(this.input.activePointer.x, this.input.activePointer.y) &&
        player_body.e.allowMovement) {
            // (should make as.. a single fire signal or something?..  maybe 'else' can make a new signal fire if there isn't one.. idk)
            if (player_body.body.velocity.y == 0)
                this.g_player_1.e.play('idle');
            player_body.body.velocity.x = 0;
        }

        // ----- Move up/down -----
        if (d_pad.r_up.contains(this.input.activePointer.x, this.input.activePointer.y) &&
        player_body.body.velocity.y > -player_body.speed && player_body.e.allowMovement) {
            player_body.body.velocity.y = -player_body.speed / 1.5;
            this.g_player_1.MOVEpressed();
        }
        if (d_pad.r_down.contains(this.input.activePointer.x, this.input.activePointer.y) &&
        player_body.body.velocity.y < player_body.speed && player_body.e.allowMovement) {
            player_body.body.velocity.y = player_body.speed / 1.5;
            this.g_player_1.MOVEpressed();
        }
        // ----- If neither up/down are touched -----
        if (!d_pad.r_up.contains(this.input.activePointer.x, this.input.activePointer.y) &&
        !d_pad.r_down.contains(this.input.activePointer.x, this.input.activePointer.y) &&
        player_body.e.allowMovement) {
            // (should make as.. a single fire signal or something?..  maybe 'else' can make a new signal fire if there isn't one.. idk)
            if (player_body.body.velocity.x == 0)
                this.g_player_1.e.play('idle');
            player_body.body.velocity.y = 0;
        }
    },*/

    render: function() {
        //this.game.debug.spriteBounds(this.g_floor_selection.getAt(1));
        //this.game.debug.rectangle(this['tower_1']['floor_selection_1']);
        //this.game.debug.rectangle(this.r_minimap_center);
        //this.game.debug.rectangle(this.g_enemy_sprite_slime.getAt(0).getAt(0).getAt(0).getBounds())

        //if (this.g_enemy_stat_line);
        //this.game.debug.rectangle(this.g_enemy_stat_line.getAt(0).r_bounds);
        //this.game.debug.rectangle(this.r_right_bridge_area);
        //this.game.debug.rectangle(this.r_above_bridge_area);
        //this.game.debug.rectangle(this.r_bridge_area, 'red');

        //this.game.debug.rectangle(this.r_platform_area_width);
        //this.game.debug.rectangle(this.r_platform_area_height);
    }

}


module.exports = GameState;
},{"../states/Character":4,"../states/Enemy":6}],8:[function(require,module,exports){
'use strict';

/*
Preloader = function (game) {
    this.game = game;
};
*/
function Preloader() {}

Preloader.prototype = {

    preload: function() {

        // --------------------------- PRELOAD BAR ---------------------------
        var loaderEmpty = this.add.sprite(this.game.world.centerX, 285, 'loaderEmpty');
        var preloadBar = this.add.sprite(loaderEmpty.x - loaderEmpty.width / 2, 285, 'loaderFull');
        loaderEmpty.anchor.setTo(0.5, 0);
        this.game.load.setPreloadSprite(preloadBar);
        //this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

        // ------------------------------- MISC -------------------------------
        //this.game.load.image('black', 'assets/effects/black.png');

        var fileFormat = (this.game.device.cocoonJS) ? '.json' : '.xml';

        // ------------------------------ FONTS ------------------------------
        //this.game.load.bitmapFont('Visitor', 'assets/fonts/vis10_0.png', 'assets/fonts/vis10.xml');
        //this.game.load.bitmapFont('JuneBug', 'assets/fonts/f22_0.png', 'assets/fonts/f22.xml');
        //this.game.load.bitmapFont('Righteous', 'assets/fonts/f10_0.png', 'assets/fonts/f10.xml');

        //this.game.load.bitmapFont('Agency FB', 'assets/fonts/agency_0.png', 'assets/fonts/agency' + fileFormat);
        //this.game.load.bitmapFont('Agency_54', 'assets/fonts/agency_54_0.png', 'assets/fonts/agency_54' + fileFormat);
        //this.game.load.bitmapFont('Agency_35', 'assets/fonts/agency_35_0.png', 'assets/fonts/agency_35' + fileFormat);
        //this.game.load.bitmapFont('Agency_28', 'assets/fonts/agency_28_0.png', 'assets/fonts/agency_28' + fileFormat);





        /*
        // ----------------------------- EFFECTS -----------------------------
        this.game.load.image('light', 'assets/effects/light_circle.png');




        // ----------------------------- MINIMAP -----------------------------
        this.game.load.image('minimap-wall', 'assets/UI/minimap_wall.png');
        this.game.load.image('minimap-floor', 'assets/UI/minimap_floor.png');
        this.game.load.image('minimap-current', 'assets/UI/minimap_current.png');
        this.game.load.image('skill_UI', 'assets/UI/skill_UI_3.png');




        // -------------------------------- UI --------------------------------
        this.game.load.image('attack', 'assets/UI/button_attack.png');
        this.game.load.image('cursor', 'assets/UI/d_pad_arrow_2.png');
        this.game.load.image('selection_arrow', 'assets/UI/selection_arrow.png');
        this.game.load.image('ui_battle_select_box', 'assets/BATTLE_STATE/UI/ui_battle_select_box.png');
        this.game.load.image('ui_back_battle', 'assets/BATTLE_STATE/UI/ui_back_battle.png');
        this.game.load.image('inventory_slot', 'assets/MENU_STATE/inventory/inventory_slot.png');
        this.game.load.image('ui_back_02', 'assets/MENU_STATE/inventory/ui_back_02.png');
        this.game.load.image('ui_back_lines_04', 'assets/MENU_STATE/inventory/ui_back_lines_04.png');
        this.game.load.image('stat_ui_back', 'assets/MENU_STATE/inventory/stat_ui_back_02.png');
        this.game.load.image('extended_stat_ui', 'assets/MENU_STATE/inventory/extended_stat_ui.png');
        this.game.load.image('scroll_arrow', 'assets/MENU_STATE/inventory/scroll_arrow_2.png');
        this.game.load.image('scroll_bar', 'assets/MENU_STATE/inventory/scroll_bar.png');
        this.game.load.image('tooltip_line', 'assets/MENU_STATE/inventory/tooltip_line_02.png');
        this.game.load.image('tooltip_back', 'assets/MENU_STATE/inventory/tooltip_back_02.png');
        this.game.load.image('rare_slot', 'assets/MENU_STATE/inventory/rare_slot.png');
        */


        this.game.load.image('black', 'assets/effects/black.png');

        //this.game.load.json('player_data', 'assets/DATA/player_data.json');
        this.game.load.json('character_data', 'assets/DATA/character_data.json');
        this.game.load.json('formation_data', 'assets/DATA/formation_data.json');
        this.game.load.json('enemy_data', 'assets/DATA/enemy_data.json');
        this.game.load.json('enemy_formation_data', 'assets/DATA/enemy_formation_data.json');



        // ------------------------------ FONTS ------------------------------
        //var fileFormat = (this.game.device.cocoonJS) ? '.json' : '.xml';
        //var fileFormat = '.json';
        //this.game.load.text('Agency_FB', 'assets/fonts/agencyFB.ttf');
        //this.game.load.bitmapFont('Agency_54', 'assets/fonts/agency_54_0.png', 'assets/fonts/agency_54' + fileFormat);

        //this.game.load.bitmapFont('Agency_54', 'assets/fonts/agency_35_0.png', 'assets/fonts/agency_54' + fileFormat);
        //this.game.load.bitmapFont('Agency_28', 'assets/fonts/agency_28_0.png', 'assets/fonts/agency_28' + fileFormat);




        // -------------------------------------------------------------------------------------------
        // ---------------------------------------BATTLE STATE----------------------------------------
        // -------------------------------------------------------------------------------------------
        // -------------------------------- UI --------------------------------
        this.game.load.image('white_flash', 'assets/BATTLE_STATE/UI/white_flash.png');
        this.game.load.image('battle_background_green', 'assets/BATTLE_STATE/UI/battle_background_green.png');
        this.game.load.image('battle_floor_tile', 'assets/BATTLE_STATE/UI/battle_floor_tile.png');

        this.game.load.image('battle_hexagon', 'assets/BATTLE_STATE/UI/battle_hexagon.png');

        this.game.load.image('battle_skill_swing', 'assets/BATTLE_STATE/UI/battle_skill_swing.png');
        this.game.load.image('battle_skill_fireball', 'assets/BATTLE_STATE/UI/battle_skill_fireball.png');
        this.game.load.image('battle_skill_heal', 'assets/BATTLE_STATE/UI/battle_skill_heal.png');
        this.game.load.image('battle_skill_focus', 'assets/BATTLE_STATE/UI/battle_skill_focus.png');

        this.game.load.image('battle_player_hp_bar', 'assets/BATTLE_STATE/UI/battle_player_hp_bar.png');
        this.game.load.image('battle_player_hp_border', 'assets/BATTLE_STATE/UI/battle_player_hp_border.png');
        this.game.load.image('battle_player_sp_bar', 'assets/BATTLE_STATE/UI/battle_player_sp_bar.png');
        this.game.load.image('battle_player_sp_border', 'assets/BATTLE_STATE/UI/battle_player_sp_border.png');

        this.game.load.image('battle_char_ui_top', 'assets/BATTLE_STATE/UI/battle_char_ui_top.png');
        this.game.load.image('battle_char_ui_inner', 'assets/BATTLE_STATE/UI/battle_char_ui_inner.png');

        this.game.load.image('battle_skill_physical_attack_red', 'assets/BATTLE_STATE/UI/battle_skill_physical_attack_red.png');
        this.game.load.image('battle_skill_magical_attack_blue', 'assets/BATTLE_STATE/UI/battle_skill_magical_attack_blue.png');
        this.game.load.image('battle_skill_support_green', 'assets/BATTLE_STATE/UI/battle_skill_support_green.png');
        this.game.load.image('battle_skill_neutral_yellow', 'assets/BATTLE_STATE/UI/battle_skill_neutral_yellow.png');
    },


    create: function() {

        this.game.prev = this.game.time.now;

        //this.init_dragon_bones();

        //this.game.state.start('MapState');
        //this.game.state.start('CharacterMenuState');

        this.game.state.start('BattleState');
        //this.game.state.start('GameState', true, false, this.SAFE_ZONE_WIDTH, this.SAFE_ZONE_HEIGHT);
    }
    /*
    init_dragon_bones: function() {

        //give dragonBones a reference to the game object
        dragonBones.game = this.game;

        this.game.events = dragonBones.events;

        dragonBones.animation.WorldClock.clock.timeScale = 1;
    }
    */
}

module.exports = Preloader;
},{}]},{},[1])