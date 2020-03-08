import React from "react";
import ReactDOM from "react-dom";
import Debugger from "./components/DebugContainer";

const m = module as any;
if (m.hot) {
  m.hot.accept();
}

ReactDOM.render(<Debugger />, document.getElementById("root"));
