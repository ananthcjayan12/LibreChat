import { useState, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import type { Agent, TPreset, TConversation } from 'librechat-data-provider';
import { Constants, QueryKeys, EModelEndpoint,isAgentsEndpoint } from 'librechat-data-provider';
import useDefaultConvo from '~/hooks/Conversations/useDefaultConvo';
import { useAgentsMapContext } from '~/Providers/AgentsMapContext';
import { useChatContext } from '~/Providers/ChatContext';
import { useGetAgentByIdQuery } from '~/data-provider';

export default function useSelectAgent() {
  const queryClient = useQueryClient();
  const getDefaultConversation = useDefaultConvo();
  const { conversation, newConversation } = useChatContext();
  const agentsMap = useAgentsMapContext();
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(
    conversation?.agent_id ?? null,
  );

  const agentQuery = useGetAgentByIdQuery(selectedAgentId ?? '', {
    enabled: !!(selectedAgentId ?? ''),
  });

  const updateConversation = useCallback(
    (agent: Partial<Agent>, template: Partial<TPreset | TConversation>) => {
      if (isAgentsEndpoint(conversation?.endpoint)) {
        const currentConvo = getDefaultConversation({
          conversation: { ...(conversation ?? {}), agent_id: agent.id },
          preset: template,
        });
        newConversation({
          template: currentConvo,
          preset: template as Partial<TPreset>,
          keepLatestMessage: true,
        });
      } else {
        newConversation({
          template: { ...(template as Partial<TConversation>) },
          preset: template as Partial<TPreset>,
        });
      }
    },
    [conversation, getDefaultConversation, newConversation],
  );

  const onSelect = useCallback(
    async (value: string) => {
      const agent = agentsMap?.[value];
      if (!agent) {
        return;
      }

      setSelectedAgentId(agent.id);

      const template: Partial<TPreset | TConversation> = {
        endpoint: EModelEndpoint.agents,
        agent_id: agent.id,
        conversationId: Constants.NEW_CONVO as string,
      };

      updateConversation({ id: agent.id }, template);

      // Fetch full agent data in the background
      try {
        await queryClient.invalidateQueries(
          {
            queryKey: [QueryKeys.agent, agent.id],
            exact: true,
            refetchType: 'active',
          },
          { throwOnError: true },
        );

        const { data: fullAgent } = await agentQuery.refetch();
        if (fullAgent) {
          updateConversation(fullAgent, { ...template, agent_id: fullAgent.id });
        }
      } catch (error) {
        if ((error as { silent: boolean } | undefined)?.silent) {
          console.warn('Current fetch was cancelled');
          return;
        }
        console.error('Error fetching full agent data:', error);
        updateConversation({}, { ...template, agent_id: undefined });
      }
    },
    [agentsMap, updateConversation, queryClient, agentQuery],
  );

  return { onSelect };
}
