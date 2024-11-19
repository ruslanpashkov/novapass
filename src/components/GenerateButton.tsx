import type { FC } from "react";

import { Button } from "@mui/material";
import { i18n } from "#i18n";

interface Props {
  disabled?: boolean;
}

export const GenerateButton: FC<Props> = ({ disabled }) => (
  <Button
    aria-label={i18n.t("generate.description")}
    sx={{ fontWeight: "bold" }}
    disabled={disabled}
    variant="contained"
    color="primary"
    type="submit"
    fullWidth
  >
    {i18n.t("generate.title")}
  </Button>
);
