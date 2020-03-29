import NetworkMessage from "../message/NetworkMessage";
import MessageType from "../message/MessageType";

export type MessageHandlers = {
  [key in MessageType]?: (message: NetworkMessage) => void;
};

class MessageDecoder {
  private readonly handlers: MessageHandlers;

  private constructor(handlers: MessageHandlers) {
    this.handlers = handlers;
  }

  static from = (handlers: MessageHandlers) => {
    return new MessageDecoder(handlers);
  };

  stringMessageHandler = (e: MessageEvent) => {
    const message = JSON.parse(e.data) as NetworkMessage;
    this.handlers[message.type](message);
  };

  binaryMessageHandler = (): any => {
    // TODO?
    return null;
  };

  processMessage = (e: MessageEvent) => {
    if (e.data instanceof ArrayBuffer) {
      this.binaryMessageHandler();
    } else if (typeof e.data === "string") {
      this.stringMessageHandler(e);
    }
  };
}

export default MessageDecoder;
