import { SxProps, Theme } from "@mui/material";
import { Box } from "@mui/system";

interface IProps {
  children: React.ReactNode;
  pt?: number;
  pb?: number;
  sx?: SxProps<Theme>;
}

const Section = ({ children, pt = 4, pb = 4, sx = [] }: IProps) => {
  return (
    <Box
      component="section"
      sx={[
        {
          pt,
          pb,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
};

export { Section };
