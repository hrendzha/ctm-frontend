import { Link as RouterLink, useLocation } from "react-router-dom";
import { Button } from "@mui/material";

interface IProps {
  to: string;
  children: React.ReactNode;
}

const NavLink = ({ to, children }: IProps) => {
  const { pathname } = useLocation();
  const textDecoration = pathname === to ? "underline" : "none";

  return (
    <Button
      component={RouterLink}
      to={to}
      sx={{ color: "white", whiteSpace: "nowrap", textDecoration }}
    >
      {children}
    </Button>
  );
};

export { NavLink };
