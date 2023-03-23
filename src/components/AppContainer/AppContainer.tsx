import { Breakpoint, Container, SxProps, Theme } from "@mui/material";

interface IProps {
  children: React.ReactNode;
  maxWidth?: false | Breakpoint | undefined;
  sx?: SxProps<Theme>;
}

const AppContainer = ({ children, maxWidth = "lg", sx = [] }: IProps) => {
  return (
    <Container maxWidth={maxWidth} sx={sx}>
      {children}
    </Container>
  );
};

export { AppContainer };
