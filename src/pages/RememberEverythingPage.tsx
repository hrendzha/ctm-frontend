import { useCallback, useEffect, useState } from "react";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { ITerm } from "interfaces";
import { api } from "api";
import { ChangeLevelActions } from "enums";
import { Flashcard } from "components/Flashcard";
import { Section } from "components/Section";
import { AppContainer } from "components/AppContainer";

/**
 * Function to normalize the values
 * @param value - Current value
 * @param min - Minimum expected value
 * @param max - Maximum expected value
 */
const normalizeProgress = (value: number, min: number, max: number) =>
  ((value - min) * 100) / (max - min);

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showTerm = terms.length > 0;
  const progressValue = normalizeProgress(termIdx, 0, terms.length - 1);

  return (
    <>
      <LinearProgress
        sx={{ position: "absolute", width: "100%", backgroundColor: "unset" }}
        variant="determinate"
        color="info"
        value={progressValue}
      />

      <Section
        sx={{
          height: "100%",
          py: {
            xs: 2,
            md: 3,
            lg: 4,
          },
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

          {!isLoading && terms.length < 1 && !finishedSet && (
            <div>not found terms for learning</div>
          )}

          {showTerm && (
            <Box sx={{ height: "100%", display: "flex", flexDirection: "column", gap: 1 }}>
              <Box>
                <Typography component="div" textAlign="center" variant="h6">
                  {termIdx + 1} / {terms.length}
                </Typography>
              </Box>
              <Flashcard
                term={currentTerm}
                changeLevel={changeLevel}
                cardRotate={cardRotate}
                toggleRotate={toggleRotate}
                isChangingLevel={isChangingLevel}
              />
            </Box>
          )}
        </AppContainer>
      </Section>
    </>
  );
};

export { RememberEverythingPage };
