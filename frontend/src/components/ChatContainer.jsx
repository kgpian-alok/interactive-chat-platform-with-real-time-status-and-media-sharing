import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore.js";
import ChatHeader from "./ChatHeader.jsx";
import MessageInput from "./MessageInput.jsx";
import MessagesSkeleton from "./skeletons/MessagesSkeleton.jsx";
import { useAuthStore } from "../store/useAuthStore.js";
import { formatMessageTime, formatDividerDate } from "../lib/utils.js";

const groupMessagesByDate = (messages) => {
  if (!messages || messages.length === 0) return {};
  const groupedMessages = {};
  messages.forEach((message) => {
    const dateKey = new Date(message.createdAt).toISOString().split("T")[0];
    if (!groupedMessages[dateKey]) {
      groupedMessages[dateKey] = [];
    }
    groupedMessages[dateKey].push(message);
  });
  return groupedMessages;
};

function ChatContainer() {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  const groupedMessages = groupMessagesByDate(messages);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [
    selectedUser,
    getMessages,
    selectedUser._id,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessagesSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Object.entries(groupedMessages).map(([date, msgsForDay]) => (
          <React.Fragment key={date}>
            {/* Date divider at the center */}
            <div className="divider text-xs text-gray-500 my-4">
              {formatDividerDate(date)}
            </div>

            {msgsForDay.map((message) => (
              <div
                key={message._id}
                className={`chat ${
                  message.senderId === authUser._id ? "chat-end" : "chat-start"
                }`}
              >
                <div className="chat-header mb-1">
                  <time className="text-xs opacity-50 ml-1">
                    {formatMessageTime(message.createdAt)}
                  </time>
                </div>
                <div className="chat-bubble flex flex-col">
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="sm:max-w-[200px] rounded-md mb-2"
                    />
                  )}
                  {message.text && <p>{message.text}</p>}
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
        {/* The last message ref is set here to ensure scrolling works */}
        <div ref={messageEndRef} />
      </div>
      <MessageInput />
    </div>
  );
}

export default ChatContainer;
