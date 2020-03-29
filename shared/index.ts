import { ClientMessage as CM } from "./network/message/MessageType";

export type ClientMessage = CM;

export { default as InputStatusUpdateMessage } from "./network/message/InputStatusUpdateMessage";
export { default as WorldStatusUpdateMessage } from "./network/message/WorldStatusUpdateMessage";
export {
  default as PlayerConnectionReplyMessage,
  WorldStatus,
  EngineConfig,
  WorldSize
} from "./network/message/PlayerConnectionReplyMessage";
export { default as PlayerJoinedMessage } from "./network/message/PlayerJoinedMessage";
export { default as PlayerLeftMessage } from "./network/message/PlayerLeftMessage";
export { default as ProjectileSpawnedMessage } from "./network/message/ProjectileSpawnedMessage";
export { default as GameObjectDestroyedMessage } from "./network/message/GameObjectDestroyedMessage";

export { default as NetworkMessage } from "./network/message/NetworkMessage";
export { default as MessageType } from "./network/message/MessageType";
export {
  default as MessageDecoder,
  MessageHandlers
} from "./network/protocol/MessageDecoder";

export { Label } from "./game/labels";
