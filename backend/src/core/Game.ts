import { Engine, Bodies, World } from "matter-js";
import { WorldStatusUpdateMessage } from "@sophie/shared";

import { GAME_UPDATE_RATE, NETWORK_UPDATE_RATE } from "../consts";
import Player from "../models/Player";
import GameWorld from "./GameWorld";
import NetworkServer from "../network/NetworkServer";

class Game {

  private static readonly DELTA = 1000 / GAME_UPDATE_RATE;

  private static readonly NETWORK_DELTA = 1000 / NETWORK_UPDATE_RATE;
  
  private readonly _engine: Engine; 

  get world(): World {
    return this._engine.world;
  } 

  private _gameIntervalId: NodeJS.Timeout;

  private _networkIntervalId: NodeJS.Timeout;

  constructor() {
    this._engine = Engine.create();
    this._engine.world.gravity.y = 0
  }

  private update = () => {
    Engine.update(this._engine, Game.DELTA);
  }

  private networkUpdate = () => {
    if (GameWorld.playersI.length > 0) {
      const playersWorldStatus = GameWorld.playersI.map(p => ({ playerId: p.id, position: p.body.position, rotation: p.body.angle }));
      NetworkServer.get().broadcast(WorldStatusUpdateMessage.create(playersWorldStatus));
    }
  }

  start = () => {
    this._gameIntervalId = setInterval(this.update, Game.DELTA); 
    this._networkIntervalId = setInterval(this.networkUpdate, Game.NETWORK_DELTA);
  }

  stop = () => {
    clearInterval(this._gameIntervalId);
    clearInterval(this._networkIntervalId);
  }
}

export default new Game();