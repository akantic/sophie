import {
  NetworkMessage,
  MessageType,
  MessageDecoder,
  ClientMessage
} from "@sophie/shared";
import worldStatusUpdateHandler from "./message/handlers/worldStatusUpdateHandler";
import playerConnectionReplyHandler from "./message/handlers/playerConnectionReplyHandler";
import playerJoinedHandler from "./message/handlers/playerJoinedHandler";
import playerLeftHandler from "./message/handlers/playerLeftHandler";
import projectileSpawnedHandler from "./message/handlers/projectileSpawnedHandler";
import gameObjectDestroyedHandler from "./message/handlers/gameObjectDestroyedHandler";
import GameWorld from "../models/GameWorld";

class NetworkClient {
  private static instance: NetworkClient;

  private readonly socket: WebSocket;

  static create = () => {
    NetworkClient.instance = new NetworkClient();
    return NetworkClient.instance;
  };

  static get = () => {
    return NetworkClient.instance;
  };

  private constructor() {
    this.socket = new WebSocket("ws://localhost:8080");

    const handlers = {
      [MessageType.WorldStatusUpdate]: worldStatusUpdateHandler,
      [MessageType.PlayerJoined]: playerJoinedHandler,
      [MessageType.PlayerLeft]: playerLeftHandler,
      [MessageType.PlayerConnectionReply]: playerConnectionReplyHandler,
      [MessageType.ProjectileSpawned]: projectileSpawnedHandler,
      [MessageType.GameObjectDestroyedMessage]: gameObjectDestroyedHandler
    };

    const messageDecoder = new MessageDecoder(handlers);

    this.socket.onopen = () => {
      console.log("Connected!");
    };

    this.socket.onmessage = messageDecoder.processMessage;
  }

  send = (message: NetworkMessage) => {
    (message as ClientMessage).playerId = GameWorld.get().user.id;

    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message.encode());
    }
  };
}

export default NetworkClient;
