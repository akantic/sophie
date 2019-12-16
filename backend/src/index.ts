import * as WebSocket from "ws";

import { MessageDecoder, MessageType } from "@sophie/shared";

import { connectionHandler } from "./network";
import inputStatusUpdateHandler from "./network/message/handlers/inputStatusUpdateHandler";
import NetworkServer from "./network/NetworkServer";

const wss = new WebSocket.Server({
  port: 8080,
});

// Create a message decoder with specified handlers 
const handlers = {
  [MessageType.InputStatusUpdate]: inputStatusUpdateHandler
}
const messageDecoder = new MessageDecoder(handlers);
// Assign intialized decoder as a server connection handler
wss.on("connection", (ws) => connectionHandler(ws as any, messageDecoder));

// Initialize network server 
NetworkServer.create(wss);