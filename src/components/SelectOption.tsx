import type { SelectChangeEvent } from "@mui/material";
import type { FC } from "react";

import { FormControl, FormLabel, MenuItem, Select } from "@mui/material";

import type { SelectData } from "../shared/controls";

interface Props extends SelectData {
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const SelectOption: FC<Props> = ({
  onChange,
  disabled,
  options,
  label,
  value,
  id,
}) => {
  const onSelectChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <FormLabel>{label}</FormLabel>

      <Select
        onChange={onSelectChange}
        disabled={disabled}
        value={value}
        size="small"
        id={id}
      >
        {options.map((option) => (
          <MenuItem value={option.value} key={option.id}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
