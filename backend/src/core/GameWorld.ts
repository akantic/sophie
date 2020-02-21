import Matter, { Body } from "matter-js";
import Game from "./Game";
import Player from "../models/Player";
import GameObject from "../models/GameObject";

class GameWorld {
  private readonly _players: { [key: string]: Player };

  private _playersIterable: Player[];

  get playersI(): Player[] {
    return this._playersIterable;
  }

  constructor() {
    this._players = {};
    this._playersIterable = [];

    // const topWall = Bodies.rectangle(0, 300, 600, 20, { isStatic: true });
    // const leftWall = Bodies.rectangle(-300, 0, 20, 600, { isStatic: true });
    // const rightWall = Bodies.rectangle(300, 0, 20, 600, { isStatic: true });
    // const bottomWall = Bodies.rectangle(0, -300, 600, 20, { isStatic: true });

    // World.add(Game.world, [topWall, leftWall, rightWall, bottomWall]);
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
