import type { FC } from "react";

import { History as HistoryIcon } from "@mui/icons-material";
import { Button } from "@mui/material";
import { i18n } from "#i18n";

interface Props {
  openHistory: () => void;
  disabled?: boolean;
}

export const HistoryButton: FC<Props> = ({ openHistory, disabled }) => (
  <Button
    aria-label={i18n.t("history.label")}
    sx={{ fontWeight: "bold" }}
    endIcon={<HistoryIcon />}
    onClick={openHistory}
    disabled={disabled}
    color="primary"
    variant="text"
    type="button"
    fullWidth
  >
    {i18n.t("history.label")}
  </Button>
);
