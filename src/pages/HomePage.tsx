import { Box, Typography } from "@mui/material";

const HomePage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Typography variant="h2" textAlign="center">
        CTM Home Page
      </Typography>
    </Box>
  );
};

export { HomePage };
