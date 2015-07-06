// Main.js has GLOB data

/*
(function(global){
    "use strict";
    
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
*/


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