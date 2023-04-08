import { useCallback, useEffect, useState } from "react";
import { Box, Button, LinearProgress, Skeleton, Typography } from "@mui/material";
import { ITerm } from "interfaces";
import { api } from "api";
import { ChangeLevelActions, FlashcardSideType } from "enums";
import { Flashcard } from "components/Flashcard";
import { Section } from "components/Section";
import { AppContainer } from "components/AppContainer";

const DEFAULT_ACTIVE_CARD_SIDE = FlashcardSideType.Definition;

/**
 * Function to normalize the values
 * @param value - Current value
 * @param min - Minimum expected value
 * @param max - Maximum expected value
 */
const normalizeProgress = (value: number, min: number, max: number) =>
  ((value - min) * 100) / (max - min);

const boxSx = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 1,
};

const RememberEverythingPage = () => {
  const [terms, setTerms] = useState<ITerm[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [finishedSet, setFinishedSet] = useState(false);
  const [isChangingLevel, setIsChangingLevel] = useState(false);
  const [termIdx, setTermIdx] = useState(0);
  const [activeCardSide, setActiveCardSide] = useState<FlashcardSideType>(DEFAULT_ACTIVE_CARD_SIDE);
  const [shouldAnimateCardFlip, setShouldAnimateCardFlip] = useState(false);

  const currentTerm = terms[termIdx];

  const toggleActiveCardSide = () => {
    // enable card flip animation when user starts flip card
    setShouldAnimateCardFlip(true);
    setActiveCardSide(prev =>
      prev === FlashcardSideType.Definition ? FlashcardSideType.Term : FlashcardSideType.Definition
    );
  };

  const getTerms = async () => {
    try {
      const terms = await api.terms.getForLearn();
      setFinishedSet(false);
      setTerms(terms);
    } catch (error) {}
  };

  const getNext = async () => {
    // prevent card flip animation when show next card
    setShouldAnimateCardFlip(false);
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

        setActiveCardSide(DEFAULT_ACTIVE_CARD_SIDE);
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
          {isLoading && (
            <Box sx={boxSx}>
              <Typography component="div" variant="h6">
                <Skeleton sx={{ mx: "auto" }} width={50} />
              </Typography>
              <Skeleton variant="rounded" width="100%" height="100%" />
            </Box>
          )}

          {finishedSet && !isLoading && (
            <Button variant="contained" onClick={getTermsWithLoading} disabled={isLoading}>
              Try again
            </Button>
          )}

          {!isLoading && terms.length < 1 && !finishedSet && (
            <Box display="flex" alignItems="center" justifyContent="center" height="100%">
              <Typography align="center" variant="h2">
                Not found terms for learning 😿
                <br />
                Try again later
              </Typography>
            </Box>
          )}

          {showTerm && (
            <Box sx={boxSx}>
              <Box>
                <Typography component="div" align="center" variant="h6">
                  {termIdx + 1} / {terms.length}
                </Typography>
              </Box>
              <Flashcard
                term={currentTerm}
                activeCardSide={activeCardSide}
                isChangingLevel={isChangingLevel}
                shouldAnimateCardFlip={shouldAnimateCardFlip}
                changeLevel={changeLevel}
                toggleActiveCardSide={toggleActiveCardSide}
              />
            </Box>
          )}
        </AppContainer>
      </Section>
    </>
  );
};

export { RememberEverythingPage };
