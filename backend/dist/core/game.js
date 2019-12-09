"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const matter_js_1 = require("matter-js");
const consts_1 = require("../consts");
class Game {
    constructor() {
        this.update = () => {
            matter_js_1.Engine.update(this._engine, Game.DELTA);
        };
        this.start = () => {
            this._intervalId = setInterval(this.update, Game.DELTA);
        };
        this.stop = () => {
            clearInterval(this._intervalId);
        };
        this._engine = matter_js_1.Engine.create();
        console.log("OPPAA");
    }
}
Game.DELTA = 1000 / consts_1.GAME_UPDATE_RATE;
exports.default = new Game();
//# sourceMappingURL=game.js.map