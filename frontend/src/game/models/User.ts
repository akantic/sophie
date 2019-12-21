import Player from "./Player";
import PlayerController from "../mechanics/player/PlayerController"

class User extends Player {

  private _playerController: PlayerController;

  get playerController(): PlayerController {
    return this._playerController;
  }

  constructor(id: string) {
    super(id);
    this.tint = 0x00ff00
    this._playerController = new PlayerController(document, this);
  }
} 

export default User;