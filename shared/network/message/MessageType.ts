import NetworkMessage from "./NetworkMessage";

enum MessageType {
  InputStatusUpdate,
  WorldStatusUpdate,
}

export interface ClientMessage extends NetworkMessage  {
  playerId: null | string;
}

export function isClientMessage(msg: NetworkMessage) {
  return (msg as ClientMessage).playerId !== undefined;
}

export default MessageType;