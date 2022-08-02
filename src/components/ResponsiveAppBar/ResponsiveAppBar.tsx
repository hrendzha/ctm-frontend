import { AppBar, Container, Toolbar } from "@mui/material";
import { MobileNav } from "components/MobileNav";
import { PcNav } from "components/PcNav";

const ResponsiveAppBar = () => {
  const user = false;

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            flexDirection: {
              xs: user ? "row" : "row-reverse",
              md: "row",
            },
          }}
        >
          <MobileNav user={user} />

          <PcNav user={user} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export { ResponsiveAppBar };
