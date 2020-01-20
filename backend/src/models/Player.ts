import { Body, Bodies, Vector } from "matter-js";

import Weapons from "../resources/Weapons.json"

import Weapon from "./Weapon";
import { PLAYER_MOVEMENT_SPEED } from "../consts";

class Player {

  id: string;

  body: Body;

  socket: WebSocket;

  weapon: Weapon;

  private constructor(socket: WebSocket) {
    this.id = Math.round((Math.random() * 36 ** 12)).toString(36);
    this.socket = socket;
    this.body = Bodies.circle(0, 0, 20);
    this.body.friction = 0;
    this.body.frictionStatic = 0;
    this.body.frictionAir = 0.5;
    const w = Weapons[0];
    this.weapon = new Weapon(w.id, w.spriteId, w.fireRate, w.damage, w.projectileSpeed);
  }

  move = (direction: Vector) => {
    Body.setVelocity(this.body, Vector.mult(direction, PLAYER_MOVEMENT_SPEED));
  }

  setRotation = (rotation: number) => {
    Body.setAngle(this.body, rotation);
  }

  shoot = () => {
    this.weapon.fire(this);
  }

  static create(socket: WebSocket) {
    return new Player(socket);
  }
}

export default Player;