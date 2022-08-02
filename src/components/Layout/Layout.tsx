import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { ResponsiveAppBar } from "components/ResponsiveAppBar";

const Layout = () => {
  return (
    <>
      <ResponsiveAppBar />

      <Box component="main">
        <Outlet />
      </Box>
    </>
  );
};

export { Layout };
