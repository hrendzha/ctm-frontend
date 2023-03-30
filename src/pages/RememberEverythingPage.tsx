import { useCallback, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { ITerm } from "interfaces";
import { api } from "api";
import { ChangeLevelActions } from "enums";
import { Flashcard } from "components/Flashcard";
import { Section } from "components/Section";
import { AppContainer } from "components/AppContainer";

const RememberEverythingPage = () => {
  const [terms, setTerms] = useState<ITerm[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [finishedSet, setFinishedSet] = useState(false);
  const [isChangingLevel, setIsChangingLevel] = useState(false);
  const [termIdx, setTermIdx] = useState(0);
  const [cardRotate, setCardRotate] = useState(0);
  const currentTerm = terms[termIdx];

  const toggleRotate = () => {
    setCardRotate(prevRotate => (prevRotate === 0 ? 180 : 0));
  };

  const getTerms = async () => {
    try {
      const terms = await api.terms.getForLearn();
      setFinishedSet(false);
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

        if (action !== ChangeLevelActions.Keep) {
          await api.terms.changeLevel(currentTerm._id, action);
        }

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

  const showTerm = terms.length > 0;

  return (
    <Section
      sx={{
        height: "100%",
      }}
    >
      <AppContainer
        sx={{
          height: "100%",
        }}
      >
        {isLoading && !finishedSet && <div>loading</div>}

        {finishedSet && (
          <Button variant="contained" onClick={getTermsWithLoading} disabled={isLoading}>
            Try again
          </Button>
        )}

        {!isLoading && terms.length < 1 && !finishedSet && <div>not found terms for learning</div>}

        {showTerm && (
          <Flashcard
            term={currentTerm}
            changeLevel={changeLevel}
            cardRotate={cardRotate}
            toggleRotate={toggleRotate}
            isChangingLevel={isChangingLevel}
          />
        )}
      </AppContainer>
    </Section>
  );
};

export { RememberEverythingPage };
