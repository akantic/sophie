import { Vector } from "matter-js";

import MessageType, { ClientMessage } from "../message/MessageType";
import NetworkMessage from "../message/NetworkMessage";

class InputStatusUpdateMessage extends NetworkMessage implements ClientMessage {

  playerId = null;

  readonly payload: Vector;

  constructor(payload: Vector) {
    super(MessageType.InputStatusUpdate);
    this.payload = payload;
  }

  static create(direction: Vector) {
    return new InputStatusUpdateMessage(direction);
  }

  encode = () => {
    return JSON.stringify(this);
  }
}

export default InputStatusUpdateMessage;