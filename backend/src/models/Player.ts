import { Body, Bodies, Vector } from "matter-js";
import { Label } from "@sophie/shared";

import Weapons from "../resources/Weapons.json";

import Weapon from "./Weapon";
import { PLAYER_MOVEMENT_SPEED, PLAYER_BODY_RADIUS } from "../consts";
import GameObject from "./GameObject";

class Player extends GameObject {
  socket: WebSocket;

  weapon: Weapon;

  private constructor(socket: WebSocket) {
    super(Label.Player);
    this.socket = socket;
    this.body = Bodies.circle(0, 0, PLAYER_BODY_RADIUS);
    this.body.friction = 0;
    this.body.frictionStatic = 0;
    this.body.frictionAir = 0.5;
    const w = Weapons[0];
    this.weapon = new Weapon(
      w.id,
      w.spriteId,
      w.fireRate,
      w.damage,
      w.projectileSpeed,
      w.projectileBodyRadius
    );
  }

  move = (direction: Vector) => {
    Body.setVelocity(this.body, Vector.mult(direction, PLAYER_MOVEMENT_SPEED));
  };

  setRotation = (rotation: number) => {
    Body.setAngle(this.body, rotation);
  };

  shoot = () => {
    this.weapon.fire(this);
  };

  static create(socket: WebSocket) {
    return new Player(socket);
  }
}

export default Player;
