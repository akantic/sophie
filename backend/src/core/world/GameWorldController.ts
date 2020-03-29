import {
  NetworkMessage,
  PlayerJoinedMessage,
  WorldStatusUpdateMessage,
  MessageDecoder,
  PlayerConnectionReplyMessage,
  PlayerLeftMessage
} from "@sophie/shared";

import handlers from "./handlers";

import {
  NETWORK_SYNC_RATE,
  GAME_UPDATE_RATE,
  WORLD_WIDTH,
  WORLD_HEIGHT
} from "../../consts";

import GameWorld from "./GameWorld";

import Player from "../../models/Player";
import GameObjectSync from "../../models/GameObjectSync";

export interface SocketServer {
  send: (msg: NetworkMessage, id: string) => void;
  sendReliable: (msg: NetworkMessage, id: string) => void;
  broadcast: (msg: NetworkMessage) => void;
  broadcastReliable: (msg: NetworkMessage) => void;
  onConnect: () => { id: string; reply: NetworkMessage };
  onMessage: (e: MessageEvent) => void;
  onDisconnect: (id: string) => void;
}

class GameWorldController {
  syncedObjects: string[];

  server: SocketServer;

  static instance: GameWorldController;

  static SYNC_INTERVAL = 1000 / NETWORK_SYNC_RATE;

  private syncIntervalId: NodeJS.Timeout;

  static get = (): GameWorldController => {
    return GameWorldController.instance;
  };

  static create = (gameWorld: GameWorld, server: SocketServer) => {
    if (!GameWorldController.instance) {
      GameWorldController.instance = new GameWorldController(gameWorld, server);
    }
    return GameWorldController.instance;
  };

  private constructor(gameWorld: GameWorld, server: SocketServer) {
    this.syncedObjects = [];

    server.onConnect = () => {
      const player = Player.create();
      server.broadcastReliable(PlayerJoinedMessage.create(player.id));

      const reply = PlayerConnectionReplyMessage.create(
        player.id,
        {
          updateRate: GAME_UPDATE_RATE,
          networkUpdateRate: NETWORK_SYNC_RATE
        },
        { players: this.syncedObjects.map(id => ({ id })) },
        { width: WORLD_WIDTH, height: WORLD_HEIGHT }
      );

      gameWorld.addObject(player);

      if (!this.syncIntervalId) {
        this.startSync();
      }
      return { reply, id: player.id };
    };

    server.onDisconnect = (id: string) => () => {
      this.syncedObjects = this.syncedObjects.filter(i => i !== id);
      GameWorld.get().removeObject(id);
      server.broadcast(PlayerLeftMessage.create(id));
      console.log(`Removed player ${id}`);
    };

    server.onMessage = MessageDecoder.from(handlers).processMessage;
    this.server = server;

    gameWorld.gameObjectProxies.set.push((_target, _prop, value) => {
      if (value instanceof GameObjectSync) {
        this.syncedObjects.push(value.id);
      }
      // this.server.broadcastReliable(ObjectSpawnedMessage.create());
    });

    gameWorld.gameObjectProxies.delete.push((_target, prop) => {
      if (prop instanceof GameObjectSync) {
        this.syncedObjects = this.syncedObjects.filter(id => id !== prop.id);
      }
      // this.server.broadcastReliable(ObjectDestroyedMessage.create());
    });
  }

  private networkSync = () => {
    const gw = GameWorld.get();
    if (this.syncedObjects.length > 0) {
      const playersWorldStatus = this.syncedObjects.map(id => ({
        playerId: id,
        position: gw.gameObjects[id].body.position,
        rotation: gw.gameObjects[id].body.angle
      }));
      this.server.broadcast(
        WorldStatusUpdateMessage.create(playersWorldStatus)
      );
    }
  };

  startSync = () => {
    this.syncIntervalId = setInterval(
      this.networkSync,
      GameWorldController.SYNC_INTERVAL
    );
  };

  stopSync = () => {
    clearInterval(this.syncIntervalId);
  };
}

export default GameWorldController;
