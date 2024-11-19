import type { PasswordOptions as PasswordOptionsType } from "@/libs/secure-key-generator";

import { useMemo, type FC } from "react";
import { i18n } from "#i18n";

import { PasswordLengthSlider } from "./PasswordLengthSlider";
import { CheckboxOptionGroup } from "./CheckboxOptionGroup";
import { useFormHandlers } from "../hooks/useFormHandlers";
import { CHECKBOX_OPTIONS } from "../shared/controls";
import { TextInputField } from "./TextInputField";
import { SwitchOption } from "./SwitchOption";

interface Props {
  options: PasswordOptionsType;
  disabled?: boolean;
}

export const PasswordOptions: FC<Props> = ({ disabled, options }) => {
  const {
    handleSkipAmbiguousChange,
    handleCheckboxChange,
    handleExcludeChange,
    handleLengthChange,
  } = useFormHandlers();

  const checkboxOptions = useMemo(
    () =>
      CHECKBOX_OPTIONS.map((option) => ({
        ...option,
        checked: options[option.id as keyof PasswordOptionsType] as boolean,
      })),
    [options],
  );

  return (
    <>
      <CheckboxOptionGroup
        onChange={handleCheckboxChange}
        options={checkboxOptions}
      />

      <SwitchOption
        label={i18n.t("password.skipAmbiguous.label")}
        checked={options.customization.skipAmbiguous}
        onChange={handleSkipAmbiguousChange}
        disabled={disabled}
        id="skipAmbiguous"
      />

      <TextInputField
        placeholder={i18n.t("password.exclude.placeholder")}
        label={i18n.t("password.exclude.label")}
        value={options.customization.exclude}
        onChange={handleExcludeChange}
        disabled={disabled}
        color="primary"
        id="exclude"
        clearable
      />

      <PasswordLengthSlider
        onChange={handleLengthChange}
        length={options.length}
        disabled={disabled}
      />
    </>
  );
};
