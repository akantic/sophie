import React, { useEffect } from "react";
import "./DebugContainer.scss";

const DebugContainer: React.FC = () => {
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8081");
    const img = document.getElementById("debug-image") as HTMLImageElement;
    socket.onmessage = (e: MessageEvent) => {
      if (typeof e.data === "string") {
        img.src = e.data;
      }
    };
  }, []);

  return (
    <div id="debugger">
      <img id="debug-image" src="" />
    </div>
  );
};

export default DebugContainer;
