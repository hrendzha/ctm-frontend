import React from "react";
import { TextField } from "@mui/material";

interface IProps {
  helperText: string | JSX.Element;
  shouldShowError: boolean;
  autoFocus?: boolean;
}

const NameInputField = React.forwardRef<HTMLInputElement, IProps>(
  ({ autoFocus = false, helperText, shouldShowError, ...restReactHookFormProps }, ref) => {
    return (
      <TextField
        required
        fullWidth
        autoFocus={autoFocus}
        autoComplete="given-name"
        id="given-name"
        label="Name"
        margin="normal"
        ref={ref}
        error={shouldShowError}
        helperText={helperText}
        {...restReactHookFormProps}
      />
    );
  }
);

export { NameInputField };
