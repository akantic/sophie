import MessageType from "./MessageType";
import NetworkMessage from "./NetworkMessage";

export type WorldStatus = {
  players: { id: string }[];
};

export type EngineConfig = {
  updateRate: number;
  networkUpdateRate: number;
};

class PlayerConnectionReplyMessage extends NetworkMessage {
  readonly payload: {
    playerId: string;
    engineConfig: EngineConfig;
    worldStatus: WorldStatus;
  };

  private constructor(
    playerId: string,
    engineConfig: EngineConfig,
    worldStatus: WorldStatus
  ) {
    super(MessageType.PlayerConnectionReply);
    this.payload = { playerId, engineConfig, worldStatus };
  }

  static create(
    playerId: string,
    engineConfig: EngineConfig,
    worldStatus: WorldStatus
  ) {
    return new PlayerConnectionReplyMessage(
      playerId,
      engineConfig,
      worldStatus
    );
  }

  encode = () => {
    return JSON.stringify(this);
  };
}

export default PlayerConnectionReplyMessage;
