import { PlayerConnectionReplyMessage } from "@sophie/shared"

import GameWorld from "../../../models/GameWorld";

export default function playerConnectionReplyHandler(message: PlayerConnectionReplyMessage) {  
  GameWorld.get().initializeUser(message.payload.playerId);
}

