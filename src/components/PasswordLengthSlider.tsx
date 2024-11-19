import type { FC } from "react";

import { FormControl, Typography, FormLabel, Slider } from "@mui/material";
import { i18n } from "#i18n";

interface Props {
  onChange: (value: number) => void;
  disabled?: boolean;
  length: number;
}

export const PasswordLengthSlider: FC<Props> = ({
  onChange,
  disabled,
  length,
}) => {
  const onSliderChange = (_event: Event, value: number[] | number) => {
    onChange(value as number);
  };

  return (
    <FormControl fullWidth>
      <Slider
        aria-valuetext={i18n.t("password.length.count", [length])}
        aria-label={i18n.t("password.length.label")}
        aria-labelledby="lengthDisplay"
        onChange={onSliderChange}
        valueLabelDisplay="auto"
        disabled={disabled}
        id="lengthSlider"
        color="primary"
        value={length}
        max={64}
        min={4}
      />

      <FormLabel sx={{ textAlign: "end" }} id="lengthDisplay">
        <Typography color="text.secondary" variant="caption">
          {i18n.t("password.length.count", [length])}
        </Typography>
      </FormLabel>
    </FormControl>
  );
};
