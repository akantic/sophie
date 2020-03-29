import { Vector } from "matter-js";

import { Label } from "../../game/labels";
import MessageType from "./MessageType";
import NetworkMessage from "./NetworkMessage";

type Payload = {
  objectId: string;
  label: Label;
  position: Vector;
  rotation: number;
  velocity: Vector;
};

class GameObjectSpawnedMessage extends NetworkMessage {
  readonly payload: Payload;

  private constructor(payload: Payload) {
    super(MessageType.GameObjectSpawnedMessage);
    this.payload = payload;
  }

  static create(payload: Payload) {
    return new GameObjectSpawnedMessage(payload);
  }

  encode = () => {
    return JSON.stringify(this);
  };
}
export default GameObjectSpawnedMessage;
