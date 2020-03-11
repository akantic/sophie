import Matter, { World, Body } from "matter-js";

import GameObject from "../models/GameObject";
import GameObjectSync from "../models/GameObjectSync";
import { getStaticBodies } from "../world/loader";

class GameWorld {
  static instance: GameWorld;

  static get = (): GameWorld => {
    return GameWorld.instance;
  };

  static create = (world: World) => {
    GameWorld.instance = new GameWorld(world);
    return GameWorld.instance;
  };

  gameObjects: { [key: number]: GameObject };

  syncedObjects: number[];

  world: World;

  private constructor(world: World) {
    this.world = world;
    this.gameObjects = {};
    this.syncedObjects = [];
    World.add(this.world, getStaticBodies());
  }

  addBody = (body: Body) => {
    World.add(this.world, body);
  };

  removeBody = (body: Body) => {
    Matter.Composite.remove(this.world, body);
  };

  addObject = (go: GameObject) => {
    this.addBody(go.body);
    this.gameObjects[go.id] = go;
    if (go instanceof GameObjectSync) {
      this.syncedObjects.push(go.id);
    }
  };

  removeObject = (id: number) => {
    this.removeBody(this.gameObjects[id].body);
    this.syncedObjects = this.syncedObjects.filter(i => i !== id);
    delete this.gameObjects[id];
    // NetworkServer.get().broadcast(
    //   GameObjectDestroyedMessage.create(
    //     this.id,
    //     this.label,
    //     this.body.position
    //   )
    // );
  };

  getObject = (id: number) => {
    return this.gameObjects[id];
  };
}

export default GameWorld;
