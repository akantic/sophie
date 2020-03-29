import * as WS from "ws";
import { NetworkMessage } from "@sophie/shared";

import { SocketServer } from "../core/world/GameWorldController";

class WebSocketServer implements SocketServer {
  private readonly wss: WS.Server;

  private clients: { [key: string]: WebSocket };

  constructor(port: number) {
    this.clients = {};

    const wss = new WS.Server({
      port
    });

    wss.on("connection", ws => {
      const { id, reply } = this.onConnect();
      ws.send(reply.encode());
      this.clients[id] = ws as any;

      ws.onmessage = this.onMessage as any;
      ws.onclose = this.onDisconnect(id) as any;
    });

    this.wss = wss;
  }

  onMessage: (event: MessageEvent) => void;

  onDisconnect: (id: string) => void;

  onConnect: () => { id: string; reply: NetworkMessage };

  sendReliable = (msg: NetworkMessage, id: string) => {
    this.send(msg, id);
  };

  broadcastReliable = (msg: NetworkMessage) => {
    this.broadcast(msg);
  };

  send = (msg: NetworkMessage, id: string) => {
    this.clients[id].send(msg.encode());
  };

  broadcast = (msg: NetworkMessage) => {
    Object.keys(this.clients).forEach(id => {
      this.send(msg, id);
    });
  };
}

export default WebSocketServer;
