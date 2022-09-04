import { CircularProgress, SxProps, Theme } from "@mui/material";

interface IProps {
  size?: number;
  sx?: SxProps<Theme>;
}

const CircularLoader = ({ size = 24, sx }: IProps) => {
  return (
    <CircularProgress
      size={size}
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: "-12px",
        marginLeft: "-12px",
        ...sx,
      }}
    />
  );
};

export { CircularLoader };
