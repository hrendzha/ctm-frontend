import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  ListItem,
  Tooltip,
  Typography,
  Divider,
  Box,
  TextField,
  styled,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import ImageIcon from "@mui/icons-material/Image";
import { useConfirm } from "material-ui-confirm";
import { blueGrey } from "@mui/material/colors";
import { IImageItem, ITerm } from "interfaces";
import { api } from "api";
import { NewTerm } from "types";
import { newTermSchema } from "yup/schemas";
import { SetListItemImagesBlock } from "components/SetListItemImagesBlock";
import { ZoomableImage } from "components/ZoomableImage";
import { availableTermLevels } from "constants-local";

const RemoveImgBtn = styled(IconButton)(() => ({
  position: "absolute",
  top: 5,
  right: 5,
  backgroundColor: blueGrey[800],
  "&:hover, &.Mui-focusVisible": {
    backgroundColor: "rgba(0, 0, 0, 0.14)",
    "& .MuiSvgIcon-root": {
      color: "#000",
    },
  },
}));

interface IProps {
  term: ITerm;
  onRemoveCallback: (_id: string) => void;
  onEditCallback: (updatedTerm: ITerm) => void;
}

const SetListItem = ({ term, onRemoveCallback, onEditCallback }: IProps) => {
  const {
    register,
    getValues,
    setValue,
    formState: { errors },
    control,
  } = useForm<NewTerm>({
    defaultValues: {
      term: term.term,
      definition: term.definition,
      level: term.level,
    },
    mode: "onChange",
    resolver: yupResolver(newTermSchema),
  });

  const [isEditing, setIsEditing] = useState(false);
  const [removingInProgress, setRemovingInProgress] = useState(false);
  const [editingInProgress, setEditingInProgress] = useState(false);
  const [addingImageInProgress, setAddingImageInProgress] = useState(false);
  const [removingImageInProgress, setRemovingImageInProgress] = useState(false);
  const [shouldShowImagesBlock, setShouldShowImagesBlock] = useState(false);
  const confirm = useConfirm();

  const onTermRemoveClick = async () => {
    try {
      await confirm({
        title: "Remove term?",
      });
      setRemovingInProgress(true);
      await api.terms.remove(term._id);
      onRemoveCallback(term._id);
    } catch (error) {
      console.log("catch", error);
    } finally {
      setRemovingInProgress(false);
    }
  };

  const onTermEditClick = async () => {
    if (isEditing) {
      const formValues = getValues();

      if (
        formValues.term.trim() !== term.term ||
        formValues.definition.trim() !== term.definition ||
        formValues.level !== term.level
      ) {
        try {
          setEditingInProgress(true);
          const updatedTerm = await api.terms.update(term._id, formValues);

          onEditCallback(updatedTerm);
        } catch (error) {
          console.log("catch", error);
        } finally {
          setEditingInProgress(false);
        }
      }
    }

    setValue("term", term.term);
    setValue("definition", term.definition);

    setIsEditing(val => !val);
  };

  const onRemoveImageClick = async () => {
    try {
      setRemovingImageInProgress(true);
      const updatedTerm = await api.terms.update(term._id, {
        imageUrl: "",
      });
      onEditCallback(updatedTerm);
    } catch (error) {
      console.log("catch", error);
    } finally {
      setRemovingImageInProgress(false);
    }
  };

  const onSetImageClick = async (imageModel: IImageItem) => {
    if (imageModel.url === term.imageUrl) return;

    try {
      setAddingImageInProgress(true);
      const updatedTerm = await api.terms.update(term._id, {
        imageUrl: imageModel.url,
      });
      onEditCallback(updatedTerm);
    } catch (error) {
      console.log("catch", error);
    } finally {
      setAddingImageInProgress(false);
    }
  };

  const onAddImageClick = async () => {
    setShouldShowImagesBlock(prevVal => !prevVal);
  };

  return (
    <ListItem disableGutters>
      <Card sx={{ width: "100%" }}>
        <CardActions sx={{ justifyContent: "space-between" }}>
          {isEditing ? (
            <FormControl sx={{ minWidth: "70px" }} size="small">
              <InputLabel id="filter-level">Level</InputLabel>
              <Controller
                name="level"
                control={control}
                render={({ field }) => (
                  <Select labelId="filter-level" label="Level" {...field}>
                    {availableTermLevels.map(i => (
                      <MenuItem key={i} value={i}>
                        {i}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          ) : (
            <Typography component="span">
              Level <b>{term.level}</b>
            </Typography>
          )}

          <Box>
            <Tooltip title="Add image">
              <IconButton aria-label="add image" onClick={onAddImageClick}>
                <ImageIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Remove">
              <IconButton
                aria-label="remove term"
                onClick={onTermRemoveClick}
                disabled={removingInProgress}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title={isEditing ? "Save" : "Edit"}>
              <IconButton
                aria-label={`${isEditing ? "save" : "edit"} term`}
                onClick={onTermEditClick}
                disabled={editingInProgress}
              >
                {isEditing ? <CheckIcon /> : <EditIcon />}
              </IconButton>
            </Tooltip>
          </Box>
        </CardActions>

        <Divider />

        <CardContent
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            gap: 2,
          }}
        >
          <Box
            sx={{
              width: {
                sm: "50%",
              },
            }}
          >
            {isEditing ? (
              <TextField
                required
                fullWidth
                label="Term"
                margin="normal"
                multiline
                error={Boolean(errors.term)}
                helperText={errors.term?.message || ""}
                {...register("term")}
                size="medium"
              />
            ) : (
              <Typography whiteSpace={"pre-wrap"}>{term.term}</Typography>
            )}
          </Box>

          <Box
            sx={{
              width: {
                sm: "50%",
              },
              display: "flex",
              gap: 2,
            }}
          >
            {isEditing ? (
              <TextField
                required
                fullWidth
                label="Definition"
                margin="normal"
                multiline
                error={Boolean(errors.definition)}
                helperText={errors.definition?.message || ""}
                {...register("definition")}
                size="medium"
              />
            ) : (
              <>
                <Typography
                  sx={{
                    flexGrow: 1,
                  }}
                  whiteSpace={"pre-wrap"}
                >
                  {term.definition}
                </Typography>
                {term.imageUrl && (
                  <Card
                    sx={{
                      position: "relative",
                      width: {
                        xs: "84px",
                      },
                      height: {
                        xs: "60px",
                      },
                      flexShrink: 0,
                    }}
                  >
                    <ZoomableImage src={term.imageUrl} desc={term.term}>
                      <img
                        style={{
                          display: "inline-block",
                          objectFit: "contain",
                          maxHeight: "100%",
                        }}
                        src={term.imageUrl}
                        alt={term.term}
                        loading="lazy"
                      />
                    </ZoomableImage>

                    <RemoveImgBtn
                      aria-label="remove image"
                      onClick={onRemoveImageClick}
                      disabled={removingImageInProgress}
                      size="small"
                    >
                      <DeleteIcon sx={{ width: "16px", height: "16px", color: "#fff" }} />
                    </RemoveImgBtn>
                  </Card>
                )}
              </>
            )}
          </Box>
        </CardContent>

        {shouldShowImagesBlock && (
          <div {...(addingImageInProgress && { inert: "true" })}>
            <SetListItemImagesBlock searchValue={term.term} onSetImageClick={onSetImageClick} />
          </div>
        )}
      </Card>
    </ListItem>
  );
};

export { SetListItem };
