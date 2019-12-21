import { Body, Vector } from "matter-js";

import { PLAYER_MOVEMENT_SPEED } from "../consts";

class Player {

  id : string;

  body: Body;

  socket: WebSocket;

  private constructor(socket: WebSocket){
    this.id = Math.round((Math.random() * 36 ** 12)).toString(36);
    this.socket = socket;
  }

  move = (direction: Vector) => {
    Body.setVelocity(this.body, Vector.mult(direction, PLAYER_MOVEMENT_SPEED));
  }

  setRotation = (rotation: number) => { 
    Body.setAngle(this.body, rotation);
  }

  static create(socket: WebSocket) {
    return new Player(socket);
  }
}

export default Player;