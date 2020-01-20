import { Body } from "matter-js";

import Player from "./Player";

class Projectile {

  readonly body: Body;

  readonly player: Player;

  readonly damage: number;

  constructor(player: Player, body: Body, damage: number) {
    this.body = body;
    this.player = player;
    this.damage = damage;
  }
}

export default Projectile;

