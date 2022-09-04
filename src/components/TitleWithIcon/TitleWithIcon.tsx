import { memo } from "react";
import { Avatar, SvgIconTypeMap, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface IProps {
  title: string;
  icon: OverridableComponent<SvgIconTypeMap>;
  titleComponent?: React.ElementType;
}

const TitleWithIcon = memo(({ title, icon: Icon, titleComponent }: IProps) => {
  return (
    <>
      {Icon && (
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <Icon />
        </Avatar>
      )}

      {title && (
        <Typography component={titleComponent || "h1"} variant="h5">
          {title}
        </Typography>
      )}
    </>
  );
});

export { TitleWithIcon };
