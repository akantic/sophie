import * as PIXI from 'pixi.js'
import background from "./sprites/grass_background_1.jpg";
import circle from "./sprites/circle.png";
import Player from "./models/Player";
import PlayerController from "./mechanics/player/PlayerController";
import GameWorld from "./models/GameWorld";

const app = new PIXI.Application({
    width: 800, height: 600, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
});

const gameWorld = new GameWorld({
    screenWidth: app.view.width,
    screenHeight: app.view.height,
}, app.ticker);

app.stage.addChild(gameWorld)

export const canvas = app.view;