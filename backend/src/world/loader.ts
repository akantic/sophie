import { Bodies } from "matter-js";

import { WORLD_WIDTH, WORLD_HEIGHT, BOUND_SIZE } from "../consts";

export const getStaticBodies = () => {
  return [
    Bodies.rectangle(WORLD_WIDTH / 2, 0, WORLD_WIDTH, BOUND_SIZE, {
      isStatic: true
    }),
    Bodies.rectangle(WORLD_WIDTH / 2, WORLD_HEIGHT, WORLD_WIDTH, BOUND_SIZE, {
      isStatic: true
    }),
    Bodies.rectangle(0, WORLD_HEIGHT / 2, BOUND_SIZE, WORLD_HEIGHT, {
      isStatic: true
    }),
    Bodies.rectangle(WORLD_WIDTH, WORLD_HEIGHT / 2, BOUND_SIZE, WORLD_HEIGHT, {
      isStatic: true
    })
  ];
};
