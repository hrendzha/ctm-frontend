import { Box, styled } from "@mui/material";
import { ITerm } from "interfaces";
import { ChangeLevelActions, FlashcardSideType } from "enums";
import { FlashcardOneSide } from "components/FlashcardOneSide";

const RotateBox = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "100%",
  transformStyle: "preserve-3d",
  borderRadius: theme.shape.borderRadius,
}));

interface IProps {
  term: ITerm;
  changeLevel: (action: ChangeLevelActions) => void;
  cardRotate: number;
  toggleRotate: () => void;
  isChangingLevel: boolean;
}

const Flashcard = ({ term, changeLevel, cardRotate, toggleRotate, isChangingLevel }: IProps) => {
  return (
    <Box
      sx={{
        height: 300,
        maxWidth: 600,
        margin: "0 auto",
        perspective: 1000,
      }}
      onClick={toggleRotate}
    >
      <RotateBox
        style={{
          transform: `rotateX(${cardRotate}deg)`,
          transition: `${cardRotate === 0 ? "" : "transform 0.4s"}`, // cardRotate === 0 - prevent card rotation when we go to the next card
        }}
      >
        <FlashcardOneSide
          term={term}
          isChangingLevel={isChangingLevel}
          sideType={FlashcardSideType.Term}
          changeLevel={changeLevel}
        />
        <FlashcardOneSide
          term={term}
          isChangingLevel={isChangingLevel}
          sideType={FlashcardSideType.Definition}
          changeLevel={changeLevel}
        />
      </RotateBox>
    </Box>
  );
};

export { Flashcard };
