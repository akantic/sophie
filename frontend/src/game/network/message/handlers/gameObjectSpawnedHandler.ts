import { GameObjectSpawnedMessage, Label } from "@sophie/shared";

import Projectile from "../../../models/Projectile";
import GameWorld from "../../../models/GameWorld";

export default function gameObjectSpawnedHandler(
  message: GameObjectSpawnedMessage
) {
  const { objectId, label, position, rotation, velocity } = message.payload;

  // const direction = new Point(Math.cos(rotation), Math.sin(rotation));

  if (label === Label.Projectile) {
    const projectile = new Projectile(objectId);
    projectile.id = objectId;
    projectile.position.set(position.x, position.y);
    projectile.actualPosition.set(position.x, position.y);
    projectile.rotation = rotation;
    projectile.addStaticVelocity(velocity as any);
    GameWorld.get().addGameObject(projectile);
  } else if (label === Label.Player) {
    if (!GameWorld.get().players[objectId]) {
      GameWorld.get().createPlayer(objectId);
    }
  }
}
