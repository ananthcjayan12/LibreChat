import type {
  TPreset,
  TConversation,
  TModelsConfig,
  TEndpointsConfig,
} from 'librechat-data-provider';
import { useGetModelsQuery } from 'librechat-data-provider/react-query';
import { buildDefaultConvo, getDefaultEndpoint } from '~/utils';
import { useGetEndpointsQuery } from '~/data-provider';

type TDefaultConvo = { conversation: Partial<TConversation>; preset?: Partial<TPreset> | null };

const useDefaultConvo = () => {
  const { data: endpointsConfig = {} as TEndpointsConfig } = useGetEndpointsQuery();
  const { data: modelsConfig = {} as TModelsConfig } = useGetModelsQuery();

  const getDefaultConversation = ({ conversation, preset }: TDefaultConvo) => {
    const endpoint = getDefaultEndpoint({
      convoSetup: preset as TPreset,
      endpointsConfig,
    });
    // @ts-ignore
    const models = modelsConfig[endpoint] || [];

    return buildDefaultConvo({
      conversation: conversation as TConversation,
      // @ts-ignore
      endpoint,
      lastConversationSetup: preset as TConversation,
      models,
    });
  };

  return getDefaultConversation;
};

export default useDefaultConvo;
