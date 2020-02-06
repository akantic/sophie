import { WorldStatusUpdateMessage } from "@sophie/shared";

import GameWorld from "../../../models/GameWorld";

export default function worldStatusUpdateHandler(
  message: WorldStatusUpdateMessage
) {
  const { players } = GameWorld.get();
  message.payload.forEach(pp => {
    players[pp.playerId].actualPosition.set(pp.position.x, pp.position.y);
    players[pp.playerId].rotation = pp.rotation;
  });
}
