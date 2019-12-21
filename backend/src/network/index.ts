import { MessageDecoder, PlayerConnectionReplyMessage } from "@sophie/shared";

import gameWorld from "../core/GameWorld";
import Player from "../models/Player";
import NetworkServer from "../network/NetworkServer";


export function connectionHandler(ws: WebSocket, messageDecoder: MessageDecoder) {
  ws.onmessage = messageDecoder.processMessage;
  
  const player = Player.create(ws);
  gameWorld.addPlayer(player);
  NetworkServer.get().send(PlayerConnectionReplyMessage.create(player.id), player);
}
