import * as PIXI from 'pixi.js'

import GameWorld from "./models/GameWorld";

const app = new PIXI.Application({
    width: 800, height: 600, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
});

const gameWorld = GameWorld.create({
    screenWidth: app.view.width,
    screenHeight: app.view.height,
}, app.ticker);

app.stage.addChild(gameWorld)

export const canvas = app.view;