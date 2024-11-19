import type { SxProps } from "@mui/material";
import type { FC } from "react";

import { Snackbar, Alert, Paper, Box } from "@mui/material";
import { useEffect, useMemo } from "react";
import { i18n } from "#i18n";

import {
  useGeneratorStore,
  useHistoryUIStore,
  useHistoryStore,
  useStartupStore,
  useAlertStore,
} from "../stores";
import { PasswordHistory } from "./PasswordHistory/PasswordHistory";
import { GenerationModeToggle } from "./GenerationModeToggle";
import { useFormHandlers } from "../hooks/useFormHandlers";
import { PassphraseOptions } from "./PassphraseOptions";
import { PasswordOptions } from "./PasswordOptions";
import { GenerateButton } from "./GenerateButton";
import { HistoryButton } from "./HistoryButton";
import { PasswordField } from "./PasswordField";
import { StartupModal } from "./StartupModal";

const COLUMN_LAYOUT_STYLES: SxProps = {
  flexDirection: "column",
  display: "flex",
  gap: 3,
};

export const PasswordGenerator: FC = () => {
  const { addPassword } = useHistoryStore();
  const { showHistory } = useHistoryUIStore();
  const { setHasSeenWelcome, hasSeenWelcome } = useStartupStore();
  const { hideAlert, showAlert, message, open } = useAlertStore();
  const {
    passphraseOptions,
    passwordOptions,
    createPassword,
    setPassword,
    password,
    setMode,
    mode,
  } = useGeneratorStore();

  const { handleCopyPassword, handleSubmit } = useFormHandlers();

  const canGeneratePassword = useMemo(() => {
    if (mode === "passphrase") {
      return passphraseOptions.separator !== "";
    }

    return Object.entries(passwordOptions)
      .filter(([key]) =>
        ["uppercase", "lowercase", "numbers", "symbols"].includes(key),
      )
      .some(([, value]) => value);
  }, [mode, passwordOptions, passphraseOptions]);

  useEffect(() => {
    if (!canGeneratePassword) {
      return;
    }

    try {
      const password = createPassword(mode);

      setPassword(password);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : i18n.t("error.failed");

      showAlert(errorMessage);
    }
  }, [mode, canGeneratePassword, createPassword, setPassword, showAlert]);

  return (
    <Paper
      sx={{
        ...COLUMN_LAYOUT_STYLES,
        overflow: "auto",
        height: "580px",
        width: "380px",
        p: 3,
      }}
      onSubmit={handleSubmit}
      component="form"
    >
      <PasswordField
        copyPassword={handleCopyPassword}
        disabled={!canGeneratePassword}
        updatePassword={setPassword}
        addPassword={addPassword}
        password={password}
        mode={mode}
      />

      <GenerationModeToggle onChange={setMode} mode={mode} />

      {mode === "passphrase" ? (
        <PassphraseOptions
          disabled={!canGeneratePassword}
          options={passphraseOptions}
        />
      ) : (
        <PasswordOptions
          disabled={!canGeneratePassword}
          options={passwordOptions}
        />
      )}

      <Box sx={{ ...COLUMN_LAYOUT_STYLES, mt: "auto" }}>
        <GenerateButton disabled={!canGeneratePassword} />

        <HistoryButton openHistory={showHistory} />
      </Box>

      <PasswordHistory copyPassword={handleCopyPassword} />

      <Snackbar
        anchorOrigin={{
          horizontal: "center",
          vertical: "bottom",
        }}
        autoHideDuration={3000}
        onClose={hideAlert}
        open={open}
      >
        <Alert onClose={hideAlert} severity="error" variant="filled">
          {message}
        </Alert>
      </Snackbar>

      <StartupModal
        onClose={() => setHasSeenWelcome(true)}
        open={!hasSeenWelcome}
      />
    </Paper>
  );
};
