import type { FC } from "react";

import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { i18n } from "#i18n";

import type { GenerationMode } from "../stores/generator";

interface Props {
  onChange: (mode: GenerationMode) => void;
  mode: GenerationMode;
}

export const GenerationModeToggle: FC<Props> = ({ onChange, mode }) => {
  const onToggleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newMode: GenerationMode,
  ) => {
    if (newMode !== null) {
      onChange(newMode);
    }
  };

  return (
    <ToggleButtonGroup
      aria-label={i18n.t("generate.mode")}
      onChange={onToggleChange}
      value={mode}
      size="small"
      exclusive
      fullWidth
    >
      <ToggleButton aria-label={i18n.t("generate.password")} value="password">
        {i18n.t("password.title")}
      </ToggleButton>

      <ToggleButton
        aria-label={i18n.t("generate.passphrase")}
        value="passphrase"
      >
        {i18n.t("passphrase.title")}
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
