import { Vector } from "matter-js";

import MessageType from "../message/MessageType";
import NetworkMessage from "../message/NetworkMessage";

class ProjectileSpawnedMessage extends NetworkMessage {

  readonly payload: {
    position: Vector,
    rotation: number,
    spriteId: string,
    speed: number,
  };

  private constructor(position: Vector, rotation: number, spriteId: string, speed: number) {
    super(MessageType.ProjectileSpawned);
    this.payload = {
      position,
      rotation,
      spriteId,
      speed,
    };
  }

  static create(position: Vector, rotation: number, spriteId: string, speed: number) {
    return new ProjectileSpawnedMessage(
      position,
      rotation,
      spriteId,
      speed,
    );
  }

  encode = () => {
    return JSON.stringify(this);
  }
}
export default ProjectileSpawnedMessage;