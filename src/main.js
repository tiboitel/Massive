import Phaser from 'phaser';
import GameScene from './scene/gameScene.js'

import { GAME_WIDTH, GAME_HEIGHT} from "./config/constants.js";

const config = {
    type: Phaser.AUTO,
    parent: 'massive-game',
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false
      }
    },
    fps: { target: 60, min: 24 },
    scene: GameScene
};

let game = new Phaser.Game(config);

