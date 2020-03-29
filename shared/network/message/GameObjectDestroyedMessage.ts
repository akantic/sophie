import { Vector } from "matter-js";

import { Label } from "../../game/labels";
import MessageType from "./MessageType";
import NetworkMessage from "./NetworkMessage";

type Payload = { id: string; label: Label; position: Vector };

class GameObjectDestroyedMessage extends NetworkMessage {
  readonly payload: Payload;

  private constructor(payload: Payload) {
    super(MessageType.GameObjectDestroyedMessage);
    this.payload = payload;
  }

  static create(payload: Payload) {
    return new GameObjectDestroyedMessage(payload);
  }

  encode = () => {
    return JSON.stringify(this);
  };
}
export default GameObjectDestroyedMessage;
