'use strict';
var Character = require('../states/Character');
var CharacterUI = require('../states/CharacterUI');
var Enemy = require('../states/Enemy');

//console.log("%cUser %s has %d points", "color:orange; background:blue; font-size: 16pt", userName, userPoints);

/*
var stdout = require('stdout-stream');
function perf_sensitive() {
  // Do performance-sensitive work here
  console.log("lalaladkff");
}

try {
  perf_sensitive()
} catch (e) {
  // Handle exceptions here
}

stdout.write('hello\n'); // write should NEVER block 
stdout.write('non-blocking\n')
stdout.write('world\n');
*/

function BattleState() {}

/*
*monomorphic operations are easiest to specialize, give optimizer most actionable information and enable further optimizations. Hulk-style summary ONE TYPE CLOSE TO METAL!
  moderately polymorphic operations which require a polymorphic type guard or in the worst case a decision tree are slower then monomorphic ones.

*******
Decision trees complicate control flow and make it harder for optimizer to propagate types and eliminate redundancies. Memory dependent conditional 
jumps that constitute those decision trees might be bad news if polymorphic operation is right in the middle of the tight number crunching loop;
*******


******
Operations are monomorphic if the hidden classes of inputs are always the same - otherwise they are polymorphic, meaning some of the arguments can change type across different calls to the operation. For example, the second add() call in this example causes polymorphism:

function add(x, y) {
  return x + y;
}

add(1, 2);      // + in add is monomorphic
add("a", "b");  // + in add becomes polymorphic
******



******
random: if you break a for loop, do it with a conditional at the beginning of the loop not at the end.
*/

//ᕕ( ᐛ )ᕗ

// WHAT THE FUCK JSONS?!?! CLOGGIN UP MY DATA WHEN YOUR DATAS NOT BEING USED IT SEEMS LIKE ?? !!

/*
This often happens (memory leak) when you’ve written your code in such a way that variables and event listeners 
you don’t require for long are still referenced by some code that no longer has a need to keep those 
references and thus they can’t be correctly cleaned up by GC.
*/

if (navigator.isCocoonJS) {
    cocoonjsphaser.utils.fixDOMParser();
}
// BRAVE FRONTIER!!!!! multiple aspect ratios perhaps and etc!!!

// Maybe - Lv. 1, Lv. 2, Lv. 3 for skills, greatly increasing its strength each Lv.

// Choosing skills in combat - drag upward on a characters ui to reveal skill menu below it.


// ******************************************************
// Attacks can CHAIN X3! or HIT X3!.  perpetual hitstun is a chain, perpetual hits are hits.  rogue 3slash chain combo, warrior 3hit chain combo.  combine~~ 6xHIT! 6xCHAIN!
// hitstun is pretty quick to make chains more difficult.  high enough chain pop-up new option of attack temporarially.  SHABAM!

// choosing skills - press and hold for info on skill, press anywhere on screen to go back. press and release skill quick enough and select skill, close menu.
// ******************************************************


// this.change_camera("player zoom or whatever");


//TODO: instead of character class, maybe extend dragonbones.
//      maybe simplify ui menu useage, just draggable?

//     USE SPRITE.DELTA FOR MENU MOTION!! ITS THE PREV FRAMES X AND THE CURRENT FRAMES X DIFFERENCE!!!

/*
// use-strict-violator.js 
a = "I'm the trouble starter, punking instigator"
 
module.exports = a;


var flags = require('../v8-flags').flags;

console.log('inital use strict', flags.use_strict());
 
flags.use_strict(true);
console.log('set use strict to', flags.use_strict());
 
try {
//  require('./use-strict-violator');
} catch(err) {
  console.error('FAIL:', err);
}
 
flags.use_strict(false);
console.log('set use strict to', flags.use_strict());
*/

//var violator = require('./use-strict-violator');
//console.log(violator)

//Function that contains the pattern to be inspected (using with statement)


BattleState.prototype = {


    preload: function() {

        // ------------------------------- MISC -------------------------------
        this.game.load.image('black', 'assets/effects/black.png');




        // ------------------------------ FONTS ------------------------------
        var fileFormat = (this.game.device.cocoonJS) ? '.json' : '.xml';
        this.game.load.bitmapFont('Agency_54', 'assets/fonts/agency_54_0.png', 'assets/fonts/agency_54' + fileFormat);
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
        this.game.cache.removeImage('loaderEmpty');
        this.game.cache.removeImage('loaderFull');
    },


    init: function(enemy_data, enemy_group) {

        this.enemy_data = ["slime", "slime", "slime", "slime", "enemy_formation_2"]; //enemy_data;
        this.enemy_group = "enemy_group_1"; //enemy_group; //"enemy_group_1"
    },


    create: function() {


        const v8flags = require('v8flags');

        v8flags(function (err, results) {
          console.log(results);  // [ '--use_strict',
                                 //   '--es5_readonly',
                                 //   '--es52_globals',
                                 //   '--harmony_typeof',
                                 //   '--harmony_scoping',
                                 //   '--harmony_modules',
                                 //   '--harmony_proxies',
                                 //   '--harmony_collections',
                                 //   '--harmony',
                                 // ...
        });


        // -------------------------------- PHASER --------------------------------
        this.game.time.advancedTiming = true;
        this.game.time.events.loop(16, this.update_db, this);
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

        //this.g_player_UI_1 = this.game.add.group();
        //this.g_player_UI_2 = this.game.add.group();
        //this.g_player_UI_3 = this.game.add.group();
        //this.g_player_UI_4 = this.game.add.group();

        //this.g_main.add(this.g_player_tiles);
        //this.g_main.add(this.g_enemy_tiles);
        //this.g_main.add(this.g_sprite_container);



        // ------------------------------ CHARACTERS --------------------------------
        this.INIT_FLOOR_TILES();
        this.INIT_CHARACTERS(); //***********LEFT OFF HERE - this is causing a large frame drop on mobile for sure.  armature is huge?
        //**** maybe try taking the whole db/armature out of the character class and not attached as a child to see if anything changes


        // ------------------------------- ENEMIES ----------------------------------
        this.INIT_ENEMIES();




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
        //this.INIT_UI(); //c.Group in heap jumps way the fuck up here. lag fuckin city.
        // Create black screen
        this.black = this.game.add.sprite(0, 0, 'black');
        this.black.width = this.game.width;
        this.black.height = this.game.height;


        // ------------------------------- TIMERS --------------------------------
        this.timer = this.game.time.create(true);
        this.timer.add(500, this.fade_in, this);
        //this.timer.add(500, this.INIT_ENEMIES, this);
        this.timer.start();


        //this.game.time.add(this.timer_char_ui, 0, 25, 0, true, this.move_char_ui, this)
    },


    update: function() {},


    animation_desync: function(sprite, delay) {

        sprite.armature.animation.gotoAndPlay("idle", 0.2);
    },






    // ------------------------- FUNCTIONS ---------------------------

    INIT_CHARACTERS: function() {

        this.current_formation = this.game.formationDataObj.formation_3;

        for (var i = 1; i <= 4; i++) {

            // Positions coinside with INIT_UI (floor tiles)
            var char_x = this.current_formation[i - 1][0] * 92 + (this.current_formation[i - 1][1] * 12);
            var char_y = this.current_formation[i - 1][1] * 60 - 51;

            this['g_player_' + i] = new Character(this.game, char_x + 602 + 55, char_y + this.g_player_tiles.y + 100, i);
            this['g_player_' + i].scale.setTo(-1, 1);
            //this['player_' + i] = this.game.add.sprite(char_x + 602 + 55, char_y + this.g_player_tiles.y + 100, ''); //this.game.height - char_y - 240 (from below...)
            //this['player_' + i].addChild(this['g_player_' + i]);
            //this.g_sprite_container.add(this['player_' + i]);
            // Character positioning seems off depending on the armature..  Bottom right corner of sprite is 0,0
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
        console.log(this[sprite])
        //**TEMPORARY!!!**
        //this.ani_start_delay = 0;
        //**TEMPORARY!!!**

        this.game.time.events.add(this.ani_start_delay, function() {

            this[sprite].armature.animation.gotoAndPlay("sit", 0.2);
        }, this);

        this.ani_start_delay += 50;
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
            this.ani_start_delay += 150;
        }
    },
    init_enemy: function() {

        var enemy;
        var count;
        var enemy_counter;

        count = 0;
        enemy_counter = 0;

        for (var u = 0; u <= 12; u++)
            if (this.game.levelDataObj[this.enemy_formation][0][u] == 1)
                enemy_counter++;

            // If there are more enemies than the formation can fit, cut off the enemies from being created.
        if (this.enemy_count == enemy_counter)
            return;

        for (var o = 0; o <= 12; o++) {

            if (this.game.levelDataObj[this.enemy_formation][0][o] == 1 && this.enemy_count < this.num_enemies) {

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
        
        // Create white flash over character UI
        this.white_flash = this.game.add.sprite(0, -80, 'white_flash');
        this.white_flash.width = 240;
        this.white_flash.height = 650;
        this.white_flash.alpha = 0;

        // BitmapText objects
        //this.hp_val_1 = this.game.add.bitmapText(93, 40, 'Agency_54', '123/123', 35); //getAt(13)
        //this.hp_val_2 = this.game.add.bitmapText(93, 40, 'Agency_54', '123/123', 35); //getAt(13)
        //this.hp_val_3 = this.game.add.bitmapText(93, 40, 'Agency_54', '123/123', 35); //getAt(13)
        //this.hp_val_4 = this.game.add.bitmapText(93, 40, 'Agency_54', '123/123', 35); //getAt(13)

        //sp_val = this.game.add.bitmapText(93, 155, 'Agency_54', '12/12', 35); //getAt(14)

        this.g_player_UI_1 = new CharacterUI(this.game, 1, this.move_char_ui);
        this.g_player_UI_2 = new CharacterUI(this.game, 2, this.move_char_ui);
        this.g_player_UI_3 = new CharacterUI(this.game, 3, this.move_char_ui);
        this.g_player_UI_4  = new CharacterUI(this.game, 4, this.move_char_ui);



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

        //var num;

        //num = ((this.game.time.now - this.game.time.prevTime) / 1000) * 2;

        dragonBones.animation.WorldClock.clock.advanceTime(0.03);
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