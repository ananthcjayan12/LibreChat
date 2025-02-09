import React from 'react';
import { useRecoilState } from 'recoil';
import { Dropdown } from '~/components/ui';
import { useLocalize } from '~/hooks';
import store from '~/store';

interface EngineTTSDropdownProps {
  external: boolean;
}

const EngineTTSDropdown: React.FC<EngineTTSDropdownProps> = ({ external }) => {
  const localize = useLocalize();
  const [engineTTS, setEngineTTS] = useRecoilState<string>(store.engineTTS);

  const endpointOptions = external
    ? [
      { value: 'browser', label: localize('com_nav_browser') },
      { value: 'edge', label: localize('com_nav_edge') },
      { value: 'external', label: localize('com_nav_external') },
    ]
    : [
      { value: 'browser', label: localize('com_nav_browser') },
      { value: 'edge', label: localize('com_nav_edge') },
    ];

  const handleSelect = (value: string) => {
    setEngineTTS(value);
  };

  return (
    <div className="flex items-center justify-between">
      <div>{localize('com_nav_engine')}</div>
      <Dropdown
        value={engineTTS}
        onChange={handleSelect}
        options={endpointOptions}
        sizeClasses="w-[180px]"
        // @ts-ignore
        anchor="bottom start"
        testId="EngineTTSDropdown"
      />
    </div>
  );
};

export default EngineTTSDropdown;
