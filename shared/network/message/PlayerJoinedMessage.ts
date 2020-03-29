import MessageType from "./MessageType";
import NetworkMessage from "./NetworkMessage";

class PlayerJoinedMessage extends NetworkMessage {
  readonly payload: {
    playerId: string;
  };

  private constructor(playerId: string) {
    super(MessageType.PlayerJoined);
    this.payload = { playerId };
  }

  static create(playerId: string) {
    return new PlayerJoinedMessage(playerId);
  }

  encode = () => {
    return JSON.stringify(this);
  };
}
export default PlayerJoinedMessage;
