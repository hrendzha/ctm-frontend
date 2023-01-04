import { Breakpoint, Container } from "@mui/material";

interface IProps {
  children: React.ReactNode;
  maxWidth?: false | Breakpoint | undefined;
}

const AppContainer = ({ children, maxWidth = "lg" }: IProps) => {
  return <Container maxWidth={maxWidth}>{children}</Container>;
};

export { AppContainer };
