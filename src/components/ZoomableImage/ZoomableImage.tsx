import { useState } from "react";
import { Button, Modal } from "@mui/material";

interface IProps {
  children: React.ReactNode;
  src: string;
  desc: string;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "calc(100vw - 20px)",
  height: "calc(100vh - 20px)",
  p: 0,
  cursor: "zoom-out",
  transform: "translate(-50%, -50%)",
  "&:hover, &.Mui-focusVisible": {
    backgroundColor: "transparent",
  },
};

const ZoomableImage = ({ children, src, desc }: IProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Button sx={style} onClick={handleClose}>
          <img
            style={{
              display: "inline-block",
              objectFit: "contain",
              maxWidth: "100%",
              maxHeight: "100%",
            }}
            src={src}
            alt={desc}
          />
        </Button>
      </Modal>

      <Button
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: 0,
          cursor: "zoom-in",
        }}
        onClick={handleOpen}
      >
        {children}
      </Button>
    </>
  );
};

export { ZoomableImage };
