import { memo, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useGetMessagesByConvoId } from 'librechat-data-provider/react-query';
import { motion } from 'framer-motion';
import type { ChatFormValues } from '~/common';
import { ChatContext, AddedChatContext, useFileMapContext, ChatFormProvider } from '~/Providers';
import { useChatHelpers, useAddedResponse, useSSE } from '~/hooks';
import MessagesView from './Messages/MessagesView';
import { Spinner } from '~/components/svg';
import Presentation from './Presentation';
import ChatForm from './Input/ChatForm';
import { buildTree } from '~/utils';
import Landing from './Landing';
import Header from './Header';
import Footer from './Footer';
import store from '~/store';

function ChatView({ index = 0 }: { index?: number }) {
  const { conversationId } = useParams();
  const rootSubmission = useRecoilValue(store.submissionByIndex(index));
  const addedSubmission = useRecoilValue(store.submissionByIndex(index + 1));
  const [isStreaming, setIsStreaming] = useState(true);

  const fileMap = useFileMapContext();

  const { data: messagesTree = null, isLoading } = useGetMessagesByConvoId(conversationId ?? '', {
    select: (data) => {
      const dataTree = buildTree({ messages: data, fileMap });
      return dataTree?.length === 0 ? null : dataTree ?? null;
    },
    enabled: !!fileMap,
  });

  const chatHelpers = useChatHelpers(index, conversationId);
  const addedChatHelpers = useAddedResponse({ rootIndex: index });

  useSSE(rootSubmission, chatHelpers, false);
  useSSE(addedSubmission, addedChatHelpers, true);

  const methods = useForm<ChatFormValues>({
    defaultValues: { text: '' },
  });

  useEffect(() => setIsStreaming(chatHelpers.isSubmitting), [chatHelpers.isSubmitting]);

  let content: JSX.Element | null | undefined;
  if (isLoading && conversationId !== 'new') {
    content = (
      <div className="flex h-screen items-center justify-center z-[1]">
        <Spinner className="opacity-0" />
      </div>
    );
  } else if (messagesTree && messagesTree.length !== 0) {
    content = <MessagesView messagesTree={messagesTree} Header={<Header />} />;
  } else {
    content = <Landing Header={<Header />} />;
  }

  return (
    <ChatFormProvider {...methods}>
      <ChatContext.Provider value={chatHelpers}>
        <AddedChatContext.Provider value={addedChatHelpers}>
          <Presentation mainClass='h-screen overflow-hidden relative' useSidePanel={true}>
            <div className="w-full h-full fixed bottom-0 left-0">
              <motion.div
                className={[
                  'w-[1028px] h-[1028px] bg-[radial-gradient(50%_50%_at_50%_100%,_rgba(70,60,255,1)_0%,_rgba(70,60,255,0.00)_100%)] mx-auto absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none',
                  isStreaming ? 'animate-stream-bg': '',
                ].join(' ')}
                animate={{ opacity: chatHelpers.isSubmitting ? 0.8: 0.45 }}
                transition={{ duration: 0.8 }}
              ></motion.div>
              <div
                className={[
                  'w-full h-[50vh] origin-bottom absolute bottom-0 pointer-events-none',
                  chatHelpers.isSubmitting ? 'animate-stream-orb-bg': 'hidden',
                ].join(' ')}
              >
                <div
                  className={[
                    'w-[100px] h-[100px] bg-[rgba(70,60,255,0.6)] blur-3xl rounded-full absolute top-20 left-1/2',
                    isStreaming ? 'animate-stream-orb': '',
                  ].join(' ')}>
                </div>
              </div>
            </div>
            {content}
            <div className="w-full border-t-0 pl-0 pt-2 dark:border-white/20 md:w-[calc(100%-.5rem)] md:border-t-0 md:border-transparent md:pl-0 md:pt-0 md:dark:border-transparent">
              <ChatForm index={index} />
              {/* <Footer /> */}
            </div>
          </Presentation>
        </AddedChatContext.Provider>
      </ChatContext.Provider>
    </ChatFormProvider>
  );
}

export default memo(ChatView);
