import { Body } from "matter-js";
import { Label, GameObjectDestroyedMessage } from "@sophie/shared";

import Player from "./Player";
import GameObject from "./GameObject";
import GameWorld from "../core/GameWorld";
import NetworkServer from "../network/NetworkServer";

class Projectile extends GameObject {
  readonly player: Player;

  readonly damage: number;

  constructor(player: Player, body: Body, damage: number) {
    super(Label.Projectile);
    this.body = body;
    this.player = player;
    this.damage = damage;
    this.onCollision(() => {
      GameWorld.destroy(this);
      NetworkServer.get().broadcast(
        GameObjectDestroyedMessage.create(
          this.id,
          this.label,
          this.body.position
        )
      );
    });
  }
}

export default Projectile;
