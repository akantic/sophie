import MessageType from "../message/MessageType";
import NetworkMessage from "../message/NetworkMessage";

class PlayerLeftMessage extends NetworkMessage {
    
  readonly payload: {
    playerId: string,
  };

  private constructor(playerId: string) {
    super(MessageType.PlayerLeft);
    this.payload = { playerId };
  }

  static create(playerId: string) {
    return new PlayerLeftMessage(playerId);
  }

  encode = () => {
    return JSON.stringify(this);
  }
}
export default PlayerLeftMessage;