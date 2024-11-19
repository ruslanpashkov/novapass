import type { FC } from "react";

import { Delete as DeleteIcon } from "@mui/icons-material";
import { Button } from "@mui/material";
import { i18n } from "#i18n";

interface Props {
  clearHistory: () => void;
  disabled?: boolean;
}

export const ClearHistoryButton: FC<Props> = ({ clearHistory, disabled }) => (
  <Button
    aria-label={i18n.t("history.clear")}
    endIcon={<DeleteIcon />}
    onClick={clearHistory}
    disabled={disabled}
    variant="text"
    color="error"
    type="button"
    size="small"
  >
    {i18n.t("history.clear")}
  </Button>
);
