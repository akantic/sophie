"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = __importStar(require("ws"));
const game_1 = __importDefault(require("./core/game"));
const gameWorld_1 = __importDefault(require("./core/gameWorld"));
const wss = new WebSocket.Server({
    port: 8080,
});
wss.on("connection", function connection(ws) {
    ws.on("message", function incoming(message) {
        console.log("received: %s", message);
    });
    ws.send("something");
});
game_1.default.start();
gameWorld_1.default.stop();
//# sourceMappingURL=index.js.map