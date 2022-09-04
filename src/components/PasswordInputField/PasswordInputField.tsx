import React, { useState } from "react";
import { IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface IProps {
  inputId: string;
  autoComplete: string;
  helperText: string | JSX.Element;
  shouldShowError: boolean;
}

const PasswordInputField = React.forwardRef<HTMLInputElement, IProps>(
  ({ inputId, autoComplete, helperText, shouldShowError, ...restReactHookFormProps }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <TextField
        required
        fullWidth
        label="Password"
        type={showPassword ? "text" : "password"}
        id={inputId}
        autoComplete={autoComplete}
        margin="normal"
        ref={ref}
        error={shouldShowError}
        helperText={helperText}
        {...restReactHookFormProps}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title={showPassword ? "Hide password" : "Show password"}>
                <IconButton
                  aria-label="toggle password visibility"
                  aria-controls="password"
                  onClick={() => setShowPassword(bool => !bool)}
                  onMouseDown={e => e.preventDefault()}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
    );
  }
);

export { PasswordInputField };
