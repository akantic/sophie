import { Vector } from "matter-js";

import MessageType, { ClientMessage } from "../message/MessageType";
import NetworkMessage from "../message/NetworkMessage";

class InputStatusUpdateMessage extends NetworkMessage implements ClientMessage {

  playerId = null;

  readonly payload: {
    direction: Vector,
    rotation: number,
  };

  constructor(direction: Vector, rotation: number) {
    super(MessageType.InputStatusUpdate);
    this.payload = { direction, rotation };
  }

  static create(direction: Vector, rotation: number) {
    return new InputStatusUpdateMessage(direction, rotation);
  }

  encode = () => {
    return JSON.stringify(this);
  }
}

export default InputStatusUpdateMessage;