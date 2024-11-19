import type { FC } from "react";

import { FormControlLabel, Switch } from "@mui/material";

import type { SwitchData } from "../shared/controls";

interface Props extends SwitchData {
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const SwitchOption: FC<Props> = ({
  onChange,
  disabled,
  checked,
  label,
  id,
}) => {
  const onToggleChange = (
    _event: React.ChangeEvent<HTMLInputElement>,
    isChecked: boolean,
  ) => {
    onChange(isChecked);
  };

  return (
    <FormControlLabel
      control={
        <Switch
          inputProps={{ role: "switch" }}
          onChange={onToggleChange}
          disabled={disabled}
          checked={checked}
          size="small"
          id={id}
        />
      }
      sx={{ width: "max-content", gap: 1 }}
      label={label}
    />
  );
};
