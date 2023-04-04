import { ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  components: {
    MuiUseMediaQuery: {
      defaultProps: {
        // https://mui.com/material-ui/react-use-media-query/#client-side-only-rendering
        noSsr: true,
      },
    },
  },
});
theme = responsiveFontSizes(theme);

interface IProps {
  children: React.ReactNode;
}

const GlobalThemeOverride = ({ children }: IProps) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export { GlobalThemeOverride };
