import * as WebSocket from "ws";
import { Engine, Render } from "matter-js";
import { createCanvas, Canvas } from "canvas";

import { WORLD_WIDTH, WORLD_HEIGHT } from "../consts";

class EngineRenderer {
  private _engine: Engine;

  private _wss: WebSocket.Server;

  private _canvas: Canvas;

  private _render: Render;

  run = (engine: Engine, renderInterval: number) => {
    this._engine = engine;
    this._wss = new WebSocket.Server({
      port: 8081
    });

    const canvas = createCanvas(WORLD_WIDTH, WORLD_HEIGHT);
    (canvas as any).style = {};
    this._canvas = canvas;

    this._render = Render.create({
      options: {
        width: WORLD_WIDTH,
        height: WORLD_HEIGHT
      },
      canvas: canvas as any,
      engine: this._engine
    });

    setInterval(this.emitCanvas, renderInterval);
  };

  emitCanvas = () => {
    Render.world(this._render);
    const canvasImage = this._canvas.toDataURL();
    this._wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(canvasImage);
      }
    });
  };
}

export default new EngineRenderer();
