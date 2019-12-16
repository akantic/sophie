import MessageType from "./MessageType";

abstract class NetworkMessage {
  readonly type: MessageType;

  readonly payload: any;

  abstract encode: () => any;

  constructor(type: MessageType) {
    this.type = type;
  }
}

export default NetworkMessage;