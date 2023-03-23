import { useState } from "react";
import { Box, Button, Modal } from "@mui/material";

interface IProps {
  children: React.ReactNode;
  src: string;
  desc: string;
}

const ZoomableImage = ({ children, src, desc }: IProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setOpen(true);
  };
  const handleClose = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={handleClose} sx={{ cursor: "zoom-out" }}>
        <img
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            display: "inline-block",
            maxWidth: "calc(100vw - 20px)",
            maxHeight: "calc(100vh - 20px)",
            transform: "translate(-50%, -50%)",
          }}
          onClick={handleClose}
          src={src}
          alt={desc}
        />
      </Modal>

      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
        }}
      >
        <Button
          sx={{
            cursor: "zoom-in",
            margin: "0 auto",
            padding: 0,
          }}
          onClick={handleOpen}
        >
          {children}
        </Button>
      </Box>
    </>
  );
};

export { ZoomableImage };
