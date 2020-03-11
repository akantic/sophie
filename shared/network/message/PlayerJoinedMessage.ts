import MessageType from "./MessageType";
import NetworkMessage from "./NetworkMessage";

class PlayerJoinedMessage extends NetworkMessage {
  readonly payload: {
    playerId: string | number;
  };

  private constructor(playerId: string | number) {
    super(MessageType.PlayerJoined);
    this.payload = { playerId };
  }

  static create(playerId: string | number) {
    return new PlayerJoinedMessage(playerId);
  }

  encode = () => {
    return JSON.stringify(this);
  };
}
export default PlayerJoinedMessage;
