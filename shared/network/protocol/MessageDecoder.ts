import NetworkMessage from "../message/NetworkMessage";
import MessageType from "../message/MessageType";

type MessageHandlers = {
  [key in MessageType]?: (message: NetworkMessage) => void;
};

class MessageDecoder {
  private readonly handlers: MessageHandlers;

  constructor(handlers: MessageHandlers) {
    this.handlers = handlers;
  }

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
