import { MessageType, MessageHandlers } from "@sophie/shared";
import inputStatusUpdateHandler from "./inputStatusUpdateHandler";

const registeredHandlers: MessageHandlers = {
  [MessageType.InputStatusUpdate]: inputStatusUpdateHandler
};

export default registeredHandlers;
