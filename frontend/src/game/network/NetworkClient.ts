import { NetworkMessage, MessageType, MessageDecoder, ClientMessage } from "@sophie/shared";
import worldStatusUpdateHandler from "./message/handlers/worldStatusUpdateHandler";

class NetworkClient {

  private readonly socket: WebSocket;

  constructor() {
    this.socket = new WebSocket("ws://localhost:8080");

    const handlers = {
      [MessageType.WorldStatusUpdate]: worldStatusUpdateHandler
    }
    
    const messageDecoder = new MessageDecoder(handlers);

    this.socket.onopen = function(event) {
      console.log("Connected!");
    }

    this.socket.onmessage = messageDecoder.processMessage;
  }

  send = (message: NetworkMessage) => {
    (message as ClientMessage).playerId = "JURE";

    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message.encode());
    }
  }
}


export const networkClient = new NetworkClient();