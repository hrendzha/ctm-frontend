import { useState } from "react";
import { NavLink } from "react-router-dom";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { Box } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import { createTheme, ThemeProvider } from "@mui/material";
import { Logo } from "components/Logo";

const theme = createTheme({
  components: {
    // Name of the component
    MuiMenuItem: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          padding: 0,
        },
      },
    },
  },
});

interface IProps {
  user: boolean;
}

const MobileNav = ({ user }: IProps) => {
  const [anchorElNav, setAnchorElNav] = useState<null | (EventTarget & HTMLButtonElement)>(null);
  const handleOpenNavMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorElNav(e.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const setActiveNavLink = ({ isActive }: { isActive: boolean }) =>
    isActive ? "activeNavLink" : undefined;

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          flexGrow: user ? 1 : 0,
          display: { xs: "flex", md: "none" },
        }}
      >
        <IconButton
          size="large"
          aria-label="menu-navigation"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>

        <button onClick={() => null}></button>

        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          <MenuItem onClick={handleCloseNavMenu}>
            <NavLink to="/" className={setActiveNavLink}>
              Home
            </NavLink>
          </MenuItem>
          {user && (
            <MenuItem onClick={handleCloseNavMenu}>
              <NavLink to="/exercises" className={setActiveNavLink}>
                Contacts
              </NavLink>
            </MenuItem>
          )}

          {!user && (
            <MenuItem onClick={handleCloseNavMenu}>
              <NavLink to="/sign-up" className={setActiveNavLink}>
                Sign up
              </NavLink>
            </MenuItem>
          )}
          {!user && (
            <MenuItem onClick={handleCloseNavMenu}>
              <NavLink to="/sign-in" className={setActiveNavLink}>
                Sign in
              </NavLink>
            </MenuItem>
          )}
        </Menu>
      </Box>

      <Logo type="mobile" />
    </ThemeProvider>
  );
};

export { MobileNav };
