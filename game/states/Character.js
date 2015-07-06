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