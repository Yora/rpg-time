(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';


//cd "c:\users\sean2\appdata\local\google\chrome sxs\application"
//FROM CHROME CANARY BINARY - chrome --no-sandbox -js-flags="--prof --nologfile-per-isolate --trace-ic" http://localhost/phaser/index.html
//FROM DEPOT_TOOLS/V8 - tools\windows-tick-processor.bat v8.log > v8_result.js
//FROM CHROME CANARY BINARY - chrome --no-sandbox -js-flags="--prof --nologfile-per-isolate --trace-gc --trace-ic --trace-opt --trace-bailout --trace-deop" http://localhost/phaser/index.html




//chrome --no-sandbox -js-flags="--prof --trace-hydrogen" http://localhost/phaser/index.html
/*
function printStatus(fn) {
    switch(%GetOptimizationStatus(fn)) {
        case 1: console.log("Function is optimized"); break;
        case 2: console.log("Function is not optimized"); break;
        case 3: console.log("Function is always optimized"); break;
        case 4: console.log("Function is never optimized"); break;
        case 6: console.log("Function is maybe deoptimized"); break;
    }
}
*/
//var fun4 = null; wont collect this variable, but is this variable just a small reference?
function init_DB(player_val, obj) {

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
    skeletonJSON = obj.game.cache.getJSON(player_skeleton);
    // fetch the atlas data from cache
    atlasJson = obj.game.cache.getJSON('player_json_mid' + player_string);
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
        "Player-parts-weapon",

        "Player-body_equipment-body_e_main",
        "Player-body_equipment-upperLegR_e_main",
        "Player-body_equipment-upperLegL_e_main",
        "Player-body_equipment-hips_e_main",
        "Player-body_equipment-weapon_e_main",

        //"Player-body_equipment-training_outfit_01-body_e",
        //"Player-body_equipment-training_outfit_01-legs-upperLegR_e",
        //"Player-body_equipment-training_outfit_01-legs-upperLegL_e",
        //"Player-body_equipment-training_outfit_01-legs-hips_e",
        //"Player-body_equipment-training_outfit_02-body_e",
        //"Player-body_equipment-training_outfit_02-legs-upperLegR_e",
        //"Player-body_equipment-training_outfit_02-legs-upperLegL_e",
        //"Player-body_equipment-training_outfit_02-legs-hips_e",

        "Player-weapons-swords-ice_sword"
        */
    ];

    texture = obj.game.cache.getImage("player_image_mid" + player_string);
    atlasId = 'player_atlas_mid' + player_string;

    config = {
        armatureName: armatureName,
        skeletonId: skeletonId,
        animationId: animationId,
        atlasId: atlasId,
        partsList: partsList
    };

    // Create the armature
    obj.armature = dragonBones.makeArmaturePhaser(config, skeletonJSON, atlasJson, texture);

    // ----- Event listeners -----
    //armature.addEventListener(events.AnimationEvent.FADE_IN, obj.event_handler);
    //armature.addEventListener(obj.game.events.FrameEvent.ANIMATION_FRAME_EVENT, _player.e.frame_event_handler);
    //armature.addEventListener(obj.game.events.AnimationEvent.COMPLETE, obj.complete_event_handler);

    // ----- Start animation! -----
    //obj.armature.animation.gotoAndPlay("dash", 0.2);
    obj.armature.animation.gotoAndPlay("combat_idle", 0.2);

    /*
    var rnd;
    rnd = obj.game.rnd.integerInRange(1, 100)

    if (rnd < 25) 
    obj.armature.animation.gotoAndPlay("sit", 0.2);
    else if (rnd >= 25 && rnd < 50)
    obj.armature.animation.gotoAndPlay("combat_idle", 0.2);
    else if (rnd >= 50 && rnd < 75)
    obj.armature.animation.gotoAndPlay("idle", 0.2);
    else if (rnd >= 75)
    obj.armature.animation.gotoAndPlay("walk_02", 0.2);

    rnd = null;
    */
    
    //armature.getSlot("face").getChildArmature().getSlot("eyes").armature.animation.gotoAndPlay("blink", 0.2);


    //console.log(obj.game.rnd.realInRange(0.8, 0.9))
    //**COMMENTED OUT 1/21/15, UNKNOWN: armature.animation.getAnimationDataList()[0].duration = obj.game.rnd.realInRange(0, 1);
    //console.log(armature.animation.getAnimationDataList(0));



    /*
    armature.getSlot("body");
    armature.getSlot("hips");
    armature.getSlot("head");
    armature.getSlot("face");
    armature.getSlot("upperArmR");
    armature.getSlot("upperArmL");
    armature.getSlot("upperLegR");
    armature.getSlot("upperLegL");
    armature.getSlot("armR");
    armature.getSlot("armL");
    armature.getSlot("legR");
    armature.getSlot("legL");
    armature.getSlot("weapon");
    */


    //_body.getChildArmature().getSlot("equip").setDisplay(null);
    //_hips.getChildArmature().getSlot("equip").setDisplay(null);
    //_upperLegL.getChildArmature().getSlot("equip").setDisplay(null);
    //_upperLegR.getChildArmature().getSlot("equip").setDisplay(null);


    //_body.getChildArmature().getSlot("equip").armature.animation.gotoAndPlay("green_glow", 0.2);
    //_weapon.getChildArmature().getSlot("equip").armature.animation.gotoAndPlay("red_glow", 0.2);


    //_body.getChildArmature().getSlot("equip").setDisplay(factory.getTextureDisplay("body_equipment-training_outfit_01-body_e"));
    //_hips.getChildArmature().getSlot("equip").setDisplay(factory.getTextureDisplay("body_equipment-training_outfit_01-legs-hips_e"));
    //_upperLegL.getChildArmature().getSlot("equip").setDisplay(factory.getTextureDisplay("body_equipment-training_outfit_01-legs-upperLegL_e"));
    //_upperLegR.getChildArmature().getSlot("equip").setDisplay(factory.getTextureDisplay("body_equipment-training_outfit_01-legs-upperLegR_e"));

    //bonesBase.x = 300;
    //bonesBase.y = 500;
    player_display = obj.armature.getDisplay();
    obj.add(player_display);
}


window.onload = function () {

    var SAFE_ZONE_WIDTH = 960;
    var SAFE_ZONE_HEIGHT = 640;
    var width = window.innerWidth * window.devicePixelRatio;
    var height = window.innerHeight * window.devicePixelRatio;
    /*
    var landWidth, landHeight;

    if ( height > width ) {
        landWidth = height;
        landHeight = width;
    } else {
        landWidth = width;
        landHeight = height;
    }
    var aspectRatioDevice = landWidth/landHeight;

    var aspectRatioSafeZone = SAFE_ZONE_WIDTH / SAFE_ZONE_HEIGHT;

    var extraWidth = 0, extraHeight = 0;

    if (aspectRatioSafeZone < aspectRatioDevice) {
        extraWidth = aspectRatioDevice * SAFE_ZONE_WIDTH - SAFE_ZONE_HEIGHT;
    } else {
        extraHeight = SAFE_ZONE_HEIGHT / aspectRatioDevice - SAFE_ZONE_WIDTH;
    }
    */

    if (window.devicePixelRatio == 1)
        var game = new Phaser.Game(960, 640, Phaser.CANVAS, '');
    else
        var game = new Phaser.Game(width / (window.devicePixelRatio - 1), height / (window.devicePixelRatio - 1), Phaser.CANVAS, '');


    //fun = game;
    //fun2 = game;
    //fun3 = game;
    //fun4 = game;


    //console.log(require('/Boot'));
    // Game States
    game.state.add('Boot', require('./states/Boot'));
    game.state.add('Preloader', require('./states/Preloader'));
    //game.state.add('Transition', require('./misc/Transition'));
    //game.state.add('MainMenuState', require('./states/MainMenuState'));
    //game.state.add('CharacterMenuState', require('./states/CharacterMenuState'));
    //game.state.add('MapState', require('./states/MapState'));
    game.state.add('GameState', require('./states/GameState'));
    game.state.add('BattleState', require('./states/BattleState'));

    game.state.start('Boot', true, false, SAFE_ZONE_WIDTH, SAFE_ZONE_HEIGHT);


    SAFE_ZONE_WIDTH = null;
    SAFE_ZONE_HEIGHT = null;
    width = null;
    height = null;

    //window.playerDataObj = { perhaps an alternitive? dont know if its any better than game.leveldataobj

    game.levelDataObj = {


        // --------------------------------ENEMY GROUPS--------------------------------
        "enemy_group_1": [

            "slime",
            "enemy_formation_1"
        ],

        "enemy_group_2": [

            "slime",
            "slime",
            "slime",
            "slime",
            "slime",
            "enemy_formation_2"

        ],

        "enemy_group_3": [

            "slime",
            "slime",
            "slime",
            "slime",
            "slime",
            "enemy_formation_2"
        ],

        "enemy_group_4": [

            "slime",
            "slime",
            "slime",
            "slime",
            "slime",
            "slime",
            "enemy_formation_3"
        ],


        // ------------------------------ENEMY FORMATIONS------------------------------
        "enemy_formation_1": [

            // 3
            [
                0, 0, 0, 1,
                0, 0, 1, 0,
                0, 0, 0, 1
            ]
        ],

        "enemy_formation_2": [

            // 5
            [
                0, 0, 0, 1,
                0, 0, 1, 1,
                0, 1, 1, 0
            ]
        ],

        "enemy_formation_3": [

            // 6
            [
                0, 1, 0, 1,
                0, 1, 1, 0,
                0, 0, 1, 1
            ]
        ]
    }




    game.playerDataObj = {

        "player_1": {

            "level": 1,

            "min_attack": 0,
            "max_attack": 0,

            "strength": 3,
            "vitality": 5,
            "dexterity": 2,
            "intelligence": 1,
            "luck": 1,

            "health_steal": 0,
            "speed": 300,

            "hit_stun": 500,

            "skills": [
                "swing",
                "fireball",
                "heal",
                "focus"
            ]

        },


        "player_2": {

            "level": 1,

            "min_attack": 0,
            "max_attack": 0,

            "strength": 3,
            "vitality": 5,
            "dexterity": 2,
            "intelligence": 1,
            "luck": 1,

            "health_steal": 0,
            "speed": 300,

            "hit_stun": 500,

            "skills": [
                "swing",
                "fireball",
                "heal",
                "focus"
            ]

        },


        "player_3": {

            "level": 1,

            "min_attack": 0,
            "max_attack": 0,

            "strength": 3,
            "vitality": 5,
            "dexterity": 2,
            "intelligence": 1,
            "luck": 1,

            "health_steal": 0,
            "speed": 300,

            "hit_stun": 500,

            "skills": [
                "swing",
                "fireball",
                "heal",
                "focus"
            ]

        },


        "player_4": {

            "level": 1,

            "min_attack": 0,
            "max_attack": 0,

            "strength": 3,
            "vitality": 5,
            "dexterity": 2,
            "intelligence": 1,
            "luck": 1,

            "health_steal": 0,
            "speed": 300,

            "hit_stun": 500,

            "skills": [
                "fireball",
                "fireball",
                "heal",
                "focus"
            ]

        }
    }






    game.formationDataObj = {

        "formation_1": [
            [0, 0],
            [1, 2],
            [2, 0],
            [3, 2]
        ],
        "formation_2": [
            [0, 0],
            [0, 1],
            [0, 2],
            [1, 2]
        ],
        "formation_3": [
            [0, 0],
            [1, 1],
            [3, 0],
            [3, 2]
        ]
    }




    game.itemDataObj = {

        "weapon_blood_sword": {
            "item_name": "Blood Sword",
            "rarity": "rare",
            "attack": 1,
            "min_attack": 10,
            "max_attack": 15,
            "mod_1": "STR_" + "+3",
            "mod_2": "VIT_" + "+5",
            "mod_3": "DEX_" + "+0",
            "mod_4": "INT_" + "+5",
            "mod_5": "VAMP_" + "+10%",
            "mod_6": "UNIQUE_" + "blood slash",

            //"uniqueText_6_1": "             If 3rd basic attack is charged, erupts a pillar of blood that deals 100(0) physical damage at the cost of (2) HP.",

            "uniqueText_6_1": "             If 3rd basic attack is charged, erupts a pillar of blood that deals 10 (+",
            "uniqueText_6_2": "_physical",
            "uniqueText_6_3": ") physical damage at the cost of 10% (",
            "uniqueText_6_4": "_hp",
            "uniqueText_6_5": ") HP.",

            //"mod_7": "UNIQUE_" + "blood slash",
            //"uniqueText_7_1": "             If 3rd basic attack is charged, erupts a pillar of blood that deals (",
            //"uniqueText_7_2": "Bonersexual2",
            //+ player_body.max_attack + ") physical damage at the cost of (" + 10 + ") HP.",
            "level_required": 1,
            "speed": 50,
            "knockback_mod": 200

        }
    }








    //console.log("window.innerwidth/height: " + window.innerWidth + " " + window.innerHeight);
    //  console.log(width + " " + height + " " + window.devicePixelRatio);


    /*
    var width = navigator.isCocoonJS ? window.innerWidth : 960;
    var height = navigator.isCocoonJS ? window.innerHeight : 640;
    var dips = window.devicePixelRatio;
    width = width * dips;
    height = height * dips;
    */




    /*

    var w = window.innerWidth * window.devicePixelRatio,
    h = window.innerHeight * window.devicePixelRatio,
    width = (h > w) ? h : w,
    height = (h > w) ? w : h;

    // Hack to avoid iPad Retina and large Android devices. Tell it to scale up.
    if (window.innerWidth >= 1024 && window.devicePixelRatio >= 2)
    {
    width = Math.round(width / 2);
    height = Math.round(height / 2);
    }
    // reduce screen size by one 3rd on devices like Nexus 5
    if (window.devicePixelRatio === 3)
    {
    width = Math.round(width / 3) * 2;
    height = Math.round(height / 3) * 2;
    }
    */





    /*
var SAFE_ZONE_WIDTH  = 960;
var SAFE_ZONE_HEIGHT = 640;

var width  = window.innerWidth * window.devicePixelRatio;
var height = window.innerHeight * window.devicePixelRatio;
var landWidth, landHeight;

if ( height > width ) {
    landWidth = height;
    landHeight = width;
} else {
    landWidth = width;
    landHeight = height;
}

var aspectRatioDevice = landHeight/landWidth;

var aspectRatioSafeZone = SAFE_ZONE_HEIGHT / SAFE_ZONE_WIDTH;

var extraWidth = 0, extraHeight = 0;

if (aspectRatioSafeZone < aspectRatioDevice) {
    extraWidth = aspectRatioDevice * SAFE_ZONE_HEIGHT - SAFE_ZONE_WIDTH;
} else {
    extraHeight = SAFE_ZONE_WIDTH / aspectRatioDevice - SAFE_ZONE_HEIGHT;
}


var game = new Phaser.Game(SAFE_ZONE_WIDTH + extraWidth, SAFE_ZONE_HEIGHT + extraHeight, Phaser.CANVAS, '');
*/









    /*
    var doc = window.document;

    // If there's a hash, or addEventListener is undefined, stop here
    if(!window.navigator.standalone && !location.hash && window.addEventListener ){

        //scroll to 1
        window.scrollTo( 0, 1 );
        var scrollTop = 1,
            getScrollTop = function(){
                return window.pageYOffset || doc.compatMode === "CSS1Compat" && doc.documentElement.scrollTop || doc.body.scrollTop || 0;
            },

            //reset to 0 on bodyready, if needed
            bodycheck = setInterval(function(){
                if( doc.body ){
                    clearInterval( bodycheck );
                    scrollTop = getScrollTop();
                    window.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
                }
            }, 15 );

        window.addEventListener( "load", function(){
            setTimeout(function(){
                //at load, if user hasn't scrolled more than 20 or so...
                if( getScrollTop() < 20 ){
                    //reset to hide addr bar at onload
                    window.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
                }
            }, 0);
        }, false );
    }
*/
};


},{"./states/BattleState":2,"./states/Boot":3,"./states/GameState":7,"./states/Preloader":8}],2:[function(require,module,exports){
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
},{"../states/Character":4,"../states/CharacterUI":5,"../states/Enemy":6,"v8flags":16}],3:[function(require,module,exports){
'use strict';

function Boot () {

}


Boot.prototype = {

    preload: function () {

        this.game.load.image('loaderEmpty', 'assets/UI/loaderEmpty.png');
        this.game.load.image('loaderFull', 'assets/UI/loaderFull.png');
    },

    init: function (SAFE_ZONE_WIDTH, SAFE_ZONE_HEIGHT) {

        this.SAFE_ZONE_WIDTH = SAFE_ZONE_WIDTH;
        this.SAFE_ZONE_HEIGHT = SAFE_ZONE_HEIGHT;
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

            this.game.SCALE_WIDTH = 1;
            this.game.SCALE_HEIGHT = 1;
        } else {

            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.setShowAll();
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVeritcally = true;
            this.game.scale.refresh();

            //this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
            //this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            //this.game.scale.setScreenSize(true);

            //this.game.SCALE_WIDTH = 0.5;
            //this.game.SCALE_HEIGHT = 0.5;
        }

        //if (this.game.device.desktop)
        //    this.game.add.plugin(Phaser.Plugin.Debug);

        this.game.input.touch.preventDefault = true;
        this.game.state.start('Preloader', true, false, this.SAFE_ZONE_WIDTH, this.SAFE_ZONE_HEIGHT);

        this.SAFE_ZONE_HEIGHT = null;
        this.SAFE_ZONE_WIDTH = null;
    }
}

module.exports = Boot;





//if (screen.orientation.lock)
//    screen.orientation.lock('landscape');

//this.setupScaling();

//this.game.scale.maxWidth = 960;
//this.game.scale.maxHeight = 640;

//if (this.game.device.android && this.game.device.chrome == false) {
//    this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
//    this.game.stage.scale.maxIterations = 1;
//}

/*

getRatio: function (type, w, h) {

    var width = navigator.isCocoonJS ? window.innerWidth : w,
        height = navigator.isCocoonJS ? window.innerHeight : h;

    var dips = window.devicePixelRatio;
    width = width * dips;
    height = height * dips;

    var scaleX = width / w,
        scaleY = height / h,
        result = {
            x: 1,
            y: 1
        };

    switch (type) {
        case 'all':
            result.x = scaleX > scaleY ? scaleY : scaleX;
            result.y = scaleX > scaleY ? scaleY : scaleX;
            break;
        case 'fit':
            result.x = scaleX > scaleY ? scaleX : scaleY;
            result.y = scaleX > scaleY ? scaleX : scaleY;
            break;
        case 'fill':
            result.x = scaleX;
            result.y = scaleY;
            break;
    }

    return result;
},

setupScaling: function () {

    if (navigator.isCocoonJS) {

        var ratio = this.getRatio('git', 960, 640);
        this.game.world.scale.x = ratio.x;
        this.game.world.scale.y = ratio.y;
        this.game.world.updateTransform();
    }
    else {
        if (this.game.device.desktop) {
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            this.game.scale.setScreenSize(true);
        }
        else {
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            this.game.scale.forceOrientation(false, true, 'orientation');
            this.game.scale.setScreenSize(true);
        }
    }

    this.game.world.setBounds(0, 0, 960, 640);
},
*/







/*
        if (this.game.device.desktop) {

            this.game.scale.maxWidth = 960;
            this.game.scale.maxHeight = 640;
            this.global_mobile_enabled = false;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        } else {

            this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
            this.game.scale.setMinMax(480, 260, 960, 640);
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            this.game.scale.forceOrientation(true, false);
            //this.game.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            //this.game.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
        }
*/

},{}],4:[function(require,module,exports){
'use strict';
// don't forget.. you're using WEAPON stats here, so when you start changing equips, they need to update here too

var Character = function(game, x, y, player_val) {

    //console.log(player_val)
    // ----- Init -----
    Phaser.Group.call(this, game);
    //this.enableBody = true;
    //this.physicsBodyType = Phaser.Physics.ARCADE;
    this.name = 'character';
    this.x = x;
    this.y = y;
    this.index = player_val;


    //this._body = armature.getSlot("body").getDisplay();
    //this._weapon = armature.getSlot("weapon").getDisplay();
    //this._footR = armature.getSlot("footR").getDisplay();
    //this._footL = armature.getSlot("footL").getDisplay();
    //armature.getSlot("footR").getChildArmature().getSlot("skin").armature.animation.gotoAndPlay("front");


    /*
    this._hips = armature.getSlot("hips").getDisplay();
    this._head = armature.getSlot("head").getDisplay();
    this._face = armature.getSlot("face").getDisplay();
    this._upperArmR = armature.getSlot("upperArmR");
    this._upperArmL = armature.getSlot("upperArmL");
    this._upperLegR = armature.getSlot("upperLegR");
    this._upperLegL = armature.getSlot("upperLegL");
    this._armR = armature.getSlot("armR").getDisplay();
    this._armL = armature.getSlot("armL").getDisplay();
    this._legR = armature.getSlot("legR").getDisplay();
    this._legL = armature.getSlot("legL").getDisplay();
    */




    // ----- Local Storage -----
    //localStorage["weapon"] = "blood-sword";




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
    //this.enableBody = true;
    //this.physicsBodyType = Phaser.Physics.ARCADE;


    this.init_DB(1 /*player_val*/ );


    // ----- Timers ------
    //this.t_main = this.game.time.create(false);
    //this.t_main.start();




    // ----- Tweens -----
    //this.tw_inventory_enter = this.game.add.tween(this).to({ x: 435, y: 490 }, 800, Phaser.Easing.Quadratic.Out, false, 0, false);
    //this.tw_inventory_exit = this.game.add.tween(this).to({ x: 800, y: 500 }, 800, Phaser.Easing.Quadratic.Out, false, 0, false);
    //this.tw_platform_walk = this.game.add.tween(this).to({ x: '+40', y: '+40' }, 2000, Phaser.Easing.Quadratic.Out, false, 0, false);



    // -------------------------------------------------EQUIPMENT--------------------------------------------------
    /*
    this.weapon = new Item(this.entity.x, this.entity.y, 4, 9, 0, "weapon", "weapon_blood_sword", "weapon instance 1", this.entity);
    this.weapon.alpha = 0;
    this.entity.r_attack_hit_box = this.weapon.r_attack_hit_box;

    this.entity.min_attack = this.entity.strength * 2 + this.weapon.min_attack;
    this.entity.max_attack = this.entity.strength * 2 + this.weapon.max_attack;
    this.entity.knockback_mod = this.weapon.knockback_mod;
    this.entity.hitbox_count = this.hitbox_count;
    */




    // ----- Stats -----
    var data = this.game.playerDataObj['player_' + player_val];

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

    this.max_health = this.vitality * 10;
    this.hp = this.max_health;

    /**
     * 0 = dir
     */
    //this._cache = [ 0, 0, 0, 0, 1, 0, 1, 0, 0 ];

    //this.display_sprite = armature.getDisplay();
    //this.game.physics.enable(this.display_sprite, Phaser.Physics.ARCADE);

    //console.log(this.display_sprite)

    // *-*-* DEBUG - error on adding new properties outside constructor (avoiding polymorphic) *-*-*    
    //Object.preventExtensions(this);
};

Character.prototype = Object.create(Phaser.Group.prototype);
Character.prototype.constructor = Character;


/*
Character.prototype.complete_event_handler = function() {

    console.log("ohi");
}
*/


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
        "Player-parts-weapon",

        "Player-body_equipment-body_e_main",
        "Player-body_equipment-upperLegR_e_main",
        "Player-body_equipment-upperLegL_e_main",
        "Player-body_equipment-hips_e_main",
        "Player-body_equipment-weapon_e_main",

        //"Player-body_equipment-training_outfit_01-body_e",
        //"Player-body_equipment-training_outfit_01-legs-upperLegR_e",
        //"Player-body_equipment-training_outfit_01-legs-upperLegL_e",
        //"Player-body_equipment-training_outfit_01-legs-hips_e",
        //"Player-body_equipment-training_outfit_02-body_e",
        //"Player-body_equipment-training_outfit_02-legs-upperLegR_e",
        //"Player-body_equipment-training_outfit_02-legs-upperLegL_e",
        //"Player-body_equipment-training_outfit_02-legs-hips_e",

        "Player-weapons-swords-ice_sword"
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

    // ----- Event listeners -----
    //armature.addEventListener(events.AnimationEvent.FADE_IN, this.event_handler);
    //armature.addEventListener(this.game.events.FrameEvent.ANIMATION_FRAME_EVENT, _player.e.frame_event_handler);
    //armature.addEventListener(this.game.events.AnimationEvent.COMPLETE, this.complete_event_handler);

    // ----- Start animation! -----
    //this.armature.animation.gotoAndPlay("dash", 0.2);
    this.armature.animation.gotoAndPlay("combat_idle", 0.2);

    /*
    var rnd;
    rnd = this.game.rnd.integerInRange(1, 100)

    if (rnd < 25) 
    this.armature.animation.gotoAndPlay("sit", 0.2);
    else if (rnd >= 25 && rnd < 50)
    this.armature.animation.gotoAndPlay("combat_idle", 0.2);
    else if (rnd >= 50 && rnd < 75)
    this.armature.animation.gotoAndPlay("idle", 0.2);
    else if (rnd >= 75)
    this.armature.animation.gotoAndPlay("walk_02", 0.2);

    rnd = null;
    */
    
    //armature.getSlot("face").getChildArmature().getSlot("eyes").armature.animation.gotoAndPlay("blink", 0.2);


    //console.log(this.game.rnd.realInRange(0.8, 0.9))
    //**COMMENTED OUT 1/21/15, UNKNOWN: armature.animation.getAnimationDataList()[0].duration = this.game.rnd.realInRange(0, 1);
    //console.log(armature.animation.getAnimationDataList(0));



    /*
    armature.getSlot("body");
    armature.getSlot("hips");
    armature.getSlot("head");
    armature.getSlot("face");
    armature.getSlot("upperArmR");
    armature.getSlot("upperArmL");
    armature.getSlot("upperLegR");
    armature.getSlot("upperLegL");
    armature.getSlot("armR");
    armature.getSlot("armL");
    armature.getSlot("legR");
    armature.getSlot("legL");
    armature.getSlot("weapon");
    */


    //_body.getChildArmature().getSlot("equip").setDisplay(null);
    //_hips.getChildArmature().getSlot("equip").setDisplay(null);
    //_upperLegL.getChildArmature().getSlot("equip").setDisplay(null);
    //_upperLegR.getChildArmature().getSlot("equip").setDisplay(null);


    //_body.getChildArmature().getSlot("equip").armature.animation.gotoAndPlay("green_glow", 0.2);
    //_weapon.getChildArmature().getSlot("equip").armature.animation.gotoAndPlay("red_glow", 0.2);


    //_body.getChildArmature().getSlot("equip").setDisplay(factory.getTextureDisplay("body_equipment-training_outfit_01-body_e"));
    //_hips.getChildArmature().getSlot("equip").setDisplay(factory.getTextureDisplay("body_equipment-training_outfit_01-legs-hips_e"));
    //_upperLegL.getChildArmature().getSlot("equip").setDisplay(factory.getTextureDisplay("body_equipment-training_outfit_01-legs-upperLegL_e"));
    //_upperLegR.getChildArmature().getSlot("equip").setDisplay(factory.getTextureDisplay("body_equipment-training_outfit_01-legs-upperLegR_e"));

    //bonesBase.x = 300;
    //bonesBase.y = 500;
    player_display = this.armature.getDisplay();
    this.add(player_display);
}


/*
Object.defineProperty(Character.prototype, "health", {

    get: function() {

        return this.hp;

    },

    set: function(value) {

        if (value >= this.max_health)
            this.hp = this.max_health;
        else
            this.hp -= value;


    }
});
*/


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
    hp_val = this.game.make.bitmapText(93, -30, 'Agency_54', '123/123', 35);
    sp_val = this.game.make.bitmapText(93, 85, 'Agency_54', '12/12', 35); 

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

    line = this.game.make.graphics(15, -30); //getAt(29)
    line.lineStyle(2, 0xffffff, 1);
    line.moveTo(0, 0);
    line.lineTo(215, 0);

    // Make menu assets invisible
    for (var i = 5; i < 24; i++)
        this.getAt(i).visible = false;

    this.add(line);
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

    text = this.game.make.bitmapText(0, 0, 'Agency_54', string, font_size); 
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
    },

    init: function(SAFE_ZONE_WIDTH, SAFE_ZONE_HEIGHT) {
        this.SAFE_ZONE_WIDTH = SAFE_ZONE_WIDTH;
        this.SAFE_ZONE_HEIGHT = SAFE_ZONE_HEIGHT;
    },


    create: function() {

        this.game.prev = this.game.time.now;

        this.init_dragon_bones();

        //this.game.state.start('MapState');
        //this.game.state.start('CharacterMenuState');

        this.game.state.start('BattleState');
        //this.game.state.start('GameState', true, false, this.SAFE_ZONE_WIDTH, this.SAFE_ZONE_HEIGHT);



    },

    init_dragon_bones: function() {

        //give dragonBones a reference to the game object
        dragonBones.game = this.game;

        this.game.events = dragonBones.events;

        dragonBones.animation.WorldClock.clock.timeScale = 0.5;
    }
}

module.exports = Preloader;
},{}],9:[function(require,module,exports){

},{}],10:[function(require,module,exports){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = Buffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192

/**
 * If `Buffer._useTypedArrays`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (compatible down to IE6)
 */
Buffer._useTypedArrays = (function () {
  // Detect if browser supports Typed Arrays. Supported browsers are IE 10+, Firefox 4+,
  // Chrome 7+, Safari 5.1+, Opera 11.6+, iOS 4.2+. If the browser does not support adding
  // properties to `Uint8Array` instances, then that's the same as no `Uint8Array` support
  // because we need to be able to add all the node Buffer API methods. This is an issue
  // in Firefox 4-29. Now fixed: https://bugzilla.mozilla.org/show_bug.cgi?id=695438
  try {
    var buf = new ArrayBuffer(0)
    var arr = new Uint8Array(buf)
    arr.foo = function () { return 42 }
    return 42 === arr.foo() &&
        typeof arr.subarray === 'function' // Chrome 9-10 lack `subarray`
  } catch (e) {
    return false
  }
})()

/**
 * Class: Buffer
 * =============
 *
 * The Buffer constructor returns instances of `Uint8Array` that are augmented
 * with function properties for all the node `Buffer` API functions. We use
 * `Uint8Array` so that square bracket notation works as expected -- it returns
 * a single octet.
 *
 * By augmenting the instances, we can avoid modifying the `Uint8Array`
 * prototype.
 */
function Buffer (subject, encoding, noZero) {
  if (!(this instanceof Buffer))
    return new Buffer(subject, encoding, noZero)

  var type = typeof subject

  // Workaround: node's base64 implementation allows for non-padded strings
  // while base64-js does not.
  if (encoding === 'base64' && type === 'string') {
    subject = stringtrim(subject)
    while (subject.length % 4 !== 0) {
      subject = subject + '='
    }
  }

  // Find the length
  var length
  if (type === 'number')
    length = coerce(subject)
  else if (type === 'string')
    length = Buffer.byteLength(subject, encoding)
  else if (type === 'object')
    length = coerce(subject.length) // assume that object is array-like
  else
    throw new Error('First argument needs to be a number, array or string.')

  var buf
  if (Buffer._useTypedArrays) {
    // Preferred: Return an augmented `Uint8Array` instance for best performance
    buf = Buffer._augment(new Uint8Array(length))
  } else {
    // Fallback: Return THIS instance of Buffer (created by `new`)
    buf = this
    buf.length = length
    buf._isBuffer = true
  }

  var i
  if (Buffer._useTypedArrays && typeof subject.byteLength === 'number') {
    // Speed optimization -- use set if we're copying from a typed array
    buf._set(subject)
  } else if (isArrayish(subject)) {
    // Treat array-ish objects as a byte array
    for (i = 0; i < length; i++) {
      if (Buffer.isBuffer(subject))
        buf[i] = subject.readUInt8(i)
      else
        buf[i] = subject[i]
    }
  } else if (type === 'string') {
    buf.write(subject, 0, encoding)
  } else if (type === 'number' && !Buffer._useTypedArrays && !noZero) {
    for (i = 0; i < length; i++) {
      buf[i] = 0
    }
  }

  return buf
}

// STATIC METHODS
// ==============

Buffer.isEncoding = function (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.isBuffer = function (b) {
  return !!(b !== null && b !== undefined && b._isBuffer)
}

Buffer.byteLength = function (str, encoding) {
  var ret
  str = str + ''
  switch (encoding || 'utf8') {
    case 'hex':
      ret = str.length / 2
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8ToBytes(str).length
      break
    case 'ascii':
    case 'binary':
    case 'raw':
      ret = str.length
      break
    case 'base64':
      ret = base64ToBytes(str).length
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = str.length * 2
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.concat = function (list, totalLength) {
  assert(isArray(list), 'Usage: Buffer.concat(list, [totalLength])\n' +
      'list should be an Array.')

  if (list.length === 0) {
    return new Buffer(0)
  } else if (list.length === 1) {
    return list[0]
  }

  var i
  if (typeof totalLength !== 'number') {
    totalLength = 0
    for (i = 0; i < list.length; i++) {
      totalLength += list[i].length
    }
  }

  var buf = new Buffer(totalLength)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

// BUFFER INSTANCE METHODS
// =======================

function _hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  assert(strLen % 2 === 0, 'Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var byte = parseInt(string.substr(i * 2, 2), 16)
    assert(!isNaN(byte), 'Invalid hex string')
    buf[offset + i] = byte
  }
  Buffer._charsWritten = i * 2
  return i
}

function _utf8Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf8ToBytes(string), buf, offset, length)
  return charsWritten
}

function _asciiWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(asciiToBytes(string), buf, offset, length)
  return charsWritten
}

function _binaryWrite (buf, string, offset, length) {
  return _asciiWrite(buf, string, offset, length)
}

function _base64Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(base64ToBytes(string), buf, offset, length)
  return charsWritten
}

function _utf16leWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf16leToBytes(string), buf, offset, length)
  return charsWritten
}

Buffer.prototype.write = function (string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length
      length = undefined
    }
  } else {  // legacy
    var swap = encoding
    encoding = offset
    offset = length
    length = swap
  }

  offset = Number(offset) || 0
  var remaining = this.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase()

  var ret
  switch (encoding) {
    case 'hex':
      ret = _hexWrite(this, string, offset, length)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Write(this, string, offset, length)
      break
    case 'ascii':
      ret = _asciiWrite(this, string, offset, length)
      break
    case 'binary':
      ret = _binaryWrite(this, string, offset, length)
      break
    case 'base64':
      ret = _base64Write(this, string, offset, length)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leWrite(this, string, offset, length)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toString = function (encoding, start, end) {
  var self = this

  encoding = String(encoding || 'utf8').toLowerCase()
  start = Number(start) || 0
  end = (end !== undefined)
    ? Number(end)
    : end = self.length

  // Fastpath empty strings
  if (end === start)
    return ''

  var ret
  switch (encoding) {
    case 'hex':
      ret = _hexSlice(self, start, end)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Slice(self, start, end)
      break
    case 'ascii':
      ret = _asciiSlice(self, start, end)
      break
    case 'binary':
      ret = _binarySlice(self, start, end)
      break
    case 'base64':
      ret = _base64Slice(self, start, end)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leSlice(self, start, end)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toJSON = function () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function (target, target_start, start, end) {
  var source = this

  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (!target_start) target_start = 0

  // Copy 0 bytes; we're done
  if (end === start) return
  if (target.length === 0 || source.length === 0) return

  // Fatal error conditions
  assert(end >= start, 'sourceEnd < sourceStart')
  assert(target_start >= 0 && target_start < target.length,
      'targetStart out of bounds')
  assert(start >= 0 && start < source.length, 'sourceStart out of bounds')
  assert(end >= 0 && end <= source.length, 'sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length)
    end = this.length
  if (target.length - target_start < end - start)
    end = target.length - target_start + start

  var len = end - start

  if (len < 100 || !Buffer._useTypedArrays) {
    for (var i = 0; i < len; i++)
      target[i + target_start] = this[i + start]
  } else {
    target._set(this.subarray(start, start + len), target_start)
  }
}

function _base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function _utf8Slice (buf, start, end) {
  var res = ''
  var tmp = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    if (buf[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
      tmp = ''
    } else {
      tmp += '%' + buf[i].toString(16)
    }
  }

  return res + decodeUtf8Char(tmp)
}

function _asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++)
    ret += String.fromCharCode(buf[i])
  return ret
}

function _binarySlice (buf, start, end) {
  return _asciiSlice(buf, start, end)
}

function _hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function _utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i+1] * 256)
  }
  return res
}

Buffer.prototype.slice = function (start, end) {
  var len = this.length
  start = clamp(start, len, 0)
  end = clamp(end, len, len)

  if (Buffer._useTypedArrays) {
    return Buffer._augment(this.subarray(start, end))
  } else {
    var sliceLen = end - start
    var newBuf = new Buffer(sliceLen, undefined, true)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
    return newBuf
  }
}

// `get` will be removed in Node 0.13+
Buffer.prototype.get = function (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.')
  return this.readUInt8(offset)
}

// `set` will be removed in Node 0.13+
Buffer.prototype.set = function (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.')
  return this.writeUInt8(v, offset)
}

Buffer.prototype.readUInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  return this[offset]
}

function _readUInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    val = buf[offset]
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
  } else {
    val = buf[offset] << 8
    if (offset + 1 < len)
      val |= buf[offset + 1]
  }
  return val
}

Buffer.prototype.readUInt16LE = function (offset, noAssert) {
  return _readUInt16(this, offset, true, noAssert)
}

Buffer.prototype.readUInt16BE = function (offset, noAssert) {
  return _readUInt16(this, offset, false, noAssert)
}

function _readUInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    if (offset + 2 < len)
      val = buf[offset + 2] << 16
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
    val |= buf[offset]
    if (offset + 3 < len)
      val = val + (buf[offset + 3] << 24 >>> 0)
  } else {
    if (offset + 1 < len)
      val = buf[offset + 1] << 16
    if (offset + 2 < len)
      val |= buf[offset + 2] << 8
    if (offset + 3 < len)
      val |= buf[offset + 3]
    val = val + (buf[offset] << 24 >>> 0)
  }
  return val
}

Buffer.prototype.readUInt32LE = function (offset, noAssert) {
  return _readUInt32(this, offset, true, noAssert)
}

Buffer.prototype.readUInt32BE = function (offset, noAssert) {
  return _readUInt32(this, offset, false, noAssert)
}

Buffer.prototype.readInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null,
        'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  var neg = this[offset] & 0x80
  if (neg)
    return (0xff - this[offset] + 1) * -1
  else
    return this[offset]
}

function _readInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt16(buf, offset, littleEndian, true)
  var neg = val & 0x8000
  if (neg)
    return (0xffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt16LE = function (offset, noAssert) {
  return _readInt16(this, offset, true, noAssert)
}

Buffer.prototype.readInt16BE = function (offset, noAssert) {
  return _readInt16(this, offset, false, noAssert)
}

function _readInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt32(buf, offset, littleEndian, true)
  var neg = val & 0x80000000
  if (neg)
    return (0xffffffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt32LE = function (offset, noAssert) {
  return _readInt32(this, offset, true, noAssert)
}

Buffer.prototype.readInt32BE = function (offset, noAssert) {
  return _readInt32(this, offset, false, noAssert)
}

function _readFloat (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 23, 4)
}

Buffer.prototype.readFloatLE = function (offset, noAssert) {
  return _readFloat(this, offset, true, noAssert)
}

Buffer.prototype.readFloatBE = function (offset, noAssert) {
  return _readFloat(this, offset, false, noAssert)
}

function _readDouble (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 7 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 52, 8)
}

Buffer.prototype.readDoubleLE = function (offset, noAssert) {
  return _readDouble(this, offset, true, noAssert)
}

Buffer.prototype.readDoubleBE = function (offset, noAssert) {
  return _readDouble(this, offset, false, noAssert)
}

Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'trying to write beyond buffer length')
    verifuint(value, 0xff)
  }

  if (offset >= this.length) return

  this[offset] = value
}

function _writeUInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 2); i < j; i++) {
    buf[offset + i] =
        (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
            (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, false, noAssert)
}

function _writeUInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffffffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 4); i < j; i++) {
    buf[offset + i] =
        (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, false, noAssert)
}

Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7f, -0x80)
  }

  if (offset >= this.length)
    return

  if (value >= 0)
    this.writeUInt8(value, offset, noAssert)
  else
    this.writeUInt8(0xff + value + 1, offset, noAssert)
}

function _writeInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fff, -0x8000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt16(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt16(buf, 0xffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, false, noAssert)
}

function _writeInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fffffff, -0x80000000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt32(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt32(buf, 0xffffffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, false, noAssert)
}

function _writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifIEEE754(value, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 23, 4)
}

Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, false, noAssert)
}

function _writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 7 < buf.length,
        'Trying to write beyond buffer length')
    verifIEEE754(value, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 52, 8)
}

Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, false, noAssert)
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (typeof value === 'string') {
    value = value.charCodeAt(0)
  }

  assert(typeof value === 'number' && !isNaN(value), 'value is not a number')
  assert(end >= start, 'end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  assert(start >= 0 && start < this.length, 'start out of bounds')
  assert(end >= 0 && end <= this.length, 'end out of bounds')

  for (var i = start; i < end; i++) {
    this[i] = value
  }
}

Buffer.prototype.inspect = function () {
  var out = []
  var len = this.length
  for (var i = 0; i < len; i++) {
    out[i] = toHex(this[i])
    if (i === exports.INSPECT_MAX_BYTES) {
      out[i + 1] = '...'
      break
    }
  }
  return '<Buffer ' + out.join(' ') + '>'
}

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
 */
Buffer.prototype.toArrayBuffer = function () {
  if (typeof Uint8Array !== 'undefined') {
    if (Buffer._useTypedArrays) {
      return (new Buffer(this)).buffer
    } else {
      var buf = new Uint8Array(this.length)
      for (var i = 0, len = buf.length; i < len; i += 1)
        buf[i] = this[i]
      return buf.buffer
    }
  } else {
    throw new Error('Buffer.toArrayBuffer not supported in this browser')
  }
}

// HELPER FUNCTIONS
// ================

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

var BP = Buffer.prototype

/**
 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
 */
Buffer._augment = function (arr) {
  arr._isBuffer = true

  // save reference to original Uint8Array get/set methods before overwriting
  arr._get = arr.get
  arr._set = arr.set

  // deprecated, will be removed in node 0.13+
  arr.get = BP.get
  arr.set = BP.set

  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
  arr.copy = BP.copy
  arr.slice = BP.slice
  arr.readUInt8 = BP.readUInt8
  arr.readUInt16LE = BP.readUInt16LE
  arr.readUInt16BE = BP.readUInt16BE
  arr.readUInt32LE = BP.readUInt32LE
  arr.readUInt32BE = BP.readUInt32BE
  arr.readInt8 = BP.readInt8
  arr.readInt16LE = BP.readInt16LE
  arr.readInt16BE = BP.readInt16BE
  arr.readInt32LE = BP.readInt32LE
  arr.readInt32BE = BP.readInt32BE
  arr.readFloatLE = BP.readFloatLE
  arr.readFloatBE = BP.readFloatBE
  arr.readDoubleLE = BP.readDoubleLE
  arr.readDoubleBE = BP.readDoubleBE
  arr.writeUInt8 = BP.writeUInt8
  arr.writeUInt16LE = BP.writeUInt16LE
  arr.writeUInt16BE = BP.writeUInt16BE
  arr.writeUInt32LE = BP.writeUInt32LE
  arr.writeUInt32BE = BP.writeUInt32BE
  arr.writeInt8 = BP.writeInt8
  arr.writeInt16LE = BP.writeInt16LE
  arr.writeInt16BE = BP.writeInt16BE
  arr.writeInt32LE = BP.writeInt32LE
  arr.writeInt32BE = BP.writeInt32BE
  arr.writeFloatLE = BP.writeFloatLE
  arr.writeFloatBE = BP.writeFloatBE
  arr.writeDoubleLE = BP.writeDoubleLE
  arr.writeDoubleBE = BP.writeDoubleBE
  arr.fill = BP.fill
  arr.inspect = BP.inspect
  arr.toArrayBuffer = BP.toArrayBuffer

  return arr
}

// slice(start, end)
function clamp (index, len, defaultValue) {
  if (typeof index !== 'number') return defaultValue
  index = ~~index;  // Coerce to integer.
  if (index >= len) return len
  if (index >= 0) return index
  index += len
  if (index >= 0) return index
  return 0
}

function coerce (length) {
  // Coerce length to a number (possibly NaN), round up
  // in case it's fractional (e.g. 123.456) then do a
  // double negate to coerce a NaN to 0. Easy, right?
  length = ~~Math.ceil(+length)
  return length < 0 ? 0 : length
}

function isArray (subject) {
  return (Array.isArray || function (subject) {
    return Object.prototype.toString.call(subject) === '[object Array]'
  })(subject)
}

function isArrayish (subject) {
  return isArray(subject) || Buffer.isBuffer(subject) ||
      subject && typeof subject === 'object' &&
      typeof subject.length === 'number'
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    var b = str.charCodeAt(i)
    if (b <= 0x7F)
      byteArray.push(str.charCodeAt(i))
    else {
      var start = i
      if (b >= 0xD800 && b <= 0xDFFF) i++
      var h = encodeURIComponent(str.slice(start, i+1)).substr(1).split('%')
      for (var j = 0; j < h.length; j++)
        byteArray.push(parseInt(h[j], 16))
    }
  }
  return byteArray
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(str)
}

function blitBuffer (src, dst, offset, length) {
  var pos
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length))
      break
    dst[i + offset] = src[i]
  }
  return i
}

function decodeUtf8Char (str) {
  try {
    return decodeURIComponent(str)
  } catch (err) {
    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
  }
}

/*
 * We have to make sure that the value is a valid integer. This means that it
 * is non-negative. It has no fractional component and that it does not
 * exceed the maximum allowed value.
 */
function verifuint (value, max) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value >= 0, 'specified a negative value for writing an unsigned value')
  assert(value <= max, 'value is larger than maximum value for type')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifsint (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifIEEE754 (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
}

function assert (test, message) {
  if (!test) throw new Error(message || 'Failed assertion')
}

},{"base64-js":11,"ieee754":12}],11:[function(require,module,exports){
var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function (exports) {
	'use strict';

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

	var PLUS   = '+'.charCodeAt(0)
	var SLASH  = '/'.charCodeAt(0)
	var NUMBER = '0'.charCodeAt(0)
	var LOWER  = 'a'.charCodeAt(0)
	var UPPER  = 'A'.charCodeAt(0)
	var PLUS_URL_SAFE = '-'.charCodeAt(0)
	var SLASH_URL_SAFE = '_'.charCodeAt(0)

	function decode (elt) {
		var code = elt.charCodeAt(0)
		if (code === PLUS ||
		    code === PLUS_URL_SAFE)
			return 62 // '+'
		if (code === SLASH ||
		    code === SLASH_URL_SAFE)
			return 63 // '/'
		if (code < NUMBER)
			return -1 //no match
		if (code < NUMBER + 10)
			return code - NUMBER + 26 + 26
		if (code < UPPER + 26)
			return code - UPPER
		if (code < LOWER + 26)
			return code - LOWER + 26
	}

	function b64ToByteArray (b64) {
		var i, j, l, tmp, placeHolders, arr

		if (b64.length % 4 > 0) {
			throw new Error('Invalid string. Length must be a multiple of 4')
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		var len = b64.length
		placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

		// base64 is 4/3 + up to two characters of the original data
		arr = new Arr(b64.length * 3 / 4 - placeHolders)

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length

		var L = 0

		function push (v) {
			arr[L++] = v
		}

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
			push((tmp & 0xFF0000) >> 16)
			push((tmp & 0xFF00) >> 8)
			push(tmp & 0xFF)
		}

		if (placeHolders === 2) {
			tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
			push(tmp & 0xFF)
		} else if (placeHolders === 1) {
			tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
			push((tmp >> 8) & 0xFF)
			push(tmp & 0xFF)
		}

		return arr
	}

	function uint8ToBase64 (uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length

		function encode (num) {
			return lookup.charAt(num)
		}

		function tripletToBase64 (num) {
			return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
		}

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
			output += tripletToBase64(temp)
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1]
				output += encode(temp >> 2)
				output += encode((temp << 4) & 0x3F)
				output += '=='
				break
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
				output += encode(temp >> 10)
				output += encode((temp >> 4) & 0x3F)
				output += encode((temp << 2) & 0x3F)
				output += '='
				break
		}

		return output
	}

	exports.toByteArray = b64ToByteArray
	exports.fromByteArray = uint8ToBase64
}(typeof exports === 'undefined' ? (this.base64js = {}) : exports))

},{}],12:[function(require,module,exports){
exports.read = function(buffer, offset, isLE, mLen, nBytes) {
  var e, m,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      nBits = -7,
      i = isLE ? (nBytes - 1) : 0,
      d = isLE ? -1 : 1,
      s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity);
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
      i = isLE ? 0 : (nBytes - 1),
      d = isLE ? 1 : -1,
      s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8);

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8);

  buffer[offset + i - d] |= s * 128;
};

},{}],13:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.once = noop;
process.off = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],14:[function(require,module,exports){
exports.endianness = function () { return 'LE' };

exports.hostname = function () {
    if (typeof location !== 'undefined') {
        return location.hostname
    }
    else return '';
};

exports.loadavg = function () { return [] };

exports.uptime = function () { return 0 };

exports.freemem = function () {
    return Number.MAX_VALUE;
};

exports.totalmem = function () {
    return Number.MAX_VALUE;
};

exports.cpus = function () { return [] };

exports.type = function () { return 'Browser' };

exports.release = function () {
    if (typeof navigator !== 'undefined') {
        return navigator.appVersion;
    }
    return '';
};

exports.networkInterfaces
= exports.getNetworkInterfaces
= function () { return {} };

exports.arch = function () { return 'javascript' };

exports.platform = function () { return 'browser' };

exports.tmpdir = exports.tmpDir = function () {
    return '/tmp';
};

exports.EOL = '\n';

},{}],15:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require("c:\\xampp\\htdocs\\phaser\\node_modules\\browserify\\node_modules\\insert-module-globals\\node_modules\\process\\browser.js"))
},{"c:\\xampp\\htdocs\\phaser\\node_modules\\browserify\\node_modules\\insert-module-globals\\node_modules\\process\\browser.js":13}],16:[function(require,module,exports){
(function (process,Buffer){
// this entire module is depressing. i should have spent my time learning
// how to patch v8 so that these options would just be available on the
// process object.

const os = require('os');
const fs = require('fs');
const path = require('path');
const execFile = require('child_process').execFile;
const env = process.env;
const user = env.LOGNAME || env.USER || env.LNAME || env.USERNAME;
const configfile = '.v8flags.'+process.versions.v8+'.'+user+'.json';
const exclusions = ['--help'];

const failureMessage = [
  'Unable to cache a config file for v8flags to a your home directory',
  'or a temporary folder. To fix this problem, please correct your',
  'environment by setting HOME=/path/to/home or TEMP=/path/to/temp.',
  'NOTE: the user running this must be able to access provided path.',
  'If all else fails, please open an issue here:',
  'http://github.com/tkellen/js-v8flags'
].join('\n');

function fail (err) {
  err.message += '\n\n' + failureMessage;
  return err;
}

function openConfig (cb) {
  var userHome = require('user-home');
  var configpath = path.join(userHome || os.tmpdir(), configfile);
  var content;
  try {
    // if the config file is valid, it should be json and therefore
    // node should be able to require it directly. if this doesn't
    // throw, we're done!
    content = require(configpath);
    process.nextTick(function () {
      cb(null, content);
    });
  } catch (e) {
    // if requiring the config file failed, maybe it doesn't exist, or
    // perhaps it has become corrupted. instead of calling back with the
    // content of the file, call back with a file descriptor that we can
    // write the cached data to
    fs.open(configpath, 'w+', function (err, fd) {
      if (err) {
        return cb(err);
      }
      return cb(null, fd);
    });
  }
}

// i can't wait for the day this whole module is obsolete because these
// options are available on the process object. this executes node with
// `--v8-options` and parses the result, returning an array of command
// line flags.
function getFlags (cb) {
  execFile(process.execPath, ['--v8-options'], function (execErr, result) {
    if (execErr) {
      return cb(execErr);
    }
    var flags = result.match(/\s\s--(\w+)/gm).map(function (match) {
      return match.substring(2);
    }).filter(function (name) {
      return exclusions.indexOf(name) === -1;
    });
    return cb(null, flags);
  });
}

// write some json to a file descriptor. if this fails, call back
// with both the error and the data that was meant to be written.
function writeConfig (fd, flags, cb) {
  var buf = new Buffer(JSON.stringify(flags));
  return fs.write(fd, buf, 0, buf.length, 0 , function (writeErr) {
    fs.close(fd, function (closeErr) {
      var err = writeErr || closeErr;
      if (err) {
        return cb(fail(err), flags);
      }
      return cb(null, flags);
    });
  });
}

module.exports = function (cb) {
  // attempt to open/read cache file
  openConfig(function (openErr, result) {
    if (!openErr && typeof result !== 'number') {
      return cb(null, result);
    }
    // if the result is not an array, we need to go fetch
    // the flags by invoking node with `--v8-options`
    getFlags(function (flagsErr, flags) {
      // if there was an error fetching the flags, bail immediately
      if (flagsErr) {
        return cb(flagsErr);
      }
      // if there was a problem opening the config file for writing
      // throw an error but include the flags anyway so that users
      // can continue to execute (at the expense of having to fetch
      // flags on every run until they fix the underyling problem).
      if (openErr) {
        return cb(fail(openErr), flags);
      }
      // write the config file to disk so subsequent runs can read
      // flags out of a cache file.
      return writeConfig(result, flags, cb);
    });
  });
};

module.exports.configfile = configfile;

}).call(this,require("c:\\xampp\\htdocs\\phaser\\node_modules\\browserify\\node_modules\\insert-module-globals\\node_modules\\process\\browser.js"),require("buffer").Buffer)
},{"buffer":10,"c:\\xampp\\htdocs\\phaser\\node_modules\\browserify\\node_modules\\insert-module-globals\\node_modules\\process\\browser.js":13,"child_process":9,"fs":9,"os":14,"path":15,"user-home":17}],17:[function(require,module,exports){
(function (process){
'use strict';
var env = process.env;
var home = env.HOME;
var user = env.LOGNAME || env.USER || env.LNAME || env.USERNAME;

if (process.platform === 'win32') {
	module.exports = env.USERPROFILE || env.HOMEDRIVE + env.HOMEPATH || home || null;
} else if (process.platform === 'darwin') {
	module.exports = home || (user ? '/Users/' + user : null) || null;
} else if (process.platform === 'linux') {
	module.exports = home ||
		(user ? (process.getuid() === 0 ? '/root' : '/home/' + user) : null) || null;
} else {
	module.exports = home || null;
}

}).call(this,require("c:\\xampp\\htdocs\\phaser\\node_modules\\browserify\\node_modules\\insert-module-globals\\node_modules\\process\\browser.js"))
},{"c:\\xampp\\htdocs\\phaser\\node_modules\\browserify\\node_modules\\insert-module-globals\\node_modules\\process\\browser.js":13}]},{},[1])