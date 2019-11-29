import React, { useEffect } from 'react';
import { canvas } from "./game/index";

const App: React.FC = () => {

  useEffect(() => {
    const gameWindow = document.getElementById("game-window");
    gameWindow!.appendChild(canvas);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        Welcome to Sophie!
      </header>
      <div id="game-window" >
      </div>
    </div>
  );
}

export default App;
