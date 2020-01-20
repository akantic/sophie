import { Sprite, IPoint } from "pixi.js";

import GameWorld from "./GameWorld";

abstract class GameObject extends Sprite {

  addVelocity = (direction: IPoint, speed: number) => {
    GameWorld.get().addToTicker(d => {
      this.position.x += d * direction.x * speed;
      this.position.y += d * direction.y * speed;
    });
  }

}

export default GameObject;