import Matter, { Engine, World, IPair, IEventCollision } from "matter-js";
import { WorldStatusUpdateMessage } from "@sophie/shared";

import { GAME_UPDATE_RATE, NETWORK_UPDATE_RATE } from "../consts";
import GameWorld from "./GameWorld";
import NetworkServer from "../network/NetworkServer";
import CollisionResolver from "./collision/CollisionResolver";

class GameLoop {
  static instance: GameLoop;

  static get = (): GameLoop => {
    if (!GameLoop.instance) {
      GameLoop.instance = new GameLoop();
    }
    return GameLoop.instance;
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

  private _gameIntervalId: NodeJS.Timeout;

  private _networkIntervalId: NodeJS.Timeout;

  private constructor() {
    this._engine = Engine.create();
    this._engine.world.gravity.y = 0;
    GameWorld.create(this._engine.world);

    Matter.Events.on(
      this._engine,
      "collisionStart",
      (event: IEventCollision<Engine>) => {
        event.pairs.forEach((pair: IPair) => {
          CollisionResolver.resolve(pair);
        });
      }
    );
  }

  private update = () => {
    Engine.update(this._engine, GameLoop.DELTA);
  };

  // TODO: Remove this from here
  private networkUpdate = () => {
    const gw = GameWorld.get();
    if (gw.syncedObjects.length > 0) {
      const playersWorldStatus = gw.syncedObjects.map(id => ({
        playerId: id,
        position: gw.gameObjects[id].body.position,
        rotation: gw.gameObjects[id].body.angle
      }));
      NetworkServer.get().broadcast(
        WorldStatusUpdateMessage.create(playersWorldStatus)
      );
    }
  };

  start = () => {
    this._gameIntervalId = setInterval(this.update, GameLoop.DELTA);
    this._networkIntervalId = setInterval(
      this.networkUpdate,
      GameLoop.NETWORK_DELTA
    );
  };

  stop = () => {
    clearInterval(this._gameIntervalId);
    clearInterval(this._networkIntervalId);
  };
}

export default GameLoop;
