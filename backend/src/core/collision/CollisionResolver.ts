import { IPair, Body } from "matter-js";

import GameWorld from "../GameWorld";
import plugins from "./plugins";

export type CollisionPlugin = (
  body: Body,
  collider: Body,
  gameWorld: GameWorld,
  collision: IPair
) => void;

class CollisionResolver {
  static plugins = plugins;

  static resolve(collisionPair: IPair) {
    const { bodyA, bodyB } = collisionPair;
    const gw = GameWorld.get();
    this.plugins.forEach(plugin => plugin(bodyA, bodyB, gw, collisionPair));
    this.plugins.forEach(plugin => plugin(bodyB, bodyA, gw, collisionPair));
  }
}

export default CollisionResolver;
