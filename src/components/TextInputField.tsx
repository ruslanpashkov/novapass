import type { TextFieldProps } from "@mui/material";
import type { FC } from "react";

import { InputAdornment, IconButton, TextField, Grow } from "@mui/material";
import { Clear as ClearIcon } from "@mui/icons-material";
import { i18n } from "#i18n";

import type { InputData } from "../shared/controls";

interface Props extends InputData {
  onChange: (value: string) => void;
  color: TextFieldProps["color"];
  clearable?: boolean;
  disabled?: boolean;
}

export const TextInputField: FC<Props> = ({
  placeholder,
  clearable,
  onChange,
  disabled,
  label,
  value,
  color,
  id,
}) => {
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleClear = () => {
    onChange("");
  };

  return (
    <TextField
      slotProps={{
        input: {
          endAdornment: (
            <Grow in={clearable && value !== ""} unmountOnExit mountOnEnter>
              <InputAdornment position="end">
                <IconButton
                  aria-label={i18n.t("input.clear")}
                  onClick={handleClear}
                  size="small"
                  edge="end"
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            </Grow>
          ),
        },
      }}
      placeholder={placeholder}
      onChange={onInputChange}
      disabled={disabled}
      variant="outlined"
      color={color}
      label={label}
      value={value}
      size="small"
      fullWidth
      id={id}
    />
  );
};
