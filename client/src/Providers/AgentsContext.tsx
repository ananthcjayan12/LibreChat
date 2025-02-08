import { useContext, createContext } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import type { UseFormReturn } from 'react-hook-form';
import type { AgentForm } from '~/common';
import { defaultAgentFormValues } from 'librechat-data-provider';

type AgentsContextType = UseFormReturn<AgentForm>;

export const AgentsContext = createContext<AgentsContextType>({} as AgentsContextType);

export function useAgentsContext() {
  const context = useContext(AgentsContext);

  if (context === undefined) {
    throw new Error('useAgentsContext must be used within an AgentsProvider');
  }

  return context;
}

export default function AgentsProvider({ children }) {
  const methods = useForm<AgentForm>({
    defaultValues: defaultAgentFormValues,
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}
