import { memo } from "react";

import {
  Button,
  CardActions,
  CardContent,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ITerm } from "interfaces";
import { ChangeLevelActions, FlashcardSideType } from "enums";

interface IProps {
  term: ITerm;
  sideType: FlashcardSideType;
  changeLevel: (action: ChangeLevelActions) => void;
  isChangingLevel: boolean;
}

const FlashcardOneSide = memo(({ term, sideType, changeLevel, isChangingLevel }: IProps) => {
  const theme = useTheme();

  const btnSize = useMediaQuery(theme.breakpoints.up("sm")) ? "medium" : "small";

  const onBtnClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const action = Number(e.currentTarget.dataset.type);
    changeLevel(action);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: `rotateX(${sideType === FlashcardSideType.Term ? "180deg" : "0"})`,
        boxShadow: theme.shadows[10],
      }}
    >
      <Box sx={{ padding: "16px" }}>
        <Typography>{sideType === FlashcardSideType.Term ? "Term" : "Definition"}</Typography>
      </Box>

      <CardContent
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <Typography whiteSpace={"pre-wrap"} variant="h4" component="p">
          {sideType === FlashcardSideType.Term ? term.term : term.definition}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: "center" }}>
        <Button
          variant="contained"
          size={btnSize}
          data-type={ChangeLevelActions.Lower}
          onClick={onBtnClick}
          disabled={isChangingLevel}
        >
          Don't remember
        </Button>
        <Button
          variant="contained"
          size={btnSize}
          data-type={ChangeLevelActions.Keep}
          onClick={onBtnClick}
          disabled={isChangingLevel}
        >
          Still learning
        </Button>
        <Button
          sx={{
            height: "100%",
          }}
          variant="contained"
          size={btnSize}
          data-type={ChangeLevelActions.Raise}
          onClick={onBtnClick}
          disabled={isChangingLevel}
        >
          Know
        </Button>
      </CardActions>
    </Box>
  );
});

export { FlashcardOneSide };
