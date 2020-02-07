import { InputStatusUpdateMessage } from "@sophie/shared";

import gameWorld from "../../../core/GameWorld";

export default function inputStatusUpdateHandler(
  message: InputStatusUpdateMessage
) {
  const {
    playerId,
    payload: { direction, rotation, mouseDown }
  } = message;
  const player = gameWorld.getPlayer(playerId);
  player.move(direction);
  player.setRotation(rotation);
  if (mouseDown) {
    player.shoot();
  }
}
