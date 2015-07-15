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