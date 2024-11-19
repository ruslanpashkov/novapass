import type { SxProps } from "@mui/material";
import type { FC } from "react";

import {
  InputAdornment,
  OutlinedInput,
  FormControl,
  InputLabel,
  Button,
  Fade,
  Grow,
  Box,
} from "@mui/material";
import {
  ContentCopy as ContentCopyIcon,
  Done as DoneIcon,
} from "@mui/icons-material";
import { i18n } from "#i18n";

import type { GenerationMode } from "../stores/generator";

import { useHighlightEffect } from "../hooks/useHighlightEffect";
import { PasswordStrengthBar } from "./PasswordStrengthBar";

interface Props {
  updatePassword: (password: string) => void;
  copyPassword: (password: string) => void;
  addPassword: (password: string) => void;
  mode: GenerationMode;
  disabled: boolean;
  password: string;
}

const FONT_WEIGHT = 700;
const FIELD_HEIGHT = "56px";
const ICON_SIZE = "24px";
const ICON_STYLES: SxProps = {
  justifyContent: "center",
  position: "absolute",
  alignItems: "center",
  display: "flex",
  height: "100%",
  width: "100%",
};

export const PasswordField: FC<Props> = ({
  updatePassword,
  copyPassword,
  addPassword,
  disabled,
  password,
  mode,
}) => {
  const { triggerHighlight, isHighlighted } = useHighlightEffect({
    onHighlight: () => {
      copyPassword(password);
      addPassword(password);
    },
  });

  const suggestion =
    mode === "passphrase"
      ? i18n.t("passphrase.suggestion")
      : i18n.t("password.suggestion");

  const label = disabled ? suggestion : i18n.t("generate.personalized");

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updatePassword(event.target.value);
  };

  const onPasswordCopy = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    triggerHighlight();
  };

  const isCopyButtonDisabled = disabled || password.length === 0;
  const isStrengthBarVisible = !disabled && password.length > 0;

  return (
    <Box sx={{ position: "relative" }}>
      <FormControl variant="outlined" fullWidth>
        <InputLabel sx={{ fontWeight: FONT_WEIGHT }}>{label}</InputLabel>

        <OutlinedInput
          endAdornment={
            <InputAdornment position="end">
              <Button
                sx={{
                  height: FIELD_HEIGHT,
                  position: "relative",
                  width: FIELD_HEIGHT,
                }}
                color={isHighlighted ? "success" : "primary"}
                disabled={isCopyButtonDisabled}
                aria-label={i18n.t("copy")}
                onClick={onPasswordCopy}
                type="button"
              >
                <Box
                  sx={{
                    position: "relative",
                    height: ICON_SIZE,
                    width: ICON_SIZE,
                  }}
                >
                  <Grow
                    in={!isHighlighted}
                    timeout={300}
                    unmountOnExit
                    mountOnEnter
                  >
                    <ContentCopyIcon sx={ICON_STYLES} />
                  </Grow>

                  <Grow
                    in={isHighlighted}
                    timeout={300}
                    unmountOnExit
                    mountOnEnter
                  >
                    <DoneIcon sx={ICON_STYLES} />
                  </Grow>
                </Box>
              </Button>
            </InputAdornment>
          }
          sx={{
            fontWeight: FONT_WEIGHT,
            height: FIELD_HEIGHT,
            pr: 0,
          }}
          aria-label={i18n.t("current")}
          onChange={onPasswordChange}
          disabled={disabled}
          value={password}
          role="textbox"
          label={label}
          fullWidth
        />
      </FormControl>

      <Fade in={isStrengthBarVisible} unmountOnExit mountOnEnter>
        <Box>
          <PasswordStrengthBar password={password} />
        </Box>
      </Fade>
    </Box>
  );
};
