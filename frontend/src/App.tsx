import React, { useEffect } from "react";
import { pixiApp } from "./game/index";
import "./App.scss";

const App: React.FC = () => {
  useEffect(() => {
    const gameWindow = document.getElementById("game-window");
    gameWindow.appendChild(pixiApp.view);
  }, []);

  return (
    <div id="application">
      <div id="game-window"></div>
    </div>
  );
};

export default App;
