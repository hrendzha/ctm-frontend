import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Section } from "components/Section";
import { AppContainer } from "components/AppContainer";

const ExercisesPage = () => {
  return (
    <Section>
      <AppContainer>
        <Button component={Link} to="/remember-everything" variant="contained">
          Remember everything
        </Button>
      </AppContainer>
    </Section>
  );
};

export { ExercisesPage };
