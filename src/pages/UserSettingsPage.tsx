import { Box, Paper, Stack, Typography, styled } from "@mui/material";
import { Section } from "components/Section";
import { AppContainer } from "components/AppContainer";

const Item = styled(Paper)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  //   ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  //   color: theme.palette.text.secondary,
}));

const UserSettingsPage = () => {
  return (
    <Section>
      <AppContainer>
        <Stack component="ul" spacing={2}>
          <Box component="li">
            <Typography>Voice</Typography>
            <Item>Item 1</Item>
          </Box>

          <Box component="li">
            <Typography>Voice</Typography>
            <Item>Item 1</Item>
          </Box>
        </Stack>
      </AppContainer>
    </Section>
  );
};

export { UserSettingsPage };
