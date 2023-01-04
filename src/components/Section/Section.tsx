import { Box } from "@mui/system";

interface IProps {
  children: React.ReactNode;
  pt?: number;
  pb?: number;
}

const Section = ({ children, pt = 4, pb = 4 }: IProps) => {
  return (
    <Box
      component="section"
      sx={{
        pt,
        pb,
      }}
    >
      {children}
    </Box>
  );
};

export { Section };
