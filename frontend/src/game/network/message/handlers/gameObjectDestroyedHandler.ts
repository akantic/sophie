import { GameObjectDestroyedMessage, Label } from "@sophie/shared";

import GameWorld from "../../../models/GameWorld";

export default function gameObjectDestroyedHandler(
  message: GameObjectDestroyedMessage
) {
  const { id, label } = message.payload;

  if (label === Label.Player) {
    GameWorld.get().removePlayer(id);
  } else if (label === Label.Projectile) {
    GameWorld.get().destroyGameObject(id);
  }
}
