import Matter, { Engine, World, IPair, IEventCollision } from "matter-js";
import {
  WorldStatusUpdateMessage,
  EngineConfig,
  WorldStatus
} from "@sophie/shared";

import { GAME_UPDATE_RATE, NETWORK_UPDATE_RATE } from "../consts";
import GameWorld from "./GameWorld";
import NetworkServer from "../network/NetworkServer";

class Game {
  static instance: Game;

  static get = (): Game => {
    if (!Game.instance) {
      Game.instance = new Game();
    }
    return Game.instance;
  };

  private static readonly DELTA = 1000 / GAME_UPDATE_RATE;

  private static readonly NETWORK_DELTA = 1000 / NETWORK_UPDATE_RATE;

  private readonly _engine: Engine;

  get world(): World {
    return this._engine.world;
  }

  get engine(): Engine {
    return this._engine;
  }

  // eslint-disable-next-line class-methods-use-this
  get worldStatus(): WorldStatus {
    return {
      players: GameWorld.playersI.map(p => ({ id: p.id }))
    };
  }

  // eslint-disable-next-line class-methods-use-this
  get engineConfig(): EngineConfig {
    return {
      updateRate: GAME_UPDATE_RATE,
      networkUpdateRate: NETWORK_UPDATE_RATE
    };
  }

  private _gameIntervalId: NodeJS.Timeout;

  private _networkIntervalId: NodeJS.Timeout;

  private constructor() {
    this._engine = Engine.create();
    this._engine.world.gravity.y = 0;

    Matter.Events.on(
      this._engine,
      "collisionStart",
      (event: IEventCollision<Engine>) => {
        event.pairs.forEach((pair: IPair) => {
          Matter.Events.trigger(pair.bodyA, "collisionStart", pair as any);
          Matter.Events.trigger(pair.bodyB, "collisionStart", pair as any);
        });
      }
    );
  }

  private update = () => {
    Engine.update(this._engine, Game.DELTA);
  };

  private networkUpdate = () => {
    if (GameWorld.playersI.length > 0) {
      const playersWorldStatus = GameWorld.playersI.map(p => ({
        playerId: p.id,
        position: p.body.position,
        rotation: p.body.angle
      }));
      NetworkServer.get().broadcast(
        WorldStatusUpdateMessage.create(playersWorldStatus)
      );
    }
  };

  start = () => {
    this._gameIntervalId = setInterval(this.update, Game.DELTA);
    this._networkIntervalId = setInterval(
      this.networkUpdate,
      Game.NETWORK_DELTA
    );
  };

  stop = () => {
    clearInterval(this._gameIntervalId);
    clearInterval(this._networkIntervalId);
  };
}

export default Game;
