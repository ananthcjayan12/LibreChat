import { useRecoilValue } from 'recoil';
import {
  EdgeVoiceDropdown,
  BrowserVoiceDropdown,
  ExternalVoiceDropdown,
} from '~/components/Audio/Voices';
import { TTSEndpoints } from '~/common';
import store from '~/store';

const voiceDropdownComponentsMap = {
  [TTSEndpoints.edge]: EdgeVoiceDropdown,
  [TTSEndpoints.browser]: BrowserVoiceDropdown,
  [TTSEndpoints.external]: ExternalVoiceDropdown,
};

export default function VoiceDropdown() {
  const engineTTS = useRecoilValue<string>(store.engineTTS);
  const VoiceDropdownComponent = voiceDropdownComponentsMap[engineTTS];

  return <VoiceDropdownComponent />;
}
