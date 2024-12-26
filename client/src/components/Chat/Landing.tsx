import { useMemo } from 'react';
import { EModelEndpoint, Constants } from 'librechat-data-provider';
import { useGetEndpointsQuery, useGetStartupConfig } from 'librechat-data-provider/react-query';
import type * as t from 'librechat-data-provider';
import type { ReactNode } from 'react';
import { useChatContext, useAgentsMapContext, useAssistantsMapContext } from '~/Providers';
import { useGetAssistantDocsQuery } from '~/data-provider';
import ConvoIcon from '~/components/Endpoints/ConvoIcon';
import { getIconEndpoint, getEntity, cn } from '~/utils';
import { useAuthContext, useLocalize, useSubmitMessage } from '~/hooks';
import { TooltipAnchor } from '~/components/ui';
import { BirthdayIcon } from '~/components/svg';
import ConvoStarter from './ConvoStarter';

export default function Landing({ Header }: { Header?: ReactNode }) {
  const { conversation, ask } = useChatContext();
  const agentsMap = useAgentsMapContext();
  const assistantMap = useAssistantsMapContext();
  const { data: startupConfig } = useGetStartupConfig();
  const { data: endpointsConfig } = useGetEndpointsQuery();
  const { user } = useAuthContext();
  const suggestions = [
    'Suggest a list of horror movies to watch for movie night',
    'Show me a code snippet of a website\'s sticky header',
    'Explain the plot of Bridge to Terabithia',
    'How to be extroverted if I am an introvert',
  ];

  const localize = useLocalize();

  let { endpoint = '' } = conversation ?? {};

  if (
    endpoint === EModelEndpoint.chatGPTBrowser ||
    endpoint === EModelEndpoint.azureOpenAI ||
    endpoint === EModelEndpoint.gptPlugins
  ) {
    endpoint = EModelEndpoint.openAI;
  }

  const iconURL = conversation?.iconURL;
  endpoint = getIconEndpoint({ endpointsConfig, iconURL, endpoint });
  const { data: documentsMap = new Map() } = useGetAssistantDocsQuery(endpoint, {
    select: (data) => new Map(data.map((dbA) => [dbA.assistant_id, dbA])),
  });

  const { entity, isAgent, isAssistant } = getEntity({
    endpoint,
    agentsMap,
    assistantMap,
    agent_id: conversation?.agent_id,
    assistant_id: conversation?.assistant_id,
  });

  const name = entity?.name ?? '';
  const description = entity?.description ?? '';
  const avatar = isAgent
    ? (entity as t.Agent | undefined)?.avatar?.filepath ?? ''
    : ((entity as t.Assistant | undefined)?.metadata?.avatar as string | undefined) ?? '';
  const conversation_starters = useMemo(() => {
    /* The user made updates, use client-side cache, or they exist in an Agent */
    if (entity && (entity.conversation_starters?.length ?? 0) > 0) {
      return entity.conversation_starters;
    }
    if (isAgent) {
      return entity?.conversation_starters ?? [];
    }

    /* If none in cache, we use the latest assistant docs */
    const entityDocs = documentsMap.get(entity?.id ?? '');
    return entityDocs?.conversation_starters ?? [];
  }, [documentsMap, isAgent, entity]);

  const containerClassName =
    'shadow-stroke relative flex h-full items-center justify-center rounded-full bg-white text-black';

  const { submitMessage } = useSubmitMessage();
  const sendConversationStarter = (text: string) => submitMessage({ text });

  const getWelcomeMessage = () => {
    const greeting = conversation?.greeting ?? '';
    if (greeting) {
      return greeting;
    }

    if (isAssistant) {
      return localize('com_nav_welcome_assistant');
    }

    if (isAgent) {
      return localize('com_nav_welcome_agent');
    }

    const message = localize('com_nav_welcome_message');

    return `${message.slice(0, -1)}, ${user?.name.split(' ')[0]}?`;
  };

  function onSuggestionSelect(suggestion: string) {
    ask({ text: suggestion });
  }

  return (
    <div className="relative h-full">
      <div className="absolute left-0 right-0">{Header != null ? Header : null}</div>
      <div className="flex h-full flex-col items-center justify-center">
        {name ? (
          <div className="flex flex-col items-center gap-0 p-2">
            <div className="text-center text-2xl font-medium text-black dark:text-white">{name}</div>
            <div className="max-w-md text-center text-sm font-normal text-text-primary ">
              {description ? description : localize('com_nav_welcome_message')}
            </div>
            {/* <div className="mt-1 flex items-center gap-1 text-token-text-tertiary">
            <div className="text-sm text-token-text-tertiary">By Daniel Avila</div>
          </div> */}
          </div>
        ) : (
          <h1 className="mb-7 max-w-[75vh] px-12 text-center text-lg md:text-[45px] md:leading-[52px] font-medium dark:text-white md:px-2">
            {getWelcomeMessage()}
          </h1>
        )}
        <div className="grid md:grid-rows-2 md:grid-cols-2 gap-x-[34px] gap-y-[18px]">
          {suggestions.map((suggestion, i) => (
            <div
              className="flex justify-center items-center w-full max-w-[280px] border border-[#585c6e] hover:border-[#777c96] rounded-full group px-10 py-2.5 mx-auto transition-colors duration-300 cursor-pointer"
              onClick={() => onSuggestionSelect(suggestion)}
              onKeyDown={(e) => e.key == 'Enter' && onSuggestionSelect(suggestion)}
              tabIndex={0}
              role="button"
              key={i}
            >
              <p className="text-[#333] dark:text-[#828282] group-hover:text-[#4f4f4f] dark:group-hover:text-[#f2f2f2] text-sm text-center transition-colors duration-300">
                {suggestion}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3 px-4">
          {conversation_starters.length > 0 &&
            conversation_starters
              .slice(0, Constants.MAX_CONVO_STARTERS)
              .map((text: string, index: number) => (
                <ConvoStarter
                  key={index}
                  text={text}
                  onClick={() => sendConversationStarter(text)}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
