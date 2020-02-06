import { IPoint, Point } from "pixi.js";

export function lerp(p0: IPoint, p1: IPoint, t: number) {
  return new Point(p0.x * (1 - t) + p1.x * t, p0.y * (1 - t) + p1.y * t);
}
