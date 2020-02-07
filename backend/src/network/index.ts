import {
  MessageDecoder,
  PlayerConnectionReplyMessage,
  PlayerJoinedMessage,
  PlayerLeftMessage
} from "@sophie/shared";

import gameWorld from "../core/GameWorld";
import Player from "../models/Player";
import NetworkServer from "./NetworkServer";

export function connectionHandler(
  ws: WebSocket,
  messageDecoder: MessageDecoder
) {
  ws.onmessage = messageDecoder.processMessage;
  const player = Player.create(ws);
  ws.onclose = () => {
    gameWorld.removePlayer(player.id);
    NetworkServer.get().broadcast(PlayerLeftMessage.create(player.id));
    console.log(`Removed player ${player.id}`);
  };
  gameWorld.addPlayer(player);
  console.log(`Added player ${player.id}`);
  const players = gameWorld.playersI.map(p => ({ id: p.id }));
  NetworkServer.get().send(
    PlayerConnectionReplyMessage.create(player.id, { players }),
    player
  );
  NetworkServer.get().broadcast(PlayerJoinedMessage.create(player.id));
}
