import * as PIXI from 'pixi.js'
import background from "./sprites/grass_background_1.jpg";
import circle from "./sprites/circle.png";

const app = new PIXI.Application({
    width: 800, height: 600, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
});

const globalContainer = new PIXI.Container();
const localContainer = new PIXI.Container();

app.stage.addChild(globalContainer);
app.stage.addChild(localContainer);

const backgroundTexture = PIXI.Texture.from(circle);
const playerTexture = PIXI.Texture.from(circle);

const backgroundSprite = new PIXI.Sprite(backgroundTexture); 
const player = new PIXI.Sprite(playerTexture);
player.pivot.x = player.width / 2;
player.pivot.y = player.height / 2;

globalContainer.addChild(backgroundSprite);

player.scale = new PIXI.Point(0.1, 0.1);
localContainer.addChild(player);
globalContainer.addChild(localContainer);

localContainer.pivot.x = localContainer.width;
localContainer.pivot.y = localContainer.height;

console.log(globalContainer.height, globalContainer.width);
console.log(localContainer.height, localContainer.width);
console.log(player.transform.pivot);
// globalContainer.x = 0.5 * (globalContainer.width - app.screen.width)
// globalContainer.y = 0.5 * (globalContainer.height - app.screen.height);

// Listen for animate update
app.ticker.add((delta) => {
    // rotate the container!
    // use delta to create frame-independent transform
    player.x -= 0.1 * delta;
});


export const canvas = app.view;