import type { FC } from 'react';
import type { TModelSelectProps } from '~/common';
import { EModelEndpoint } from 'librechat-data-provider';
import PluginsByIndex from './PluginsByIndex';
import Anthropic from './Anthropic';
import ChatGPT from './ChatGPT';
import Google from './Google';
import OpenAI from './OpenAI';

export const options: { [key: string]: FC<TModelSelectProps> } = {
  [EModelEndpoint.openAI]: OpenAI,
  [EModelEndpoint.custom]: OpenAI,
  [EModelEndpoint.bedrock]: OpenAI,
  [EModelEndpoint.azureOpenAI]: OpenAI,
  [EModelEndpoint.google]: Google,
  [EModelEndpoint.anthropic]: Anthropic,
  [EModelEndpoint.chatGPTBrowser]: ChatGPT,
};

export const multiChatOptions = {
  ...options,
  [EModelEndpoint.gptPlugins]: PluginsByIndex,
};
