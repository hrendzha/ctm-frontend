import React from "react";
import { TextField } from "@mui/material";

interface IProps {
  shouldShowError: boolean;
  helperText: string | JSX.Element;
  autoFocus?: boolean;
}

const EmailInputField = React.forwardRef<HTMLInputElement, IProps>(
  ({ autoFocus = false, helperText, shouldShowError, ...restReactHookFormProps }, ref) => {
    return (
      <TextField
        autoFocus={autoFocus}
        required
        fullWidth
        id="email"
        label="Email Address"
        inputProps={{ inputMode: "email" }}
        autoComplete="email"
        margin="normal"
        error={shouldShowError}
        helperText={helperText}
        ref={ref}
        {...restReactHookFormProps}
      />
    );
  }
);

export { EmailInputField };
