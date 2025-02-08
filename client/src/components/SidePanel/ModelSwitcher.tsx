import { useRef, useMemo, useCallback } from 'react';
import type { SwitcherProps } from '~/common';
import { useGetModelsQuery } from 'librechat-data-provider/react-query';
import ControlCombobox from '~/components/ui/ControlCombobox';
import MinimalIcon from '~/components/Endpoints/MinimalIcon';
import { useLocalize, useSetIndexOptions } from '~/hooks';
import { useChatContext } from '~/Providers';
import { mainTextareaId } from '~/common';

export default function ModelSwitcher({ isCollapsed }: SwitcherProps) {
  const localize = useLocalize();
  const modelsQuery = useGetModelsQuery();
  const { conversation } = useChatContext();
  const { setOption } = useSetIndexOptions();
  const timeoutIdRef = useRef<NodeJS.Timeout>();

  const { endpoint, model = null } = conversation ?? {};
  const models = useMemo(() => {
    return (modelsQuery.data?.[endpoint ?? ''] ?? []).map((model) => ({
      label: model,
      value: model,
    }));
  }, [modelsQuery, endpoint]);

  const setModel = useCallback(
    (model: string) => {
      setOption('model')(model);
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = setTimeout(() => {
        const textarea = document.getElementById(mainTextareaId);
        if (textarea) {
          textarea.focus();
        }
      }, 150);
    },
    [setOption],
  );

  return (
    <ControlCombobox
      displayValue={model ?? ''}
      selectPlaceholder={localize('com_ui_select_model')}
      searchPlaceholder={localize('com_ui_select_search_model')}
      isCollapsed={isCollapsed}
      ariaLabel={'model'}
      selectedValue={model ?? ''}
      setValue={setModel}
      items={models}
      SelectIcon={
        <MinimalIcon
          isCreatedByUser={false}
          endpoint={endpoint}
          // iconURL={} // for future preset icons
        />
      }
    />
  );
}
