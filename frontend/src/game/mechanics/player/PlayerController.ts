import Player from "../../models/Player";
import { networkClient } from "../../network/NetworkClient";
import { InputStatusUpdateMessage } from "@sophie/shared"; 

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
    console.log("!!! KAA  BOOM !!!");
  }

  movement(delta: number){
    const direction = { x: 0, y: 0 };

    if (this.keyState.w) {
      // this.player.position.y -= PLAYER_SPEED * delta;
      direction.y -= 1;
    }
    if (this.keyState.a) {
      // this.player.position.x -= PLAYER_SPEED * delta;
      direction.x -= 1;
    }
    if (this.keyState.s) {
      // this.player.position.y += PLAYER_SPEED * delta;
      direction.y += 1;
    }
    if (this.keyState.d) {
      // this.player.position.x += PLAYER_SPEED * delta;
      direction.x += 1;
    }

    networkClient.send(InputStatusUpdateMessage.create(direction, this.player.rotation));
  }
}

export default PlayerController;