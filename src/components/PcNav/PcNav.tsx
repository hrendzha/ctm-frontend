import { NavLink } from "react-router-dom";
import { List, ListItem } from "@mui/material";
import { Box } from "@mui/system";
import { Logo } from "components/Logo";

interface IProps {
  user: boolean;
}

const PcNav = ({ user }: IProps) => {
  const setActiveNavLink = ({ isActive }: { isActive: boolean }) =>
    isActive ? "activeNavLinkPc" : undefined;

  return (
    <>
      <Logo type="pc" />

      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flexGrow: 1,
          alignItems: "center",
        }}
        component="nav"
      >
        <List sx={{ display: "flex", flexGrow: 1 }}>
          <ListItem>
            <NavLink to="/" className={setActiveNavLink}>
              Home
            </NavLink>
          </ListItem>
          {user && (
            <ListItem>
              <NavLink to="/exercises" className={setActiveNavLink}>
                Contacts
              </NavLink>
            </ListItem>
          )}
        </List>

        {!user && (
          <List sx={{ display: "flex" }}>
            <ListItem>
              <NavLink to="/sign-up" className={setActiveNavLink}>
                Sign up
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink to="/sign-in" className={setActiveNavLink}>
                Sign in
              </NavLink>
            </ListItem>
          </List>
        )}
      </Box>
    </>
  );
};

export { PcNav };
