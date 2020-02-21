import { PlayerConnectionReplyMessage } from "@sophie/shared";

import GameWorld from "../../../models/GameWorld";

export default function playerConnectionReplyHandler(
  message: PlayerConnectionReplyMessage
) {
  const { playerId, engineConfig, worldStatus } = message.payload;
  const gameWorld = GameWorld.get();

  GameWorld.get().initializeEngine(engineConfig);
  GameWorld.get().initializeWorld();
  GameWorld.get().initializeUser(playerId);
  worldStatus.players.forEach(p => {
    if (!gameWorld.players[p.id]) {
      gameWorld.createPlayer(p.id);
    }
  });
}
