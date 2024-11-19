import type { SxProps } from "@mui/material";
import type { FC } from "react";

import {
  DialogContentText,
  DialogContent,
  DialogActions,
  Typography,
  Dialog,
  Button,
} from "@mui/material";
import {
  CloudOff as CloudOffIcon,
  History as HistoryIcon,
  Storage as StorageIcon,
} from "@mui/icons-material";
import { i18n } from "#i18n";

interface Props {
  onClose: () => void;
  open: boolean;
}

const DEFAULT_GAP = 2;
const TYPOGRAPHY_STYLES: SxProps = {
  alignItems: "center",
  gap: DEFAULT_GAP,
  display: "flex",
};

export const StartupModal: FC<Props> = ({ onClose, open }) => (
  <Dialog maxWidth="sm" open={open} fullWidth>
    <DialogContent sx={{ p: 3 }}>
      <DialogContentText
        sx={{ flexDirection: "column", gap: DEFAULT_GAP, display: "flex" }}
        component="div"
      >
        <Typography sx={TYPOGRAPHY_STYLES} variant="body2" gutterBottom>
          <StorageIcon color="primary" />
          {i18n.t("startup.storage")}
        </Typography>

        <Typography sx={TYPOGRAPHY_STYLES} variant="body2" gutterBottom>
          <HistoryIcon color="secondary" />
          {i18n.t("startup.history")}
        </Typography>

        <Typography sx={TYPOGRAPHY_STYLES} variant="body2" gutterBottom>
          <CloudOffIcon color="warning" />
          {i18n.t("startup.offline")}
        </Typography>

        <Typography color="text.secondary" variant="body2">
          {i18n.t("startup.suggestion")}
        </Typography>
      </DialogContentText>
    </DialogContent>

    <DialogActions sx={{ mt: -2, p: 3 }}>
      <Button
        aria-label={i18n.t("startup.close")}
        variant="contained"
        onClick={onClose}
        color="primary"
        type="button"
        size="small"
        fullWidth
      >
        {i18n.t("startup.submit")}
      </Button>
    </DialogActions>
  </Dialog>
);
