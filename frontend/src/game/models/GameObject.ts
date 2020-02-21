import { Sprite, Point, IPoint, Texture } from "pixi.js";

import GameWorld from "./GameWorld";

abstract class GameObject extends Sprite {
  actualPosition: IPoint;

  constructor(texture: Texture) {
    super(texture);
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
