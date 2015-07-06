'use strict';

var Map = function (game) {

    Phaser.Group.call(this, game);

    // ----- Variables -----
    this._map = "map_01";
    this._room = "room_01";
    this._coordX = 0;
    this._coordY = 4;
    this.current_map = null;
    this.coord = null;

    // ----- Data -----
    var data = this.game.levelDataObj[this._map];
    this._map = data.coords;
    this.room_data = data[this._room];
    this.enemy_data = data[this._room];

    this._map[this._coordY][this._coordX] = 8;

    // ----- Variables -----
    this.name = "Map " + this._map;

    //Oh shit, make like if coord = 2, it has a random chance of spawning some rare thing,
    //random chance of nothing, and scatter them around. use also for rare/powerful enemy spawns.

    for (var y = 0, len = this._map.length; y < len; y++) {
        for (var x = 0, len2 = this._map[0].length; x < len2; x++) {

            //this.coord['p' + y + x]

            // --- Minimap ---
            this.coord = this.create(x * 32 + this.game.width - 140, y * 32 + 20, 'minimap-wall');
            this.coord.width = 32;
            this.coord.height = 32;
            this.coord.type = this._map[y][x];

            if (this.coord.type == 1) 
                this.coord.loadTexture('minimap-wall');


            if (this.coord.type == 8) {
                this.coord.loadTexture('minimap-current');
                // Since we already loaded the texture, we can disable the load trigger right away for next time
                //this.data['coords'][y][x] = 0;
                this.current_map = this.coord;
            }
        }
    }
};

Map.prototype = Object.create(Phaser.Group.prototype);
Map.prototype.constructor = Map;

module.exports = Map;  