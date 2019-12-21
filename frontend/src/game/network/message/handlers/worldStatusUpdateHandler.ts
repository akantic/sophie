import { WorldStatusUpdateMessage } from "@sophie/shared"
import { Point } from "pixi.js";

import GameWorld from "../../../models/GameWorld";

export default function worldStatusUpdateHandler(message: WorldStatusUpdateMessage) {
  const players = GameWorld.get().players;
  message.payload.forEach(pp => {
    players[pp.playerId].position = new Point(pp.position.x, pp.position.y);
    players[pp.playerId].rotation = pp.rotation;
  });
}

