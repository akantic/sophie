import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const m = module as any;
if (m.hot) {
  m.hot.accept();
}

ReactDOM.render(<App />, document.getElementById("ui"));
