import { NetworkMessage, MessageType, MessageDecoder, ClientMessage } from "@sophie/shared";
import worldStatusUpdateHandler from "./message/handlers/worldStatusUpdateHandler";
import playerConnectionReplyHandler from "./message/handlers/playerConnectionReplyHandler";
import playerJoinedHandler from "./message/handlers/playerJoinedHandler";
import playerLeftHandler from "./message/handlers/playerLeftHandler";
import GameWorld from "../models/GameWorld";

class NetworkClient {

  private readonly socket: WebSocket;

  constructor() {
    this.socket = new WebSocket("ws://192.168.100.7:8080");

    const handlers = {
      [MessageType.WorldStatusUpdate]: worldStatusUpdateHandler,
      [MessageType.PlayerJoined]: playerJoinedHandler,
      [MessageType.PlayerLeft]: playerLeftHandler,
      [MessageType.PlayerConnectionReply]: playerConnectionReplyHandler,
    }
    
    const messageDecoder = new MessageDecoder(handlers);

    this.socket.onopen = function(event) {
      console.log("Connected!");
    }

    this.socket.onmessage = messageDecoder.processMessage;
  }

  send = (message: NetworkMessage) => {
    (message as ClientMessage).playerId = GameWorld.get().user.id;;

    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message.encode());
    }
  }
}


export const networkClient = new NetworkClient();