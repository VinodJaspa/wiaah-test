import { useSocialControls } from "@blocks/Layout";
import { Menu } from "@headlessui/react";
import ChatInputBox from "@UI/components/shadcn-components/Fields/chatbox";
import ReportDialog from "@UI/components/shadcn-components/ReportDialog";
import SearchBoxInner from "@UI/components/shadcn-components/SearchBox/SearchBoxInner";
import { Ban, BellOff, Flag, MoreVertical } from "lucide-react";
import React, { useState } from "react";

// Mock sidebar message list
const messages = [
  {
    id: 1,
    name: "z.beatz",
    lastMessage: "z.beatz a envoyé une pièce jointe...",
    time: "1h",
    avatar: "https://placehold.co/40x40/f1f5f9/64748b?text=Z",
  },
  {
    id: 2,
    name: "Liam Carter",
    lastMessage: "Vous: See you tomorrow!",
    time: "1h",
    avatar: "https://placehold.co/40x40/f1f5f9/64748b?text=L",
  },
  {
    id: 3,
    name: "Olivia Davis",
    lastMessage: "Vous: Thanks for the recommendation!",
    time: "2h",
    avatar: "https://placehold.co/40x40/f1f5f9/64748b?text=O",
  },
];

// Mock conversation threads
const mockConversations: Record<number, { from: string; text: string }[]> = {
  1: [
    { from: "z.beatz", text: "Hey, check this out 🔥" },
    { from: "Me", text: "Looks great!" },
    { from: "z.beatz", text: "Sent you the file 🚀" },
  ],
  2: [
    { from: "Me", text: "See you tomorrow!" },
    { from: "Liam Carter", text: "Sure thing 👌" },
  ],
  3: [
    { from: "Olivia Davis", text: "Thanks for the recommendation!" },
    { from: "Me", text: "Anytime 🙂" },
  ],
};



// Sidebar item
import { Pencil } from "lucide-react";

// --- Sidebar Item ---
function MessageItem({ message, isActive, onClick }) {
  const { avatar, name, lastMessage, time, unread = 0 } = message;

  return (
    <div
      onClick={onClick}
      className={`group relative flex items-center px-4 py-3 cursor-pointer transition-colors ${
        isActive ? "bg-gray-100" : "hover:bg-gray-50"
      }`}
    >
      {/* Avatar */}
      <img src={avatar} className="w-10 h-10 rounded-full mr-3" />

      {/* Name + Last message */}
      <div className="flex-1 overflow-hidden">
        <div className="text-sm font-semibold truncate">{name}</div>
        <div className="text-xs text-gray-500 truncate">{lastMessage}</div>
      </div>

      {/* Time + unread */}
      <div className="flex flex-col items-end ml-2">
        <span className="text-xs text-gray-400">{time}</span>
        {unread > 0 && (
          <span className="mt-1 bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">
            {unread}
          </span>
        )}
      </div>
    </div>
  );
}

// --- Sidebar with Title & Pencil ---
export default function ChatMessagesSection() {
  const [activeMessageId, setActiveMessageId] = React.useState<number | null>(null);
  const [messagesList, setMessagesList] = React.useState([
    {
      id: 1,
      name: "z.beatz",
      lastMessage: "z.beatz a envoyé une pièce jointe...",
      time: "1h",
      avatar: "https://picsum.photos/seed/1/40/40",
      unread: 2,
    },
    {
      id: 2,
      name: "Liam Carter",
      lastMessage: "Vous: See you tomorrow!",
      time: "1h",
      avatar: "https://picsum.photos/seed/2/40/40",
      unread: 0,
    },
    {
      id: 3,
      name: "Olivia Davis",
      lastMessage: "Vous: Thanks for the recommendation!",
      time: "2h",
      avatar: "https://picsum.photos/seed/3/40/40",
      unread: 1,
    },
  ]);

  return (
    <div className="flex h-screen font-[Inter] bg-white">
      {/* Sidebar */}
      <div className="w-full md:w-[320px] border-r border-gray-200 flex flex-col">
        {/* Title + Pencil */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h1 className="text-lg font-bold">Messages</h1>
          <button className="p-1 rounded-full hover:bg-gray-100">
            <Pencil className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Search */}
        <SearchBoxInner className="m-3" placeholder="Search reservation" />

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {messagesList.map((message) => (
            <MessageItem
              key={message.id}
              message={message}
              isActive={activeMessageId === message.id}
              onClick={() => setActiveMessageId(message.id)}
            />
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {activeMessageId ? (
          <ChatRoom
            chat={[]} // just placeholder for now
            name={messagesList.find((m) => m.id === activeMessageId)?.name || "Unknown"}
            avatar={messagesList.find((m) => m.id === activeMessageId)?.avatar || ""}
          />
        ) : (
          <MainChatView />
        )}
      </div>
    </div>
  );
}


// Placeholder view
function MainChatView() {
  const { msgNewUser } = useSocialControls("msgNewUser");

  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center justify-center text-center px-6 py-12 rounded-2xl shadow-sm bg-white max-w-md">

        {/* Icon Container */}
        <div className="flex items-center justify-center w-24 h-24 mb-6 rounded-full bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-500"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <path d="M8 10h.01" />
            <path d="M12 10h.01" />
            <path d="M16 10h.01" />
          </svg>
        </div>

        {/* Heading */}
        <h2 className="text-lg md:text-2xl font-semibold text-gray-900 mb-2">
          Your Messages
        </h2>

        {/* Subtext */}
        <p className="text-gray-500 text-sm md:text-base mb-6 leading-relaxed">
          Stay connected and never miss a conversation. Select a person to
          start chatting now.
        </p>

        {/* CTA Button */}
        <button
          onClick={msgNewUser}
          className="bg-black text-white text-sm md:text-base px-6 py-3 rounded-full font-medium shadow-md transition-colors hover:bg-gray-800"
        >
          Select Person
        </button>
      </div>
    </div>
  );
}



// Chat Room
function ChatRoom({ chat, name, avatar }) {
  const bottomRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]); // whenever chat changes, scroll to bottom


  const handleItemClick = (item: { id: string; title: string }) => {
    console.log("Selected:", item.id, item.title);
    // 🔥 Do something, like call API
  };
  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="flex items-center mb-6 pr-2 pl-2  border-gray-200 bg-white">
        <img src={avatar} className="w-10 h-10 rounded-full mr-3" />
        <h2 className="font-semibold text-lg">{name}</h2>
      </div>

      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {chat.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.from === "Me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`group relative px-4 py-2 rounded-2xl max-w-xs ${msg.from === "Me"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
                }`}
            >
              {msg.text}

              {/* Dropdown Menu */}
              <Menu as="div" className="absolute top-1 right-1 text-left">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Menu.Button className="p-1 rounded-full hover:bg-black/10 focus:outline-none">
                    <MoreVertical className="w-4 h-4" />
                  </Menu.Button>
                </div>

                <Menu.Items className="absolute right-0 mt-1 w-40 rounded-md bg-white shadow-lg ring-1 ring-black/10 focus:outline-none z-10">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${active ? "bg-gray-100" : ""
                            } w-full text-left px-4 py-2 text-sm text-gray-700`}
                          onClick={() => console.log("Reply to:", msg.id)}
                        >
                          Reply
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${active ? "bg-gray-100" : ""
                            } w-full text-left px-4 py-2 text-sm text-gray-700`}
                          onClick={() => console.log("Report:", msg.id)}
                        >
                          Report
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${active ? "bg-gray-100" : ""
                            } w-full text-left px-4 py-2 text-sm text-red-600`}
                          onClick={() => console.log("Delete:", msg.id)}
                        >
                          Delete
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Menu>
            </div>
          </div>
        ))}

        {/* bottom anchor */}
        <div ref={bottomRef} />
      </div>


      {/* Input */}
      <ChatInputBox onSend={(msg) => console.log("Message sent:", msg)} />

    </div>
  );
}
