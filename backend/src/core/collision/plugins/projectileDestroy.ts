import { Label } from "@sophie/shared";
import { Body } from "matter-js";

import GameWorld from "../../GameWorld";

export default function plugin(
  body: Body,
  _collider: Body,
  gameWorld: GameWorld
): void {
  const go = gameWorld.gameObjects[body.id];
  if (go && go.label === Label.Projectile) {
    gameWorld.removeObject(body.id);
  }
}
