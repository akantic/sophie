import { Texture } from "pixi.js";
import { Label } from "@sophie/shared";

import circle from "../sprites/circle.png";
import GameObject from "./GameObject";

class Projectile extends GameObject {
  constructor(id: string) {
    super(Texture.from(circle), Label.Projectile, id);
    this.tint = 0xffff00;
    this.width = 10;
    this.height = 10;
    this.anchor.set(0.5);
  }
}

export default Projectile;
