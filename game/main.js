'use strict';

//var fun4 = null; wont collect this variable, but is this variable just a small reference?


window.onload = function () {

    var width = window.innerWidth * window.devicePixelRatio;
    var height = window.innerHeight * window.devicePixelRatio;

    if (window.devicePixelRatio == 1)
        var game = new Phaser.Game(960, 640, Phaser.WEB_GL, '');
    else
        var game = new Phaser.Game(width / (window.devicePixelRatio - 1), height / (window.devicePixelRatio - 1), Phaser.WEB_GL, '');

    // Game States
    game.state.add('Boot', require('./states/Boot'));
    game.state.add('Preloader', require('./states/Preloader'));
    //game.state.add('Transition', require('./misc/Transition'));
    //game.state.add('MainMenuState', require('./states/MainMenuState'));
    //game.state.add('CharacterMenuState', require('./states/CharacterMenuState'));
    //game.state.add('MapState', require('./states/MapState'));
    game.state.add('GameState', require('./states/GameState'));
    game.state.add('BattleState', require('./states/BattleState'));

    game.state.start('Boot', true, false);
};

