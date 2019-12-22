import { Sprite, Texture, IPoint, Point } from "pixi.js";
import circle from "../sprites/circle.png";

export default class Player extends Sprite {

  private readonly weapon: Sprite;

  actualPosition: IPoint;

  id: string;

  constructor(id: string) {
    super(Texture.from(circle));
    this.id = id;
    this.actualPosition = new Point();
    this.actualPosition.copyFrom(this.position);
    this.tint = 0xff0000
    this.width = this.height = 50
    this.anchor.set(0.5)
    this.weapon = new Sprite(Texture.from(circle))
    this.weapon.width = 400;
    this.weapon.height = 100;
    this.weapon.anchor.set(0, 0.5);
    this.weapon.position.y = 150;
    this.addChild(this.weapon);
  }

}

