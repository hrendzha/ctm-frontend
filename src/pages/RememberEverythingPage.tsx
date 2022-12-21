import { useCallback, useEffect, useState } from "react";
import { Button, Container } from "@mui/material";
import { Section } from "components/Section";
import { Flashcard } from "components/Flashcard";
import { ITerm } from "interfaces";
import { api } from "api";
import { ChangeLevelActions } from "enums";

const RememberEverythingPage = () => {
  const [terms, setTerms] = useState<ITerm[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [finishedSet, setFinishedSet] = useState(false);
  const [isChangingLevel, setIsChangingLevel] = useState(false);
  const [termIdx, setTermIdx] = useState(0);
  const [cardRotate, setCardRotate] = useState(0);
  const currentTerm = terms[termIdx];

  const toggleRotate = () => {
    setCardRotate(prevRotate => prevRotate + 180);
  };

  const getTerms = async () => {
    try {
      const terms = await api.terms.getForLearn();
      if (terms.length > 0) {
        setFinishedSet(false);
      }
      setTerms(terms);
    } catch (error) {}
  };

  const getNext = async () => {
    setTermIdx(prevIdx => {
      const nextIdx = prevIdx + 1;
      const lastTermIdx = terms.length - 1;

      if (nextIdx > lastTermIdx) {
        setFinishedSet(true);
        setTerms([]);

        return 0;
      }

      return nextIdx;
    });
  };

  const changeLevel = useCallback(
    async (action: ChangeLevelActions) => {
      try {
        setIsChangingLevel(true);
        await api.terms.changeLevel(currentTerm._id, action);

        setCardRotate(0);
        getNext();
      } catch (error) {
        console.log("catch", error);
      } finally {
        setIsChangingLevel(false);
      }
    },
    [currentTerm]
  );

  const getTermsWithLoading = async () => {
    try {
      setIsLoading(true);
      await getTerms();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTermsWithLoading();
  }, []);

  const showTerm = !isLoading && terms.length > 0;

  return (
    <Section>
      <Container maxWidth="lg">
        {isLoading && "loading"}

        {finishedSet && (
          <Button variant="contained" onClick={getTermsWithLoading} disabled={isLoading}>
            Try again
          </Button>
        )}

        {showTerm ? (
          <Flashcard
            term={currentTerm}
            changeLevel={changeLevel}
            cardRotate={cardRotate}
            toggleRotate={toggleRotate}
            isChangingLevel={isChangingLevel}
          />
        ) : (
          <div>not found terms for learning</div>
        )}
      </Container>
    </Section>
  );
};

export { RememberEverythingPage };
