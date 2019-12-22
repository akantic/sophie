import { PlayerJoinedMessage } from "@sophie/shared"

import GameWorld from "../../../models/GameWorld";

export default function playerJoinedHandler(message: PlayerJoinedMessage) {  
  const { playerId } = message.payload;

  if (!GameWorld.get().players[playerId]) {
    GameWorld.get().createPlayer(playerId);
  }
}


