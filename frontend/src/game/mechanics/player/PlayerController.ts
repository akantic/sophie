
import Player from "../../models/Player";
import { PLAYER_SPEED } from "../../consts";
import { networkClient } from "../../network/NetworkClient";

class PlayerController {
  
  private readonly player: Player;

  private readonly keyState: { [key: string]: boolean };

  constructor(document: Document, player: Player) {
    this.player = player;
    this.keyState = {};
    document.onkeydown = this.keyDown.bind(this);
    document.onkeyup = this.keyUp.bind(this);
  }

  keyDown(e: KeyboardEvent) {    
    this.keyState[e.key] = true;
  }

  keyUp(e: KeyboardEvent) {
    this.keyState[e.key] = false;
  }

  shoot() {
    networkClient.send("BOOM HEADSHOT");
  }

  movement(delta: number){
    if (this.keyState.w) {
      this.player.position.y -= PLAYER_SPEED * delta;
    }
    if (this.keyState.a) {
      this.player.position.x -= PLAYER_SPEED * delta;
    }
    if (this.keyState.s) {
      this.player.position.y += PLAYER_SPEED * delta;
    }
    if (this.keyState.d) {
      this.player.position.x += PLAYER_SPEED * delta;
    }
  }
}

export default PlayerController;