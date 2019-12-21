import MessageType, { ClientMessage } from "../message/MessageType";
import NetworkMessage from "../message/NetworkMessage";

type WorldStatus = {
  players: 
    { id: string }[]
}

class PlayerConnectionReplyMessage extends NetworkMessage {

  readonly payload: {
    playerId: string,
    worldStatus: WorldStatus,
  };

  private constructor(playerId: string, worldStatus: WorldStatus) {
    super(MessageType.PlayerConnectionReply);
    this.payload = { playerId, worldStatus };
  }

  static create(playerId: string, worldStatus: WorldStatus) {
    return new PlayerConnectionReplyMessage(playerId, worldStatus);
  }

  encode = () => {
    return JSON.stringify(this);
  }
}

export default PlayerConnectionReplyMessage;