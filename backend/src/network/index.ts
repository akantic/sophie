import {
  MessageDecoder,
  PlayerConnectionReplyMessage,
  PlayerJoinedMessage,
  PlayerLeftMessage
} from "@sophie/shared";

import GameWorld from "../core/GameWorld";
import Player from "../models/Player";
import NetworkServer from "./NetworkServer";
import {
  WORLD_WIDTH,
  WORLD_HEIGHT,
  NETWORK_UPDATE_RATE,
  GAME_UPDATE_RATE
} from "../consts";

export function connectionHandler(
  ws: WebSocket,
  messageDecoder: MessageDecoder
) {
  ws.onmessage = messageDecoder.processMessage;
  const player = Player.create(ws);
  ws.onclose = () => {
    GameWorld.get().removeObject(player.id);
    NetworkServer.get().broadcast(PlayerLeftMessage.create(player.id));
    console.log(`Removed player ${player.id}`);
  };
  GameWorld.get().addObject(player);
  console.log(`Added player ${player.id}`);
  NetworkServer.get().send(
    PlayerConnectionReplyMessage.create(
      player.id,
      { updateRate: GAME_UPDATE_RATE, networkUpdateRate: NETWORK_UPDATE_RATE },
      { players: GameWorld.get().syncedObjects.map(id => ({ id })) },
      { width: WORLD_WIDTH, height: WORLD_HEIGHT }
    ),
    player
  );
  NetworkServer.get().broadcast(PlayerJoinedMessage.create(player.id));
}
