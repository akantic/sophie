import { Sprite, Point, IPoint, Texture } from "pixi.js";
import { Label } from "@sophie/shared";

import GameWorld from "./GameWorld";

abstract class GameObject extends Sprite {
  id: string;

  actualPosition: IPoint;

  label: Label;

  constructor(texture: Texture, label: Label, id: string) {
    super(texture);
    this.id = id;
    this.label = label;
    this.actualPosition = new Point();
    this.actualPosition.copyFrom(this.position);
  }

  addStaticVelocity = (velocity: IPoint) => {
    GameWorld.get().engineTicker.add(() => {
      this.actualPosition.x += velocity.x;
      this.actualPosition.y += velocity.y;
    });
  };
}

export default GameObject;
