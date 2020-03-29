import { Body, Bodies, Vector } from "matter-js";
import { Label } from "@sophie/shared";

import Weapons from "../resources/Weapons.json";

import Weapon from "./Weapon";
import {
  PLAYER_MOVEMENT_SPEED,
  PLAYER_BODY_RADIUS,
  WORLD_WIDTH,
  WORLD_HEIGHT,
  BOUND_SIZE
} from "../consts";
import GameObjectSync from "./GameObjectSync";

class Player extends GameObjectSync {
  weapon: Weapon;

  private constructor() {
    super(
      Bodies.circle(
        BOUND_SIZE + Math.floor(Math.random() * WORLD_WIDTH - BOUND_SIZE),
        Math.floor(Math.random() * WORLD_HEIGHT - BOUND_SIZE),
        PLAYER_BODY_RADIUS,
        { density: 100, friction: 0, frictionStatic: 0, frictionAir: 0.5 }
      ),
      Label.Player
    );

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

  static create() {
    return new Player();
  }
}

export default Player;
