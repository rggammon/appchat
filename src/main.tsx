import React from "react";
import ReactDOM from "react-dom/client";
import { FluentProvider, webLightTheme, Button } from "@fluentui/react-components";
import "./styles.css";

const App = () => (
  <FluentProvider theme={webLightTheme}>
    <div style={{ padding: 32 }}>
      <h1>Welcome to the React + Fluent UI v9 App!</h1>
      <Button appearance="primary">Fluent UI v9 Button</Button>
    </div>
  </FluentProvider>
);

const rootElement = document.querySelector("main");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<App />);
} else {
  console.error("Main element not found");
}
