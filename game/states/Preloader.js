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