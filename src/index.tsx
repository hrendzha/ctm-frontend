import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ConfirmProvider } from "material-ui-confirm";
import { App } from "./components/App/App";
import { AuthProvider } from "components/AuthProvider";
import { GlobalThemeOverride } from "components/GlobalThemeOverride";
import "./css/index.css";

const cacheNoPrefixer = createCache({
  key: "noprefixer",
  stylisPlugins: [],
});

const confirmProviderOptions = {
  confirmationButtonProps: {
    autoFocus: true,
  },
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  //   <React.StrictMode>
  <BrowserRouter>
    <CacheProvider value={cacheNoPrefixer}>
      <GlobalThemeOverride>
        <ConfirmProvider defaultOptions={confirmProviderOptions}>
          <CssBaseline />
          <AuthProvider>
            <App />
          </AuthProvider>
        </ConfirmProvider>
      </GlobalThemeOverride>
    </CacheProvider>
  </BrowserRouter>
  //   </React.StrictMode>
);
