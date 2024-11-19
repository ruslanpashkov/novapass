import type { FC } from "react";

import { Collapse, Drawer, Fade, Box } from "@mui/material";

import { useHistoryUIStore, useHistoryStore } from "../../stores";
import { PasswordHistoryFooter } from "./PasswordHistoryFooter";
import { EmptyHistoryMessage } from "./EmptyHistoryMessage";
import { PasswordHistoryList } from "./PasswordHistoryList";

interface Props {
  copyPassword: (password: string) => void;
}

export const PasswordHistory: FC<Props> = ({ copyPassword }) => {
  const { removePassword, clearHistory, passwords } = useHistoryStore();
  const { hideHistory, open } = useHistoryUIStore();

  const hasPasswords = passwords.length > 0;

  return (
    <Drawer onClose={hideHistory} anchor="right" open={open}>
      <Box
        sx={{
          flexDirection: "column",
          position: "relative",
          display: "flex",
          height: "100%",
          width: "100vw",
        }}
      >
        <Collapse
          sx={{
            display: hasPasswords ? "block" : "none",
            overflowY: "auto",
            flex: 1,
          }}
          in={hasPasswords}
          timeout={300}
          unmountOnExit
          mountOnEnter
        >
          <PasswordHistoryList
            removePassword={removePassword}
            copyPassword={copyPassword}
            passwords={passwords}
          />
        </Collapse>

        <Fade in={!hasPasswords} timeout={300} unmountOnExit mountOnEnter>
          <Box sx={{ flex: 1 }}>
            <EmptyHistoryMessage />
          </Box>
        </Fade>

        <PasswordHistoryFooter
          clearHistory={clearHistory}
          hasPasswords={hasPasswords}
          hideHistory={hideHistory}
        />
      </Box>
    </Drawer>
  );
};
