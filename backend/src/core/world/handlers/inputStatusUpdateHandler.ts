import { InputStatusUpdateMessage } from "@sophie/shared";

import GameWorld from "../GameWorld";
import Player from "../../../models/Player";

export default function inputStatusUpdateHandler(
  message: InputStatusUpdateMessage
) {
  const {
    playerId,
    payload: { direction, rotation, mouseDown }
  } = message;
  const player = GameWorld.get().getObject(playerId) as Player;
  player.move(direction);
  player.setRotation(rotation);
  if (mouseDown) {
    player.shoot();
  }
}
