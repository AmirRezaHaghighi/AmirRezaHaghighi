import { MaterialDesignContent } from "notistack";
// @mui
import { styled, alpha } from "@mui/material/styles";

// ----------------------------------------------------------------------

type StyledIconProps = {
  color: "info" | "success" | "warning" | "error";
};

export const StyledIcon = styled("span")<StyledIconProps>(
  ({ color, theme }) => ({
    width: 44,
    height: 44,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing(1.5),
    color: theme.palette[color].main,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette[color].main, 0.16),
  })
);
