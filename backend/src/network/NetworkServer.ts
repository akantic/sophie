import * as WebSocket from "ws";
import { NetworkMessage } from "@sophie/shared";
import Player from "../models/Player";

class NetworkServer {
  private static instance: NetworkServer;

  private readonly _wss: WebSocket.Server;

  private constructor(wss: WebSocket.Server) {
    this._wss = wss;
  }

  static create = (wss: WebSocket.Server) => {
    NetworkServer.instance = new NetworkServer(wss);
    return NetworkServer.instance;
  };

  static get = () => {
    return NetworkServer.instance;
  };

  send = (msg: NetworkMessage, client: Player) => {
    client.socket.send(msg.encode());
  };

  broadcast = (msg: NetworkMessage) => {
    this._wss.clients.forEach(ws => {
      ws.send(msg.encode());
    });
  };
}

export default NetworkServer;
