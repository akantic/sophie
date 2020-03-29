import { ConnectionReplyMessage } from "@sophie/shared";

import GameWorld from "../../../models/GameWorld";
import { pixiApp } from "../../../index";

export default function playerConnectionReplyHandler(
  message: ConnectionReplyMessage
) {
  const { playerId, engineConfig, worldStatus, worldSize } = message.payload;

  const gameWorld = GameWorld.create(
    {
      screenWidth: pixiApp.view.width,
      screenHeight: pixiApp.view.height
    },
    pixiApp.ticker,
    worldSize
  );

  gameWorld.initializeEngine(engineConfig);
  gameWorld.initializeWorld(worldSize);
  gameWorld.initializeUser(playerId);
  worldStatus.players.forEach(p => {
    if (!gameWorld.players[p.id]) {
      gameWorld.createPlayer(p.id);
    }
  });

  pixiApp.stage.addChild(gameWorld);
}
