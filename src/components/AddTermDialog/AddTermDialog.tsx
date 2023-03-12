import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { styled } from "@mui/material/styles";
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import { newTermSchema } from "yup/schemas";
import { api } from "api";
import { NewTerm } from "types";
import { ITerm } from "interfaces";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface IDialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: VoidFunction;
}
const BootstrapDialogTitle = ({ children, onClose, ...rest }: IDialogTitleProps) => {
  return (
    <DialogTitle
      sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", m: 0, p: 2 }}
      {...rest}
    >
      <span>{children}</span>
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: theme => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

interface IDialogProps {
  open: boolean;
  onClose: VoidFunction;
  onSave: VoidFunction;
  termForUpdate?: ITerm;
}

const AddTermDialog = ({ open, onClose, onSave, termForUpdate }: IDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<NewTerm>({
    defaultValues: {
      term: "",
      definition: "",
    },
    mode: "onChange",
    resolver: yupResolver(newTermSchema),
  });

  const onSubmit = async (formData: NewTerm) => {
    try {
      setIsSubmitting(true);
      if (termForUpdate) {
        await api.terms.update(termForUpdate._id, formData);
      } else {
        await api.terms.create(formData);
      }

      onSave();
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (termForUpdate) {
      setValue("term", termForUpdate.term);
      setValue("definition", termForUpdate.definition);
    }
  }, [setValue, termForUpdate, termForUpdate?._id, termForUpdate?.definition, termForUpdate?.term]);

  useEffect(() => {
    if (!open) {
      reset({
        term: "",
        definition: "",
      });
    }
  }, [open, reset]);

  return (
    <BootstrapDialog
      aria-labelledby="add-new-term-dialog"
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <BootstrapDialogTitle id="add-new-term-dialog" onClose={onClose}>
          Add new term
        </BootstrapDialogTitle>

        <DialogContent dividers>
          <TextField
            autoFocus
            required
            fullWidth
            label="Term"
            margin="normal"
            multiline
            error={Boolean(errors.term)}
            helperText={errors.term?.message || ""}
            {...register("term")}
          />

          <TextField
            required
            fullWidth
            label="Definition"
            margin="normal"
            multiline
            error={Boolean(errors.definition)}
            helperText={errors.definition?.message || ""}
            {...register("definition")}
          />
        </DialogContent>

        <DialogActions>
          <Button type="submit" disabled={isSubmitting}>
            Save
          </Button>
        </DialogActions>
      </Box>
    </BootstrapDialog>
  );
};

export { AddTermDialog };
