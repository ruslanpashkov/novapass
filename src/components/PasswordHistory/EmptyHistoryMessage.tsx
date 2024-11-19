import type { FC } from "react";

import { History as HistoryIcon } from "@mui/icons-material";
import { Typography, Box } from "@mui/material";
import { i18n } from "#i18n";

export const EmptyHistoryMessage: FC = () => (
  <Box
    sx={{
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      display: "flex",
      height: "100%",
      p: 3,
    }}
  >
    <HistoryIcon
      sx={{
        color: "text.secondary",
        fontSize: 64,
      }}
    />

    <Box>
      <Typography
        sx={{ color: "text.secondary", textAlign: "center" }}
        variant="h6"
      >
        {i18n.t("history.empty.title")}
      </Typography>

      <Typography
        sx={{ color: "text.secondary", textAlign: "center" }}
        variant="body2"
      >
        {i18n.t("history.empty.description")}
      </Typography>
    </Box>
  </Box>
);
