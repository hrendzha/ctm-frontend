import { Box, styled } from "@mui/material";
import { ITerm } from "interfaces";
import { ChangeLevelActions, FlashcardSideType } from "enums";
import { FlashcardOneSide } from "components/FlashcardOneSide";

const CardWrap = styled(Box)(() => ({
  position: "relative",
  width: "100%",
  height: "100%",
  perspective: 1500,
}));

const BtnToggle = styled("div")`
  display: block;
  height: 100%;
  width: 100%;
  padding: 0;
  border: none;
  text-align: unset;
  color: unset;
  cursor: pointer;
  background-color: unset;

  &:focus-visible {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }
`;

interface IProps {
  term: ITerm;
  activeCardSide: FlashcardSideType;
  isChangingLevel: boolean;
  shouldAnimateCardFlip: boolean;
  changeLevel: (action: ChangeLevelActions) => void;
  toggleActiveCardSide: () => void;
}

const Flashcard = ({
  term,
  activeCardSide,
  isChangingLevel,
  shouldAnimateCardFlip,
  changeLevel,
  toggleActiveCardSide,
}: IProps) => {
  return (
    <BtnToggle onClick={toggleActiveCardSide}>
      <CardWrap>
        <FlashcardOneSide
          term={term}
          isChangingLevel={isChangingLevel}
          sideType={FlashcardSideType.Term}
          isVisible={activeCardSide === FlashcardSideType.Term}
          shouldAnimateCardFlip={shouldAnimateCardFlip}
          changeLevel={changeLevel}
        />
        <FlashcardOneSide
          term={term}
          isChangingLevel={isChangingLevel}
          sideType={FlashcardSideType.Definition}
          isVisible={activeCardSide === FlashcardSideType.Definition}
          shouldAnimateCardFlip={shouldAnimateCardFlip}
          changeLevel={changeLevel}
        />
      </CardWrap>
    </BtnToggle>
  );
};

export { Flashcard };
