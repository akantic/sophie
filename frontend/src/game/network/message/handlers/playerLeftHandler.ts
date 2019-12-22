import { PlayerLeftMessage } from "@sophie/shared"

import GameWorld from "../../../models/GameWorld";

export default function playerLeftHandler(message: PlayerLeftMessage) {  
  const { playerId } = message.payload;

  if (GameWorld.get().players[playerId]) {
    GameWorld.get().removePlayer(playerId);
  }
}


