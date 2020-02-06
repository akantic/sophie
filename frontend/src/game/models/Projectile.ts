import { Texture } from "pixi.js";

import circle from "../sprites/circle.png";
import GameObject from "./GameObject";

class Projectile extends GameObject {
  constructor() {
    super(Texture.from(circle));
    this.tint = 0xffff00;
    this.width = 50;
    this.height = 10;
    this.anchor.set(0.5);
  }
}

export default Projectile;
