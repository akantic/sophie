import { PlayerConnectionReplyMessage } from "@sophie/shared"

import GameWorld from "../../../models/GameWorld";

export default function playerConnectionReplyHandler(message: PlayerConnectionReplyMessage) {  
  const { playerId, worldStatus } = message.payload;
  const gameWorld = GameWorld.get();

  GameWorld.get().initializeUser(playerId);
  worldStatus.players.forEach((p) => {
    if (!gameWorld.players[p.id]) {
      gameWorld.createPlayer(p.id);
    }
  });
}

