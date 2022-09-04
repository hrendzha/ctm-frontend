import { useState } from "react";
import { Box } from "@mui/system";
import { Avatar, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { getAvatarByName } from "utils/getAvatarByName";
import { useAuth } from "hooks/useAuth";
import { CircularLoader } from "components/CircularLoader";

const UserMenu = () => {
  const { user, signOut } = useAuth();
  const [anchorElUser, setAnchorElUser] = useState<HTMLButtonElement | null>(null);
  const [isLogOutLoading, setIsLogOutLoading] = useState(false);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = async () => {
    try {
      setIsLogOutLoading(true);
      await signOut();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLogOutLoading(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton
          onClick={handleOpenUserMenu}
          sx={{ p: 0 }}
          aria-label="account of current user"
          aria-controls="user-account"
          aria-haspopup="true"
        >
          <Avatar {...getAvatarByName(user?.name!)} />
        </IconButton>
      </Tooltip>

      <Menu
        sx={{ mt: "45px" }}
        id="user-account"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleSignOut} disabled={isLogOutLoading}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
          {isLogOutLoading && <CircularLoader />}
        </MenuItem>
      </Menu>
    </Box>
  );
};

export { UserMenu };
