import { List, ListItem } from "@mui/material";
import { Box } from "@mui/system";
import { Logo } from "components/Logo";
import { NavLink } from "components/NavLink";
import { User } from "types";

interface IProps {
  user: User;
}

const PcNav = ({ user }: IProps) => {
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
        <List sx={{ display: "flex", flexGrow: 1 }} role="menubar">
          <ListItem sx={{ width: "unset" }}>
            <NavLink to="/">Home</NavLink>
          </ListItem>
          {user && (
            <>
              <ListItem sx={{ width: "unset" }}>
                <NavLink to="/set">Set</NavLink>
              </ListItem>
              <ListItem sx={{ width: "unset" }}>
                <NavLink to="/exercises">Study</NavLink>
              </ListItem>
            </>
          )}
          {!user && (
            <>
              <ListItem sx={{ width: "unset", marginLeft: "auto" }}>
                <NavLink to="/sign-up">Sign up</NavLink>
              </ListItem>
              <ListItem sx={{ width: "unset" }}>
                <NavLink to="/sign-in">Sign in</NavLink>
              </ListItem>
            </>
          )}
        </List>
      </Box>
    </>
  );
};

export { PcNav };
