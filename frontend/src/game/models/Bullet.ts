import { IPoint } from "pixi.js";

class Bullet {

  position: IPoint;
  rotation: number;

  constructor(position: IPoint, rotation: number) {
    this.position = position;
    this.rotation = rotation;
  }
}