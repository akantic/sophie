import { Point } from "pixi.js";
import { ProjectileSpawnedMessage } from "@sophie/shared"

import Projectile from "../../../models/Projectile";
import GameWorld from "../../../models/GameWorld";

export default function projectileSpawnedHandler(message: ProjectileSpawnedMessage) {
  const { spriteId, position, rotation, speed } = message.payload;

  const projectile = new Projectile(spriteId);
  const direction = new Point(Math.cos(rotation), Math.sin(rotation));

  console.log(direction, speed, rotation);
  projectile.position.set(position.x, position.y);
  projectile.rotation = rotation;
  projectile.addVelocity(direction, speed);

  GameWorld.get().addChild(projectile);
}
