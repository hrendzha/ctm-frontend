import { Link } from "react-router-dom";
import { Button, Container } from "@mui/material";
import { Section } from "components/Section";

const ExercisesPage = () => {
  return (
    <Section>
      <Container maxWidth="lg">
        <Button component={Link} to="/remember-everything" variant="contained">
          Remember everything
        </Button>
      </Container>
    </Section>
  );
};

export { ExercisesPage };
