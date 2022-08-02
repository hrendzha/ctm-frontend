import { Box, Typography } from "@mui/material";

const HomePage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "calc(100vh - 64px)",
      }}
    >
      <Typography variant="h2">CTM Home Page</Typography>
    </Box>
  );
};

export { HomePage };
