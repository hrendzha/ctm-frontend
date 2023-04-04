import { Paper, Stack, Typography, styled } from "@mui/material";
import { Section } from "components/Section";
import { AppContainer } from "components/AppContainer";
import { PronunciationSettings } from "components/PronunciationSettings";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  flexGrow: 1,
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(3),
  },
}));

const UserSettingsPage = () => {
  return (
    <Section>
      <AppContainer>
        <Stack component="ul" spacing={4}>
          <Stack
            component="li"
            spacing={{ xs: 1, sm: 2, md: 4, lg: 5, xl: 6 }}
            direction={{ xs: "column", md: "row" }}
          >
            <Typography variant="h4" component="div" textAlign="center">
              Pronunciation
            </Typography>
            <Item>
              <PronunciationSettings />
            </Item>
          </Stack>
        </Stack>
      </AppContainer>
    </Section>
  );
};

export { UserSettingsPage };
