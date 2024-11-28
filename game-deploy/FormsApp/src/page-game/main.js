import Phaser from 'phaser';
import Game from './scenes/game'

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT,
        width: 1920,
        height: 1000
    },
    scene: [
        Game
    ],
    backgroundColor: '#FFFFFF',
};

const game = new Phaser.Game(config);