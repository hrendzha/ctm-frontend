import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { IconButton, Menu, MenuItem as MuiMenuItem, MenuItemProps } from "@mui/material";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { Logo } from "components/Logo";
import { MobileMenuLink } from "components/MobileMenuLink";
import { User } from "types";

const MenuItem = styled(MuiMenuItem)<MenuItemProps>(() => ({
  padding: 0,
}));

interface IProps {
  user: User;
}

const MobileNav = ({ user }: IProps) => {
  const [anchorElNav, setAnchorElNav] = useState<null | (EventTarget & HTMLButtonElement)>(null);

  const handleOpenNavMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorElNav(e.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
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
          <MuiMenuItem onClick={handleCloseNavMenu} disableGutters>
            <MobileMenuLink component={RouterLink} to="/">
              Home
            </MobileMenuLink>
          </MuiMenuItem>
          {user && (
            <MuiMenuItem onClick={handleCloseNavMenu} disableGutters>
              <MobileMenuLink component={RouterLink} to="/set">
                Set
              </MobileMenuLink>
            </MuiMenuItem>
          )}
          {user && (
            <MuiMenuItem onClick={handleCloseNavMenu} disableGutters>
              <MobileMenuLink component={RouterLink} to="/exercises">
                Study
              </MobileMenuLink>
            </MuiMenuItem>
          )}

          {!user && (
            <MuiMenuItem onClick={handleCloseNavMenu} disableGutters>
              <MobileMenuLink component={RouterLink} to="/sign-up">
                Sign up
              </MobileMenuLink>
            </MuiMenuItem>
          )}
          {!user && (
            <MuiMenuItem onClick={handleCloseNavMenu} disableGutters>
              <MobileMenuLink component={RouterLink} to="/sign-in">
                Sign in
              </MobileMenuLink>
            </MuiMenuItem>
          )}
        </Menu>
      </Box>

      <Logo type="mobile" />
    </>
  );
};

export { MobileNav };
