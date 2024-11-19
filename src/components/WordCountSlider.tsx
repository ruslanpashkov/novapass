import type { FC } from "react";

import { FormControl, FormLabel, Slider } from "@mui/material";
import { i18n } from "#i18n";

interface Props {
  onChange: (value: number) => void;
  disabled?: boolean;
  wordCount: number;
}

export const WordCountSlider: FC<Props> = ({
  wordCount,
  onChange,
  disabled,
}) => {
  const onSliderChange = (_event: Event, value: number[] | number) => {
    onChange(value as number);
  };

  return (
    <FormControl fullWidth>
      <FormLabel id="wordCountDisplay">
        {i18n.t("passphrase.words.label")}
      </FormLabel>

      <Slider
        aria-valuetext={i18n.t("passphrase.words.count", [wordCount])}
        aria-label={i18n.t("passphrase.words.label")}
        aria-labelledby="wordCountDisplay"
        onChange={onSliderChange}
        valueLabelDisplay="auto"
        id="wordCountSlider"
        disabled={disabled}
        value={wordCount}
        color="primary"
        max={12}
        min={2}
      />
    </FormControl>
  );
};
