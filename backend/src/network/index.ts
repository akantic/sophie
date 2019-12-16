import { MessageDecoder } from "@sophie/shared";

import gameWorld from "../core/GameWorld";
import game from "../core/Game";
import Player from "../models/Player";


export function connectionHandler(ws: WebSocket, messageDecoder: MessageDecoder) {
  gameWorld.addPlayer(new Player(ws));
  game.start();
  ws.onmessage = messageDecoder.processMessage;
}
