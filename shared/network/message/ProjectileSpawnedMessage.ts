import { Vector } from "matter-js";

import MessageType from "./MessageType";
import NetworkMessage from "./NetworkMessage";

class ProjectileSpawnedMessage extends NetworkMessage {
  readonly payload: {
    position: Vector;
    rotation: number;
    spriteId: string;
    velocity: Vector;
  };

  private constructor(
    position: Vector,
    rotation: number,
    spriteId: string,
    velocity: Vector
  ) {
    super(MessageType.ProjectileSpawned);
    this.payload = {
      position,
      rotation,
      spriteId,
      velocity
    };
  }

  static create(
    position: Vector,
    rotation: number,
    spriteId: string,
    velocity: Vector
  ) {
    return new ProjectileSpawnedMessage(position, rotation, spriteId, velocity);
  }

  encode = () => {
    return JSON.stringify(this);
  };
}
export default ProjectileSpawnedMessage;
