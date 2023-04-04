import { SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { isTouchDevice } from "utils";

interface IProps {
  onAddTermClick?: Function;
}

const AppSpeedDial = ({ onAddTermClick }: IProps) => {
  const handleAddTermClick = () => {
    if (typeof onAddTermClick === "function") {
      onAddTermClick();
    }
  };

  return (
    <SpeedDial
      ariaLabel="Speed dial"
      sx={{ position: "fixed", bottom: 16, right: 16 }}
      icon={<SpeedDialIcon />}
    >
      <SpeedDialAction
        key="Add card"
        tooltipTitle="Add card"
        icon={<AddCircleOutlinedIcon />}
        tooltipOpen={isTouchDevice}
        onClick={handleAddTermClick}
      />
    </SpeedDial>
  );
};

export { AppSpeedDial };
