import { Button, SxProps, Theme } from "@mui/material";
import { CircularLoader } from "components/CircularLoader";

interface IProps {
  children: React.ReactNode;
  isSubmitting: boolean;
  sx: SxProps<Theme>;
}

const SubmitFormBtn = ({ children, isSubmitting, sx, ...options }: IProps) => {
  return (
    <Button
      type="submit"
      disabled={isSubmitting}
      fullWidth
      variant="contained"
      sx={{ mt: 3, ...sx }}
      {...options}
    >
      {children}
      {isSubmitting && <CircularLoader />}
    </Button>
  );
};

export { SubmitFormBtn };
