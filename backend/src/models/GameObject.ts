import { Body } from "matter-js";
import { Label } from "@sophie/shared";

class GameObject {
  readonly id: string;

  readonly label: Label;

  body: Body;

  health: number;

  constructor(body: Body, label: Label) {
    this.body = body;
    this.label = label;
    this.id = String(body.id);
    body.label = label;
  }

  takeDamage = (amount: number) => {
    this.health -= amount;
  };
}

export default GameObject;
