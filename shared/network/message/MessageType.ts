import NetworkMessage from "./NetworkMessage";

enum MessageType {
  PlayerConnectionReply,
  PlayerJoined,
  PlayerLeft,
  ProjectileSpawned,
  InputStatusUpdate,
  WorldStatusUpdate
}

export interface ClientMessage extends NetworkMessage {
  playerId: null | string;
}

export function isClientMessage(msg: NetworkMessage) {
  return (msg as ClientMessage).playerId !== undefined;
}

export default MessageType;
