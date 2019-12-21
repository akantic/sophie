import { Vector } from "matter-js";

import MessageType from "../message/MessageType";
import NetworkMessage from "../message/NetworkMessage";

interface PlayerStatus {
  playerId: string,
  position: Vector,
  rotation: number,
}
class WorldStatusUpdateMessage extends NetworkMessage {
  
  readonly payload: PlayerStatus[];
  
  private constructor(payload: PlayerStatus[]) {
    super(MessageType.WorldStatusUpdate);
    this.payload = payload;
  }

  static create(payload: PlayerStatus[]) {
    return new WorldStatusUpdateMessage(payload);
  }

  encode = () => {
    return JSON.stringify(this);
  }
}

export default WorldStatusUpdateMessage;