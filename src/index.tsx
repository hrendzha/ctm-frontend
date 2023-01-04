import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { App } from "./components/App/App";
import { AuthProvider } from "components/AuthProvider";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ConfirmProvider } from "material-ui-confirm";

const cacheNoPrefixer = createCache({
  key: "noprefixer",
  stylisPlugins: [],
});

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CacheProvider value={cacheNoPrefixer}>
        <ConfirmProvider
          defaultOptions={{
            confirmationButtonProps: { autoFocus: true },
          }}
        >
          <CssBaseline />
          <AuthProvider>
            <App />
          </AuthProvider>
        </ConfirmProvider>
      </CacheProvider>
    </BrowserRouter>
  </React.StrictMode>
);
