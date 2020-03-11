import { Vector } from "matter-js";

import { Label } from "../../game/labels";
import MessageType from "./MessageType";
import NetworkMessage from "./NetworkMessage";

class GameObjectDestroyedMessage extends NetworkMessage {
  readonly payload: {
    id: string | number;
    label: Label;
    position: Vector;
  };

  private constructor(id: string | number, label: Label, position: Vector) {
    super(MessageType.GameObjectDestroyedMessage);
    this.payload = {
      id,
      label,
      position
    };
  }

  static create(id: string | number, label: Label, position: Vector) {
    return new GameObjectDestroyedMessage(id, label, position);
  }

  encode = () => {
    return JSON.stringify(this);
  };
}
export default GameObjectDestroyedMessage;
