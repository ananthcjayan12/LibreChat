import type { DynamicSettingProps } from 'librechat-data-provider';
import {
  DynamicTags,
  DynamicInput,
  DynamicSlider,
  DynamicSwitch,
  DynamicCheckbox,
  DynamicCombobox,
  DynamicDropdown,
  DynamicTextarea,
} from './';
import { ComponentTypes } from 'librechat-data-provider';

export const componentMapping: Record<
  ComponentTypes,
  React.ComponentType<DynamicSettingProps> | undefined
> = {
  [ComponentTypes.Slider]: DynamicSlider,
  [ComponentTypes.Dropdown]: DynamicDropdown,
  [ComponentTypes.Switch]: DynamicSwitch,
  [ComponentTypes.Textarea]: DynamicTextarea,
  [ComponentTypes.Input]: DynamicInput,
  [ComponentTypes.Checkbox]: DynamicCheckbox,
  [ComponentTypes.Tags]: DynamicTags,
  [ComponentTypes.Combobox]: DynamicCombobox,
};
