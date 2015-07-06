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