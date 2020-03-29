import Matter, { Engine, World, IPair, IEventCollision } from "matter-js";

import { GAME_UPDATE_RATE } from "../consts";
import GameWorld from "./world/GameWorld";
import WebSocketServer from "../network/WebSocketServer";
import CollisionResolver from "./collision/CollisionResolver";
import GameWorldController from "./world/GameWorldController";

class GameLoop {
  static instance: GameLoop;

  static get = (): GameLoop => {
    if (!GameLoop.instance) {
      GameLoop.instance = new GameLoop();
    }
    return GameLoop.instance;
  };

  private static readonly DELTA = 1000 / GAME_UPDATE_RATE;

  readonly engine: Engine;

  private gameIntervalId: NodeJS.Timeout;

  private networkIntervalId: NodeJS.Timeout;

  private constructor() {
    this.engine = Engine.create();
    this.engine.world.gravity.y = 0;

    const networkServer = new WebSocketServer(8080);
    const gameWorld = GameWorld.create(this.engine.world);
    GameWorldController.create(gameWorld, networkServer);

    Matter.Events.on(
      this.engine,
      "collisionStart",
      (event: IEventCollision<Engine>) => {
        event.pairs.forEach((pair: IPair) => {
          CollisionResolver.resolve(pair);
        });
      }
    );
  }

  private update = () => {
    Engine.update(this.engine, GameLoop.DELTA);
  };

  start = () => {
    this.gameIntervalId = setInterval(this.update, GameLoop.DELTA);
  };

  stop = () => {
    clearInterval(this.gameIntervalId);
    clearInterval(this.networkIntervalId);
  };
}

export default GameLoop;
