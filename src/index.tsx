import { render } from "react-dom";
import { GlobalContextProvider } from "./useGlobalContext";

import App from "./App";

const rootElement = document.getElementById("root");
render(
  <GlobalContextProvider>
    <App />
  </GlobalContextProvider>,
  rootElement
);
