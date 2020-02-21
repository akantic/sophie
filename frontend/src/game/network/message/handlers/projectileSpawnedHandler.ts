import { ProjectileSpawnedMessage } from "@sophie/shared";

import Projectile from "../../../models/Projectile";
import GameWorld from "../../../models/GameWorld";

export default function projectileSpawnedHandler(
  message: ProjectileSpawnedMessage
) {
  const { position, rotation, velocity } = message.payload;

  const projectile = new Projectile();
  // const direction = new Point(Math.cos(rotation), Math.sin(rotation));

  projectile.position.set(position.x, position.y);
  projectile.actualPosition.set(position.x, position.y);
  projectile.rotation = rotation;
  projectile.addStaticVelocity(velocity as any);

  GameWorld.get().addGameObject(projectile);
}