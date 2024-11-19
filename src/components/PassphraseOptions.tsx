import type {
  PassphraseOptions as PassphraseOptionsType,
  WordStyle,
} from "@/libs/secure-key-generator";
import type { FC } from "react";

import { i18n } from "#i18n";

import { useFormHandlers } from "../hooks/useFormHandlers";
import { WordCountSlider } from "./WordCountSlider";
import { SELECT_OPTIONS } from "../shared/controls";
import { TextInputField } from "./TextInputField";
import { SwitchOption } from "./SwitchOption";
import { SelectOption } from "./SelectOption";

interface Props {
  options: PassphraseOptionsType;
  disabled?: boolean;
}

export const PassphraseOptions: FC<Props> = ({ disabled, options }) => {
  const {
    handleIncludeNumberChange,
    handleWordCountChange,
    handleSeparatorChange,
    handleWordStyleChange,
  } = useFormHandlers();

  return (
    <>
      <WordCountSlider
        onChange={handleWordCountChange}
        wordCount={options.wordCount}
        disabled={disabled}
      />

      <TextInputField
        placeholder={i18n.t("passphrase.separator.placeholder")}
        label={i18n.t("passphrase.separator.label")}
        onChange={handleSeparatorChange}
        value={options.separator}
        color="primary"
        id="separator"
      />

      <SelectOption
        onChange={(value: string) => {
          handleWordStyleChange(value as WordStyle);
        }}
        label={i18n.t("passphrase.style.label")}
        options={SELECT_OPTIONS}
        value={options.style}
        disabled={disabled}
        id="style"
      />

      <SwitchOption
        label={i18n.t("passphrase.includeNumber.label")}
        onChange={handleIncludeNumberChange}
        checked={options.includeNumber}
        disabled={disabled}
        id="includeNumber"
      />
    </>
  );
};
