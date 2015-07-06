'use strict';


function MapState () {
}

MapState.prototype = {




    preload: function () {
    	this.game.load.image('map_back', 'assets/MAP_STATE/map_back.png');
    	this.game.load.image('map_floor_select', 'assets/MAP_STATE/map_floor_select.png');
    	this.game.load.image('tower_1', 'assets/MAP_STATE/tower-1.png');
    	this.game.load.image('tower_2', 'assets/MAP_STATE/tower-2.png');
    	this.game.load.image('tower_3', 'assets/MAP_STATE/tower-3.png');
    	this.game.load.image('tower_4', 'assets/MAP_STATE/tower-4.png');
    	this.game.load.image('tower_5', 'assets/MAP_STATE/tower-5.png');
    },




    create: function () {

        //this.game.input.minPriorityID = 20;

    	// ------------------------------ VARIABLES --------------------------------

    	var map_main = this.game.add.image(0, 0, 'map_back');

    	this.active_tower_menu_num = null;


    	// ------------------------------ GROUPS --------------------------------
    	this.g_tower = this.game.add.group();
        this.g_tower_menu = this.game.add.group();
        this.g_floor_selection = this.game.add.group();


        // Create floor selection buttons
        for (var i = 0; i < 4; i++) {

            var b_floor_select = this.g_floor_selection.create(0, 0, '');

            b_floor_select.width = 308;
            b_floor_select.height = 119;
            b_floor_select.inputEnabled = true;
            b_floor_select.priorityID = 0;
            b_floor_select.events.onInputUp.add(this.f_floor_input_up, this);
            b_floor_select.events.onInputOver.add(this.f_floor_input_over, b_floor_select);
            b_floor_select.events.onInputOut.add(this.f_floor_input_out, b_floor_select);
            b_floor_select.visible = false;
        }


    	// Create tower buttons
    	for (var i = 1; i <= 5; i++)
    		this.SET_TOWERS(i);
    	for (var i = 1; i <= 5; i++)
    		this.SET_TOWERS_MENU(i);
    },




    SET_TOWERS: function (num) {

    	var x;
    	var y;

    	// Tower position on main map
    	switch (num) {
    		case 1:
    		x = 324;
    		y = 398;
    		break;

    		case 2:
    		x = 396;
    		y = 80;
    		break;

    		case 3:
    		x = 600;
    		y = 360;
    		break;

    		case 4:
    		x = 120;
    		y = 72;
    		break;

    		case 5:
    		x = 800;
    		y = 72;
    		break;
    	}

    	// Create tower and its input handlers
    	var tower = this.g_tower.create(x, y, ('tower_' + num));
    	tower.inputEnabled = true;
    	tower.num = num;
    	tower.toggled = false;

    	tower.events.onInputUp.add(this.f_tower_input_up, this);
    	tower.events.onInputOver.add(this.f_tower_input_over, tower);
    	tower.events.onInputOut.add(this.f_tower_input_out, tower);
    },

    SET_TOWERS_MENU: function (num) {

    	var menu_x;
    	var menu_y;
        var tower = this.g_tower.getAt(num - 1);

    	//Tower menu position on the main map
		menu_x = tower.x + 80;
		menu_y = tower.y - 200;


    	// Re-adjust menus that go off-screen
    	if (menu_y > this.game.height)
    		menu_y = this.game.height - menu_y;

    	if (menu_y < 0)
    		menu_y = 0;

    	if (menu_x > this.game.width - 423)
    		menu_x = this.game.width - 423;

    	if (menu_x < 0)
    		menu_x = 0;

    	// Create a tower menu and make it invisible
    	var v_tower_menu = this.g_tower_menu.create(menu_x, menu_y, 'map_floor_select');

        v_tower_menu.inputEnabled = true;
        //v_tower_menu.input.priorityID = 1;
        v_tower_menu.visible = false;
        v_tower_menu.r_bounds = new Phaser.Rectangle(v_tower_menu.x, v_tower_menu.y, v_tower_menu.width, v_tower_menu.height);
    },




    f_tower_input_up: function (sprite) {

    	// When a tower is clicked, open its menu
    	sprite.toggled = true;

    	// Handle tower menus; only allow 1 up at a time; toggle
    	this.g_tower.forEach(this.f__check_menus, this, true);

        // Index of the currently active menu.  Used to control open/closing the same/different menus.
    	this.active_tower_menu_num = sprite.num;

        // Sets position of floor buttons on the opened menu.
        this.g_floor_selection.forEach(this.f__set_floor_buttons, this, true);
    },

    f__check_menus: function (sprite) {

		// Open tower menu
		if (this.active_tower_menu_num != sprite.num && sprite.toggled) {

            this.g_tower_menu.getAt(sprite.num - 1).visible = true;
            this.active_tower_menu = this.g_tower_menu.getAt(sprite.num - 1);
			sprite.toggled = false;
			return;
		}
		// If that tower menu was already open, close it
		else if (sprite.toggled) {

			if (this.g_tower_menu.getAt(sprite.num - 1).visible)
				this.g_tower_menu.getAt(sprite.num - 1).visible = false;
			else
				this.g_tower_menu.getAt(sprite.num - 1).visible = true;

			sprite.toggled = false;
			return;
		}
		// If there was a different open tower menu, close it
		else if (this.active_tower_menu_num == sprite.num) {

			this.g_tower_menu.getAt(sprite.num - 1).visible = false;
			this.active_tower_menu_num = 0;
			return;
		}
    },

    f__set_floor_buttons: function (sprite) {

        // Set positions of floor buttons on the menu.
        if (this.active_tower_menu.visible) {

            sprite.visible = true;
            sprite.x = this.active_tower_menu.x + 95;
            sprite.y = this.active_tower_menu.y + this.active_tower_menu.height - (sprite.z) * sprite.height + 5;
        } else {

            sprite.visible = false;
        }
    },

    f_tower_input_over: function () {

    	//var num = this.num;
    },

    f_tower_input_out: function () {
    },




    f_floor_input_up: function (sprite) {

        //this.game.state.start('GameState', true, false, sprite.z);
        this.game.state.start('Transition', true, false, 'GameState', sprite.z);
    },

    f_floor_input_over: function (sprite) {
    },

    f_floor_input_out: function (sprite) {
    },




    update: function () {
    },




    render: function () {
        //this.game.debug.spriteBounds(this.g_floor_selection.getAt(1));
        //this.game.debug.rectangle(this['tower_1']['floor_selection_1']);
    }

}


module.exports = MapState;
