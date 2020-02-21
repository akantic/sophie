import { Vector } from "matter-js";

import MessageType from "./MessageType";
import NetworkMessage from "./NetworkMessage";

class ProjectileSpawnedMessage extends NetworkMessage {
  readonly payload: {
    id: string;
    position: Vector;
    rotation: number;
    spriteId: string;
    velocity: Vector;
  };

  private constructor(
    id: string,
    position: Vector,
    rotation: number,
    spriteId: string,
    velocity: Vector
  ) {
    super(MessageType.ProjectileSpawned);
    this.payload = {
      id,
      position,
      rotation,
      spriteId,
      velocity
    };
  }

  static create(
    id: string,
    position: Vector,
    rotation: number,
    spriteId: string,
    velocity: Vector
  ) {
    return new ProjectileSpawnedMessage(
      id,
      position,
      rotation,
      spriteId,
      velocity
    );
  }

  encode = () => {
    return JSON.stringify(this);
  };
}
export default ProjectileSpawnedMessage;
