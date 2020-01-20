import { Vector } from "matter-js";

import MessageType, { ClientMessage } from "../message/MessageType";
import NetworkMessage from "../message/NetworkMessage";

class InputStatusUpdateMessage extends NetworkMessage implements ClientMessage {

  playerId = null;

  readonly payload: {
    direction: Vector,
    rotation: number,
    mouseDown: boolean,
  };

  private constructor(direction: Vector, rotation: number, mouseDown: boolean) {
    super(MessageType.InputStatusUpdate);
    this.payload = { direction, rotation, mouseDown };
  }

  static create(direction: Vector, rotation: number, mouseDown: boolean) {
    return new InputStatusUpdateMessage(direction, rotation, mouseDown);
  }

  encode = () => {
    return JSON.stringify(this);
  }
}

export default InputStatusUpdateMessage;