import React, { useEffect } from "react";

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
    <div>
      <header className="header">Sophie Debugger</header>
      <img id="debug-image" src="" />
    </div>
  );
};

export default DebugContainer;
