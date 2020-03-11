import { Body } from "matter-js";
import { Label } from "@sophie/shared";

import Player from "./Player";
import GameObject from "./GameObject";

class Projectile extends GameObject {
  readonly player: Player;

  readonly damage: number;

  constructor(player: Player, body: Body, damage: number) {
    super(body, Label.Projectile);
    this.player = player;
    this.damage = damage;
  }
}

export default Projectile;
