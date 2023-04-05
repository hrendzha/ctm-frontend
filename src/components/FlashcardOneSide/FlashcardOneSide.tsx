import { memo } from "react";
import {
  Button,
  CardActions,
  CardContent,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  ButtonGroup,
  Tooltip,
  IconButton,
} from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { ITerm } from "interfaces";
import { ChangeLevelActions, FlashcardSideType } from "enums";
import { ZoomableImage } from "components/ZoomableImage";
import { useSpeechSynthesis } from "hooks";

interface IProps {
  term: ITerm;
  sideType: FlashcardSideType;
  changeLevel: (action: ChangeLevelActions) => void;
  isChangingLevel: boolean;
  inert: boolean;
}

const FlashcardOneSide = memo(({ term, sideType, changeLevel, isChangingLevel, inert }: IProps) => {
  const theme = useTheme();

  const btnSize = useMediaQuery(theme.breakpoints.up("sm")) ? "large" : "medium";
  const { speak } = useSpeechSynthesis();

  const onBtnClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const action: ChangeLevelActions = Number(e.currentTarget.dataset.type);
    changeLevel(action);
  };

  const onSoundClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    const text = sideType === FlashcardSideType.Term ? term.term : term.definition;
    speak(text);
  };

  const showImage = sideType === FlashcardSideType.Definition && term.imageUrl;

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
      {...(inert && { inert: "true" })}
    >
      <CardActions
        sx={{
          justifyContent: "space-between",
          px: 2,
          py: {
            xs: 1,
            md: 2,
          },
        }}
      >
        <Typography>
          {sideType === FlashcardSideType.Term ? "Term" : "Definition"} L: <b>{term.level}</b>
        </Typography>

        <Box>
          <Tooltip title="Sound">
            <IconButton aria-label="sound" onClick={onSoundClick}>
              <VolumeUpIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </CardActions>

      <CardContent
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row-reverse",
          },
          flexGrow: 1,
          gap: 2,
          overflowY: "hidden",
          px: 2,
          py: {
            xs: 1,
            md: 2,
          },
        }}
      >
        {showImage && (
          <Box
            sx={{
              maxHeight: {
                xs: "50%",
                sm: "unset",
              },
              flexBasis: {
                sm: "calc(100% / 2)",
              },
              margin: {
                sm: "auto",
              },
            }}
          >
            <ZoomableImage src={term.imageUrl} desc={term.term}>
              <img
                style={{
                  objectFit: "contain",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
                src={term.imageUrl}
                alt={term.term}
              />
            </ZoomableImage>
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            maxHeight: "100%",
            flexBasis: {
              sm: showImage ? "calc(100% / 2)" : "",
            },
            justifyContent: {
              sm: "center",
            },
            margin: "auto",
            overflowY: "auto",
          }}
        >
          <Typography
            sx={{ overflowWrap: "anywhere" }}
            whiteSpace={"pre-wrap"}
            variant="h4"
            component="p"
            textAlign="center"
          >
            {sideType === FlashcardSideType.Term ? term.term : term.definition}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "center" }}>
        <ButtonGroup variant="contained" size={btnSize} aria-label="change level buttons group">
          <Button
            data-type={ChangeLevelActions.Lower}
            onClick={onBtnClick}
            disabled={isChangingLevel}
            color="error"
          >
            Don't remember
          </Button>
          <Button
            data-type={ChangeLevelActions.Keep}
            onClick={onBtnClick}
            disabled={isChangingLevel}
          >
            Still learning
          </Button>
          <Button
            data-type={ChangeLevelActions.Raise}
            onClick={onBtnClick}
            disabled={isChangingLevel}
            color="success"
          >
            Know
          </Button>
        </ButtonGroup>
      </CardActions>
    </Box>
  );
});

export { FlashcardOneSide };
