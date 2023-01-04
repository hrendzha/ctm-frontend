import { useState } from "react";
import { useForm } from "react-hook-form";
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import ImageIcon from "@mui/icons-material/Image";
import { useConfirm } from "material-ui-confirm";
import { ITerm } from "interfaces";
import { api } from "api";
import { NewTerm } from "types";
import { newTermSchema } from "yup/schemas";

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
  } = useForm<NewTerm>({
    defaultValues: {
      term: term.term,
      definition: term.definition,
    },
    mode: "onChange",
    resolver: yupResolver(newTermSchema),
  });
  const [isEditing, setIsEditing] = useState(false);
  const [removingInProgress, setRemovingInProgress] = useState(false);
  const [editingInProgress, setEditingInProgress] = useState(false);
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
        formValues.definition.trim() !== term.definition
      ) {
        try {
          setEditingInProgress(true);
          const updatedTerm = await api.terms.update({
            _id: term._id,
            ...formValues,
          });

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

  return (
    <ListItem disableGutters>
      <Card sx={{ width: "100%" }}>
        <CardActions sx={{ justifyContent: "space-between" }}>
          <Typography component="span">
            Level <b>{term.level}</b>
          </Typography>

          <Box>
            <Tooltip title="Add image">
              <IconButton aria-label="add image" onClick={() => {}}>
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
            display: {
              sm: "flex",
            },
          }}
        >
          <Box
            sx={{
              width: {
                sm: "50%",
              },
              mr: {
                sm: 2,
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
              <Typography
                whiteSpace={"pre-wrap"}
                sx={{
                  mb: {
                    xs: 2,
                    sm: 0,
                  },
                }}
              >
                {term.term}
              </Typography>
            )}
          </Box>

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
                label="Definition"
                margin="normal"
                multiline
                error={Boolean(errors.definition)}
                helperText={errors.definition?.message || ""}
                {...register("definition")}
                size="medium"
              />
            ) : (
              <Typography whiteSpace={"pre-wrap"}>{term.definition}</Typography>
            )}

            <Box>{term.imageUrl.length > 0 && <img />}</Box>
          </Box>
        </CardContent>
      </Card>
    </ListItem>
  );
};

export { SetListItem };
