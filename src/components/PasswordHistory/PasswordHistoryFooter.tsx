import type { FC } from "react";

import { Close as CloseIcon } from "@mui/icons-material";
import { Button, Box } from "@mui/material";
import { i18n } from "#i18n";

import { ClearHistoryButton } from "./ClearHistoryButton";

interface Props {
  clearHistory: () => void;
  hideHistory: () => void;
  hasPasswords: boolean;
}

export const PasswordHistoryFooter: FC<Props> = ({
  clearHistory,
  hasPasswords,
  hideHistory,
}) => (
  <Box
    sx={{
      backgroundColor: "background.paper",
      justifyContent: "space-between",
      alignItems: "center",
      position: "sticky",
      display: "flex",
      bottom: 0,
      py: 1,
      px: 2,
    }}
  >
    <ClearHistoryButton clearHistory={clearHistory} disabled={!hasPasswords} />

    <Button
      aria-label={i18n.t("history.close")}
      onClick={hideHistory}
      color="inherit"
      variant="text"
      type="button"
    >
      <CloseIcon />
    </Button>
  </Box>
);
