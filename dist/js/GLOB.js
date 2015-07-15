// Main.js has GLOB data


(function(global){
    "use strict";


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
    
    //global.GLOB = {

    	//events: null,

    	//game: null,

    	//map: null,
    	//dragonBones: null,

    	//global_mobile_enabled: false,

    	//playerDataObj: null,
    	//levelDataObj: null,
      //itemDataObj: null,
    	//prev: 0
  //};

}(this));



/*
function GLOBAL_init_weapon (obj) {

    obj.item_name = obj.data.item_name;
    obj.rarity = obj.data.rarity;
    obj.equipped = false;
    obj.min_attack = obj.data.min_attack;
    obj.max_attack = obj.data.max_attack;

    for (var i = 1; i < 10; i++) 
        if (obj.data['mod_' + i]) {

              // If it's a unique mod
              if (obj.data['mod_' + i].split("_")[0] == 'UNIQUE') {
                  for (var e = i; e < i + 3; e++) 

                      // o = number of separate lines in the unique text data
                      for (var o = 1; o < 10; o++)
                          if (obj.data['uniqueText_' + e + "_" + o]) 
                              obj['uniqueText_' + e + "_" + o] = obj.data['uniqueText_' + e + "_" + o];
              }

              // Apply regular mod data
            obj['mod_' + i] = obj.data['mod_' + i];
          }
}




function GLOBAL_get_mod_data (trigger, text_object, mod) {

    // Returns strings from mod data

    // Gets number amount "+1"
    text_object.data = mod.split("_")[1];

    // "STR_1" switch
    switch (mod.split("_")[0]) {
        case "STR": 
            text_object.name = "Strength";
            break;

        case "VIT":
            text_object.name = "Vitality";
            break;

        case "DEX":
            text_object.name = "Dexterity";
            break;

        case "INT":
            text_object.name = "Intelligence";
            break;

        case "VAMP":
            text_object.name = "Health Steal";
            break;

        case "UNIQUE":
            text_object.name = "Unique";
            //text_object.data = text_object.unique_text;
            break;
    }

    if (trigger == 1)
        return text_object.name + ": ";
    if (trigger == 2)
        return text_object.data;
}
*/