import Matter, { World, Body, Bodies } from "matter-js";
import Game from "./Game";
import Player from "../models/Player";
import GameObject from "../models/GameObject";
import { WORLD_WIDTH, WORLD_HEIGHT, BOUND_SIZE } from "../consts";

class GameWorld {
  private readonly _players: { [key: string]: Player };

  private _playersIterable: Player[];

  get playersI(): Player[] {
    return this._playersIterable;
  }

  constructor() {
    this._players = {};
    this._playersIterable = [];

    const topWall = Bodies.rectangle(
      WORLD_WIDTH / 2,
      0,
      WORLD_WIDTH,
      BOUND_SIZE,
      {
        isStatic: true
      }
    );
    const bottomWall = Bodies.rectangle(
      WORLD_WIDTH / 2,
      WORLD_HEIGHT,
      WORLD_WIDTH,
      BOUND_SIZE,
      { isStatic: true }
    );
    const leftWall = Bodies.rectangle(
      0,
      WORLD_HEIGHT / 2,
      BOUND_SIZE,
      WORLD_HEIGHT,
      {
        isStatic: true
      }
    );
    const rightWall = Bodies.rectangle(
      WORLD_WIDTH,
      WORLD_HEIGHT / 2,
      BOUND_SIZE,
      WORLD_HEIGHT,
      { isStatic: true }
    );

    World.add(Game.get().world, [topWall, bottomWall, leftWall, rightWall]);
  }

  addBody = (body: Body) => {
    Game.get().world.bodies.push(body);
  };

  addPlayer = (player: Player) => {
    this.addBody(player.body);
    this._players[player.id] = player;
    this._playersIterable = Object.values(this._players);
  };

  removePlayer = (playerId: string) => {
    this.destroy(this._players[playerId]);
    delete this._players[playerId];
    this._playersIterable = Object.values(this._players);
  };

  getPlayer = (playerId: string) => {
    return this._players[playerId];
  };

  destroy = (gameObject: GameObject) => {
    Matter.Composite.remove(Game.get().world, gameObject.body);
  };
}

export default new GameWorld();
