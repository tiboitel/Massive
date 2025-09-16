import Phaser from 'phaser';
import GameScene from './scene/gameScene.js'

const config = {
    type: Phaser.AUTO,
    parent: 'massive-game',
    width: 320,
    height: 480,
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

