import { GameObjectDestroyedMessage } from "@sophie/shared";

import GameWorld from "../../../models/GameWorld";

export default function gameObjectDestroyedHandler(
  message: GameObjectDestroyedMessage
) {
  const { id } = message.payload;

  GameWorld.get().destroyGameObject(id);
}
