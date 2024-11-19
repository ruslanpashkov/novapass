import type { FC } from "react";

import { LinearProgress } from "@mui/material";
import { i18n } from "#i18n";

import { usePasswordStrength } from "../hooks/usePasswordStrength";

interface Props {
  password: string;
}

const TRANSITION_STYLES = "background-color 0.3s, transform 0.3s";

export const PasswordStrengthBar: FC<Props> = ({ password }) => {
  const { strengthPercent, strengthLevel, strengthColor } =
    usePasswordStrength(password);

  return (
    <LinearProgress
      sx={{
        "& .MuiLinearProgress-bar": {
          backgroundColor: strengthColor.main,
          transition: TRANSITION_STYLES,
        },
        backgroundColor: strengthColor.base,
        transition: TRANSITION_STYLES,
        borderRadius: "0 0 4px 4px",
        position: "absolute",
        zIndex: 1,
        bottom: 0,
        right: 0,
        left: 0,
      }}
      aria-label={i18n.t("password.strength.level", [strengthLevel])}
      value={strengthPercent}
      variant="determinate"
    />
  );
};
