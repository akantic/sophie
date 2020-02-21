import { Bodies, Body, Vector } from "matter-js";
import { ProjectileSpawnedMessage } from "@sophie/shared";

import NetworkServer from "../network/NetworkServer";
import GameWorld from "../core/GameWorld";
import Player from "./Player";
import Projectile from "./Projectile";

class Weapon {
  readonly id: string;

  readonly spriteId: string;

  // amount of shots per minute
  readonly fireRate: number;

  readonly fireInterval: number;

  private lastFired: number;

  readonly damage: number;

  readonly projectileSpeed: number;

  readonly projectileBodyRadius: number;

  constructor(
    id: string,
    spriteId: string,
    fireRate: number,
    damage: number,
    projectileSpeed: number,
    projectileBodyRadius: number
  ) {
    this.id = id;
    this.spriteId = spriteId;
    this.fireRate = fireRate; // shots per minute
    this.fireInterval = (fireRate / 60) * 1000; // in milliseconds
    this.damage = damage;
    this.projectileSpeed = projectileSpeed;
    this.projectileBodyRadius = projectileBodyRadius;
  }

  fire = (player: Player) => {
    const timeNow = Date.now();
    if (timeNow - this.lastFired < this.fireInterval) {
      return null;
    }

    const {
      body: { position: pPosition, angle: pAngle, circleRadius: pRadius }
    } = player;

    const direction = Vector.create(Math.cos(pAngle), Math.sin(pAngle));
    const velocity = Vector.mult(direction, this.projectileSpeed);

    const projectilePositionOffset = Vector.create(
      direction.x * pRadius + direction.x * this.projectileBodyRadius,
      direction.y * pRadius + direction.y * this.projectileBodyRadius
    );
    const body = Bodies.circle(
      pPosition.x + projectilePositionOffset.x,
      pPosition.y + projectilePositionOffset.y,
      this.projectileBodyRadius
    );
    body.friction = 0;
    body.frictionAir = 0;
    body.frictionStatic = 0;
    Body.setDensity(body, Number.MAX_SAFE_INTEGER);
    GameWorld.addBody(body);

    Body.setVelocity(body, velocity);

    this.lastFired = Date.now();
    const projectile = new Projectile(player, body, this.damage);

    NetworkServer.get().broadcast(
      ProjectileSpawnedMessage.create(
        projectile.id,
        projectile.body.position,
        player.body.angle,
        "id",
        velocity
      )
    );
  };
}

export default Weapon;
