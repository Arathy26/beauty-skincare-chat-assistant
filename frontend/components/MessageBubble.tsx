import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message } from '../types';
import { formatTime } from '../utils/timeUtils';
import { markdownComponents } from '../utils/markdownComponents';
import { useChatActions } from '../context/ChatContext';
import { useUIState } from '../hooks/useUIState';
import { MessageActionMenu } from './MessageActionMenu';
import { Droplet, User } from './Icons';

// Simple initial avatar — swap for a real profile photo if auth is added later

interface MessageBubbleProps {
  message: Message;
  chatId: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, chatId }) => {
  const isAI = message.role === 'ai';
  const [isEditing, setIsEditing] = React.useState(false);
  const [draftContent, setDraftContent] = React.useState(message.content);
  const editTextareaRef = React.useRef<HTMLTextAreaElement>(null);
  const { compactMode } = useUIState();

  const { handleCopyMessage, handleDeleteMessage, handleEditMessage, handleRegenerateMessage } =
    useChatActions();

  // Auto-focus + auto-size textarea on entering edit mode
  React.useLayoutEffect(() => {
    if (isEditing && editTextareaRef.current) {
      const el = editTextareaRef.current;
      el.focus();
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    }
  }, [isEditing]);

  const handleSaveEdit = React.useCallback(() => {
    if (draftContent.trim()) {
      handleEditMessage(chatId, message.id, draftContent.trim());
      setIsEditing(false);
    }
  }, [draftContent, chatId, message.id, handleEditMessage]);

  const handleCancelEdit = React.useCallback(() => {
    setDraftContent(message.content);
    setIsEditing(false);
  }, [message.content]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); handleSaveEdit(); }
      if (e.key === 'Escape')                             { e.preventDefault(); handleCancelEdit(); }
    },
    [handleSaveEdit, handleCancelEdit]
  );

  return (
    <div className={`w-full flex ${isAI ? 'justify-start' : 'justify-end'} ${compactMode ? 'mb-2' : 'mb-4'} animate-fade-in-up`}>
      <div className={`flex gap-2 ${isAI ? 'flex-row' : 'flex-row-reverse'} max-w-2xl group`}>

        {/* Avatar */}
        <div className="flex-shrink-0 mt-1">
          {isAI ? (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center shadow-sm">
              <Droplet size={16} className="text-white" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center shadow-sm">
              <User size={16} className="text-white" strokeWidth={2.5} />
            </div>
          )}
        </div>

        {/* Message wrapper */}
        <div className="flex flex-col gap-1">
          {/* Content box */}
          <div className={`${
            isAI
              ? 'bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800/80 border border-gray-200/60 dark:border-gray-700/50'
              : 'bg-gradient-to-br from-pink-500 to-pink-600 dark:from-pink-500 dark:to-pink-700'
          } rounded-2xl px-4 py-2.5 max-w-xl shadow-sm`}>

            {/* Header: name · timestamp · edited badge */}
            <div className={`flex items-baseline gap-2 mb-1 text-xs ${isAI ? 'text-gray-500 dark:text-gray-400' : 'text-pink-100 dark:text-pink-200'}`}>
              <span className={`font-semibold text-sm ${isAI ? 'text-gray-800 dark:text-gray-200' : 'text-white'}`}>
                      {isAI ? 'Glo' : 'You'}
              </span>
              <span>{formatTime(message.timestamp)}</span>
              {message.isEdited && <span className="italic">(edited)</span>}
            </div>

            {/* Body */}
            {isEditing && !isAI ? (
              <div className="w-full">
                <textarea
                  ref={editTextareaRef}
                  value={draftContent}
                  onChange={(e) => setDraftContent(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full px-3 py-2 text-sm text-gray-900 dark:text-white bg-pink-50 dark:bg-gray-700 border border-pink-400 rounded-md font-mono resize-none focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <div className="flex gap-2 mt-2">
                  <button onClick={handleSaveEdit} type="button"
                    className="px-3 py-1 text-xs bg-pink-500 hover:bg-pink-600 text-white rounded-md transition-colors">
                    Save
                  </button>
                  <button onClick={handleCancelEdit} type="button"
                    className="px-3 py-1 text-xs bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-pink-500 text-gray-900 dark:text-white rounded-md transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className={`text-sm leading-relaxed ${isAI ? 'text-gray-700 dark:text-gray-300' : 'text-white'}`}>
                {isAI ? (
                  <ReactMarkdown components={markdownComponents}>{message.content}</ReactMarkdown>
                ) : (
                  <div className="whitespace-pre-wrap">{message.content}</div>
                )}
              </div>
            )}

            {/* Streaming cursor */}
            {message.isStreaming && (
              <span className="inline-block w-0.5 h-4 bg-pink-400 ml-0.5 align-middle animate-pulse" aria-label="AI is typing" />
            )}
          </div>

          {/* Action menu */}
          {!message.isStreaming && !isEditing && (
            <div className={`flex ${isAI ? 'justify-start' : 'justify-end'} px-2 opacity-0 group-hover:opacity-100 transition-opacity`}>
              <MessageActionMenu
                messageId={message.id}
                chatId={chatId}
                isAIMessage={isAI}
                onCopy={handleCopyMessage}
                onEdit={!isAI ? () => setIsEditing(true) : undefined}
                onDelete={handleDeleteMessage}
                onRegenerate={handleRegenerateMessage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
