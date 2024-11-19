import type { FC } from "react";

import { FormControlLabel, Checkbox } from "@mui/material";

import type { CheckboxData } from "../shared/controls";

interface Props extends CheckboxData {
  onChange: (key: string, checked: boolean) => void;
  disabled?: boolean;
}

export const CheckboxOption: FC<Props> = ({
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
    onChange(id, isChecked);
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          onChange={onToggleChange}
          disabled={disabled}
          checked={checked}
          size="small"
          id={id}
        />
      }
      label={label}
    />
  );
};
