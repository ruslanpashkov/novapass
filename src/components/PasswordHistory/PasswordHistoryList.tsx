import type { FC } from "react";

import { TransitionGroup } from "react-transition-group";
import { Collapse, List } from "@mui/material";

import type { Password } from "../../stores/history";

import { PasswordHistoryItem } from "./PasswordHistoryItem";

interface Props {
  copyPassword: (password: string) => void;
  removePassword: (id: number) => void;
  passwords: Password[];
}

export const PasswordHistoryList: FC<Props> = ({
  removePassword,
  copyPassword,
  passwords,
}) => (
  <List disablePadding>
    <TransitionGroup>
      {passwords.map((password) => (
        <Collapse key={password.id} unmountOnExit mountOnEnter>
          <PasswordHistoryItem
            removePassword={removePassword}
            copyPassword={copyPassword}
            password={password}
          />
        </Collapse>
      ))}
    </TransitionGroup>
  </List>
);
