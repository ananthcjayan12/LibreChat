import { useMemo } from 'react';
import { ToolCallResult } from 'librechat-data-provider';
import { useGetToolCalls } from '~/data-provider';
import { logger, mapToolCalls } from '~/utils';

type ToolCallsMap = {
  [x: string]: ToolCallResult[] | undefined;
};

export default function useToolCallsMap({
  conversationId,
}: {
  conversationId: string;
}): ToolCallsMap | undefined {
  const { data: toolCallsMap = null } = useGetToolCalls(
    { conversationId },
    {
      select: (res) => mapToolCalls(res),
    },
  );

  const result = useMemo<ToolCallsMap | undefined>(() => {
    return toolCallsMap !== null ? toolCallsMap : undefined;
  }, [toolCallsMap]);

  logger.log('tools', 'tool calls map:', result);
  return result;
}
