import { Sprite, Texture } from "pixi.js";
import { Label } from "@sophie/shared";

import circle from "../sprites/circle.png";
import GameObject from "./GameObject";

class Player extends GameObject {
  private readonly weapon: Sprite;

  constructor(id: string) {
    super(Texture.from(circle), Label.Player, id);
    this.id = id;
    this.tint = 0xff0000;
    this.width = 50;
    this.height = 50;
    this.anchor.set(0.5);
    this.weapon = new Sprite(Texture.from(circle));
    this.weapon.width = 400;
    this.weapon.height = 100;
    this.weapon.anchor.set(0, 0.5);
    this.weapon.position.y = 150;
    this.addChild(this.weapon);
  }
}

export default Player;
