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
      { label: 'ChatGPT 3.5', value: 'openai/gpt-3.5-turbo' },
      { label: 'ChatGPT 4', value: 'openai/gpt-4' },
      { label: 'ChatGPT 4o', value: 'openai/gpt-4o' },
      { label: 'OpenAI: o1 Preview', value: 'openai/o1-preview' },
      { label: 'Gemini Pro', value: 'google/gemini-pro' },
      { label: 'Mistral Tiny', value: 'mistralai/mistral-tiny' },
      { label: 'Mistral Large', value: 'mistralai/mistral-large' },
      { label: 'Anthropic Claude 3 Haiku', value: 'anthropic/claude-3-haiku' },
      { label: 'Anthropic Claude 3.5 Haiku', value: 'anthropic/claude-3-5-haiku' },
      { label: 'Anthropic Claude 3 Sonnet', value: 'anthropic/claude-3-sonnet' },
      { label: 'Anthropic Claude 3.5 Sonnet', value: 'anthropic/claude-3.5-sonnet' },
      { label: 'Anthropic Claude 3 Opus', value: 'anthropic/claude-3-opus' },
      { label: 'Perplexity PPLX 7B Online', value: 'perplexity/pplx-7b-online' },
      { label: 'Perplexity PPLX 70B Online', value: 'perplexity/pplx-70b-online' },
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
