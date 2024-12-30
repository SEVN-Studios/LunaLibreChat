import { useGetModelsQuery } from 'librechat-data-provider/react-query';
import { EModelEndpoint, type TConversation } from 'librechat-data-provider';
import type { Option, TSetOption } from '~/common';
import { multiChatOptions } from './options';

type TGoogleProps = {
  showExamples: boolean;
  isCodeChat: boolean;
};

type TSelectProps = {
  conversation: TConversation | null;
  setOption: TSetOption;
  extraProps?: TGoogleProps;
  showAbove?: boolean;
  popover?: boolean;
};

export default function ModelSelect({
  conversation,
  setOption,
  popover = false,
  showAbove = true,
}: TSelectProps) {
  const modelsQuery = useGetModelsQuery();

  if (!conversation?.endpoint) {
    return null;
  }

  const { endpoint: _endpoint, endpointType } = conversation;
  let models: string[] | Option[] = modelsQuery?.data?.[_endpoint] ?? [];
  const endpoint = endpointType ?? _endpoint;

  if ((endpoint as string) == 'custom') {
    models = [
      { label: 'ChatGPT 4o', value: 'openai/gpt-4o' },
      { label: 'ChatGPT 4o mini', value: 'openai/gpt-4o-mini' },
      // { label: 'ChatGPT o1-Preview', value: 'openai/o1-preview' },
      { label: 'ChatGPT o1 mini', value: 'openai/o1-mini' },
      { label: 'ChatGPT 4', value: 'openai/gpt-4' },
      { label: 'Gemini Pro 1.5', value: 'google/gemini-pro-1.5' },
      { label: 'Gemini Flash 1.5', value: 'google/gemini-flash-1.5' },
      { label: 'Gemini Flash 2.0 Experimental', value: 'google/gemini-2.0-flash-exp:free' },
      { label: 'Anthropic Claude 3.5 Haiku', value: 'anthropic/claude-3-5-haiku' },
      { label: 'Anthropic Claude 3.5 Sonnet', value: 'anthropic/claude-3.5-sonnet' },
      { label: 'Anthropic Claude 3 Haiku', value: 'anthropic/claude-3-haiku' },
      { label: 'Anthropic Claude 3 Sonnet', value: 'anthropic/claude-3-sonnet' },
      { label: 'Anthropic Claude 3 Opus', value: 'anthropic/claude-3-opus' },
      { label: 'Perplexity: Llama 3.1 Sonar 8B Online', value: 'perplexity/llama-3.1-sonar-small-128k-online' },
      { label: 'Perplexity: Llama 3.1 Sonar 70B Online', value: 'perplexity/llama-3.1-sonar-large-128k-online' },
    ];
  }

  const OptionComponent = multiChatOptions[endpoint];

  if (!OptionComponent) {
    return null;
  }

  return (
    <OptionComponent
      conversation={conversation}
      setOption={setOption}
      models={models}
      showAbove={showAbove}
      popover={popover}
    />
  );
}
