import { Body, Events, IPair } from "matter-js";
import { Label } from "@sophie/shared";

class GameObject {
  readonly id: string;

  readonly label: Label;

  body: Body;

  constructor(label: Label) {
    this.id = Math.round(Math.random() * 36 ** 12).toString(36);
    this.label = label;
  }

  onCollision = (f: (collisionPair: IPair) => void) => {
    Events.on(this.body, "collisionStart", pair => f(pair));
  };
}

export default GameObject;
