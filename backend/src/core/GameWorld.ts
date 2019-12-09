import Game from "./Game";
import Player from "../models/Player";

class GameWorld {
  
  private readonly _players: { [key: string]: Player };  

  private _playersIterable: Player[];

  constructor() {
    this._players = {};
  }

  addPlayer = (player: Player) => {
    this._players[player.id] = player;
    this._playersIterable = Object.values(this._players);
  }

  removePlayer = (playerId: string) => {
    delete this._players[playerId];
    this._playersIterable = Object.values(this._players);
  }

}

export default new GameWorld();