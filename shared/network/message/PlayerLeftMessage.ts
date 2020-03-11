import MessageType from "./MessageType";
import NetworkMessage from "./NetworkMessage";

class PlayerLeftMessage extends NetworkMessage {
  readonly payload: {
    playerId: string | number;
  };

  private constructor(playerId: string | number) {
    super(MessageType.PlayerLeft);
    this.payload = { playerId };
  }

  static create(playerId: string | number) {
    return new PlayerLeftMessage(playerId);
  }

  encode = () => {
    return JSON.stringify(this);
  };
}
export default PlayerLeftMessage;
