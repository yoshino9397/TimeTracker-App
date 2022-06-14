import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ProjectsContextProvider } from "./context/ProjectsContext";
import { DarkModeContextProvider } from "./context/darkModeContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProjectsContextProvider>
        <DarkModeContextProvider>
          <App />
        </DarkModeContextProvider>
      </ProjectsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
