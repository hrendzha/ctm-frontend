import { Box } from "@mui/system";

interface IProps {
  children: React.ReactNode;
}

const Section = ({ children, ...options }: IProps) => {
  return (
    <Box
      component="section"
      sx={{
        pt: 8,
        pb: 4,
      }}
      {...options}
    >
      {children}
    </Box>
  );
};

export { Section };
