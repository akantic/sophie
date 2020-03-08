import * as PIXI from "pixi.js";

import NetworkClient from "./network/NetworkClient";
import { VIEW_WIDTH, VIEW_HEIGHT } from "./consts";

export const pixiApp = new PIXI.Application({
  width: VIEW_WIDTH,
  height: VIEW_HEIGHT,
  backgroundColor: 0x1099bb,
  resolution: window.devicePixelRatio || 1
});

NetworkClient.create();
