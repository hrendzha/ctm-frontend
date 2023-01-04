import { AppBar, Toolbar } from "@mui/material";
import { AppContainer } from "components/AppContainer";
import { MobileNav } from "components/MobileNav";
import { PcNav } from "components/PcNav";
import { UserMenu } from "components/UserMenu";
import { useAuth } from "hooks";

const ResponsiveAppBar = () => {
  const { user } = useAuth();

  return (
    <AppBar position="static">
      <AppContainer maxWidth="xl">
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

          {user && <UserMenu />}
        </Toolbar>
      </AppContainer>
    </AppBar>
  );
};

export { ResponsiveAppBar };
