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
