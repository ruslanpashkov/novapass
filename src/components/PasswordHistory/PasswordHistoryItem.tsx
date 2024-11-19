import type { FC } from "react";

import {
  ContentCopy as ContentCopyIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";
import {
  ListItemText,
  IconButton,
  ListItem,
  Tooltip,
  Stack,
} from "@mui/material";
import { i18n } from "#i18n";

import type { Password } from "../../stores/history";

import { useHighlightEffect } from "../../hooks/useHighlightEffect";

interface Props {
  copyPassword: (password: string) => void;
  removePassword: (id: number) => void;
  password: Password;
}

export const PasswordHistoryItem: FC<Props> = ({
  removePassword,
  copyPassword,
  password,
}) => {
  const { triggerHighlight, isHighlighted } = useHighlightEffect({
    onHighlight: () => copyPassword(password.value),
  });

  const formatDate = (dateString: string) =>
    new Intl.DateTimeFormat("default", {
      minute: "2-digit",
      year: "numeric",
      hour: "2-digit",
      month: "short",
      day: "numeric",
    }).format(new Date(dateString));

  return (
    <ListItem
      secondaryAction={
        <Stack direction="row" spacing={1}>
          <Tooltip
            slotProps={{
              popper: {
                modifiers: [
                  {
                    options: {
                      offset: [0, -12],
                    },
                    name: "offset",
                  },
                ],
              },
            }}
            title={i18n.t("history.success")}
            open={isHighlighted}
          >
            <IconButton
              color={isHighlighted ? "success" : "default"}
              aria-label={i18n.t("history.copy")}
              sx={{ transition: "color 0.3s" }}
              onClick={triggerHighlight}
              type="button"
              size="small"
            >
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <IconButton
            onClick={() => removePassword(password.id)}
            aria-label={i18n.t("history.remove")}
            color="default"
            type="button"
            size="small"
          >
            <ClearIcon fontSize="small" />
          </IconButton>
        </Stack>
      }
      sx={{ pr: 12 }}
      divider
    >
      <ListItemText
        primaryTypographyProps={{
          style: {
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
          },
          variant: "subtitle1",
        }}
        secondary={formatDate(password.createdAt)}
        primary={password.value}
      />
    </ListItem>
  );
};
