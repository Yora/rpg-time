'use strict';

var Tooltip = function (game, x, y, index, parent_item, g_player_1) {

    Phaser.Group.call(this, game);

    this.parent_item = parent_item || 0;
    this.g_player_1 = g_player_1;

    this.mod_height = 0;


    // Item data
    this.item_name = this.parent_item.item_name || '';
    this.item_attack = (this.parent_item.min_attack + "-" + this.parent_item.max_attack) || ("0-0");


    // Back UI
    this.back_image = this.create(0, 0, 'tooltip_back');
    this.back_image.width = 300;
    this.back_image.height = 120;


    //this.offset_X = 80;//420;//70;
    //this.offset_Y = 10;
    //this.starting_offset_X = this.offset_X; 
    //this.starting_offset_Y = this.offset_Y;


    // Set position with offsets
    //this.back_image.x = this.back_image.x + this.offset_X;
    //this.back_image.y = this.back_image.y + this.offset_Y;


    this.rare_color = { font: '24px Righteous', fill: "#D01E94", align: "center", stroke: "#74004D", strokeThickness: 2, wordWrap: true, wordWrapWidth: this.back_image.width - 40 };  
    this.white = { font: '20px Righteous', fill: "#FFFFFF", align: "center", stroke: "#000000", strokeThickness: 2, wordWrap: true, wordWrapWidth: this.back_image.width - 100 };
    this.yellow = { font: '20px Righteous', fill: "#FFFF00", align: "center", stroke: "#000000", strokeThickness: 2, wordWrap: true, wordWrapWidth: this.back_image.width - 100 };
    this.unique_color = { font: '20px Righteous', fill: "#CC6600", align: "left", stroke: "#000000", strokeThickness: 2, wordWrap: true, wordWrapWidth: this.back_image.width - 40 };
    this.grey = { font: '20px Righteous', fill: "#CCCCCC", align: "center", stroke: "#000000", strokeThickness: 2, wordWrap: true, wordWrapWidth: this.back_image.width - 100 };
    this.red = { font: '20px Righteous', fill: "#FF0000", align: "center", stroke: "#000000", strokeThickness: 2, wordWrap: true, wordWrapWidth: this.back_image.width - 100 };


    // ---------------------------- TOOLTIP TEXT ----------------------------
    // Item name 
    this.t_title = this.game.make.text(0, 20, this.item_name, this.rare_color);
    this.t_title.x += (this.back_image.width / 2) - (this.t_title.width / 2) + this.back_image.x;
    //this.t_title.setShadow(2, 2, 'rgba(116,0,77,1)', 0);
    this.t_title.setShadow(2, 2, 'rgba(0,0,0,1)', 2);
    this.add(this.t_title);
    this.mod_height += this.t_title.height;


    this.t_attack = this.game.make.text(this.back_image.x + 25, this.t_title.height + this.t_title.y + 15, "Damage: ", this.white);
    this.t_attack_damage = this.game.make.text(this.t_attack.x + this.t_attack.width - 5, this.t_attack.y, this.item_attack, this.yellow);
    this.t_attack.setShadow(1, 1, 'rgba(0,0,0,1)', 1);
    this.t_attack_damage.setShadow(1, 1, 'rgba(0,0,0,1)', 1);
    this.add(this.t_attack);
    this.add(this.t_attack_damage);
    this.mod_height += this.t_attack.height + 25;


    // Line 1
    this.line_1 = this.create(this.back_image.x + 25, this.t_title.y + this.t_title.height + 5, 'tooltip_line');
    // Line 2
    this.line_2 = this.create(this.back_image.x + 25, this.t_attack.y + this.t_attack.height + 5, 'tooltip_line');
};

Tooltip.prototype = Object.create(Phaser.Group.prototype);
Tooltip.prototype.constructor = Tooltip;


Tooltip.prototype.set_stat_text = function (icon_data) {

    this.item_name = icon_data.item_name;
    this.item_attack = icon_data.min_attack + "-" + icon_data.max_attack;

    this.t_title.setText(this.item_name);
    this.t_attack_damage.setText(this.item_attack);

    // Mod handler
    for (var i = 0; i < 10; i++)  {
        if (icon_data['mod_' + i]) {

            // Sets mod text names
            this['t_mod_name' + i] = this.game.make.text(this.back_image.x + 25, this.mod_height + 50, '', this.white);
            this.add(this['t_mod_name' + i]);

            // If it's a unique mod, make it orange
            if (icon_data['mod_' + i].split("_")[0] == 'UNIQUE') {

                this.next_color = this.unique_color;

                // Assigns any unique texts to the text object to be used in the GLOBAL function
                for (var e = 1; e < 3; e++) 
                    if (icon_data['uniqueText_' + e]) 
                        this['t_mod_name' + i].unique_text = icon_data['uniqueText_' + e];
            } else {

                // If not unique text, data color is yellow
                this.next_color = this.yellow;
            }

            // Sets name of stat
            this['t_mod_name' + i].setText(GLOBAL_get_mod_data(1, this['t_mod_name' + i], icon_data['mod_' + i]));
            this['t_mod_name' + i].setShadow(2, 2, 'rgba(0,0,0,1)', 2);            
            
            // -------------------------------------- DATA --------------------------------------

            // For each unique property, set data as the unique text (e = i, mod_6 = uniqueText_6)
            if (icon_data['mod_' + i].split("_")[0] == 'UNIQUE') {

                // Adds all pieces of the data string together.  uniqueTextType_ used in update_stat_text
                for (var o = 1; o < 12; o++) {
                    if (icon_data['uniqueText_' + i + '_' + o]) {

                        if (icon_data['uniqueText_' + i + '_' + o] == "_physical") {
                            icon_data['uniqueTextType_' + i + '_' + o] = "physical";
                            icon_data['uniqueText_' + i + '_' + o] = this.g_player_1.strength * 2;
                        }   

                        if (icon_data['uniqueText_' + i + '_' + o] == "_hp") {
                            icon_data['uniqueTextType_' + i + '_' + o] = "hp";
                            icon_data['uniqueText_' + i + '_' + o] = Math.round(this.g_player_1.max_hp * 0.1);
                        }
                        
                        // Sets unique text data sprite
                        if (o == 1) {
                            this['t_mod_data' + i] = this.game.make.text(this.back_image.x + 15, this.mod_height + 50, '', this.next_color);
                            this.add(this['t_mod_data' + i]);                            
                        }
                            this['t_mod_data' + i].text += icon_data['uniqueText_' + i + '_' + o];//.setText(icon_data['uniqueText_' + i]);

                        // Sets shadow, position and adds to mod_height.  Add to tooltip group.
                        this['t_mod_data' + i].setShadow(2, 2, 'rgba(0,0,0,1)', 2); 
                    }
                }

            // If not a unique property, only need the 1 text data field
            } else {

                // Sets mod text number data sprite
                this['t_mod_data' + i] = this.game.make.text(this['t_mod_name' + i].x + this['t_mod_name' + i].width - 5, this.mod_height + 50, '', this.next_color);
                this.add(this['t_mod_data' + i]);
                
                this['t_mod_data' + i].setText(GLOBAL_get_mod_data(2, this['t_mod_data' + i], icon_data['mod_' + i]));
            
                this['t_mod_data' + i].setShadow(2, 2, 'rgba(0,0,0,1)', 2); 
                //this['t_mod_name' + i].setStyle(this.red); 
            }

            this.mod_height += this['t_mod_data' + i].height;

        }
    }


    // Adds more height to the tooltip per height of the text mods
    this.back_image.height += this.mod_height;


    // Level requirement
    this.t_level_requirement = this.game.make.text(this.back_image.x + 25, this.back_image.height - 40, "Level Required: " + icon_data.level_required, this.grey);
    this.t_level_requirement.setShadow(2, 2, 'rgba(0,0,0,1)', 2);  
    this.add(this.t_level_requirement);

    // Line 3
    this.line_3 = this.create(this.back_image.x + 25, this.t_level_requirement.y - 2, 'tooltip_line');
}


Tooltip.prototype.update_stat_text = function (icon_data) {

    // Reset tooltip size
    this.back_image.height = 120;
    this.mod_height = 0;

    this.item_name = icon_data.item_name;
    this.item_attack = icon_data.min_attack + "-" + icon_data.max_attack;

    // Update title
    this.t_title.setText(this.item_name + " of the sexy penis");
    this.t_title.x = (this.back_image.x) + (this.back_image.width / 2) - (this.t_title.width / 2);
    this.mod_height += this.t_title.height;
    this.line_1.y = this.t_title.y + this.t_title.height + 5;

    // Update damage
    this.t_attack_damage.setText(this.item_attack);
    this.t_attack.y = this.mod_height + 30;
    this.t_attack_damage.y = this.mod_height + 30;
    this.t_level_requirement.setText("Level Required: " + icon_data.level_required);
    this.mod_height += this.t_attack.height;
    this.line_2.y = this.t_attack.y + this.t_attack.height + 5;
    
    // Mod handler
    for (var i = 1; i < 10; i++)  {
        if (icon_data['mod_' + i]) {

            // If it's regular stat text
            if (icon_data['mod_' + i].split("_")[0] != 'UNIQUE') {

                // Sets mod text number data sprite
                this['t_mod_data' + i].setText(this['t_mod_name' + i].x + this['t_mod_name' + i].width - 5, this.mod_height + 50, '', this.next_color);
                this['t_mod_data' + i].setText(GLOBAL_get_mod_data(2, this['t_mod_data' + i], icon_data['mod_' + i]));
            
                this['t_mod_data' + i].setShadow(2, 2, 'rgba(0,0,0,1)', 2); 
                //this['t_mod_name' + i].setStyle(this.red); 
                this.add(this['t_mod_data' + i]);
            }

            // If it's a unique mod, make it orange
            else {

                this['t_mod_data' + i].text = '';

                // Assigns any unique texts to the text object to be used in the GLOBAL function
                for (var e = 1; e < 3; e++) 
                    if (icon_data['uniqueText_' + e]) 
                        this['t_mod_name' + i].unique_text = icon_data['uniqueText_' + e];
            
                // Updates the texts based on newly equipped stats, adds all pieces of the data string together
                for (var o = 1; o < 12; o++) {
                    if (icon_data['uniqueText_' + i + '_' + o]) {

                        if (icon_data['uniqueTextType_' + i + '_' + o] == "physical")
                            icon_data['uniqueText_' + i + '_' + o] = this.g_player_1.strength * 2;

                        if (icon_data['uniqueTextType_' + i + '_' + o] == "hp")
                            icon_data['uniqueText_' + i + '_' + o] = Math.round(this.g_player_1.max_hp * 0.1);
                        
                        
                        this['t_mod_data' + i].text += icon_data['uniqueText_' + i + '_' + o];

                    }
                }
            }

            // Add to mod height per mod
            this.mod_height += this['t_mod_data' + i].height;
        }
    }

    this.back_image.height += this.mod_height;
    this.t_level_requirement.y = this.back_image.height - 45;
    this.line_3.y = this.t_level_requirement.y - 5;
}


module.exports = Tooltip;