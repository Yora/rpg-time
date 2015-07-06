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

