import { Link as RouterLink } from "react-router-dom";
import { Link, Typography } from "@mui/material";

const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" component={RouterLink} to="/">
        CTM
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export { Copyright };
