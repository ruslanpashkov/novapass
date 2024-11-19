export interface CheckboxData {
  checked: boolean;
  label: string;
  id: string;
}

export interface SwitchData {
  checked: boolean;
  label: string;
  id: string;
}

export interface InputData {
  placeholder: string;
  value: string;
  label: string;
  id: string;
}

export interface SelectEntry {
  label: string;
  value: string;
  id: string;
}

export interface SelectData {
  options: SelectEntry[];
  value: string;
  label: string;
  id: string;
}
