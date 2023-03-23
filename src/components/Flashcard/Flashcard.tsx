import { Box, styled } from "@mui/material";
import ButtonUnstyled, { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import { ITerm } from "interfaces";
import { ChangeLevelActions, FlashcardSideType } from "enums";
import { FlashcardOneSide } from "components/FlashcardOneSide";

const RotateBox = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "100%",
  transformStyle: "preserve-3d",
  borderRadius: theme.shape.borderRadius,
  transition: `transform 0.4s`,
}));

const BtnToggle = styled(ButtonUnstyled)`
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
  changeLevel: (action: ChangeLevelActions) => void;
  cardRotate: number;
  toggleRotate: () => void;
  isChangingLevel: boolean;
}

const Flashcard = ({ term, changeLevel, cardRotate, toggleRotate, isChangingLevel }: IProps) => {
  return (
    <BtnToggle onClick={toggleRotate}>
      <Box
        sx={{
          height: "100%",
          margin: "0 auto",
          perspective: 1000,
        }}
      >
        <RotateBox
          style={{
            transform: `rotateX(${cardRotate}deg)`,
          }}
        >
          <FlashcardOneSide
            term={term}
            isChangingLevel={isChangingLevel}
            sideType={FlashcardSideType.Term}
            changeLevel={changeLevel}
            inert={cardRotate === 0}
          />
          <FlashcardOneSide
            term={term}
            isChangingLevel={isChangingLevel}
            sideType={FlashcardSideType.Definition}
            changeLevel={changeLevel}
            inert={cardRotate === 180}
          />
        </RotateBox>
      </Box>
    </BtnToggle>
  );
};

export { Flashcard };
