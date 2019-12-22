import { Bodies, World } from "matter-js";
import Game from "./Game";
import Player from "../models/Player";

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

  addPlayer = (player: Player) => {
    const body = Bodies.circle(0, 0, 20);
    body.friction = 0;
    body.frictionStatic = 0;
    body.frictionAir = 0.5;
    Game.world.bodies.push(body);
    player.body = body;
    this._players[player.id] = player;
    this._playersIterable = Object.values(this._players);
  }

  removePlayer = (playerId: string) => {
    delete this._players[playerId];
    this._playersIterable = Object.values(this._players);
  }

  getPlayer = (playerId: string) => {
    return this._players[playerId];
  }
}

export default new GameWorld();