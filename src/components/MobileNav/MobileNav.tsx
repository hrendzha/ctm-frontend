import { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  IconButton,
  Link as MuiLink,
  Menu,
  MenuItem as MuiMenuItem,
  MenuItemProps,
} from "@mui/material";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { Logo } from "components/Logo";
import { User } from "types";

const MenuItem = styled(MuiMenuItem)<MenuItemProps>(() => ({
  padding: 0,
}));

interface ILinkProps {
  children: React.ReactNode;
  component: React.ElementType<any>;
  to: string;
}
const Link = ({ children, component, to }: ILinkProps) => {
  const { pathname } = useLocation();
  const color = pathname === to ? "primary" : "inherit";

  return (
    <MuiLink
      component={component}
      to={to}
      underline="none"
      color={color}
      sx={{ padding: "6px 16px", width: "100%" }}
    >
      {children}
    </MuiLink>
  );
};

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
          <MenuItem onClick={handleCloseNavMenu}>
            <Link component={RouterLink} to="/">
              Home
            </Link>
          </MenuItem>
          {user && (
            <MenuItem onClick={handleCloseNavMenu}>
              <Link component={RouterLink} to="/set">
                Set
              </Link>
            </MenuItem>
          )}
          {user && (
            <MenuItem onClick={handleCloseNavMenu}>
              <Link component={RouterLink} to="/study">
                Study
              </Link>
            </MenuItem>
          )}

          {!user && (
            <MenuItem onClick={handleCloseNavMenu}>
              <Link component={RouterLink} to="/sign-up">
                Sign up
              </Link>
            </MenuItem>
          )}
          {!user && (
            <MenuItem onClick={handleCloseNavMenu}>
              <Link component={RouterLink} to="/sign-in">
                Sign in
              </Link>
            </MenuItem>
          )}
        </Menu>
      </Box>

      <Logo type="mobile" />
    </>
  );
};

export { MobileNav };
