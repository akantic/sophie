import { Vector } from "matter-js";

import MessageType from "../message/MessageType";
import NetworkMessage from "../message/NetworkMessage";

interface PlayerPosition {
  playerId: string,
  position: Vector,
}
class WorldStatusUpdateMessage extends NetworkMessage {
  
  readonly payload: PlayerPosition[];
  
  constructor(payload: PlayerPosition[]) {
    super(MessageType.WorldStatusUpdate);
    this.payload = payload;
  }

  static create(payload: PlayerPosition[]) {
    return new WorldStatusUpdateMessage(payload);
  }

  encode = () => {
    return JSON.stringify(this);
  }
}

export default WorldStatusUpdateMessage;