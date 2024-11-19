import type { FC } from "react";

import { Grid2 as Grid } from "@mui/material";

import type { CheckboxData } from "../shared/controls";

import { CheckboxOption } from "./CheckboxOption";

interface Props {
  onChange: (key: string, checked: boolean) => void;
  options: CheckboxData[];
}

export const CheckboxOptionGroup: FC<Props> = ({ onChange, options }) => (
  <Grid columnSpacing={2} container>
    {options.map((option) => (
      <Grid key={option.id} size={6}>
        <CheckboxOption onChange={onChange} {...option} />
      </Grid>
    ))}
  </Grid>
);
