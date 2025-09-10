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

export default function ChatMessagesSection() {
  const [activeMessageId, setActiveMessageId] = React.useState<number | null>(null);
  const [messagesList, setMessagesList] = React.useState(messages); // sidebar messages
  const [conversations, setConversations] = React.useState(mockConversations);

  const { value: chatRoomId } = useSocialControls("chatRoomId"); // 👈 listen to chatRoomId

  // When chatWith is called → set active chat
  React.useEffect(() => {
    if (!chatRoomId) return;

    const existingChat = messagesList.find((m) => m.id === Number(chatRoomId));

    // If chat doesn’t exist yet → add a new one
    if (!existingChat) {
      const newChat = {
        id: Number(chatRoomId),
        name: `User ${chatRoomId}`, // replace with real user data if available
        lastMessage: "Start a new conversation...",
        time: "now",
        avatar: `https://placehold.co/40x40/f1f5f9/64748b?text=U${chatRoomId}`,
      };

      setMessagesList((prev) => [...prev, newChat]);
      setConversations((prev) => ({
        ...prev,
        [chatRoomId]: [],
      }));
    }

    setActiveMessageId(Number(chatRoomId));
  }, [chatRoomId, messagesList]);


  return (
    <div className="flex flex-col md:flex-row h-screen font-[Inter] bg-white">
      {/* Sidebar */}
      <div className="flex-none w-full md:w-[350px] border-r border-gray-200 bg-white flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold">Messages</h1>
        </div>

        <SearchBoxInner
          className="p-6 bg-white shadow-lg rounded-md"
          placeholder="Search People"
        />

        <div className="flex-1 overflow-y-auto">
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
      </div>

      {/* Chat window */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {activeMessageId ? (
          <ChatRoom
            chat={conversations[activeMessageId] || []} // ✅ only this chat’s messages
            name={messagesList.find((m) => m.id === activeMessageId)?.name || "Unknown"}
            avatar={messagesList.find((m) => m.id === activeMessageId)?.avatar || ""}
          // onSendMessage={handleSendMessage}
          />
        ) : (
          <MainChatView />
        )}

      </div>
    </div>
  );
}

// Sidebar item
function MessageItem({ message, isActive, onClick }) {
  const { avatar, name, lastMessage, time } = message;
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleItemClick = (item: { id: string; title: string }) => {
    console.log("Selected:", item.id, item.title);
    // 🔥 Do something, like call API
  };
  const reportItems = [
    {
      id: "report",
      icon: <Flag className="w-5 h-5" />,
      title: "Report",
      description: "Report this conversation",
    },
    {
      id: "mute",
      icon: <BellOff className="w-5 h-5" />,
      title: "Mute Conversation",
      description: "Stop receiving messages from this conversation",
    },
    {
      id: "block",
      icon: <Ban className="w-5 h-5" />,
      title: "Block",
      description: "This person will no longer be able to contact you",
    },
  ];
  return (
    <div
      onClick={onClick}
      className={`group relative flex items-center px-6 py-4 cursor-pointer transition-colors ${isActive ? "bg-gray-100" : "hover:bg-gray-50"
        }`}
    >
      {/* Avatar */}
      <img src={avatar} className="w-10 h-10 rounded-full mr-4" />

      {/* Text content */}
      <div className="flex-1 overflow-hidden">
        <div className="text-sm font-semibold truncate">{name}</div>
        <div className="text-xs text-gray-500 truncate">{lastMessage}</div>
      </div>

      {/* Time */}
      <div className="flex-none text-xs text-gray-400 self-start mt-1 ml-2">
        {time}
      </div>

      {/* Dropdown Menu (hidden until hover) */}
      <Menu as="div" className="absolute top-1 right-1">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <Menu.Button
            onClick={(e) => {
              e.stopPropagation()
              setDialogOpen(true)
            }} // prevent triggering onClick
            className="p-1 rounded-full hover:bg-black/10 focus:outline-none"
          >
            <MoreVertical className="w-4 h-4 text-gray-500" />
          </Menu.Button>
        </div>

      </Menu>
      {/* Report / Block / Mute Dialog */}
      <ReportDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        title="Message options"
        items={reportItems}
        onItemClick={handleItemClick}
      />
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
