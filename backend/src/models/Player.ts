import { Body, Vector } from "matter-js";

import { PLAYER_MOVEMENT_SPEED } from "../consts";

class Player {

  id : string;

  body: Body;

  socket: WebSocket;

  constructor(socket: WebSocket){
    this.id = "JURE";
    this.socket = socket;
  }

  move = (direction: Vector) => {
    Body.setVelocity(this.body, Vector.mult(direction, PLAYER_MOVEMENT_SPEED));
  }
}

export default Player;