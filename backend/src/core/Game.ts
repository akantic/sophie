import { Engine, World } from "matter-js";

import { GAME_UPDATE_RATE } from "../consts";

class Game {

  private static readonly DELTA = 1000 / GAME_UPDATE_RATE;
  
  private readonly _engine: Engine; 

  // get world(): World {
  //   return this._engine.world;
  // } 

  private _intervalId: NodeJS.Timeout;

  constructor() {
    this._engine = Engine.create();
    console.log("OPPAA");
  }

  private update = () => {
    Engine.update(this._engine, Game.DELTA);
  }

  start = () => {
    this._intervalId = setInterval(this.update, Game.DELTA); 
  }

  stop = () => {
    clearInterval(this._intervalId);
  }
}

export default new Game();