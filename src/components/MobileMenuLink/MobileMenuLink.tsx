import { useLocation } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";

interface ILinkProps {
  children: React.ReactNode;
  component: React.ElementType<any>;
  to: string;
}

const MobileMenuLink = ({ children, component, to }: ILinkProps) => {
  const { pathname } = useLocation();
  const color = pathname === to ? "primary" : "inherit";

  return (
    <MuiLink
      component={component}
      to={to}
      underline="none"
      color={color}
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        px: 2,
        py: {
          xs: "6px",
          sm: 0,
        },
      }}
    >
      {children}
    </MuiLink>
  );
};

export { MobileMenuLink };
