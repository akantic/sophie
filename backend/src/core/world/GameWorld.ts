import Matter, { World, Body } from "matter-js";

import GameObject from "../../models/GameObject";
import { getStaticBodies } from "../../world/loader";

type GameObjectMap = { [key: number]: GameObject };
type GameObjectsListener = (
  target: GameObjectMap,
  prop: any,
  value?: any
) => void;

class GameWorld {
  static instance: GameWorld;

  static get = (): GameWorld => {
    return GameWorld.instance;
  };

  static create = (world: World) => {
    GameWorld.instance = new GameWorld(world);
    return GameWorld.instance;
  };

  _gameObjects: GameObjectMap;

  gameObjectProxies: {
    set: GameObjectsListener[];
    delete: GameObjectsListener[];
  };

  set gameObjects(objects: GameObjectMap) {
    this._gameObjects = new Proxy(objects, {
      set: (target, prop, value) => {
        this.gameObjectProxies.set.forEach(proxy => proxy(target, prop, value));
        target[prop] = value;
        return true;
      },
      deleteProperty: (target, prop) => {
        if (prop in target) {
          delete target[prop];
          this.gameObjectProxies.delete.forEach(proxy => proxy(target, prop));
          return true;
        }
        return false;
      }
    });
  }

  get gameObjects() {
    return this._gameObjects;
  }

  world: World;

  private constructor(world: World) {
    this.world = world;
    this.gameObjects = {};
    this.gameObjectProxies = { set: [], delete: [] };
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
  };

  removeObject = (id: string) => {
    this.removeBody(this.gameObjects[id].body);
    delete this.gameObjects[id];
  };

  getObject = (id: string) => {
    return this.gameObjects[id];
  };
}

export default GameWorld;
