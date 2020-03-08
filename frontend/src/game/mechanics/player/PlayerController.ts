import { InputStatusUpdateMessage } from "@sophie/shared";

import Player from "../../models/Player";
import NetworkClient from "../../network/NetworkClient";

class PlayerController {
  private readonly player: Player;

  private readonly keyState: { [key: string]: boolean };

  mouseDown: boolean;

  constructor(document: Document, player: Player) {
    this.player = player;
    this.keyState = {};
    this.mouseDown = false;
    // eslint-disable-next-line no-param-reassign
    document.onkeydown = this.keyDown.bind(this);
    // eslint-disable-next-line no-param-reassign
    document.onkeyup = this.keyUp.bind(this);
  }

  keyDown(e: KeyboardEvent) {
    this.keyState[e.key] = true;
  }

  keyUp(e: KeyboardEvent) {
    this.keyState[e.key] = false;
  }

  shoot() {
    this.mouseDown = true;
  }

  movement() {
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

    NetworkClient.get().send(
      InputStatusUpdateMessage.create(
        direction,
        this.player.rotation,
        this.mouseDown
      )
    );
  }
}

export default PlayerController;
