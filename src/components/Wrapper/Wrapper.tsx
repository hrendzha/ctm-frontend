import { Box } from "@mui/system";

interface IProps {
  children: React.ReactNode;
  sx?: object;
}

const Wrapper = ({ children, sx, ...options }: IProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mb: 5,
        ...sx,
      }}
      {...options}
    >
      {children}
    </Box>
  );
};

export { Wrapper };
