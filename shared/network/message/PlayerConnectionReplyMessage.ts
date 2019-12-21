import MessageType, { ClientMessage } from "../message/MessageType";
import NetworkMessage from "../message/NetworkMessage";

class PlayerConnectionReplyMessage extends NetworkMessage {

  readonly payload: {
    playerId: string,
  };

  private constructor(playerId: string) {
    super(MessageType.PlayerConnectionReply);
    this.payload = { playerId };
  }

  static create(playerId: string) {
    return new PlayerConnectionReplyMessage(playerId);
  }

  encode = () => {
    return JSON.stringify(this);
  }
}

export default PlayerConnectionReplyMessage;