import { InputStatusUpdateMessage } from "@sophie/shared";

import gameWorld from "../../../core/GameWorld";

export default function inputStatusUpdateHandler(message: InputStatusUpdateMessage) {
  const { playerId, payload: direction } = message; 

  gameWorld.getPlayer(playerId).move(direction);
}

