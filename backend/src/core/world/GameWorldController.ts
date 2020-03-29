import {
  NetworkMessage,
  WorldStatusUpdateMessage,
  MessageDecoder,
  ConnectionReplyMessage,
  GameObjectSpawnedMessage,
  GameObjectDestroyedMessage
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
import GameObject from "../../models/GameObject";

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
      const reply = ConnectionReplyMessage.create(
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
      const go = GameWorld.get().getObject(id);
      GameWorld.get().removeObject(id);
      server.broadcast(
        GameObjectDestroyedMessage.create({
          id,
          label: go.label,
          position: go.body.position
        })
      );
      if (this.syncedObjects.length === 0) {
        this.stopSync();
      }
      console.log(`Removed player ${id}`);
    };

    server.onMessage = MessageDecoder.from(handlers).processMessage;
    this.server = server;

    gameWorld.gameObjectProxies.set.push(
      (_target, _prop, value: GameObject) => {
        if (value instanceof GameObjectSync) {
          this.syncedObjects.push(value.id);
        }
        this.server.broadcastReliable(
          GameObjectSpawnedMessage.create({
            objectId: value.id,
            label: value.label,
            position: value.body.position,
            rotation: value.body.angle,
            velocity: value.body.velocity
          })
        );
      }
    );

    gameWorld.gameObjectProxies.delete.push(
      (_target, _prop, value: GameObject) => {
        if (value instanceof GameObjectSync) {
          this.syncedObjects = this.syncedObjects.filter(id => id !== value.id);
        }
        this.server.broadcastReliable(
          GameObjectDestroyedMessage.create({
            id: value.id,
            label: value.label,
            position: value.body.position
          })
        );
      }
    );
  }

  private networkSync = () => {
    const gw = GameWorld.get();
    const playersWorldStatus = this.syncedObjects.map(id => ({
      playerId: id,
      position: gw.gameObjects[id].body.position,
      rotation: gw.gameObjects[id].body.angle
    }));
    this.server.broadcast(WorldStatusUpdateMessage.create(playersWorldStatus));
  };

  startSync = () => {
    this.syncIntervalId = setInterval(
      this.networkSync,
      GameWorldController.SYNC_INTERVAL
    );
  };

  stopSync = () => {
    clearInterval(this.syncIntervalId);
    this.syncIntervalId = null;
  };
}

export default GameWorldController;
