
import SearchBoxInner from '@UI/components/shadcn-components/SearchBox/SearchBoxInner';
import React from 'react';

// Main App component
export default function ChatMessagesSection() {
  // Mock data for the message list
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
    {
      id: 4,
      name: "Noah Evans",
      lastMessage: "Vous: Happy Birthday!",
      time: "1h",
      avatar: "https://placehold.co/40x40/f1f5f9/64748b?text=N",
    },
    {
      id: 5,
      name: "Ava Foster",
      lastMessage: "Vous: Let's catch up soon.",
      time: "2 min.",
      avatar: "https://placehold.co/40x40/f1f5f9/64748b?text=A",
    },
    {
      id: 6,
      name: "Ava Foster",
      lastMessage: "Vous: Let's catch up soon.",
      time: "2 min.",
      avatar: "https://placehold.co/40x40/f1f5f9/64748b?text=A",
    },
    {
      id: 7,
      name: "Ava Foster",
      lastMessage: "Vous: Let's catch up soon.",
      time: "2 min.",
      avatar: "https://placehold.co/40x40/f1f5f9/64748b?text=A",
    },
    {
      id: 8,
      name: "Ava Foster",
      lastMessage: "Vous: Let's catch up soon.",
      time: "2 min.",
      avatar: "https://placehold.co/40x40/f1f5f9/64748b?text=A",
    },
  ];

  const [activeMessageId, setActiveMessageId] = React.useState(null);

  // A mock component to replace the external SearchBoxInner import
 

  return (
    // The main layout is a two-column flex container on screens larger than 'md', full-width column on mobile
    <div className="flex flex-col md:flex-row h-screen font-[Inter] bg-white">
      {/* Left Sidebar for message list. It is a full-width column on mobile */}
      <div className="flex-none w-full md:w-[350px] border-r border-gray-200 bg-white flex flex-col">
        {/* Header with title and icon */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold">Messages</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-500 cursor-pointer"
          >
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
          </svg>
        </div>


        <SearchBoxInner className='p-6' placeholder='Search People'/>

        {/* Message list container with a scrollable area */}
        <div className="flex-1 overflow-y-auto">
          {messages.map((message) => (
            <MessageItem
              key={message.id}
              message={message}
              isActive={activeMessageId === message.id}
              onClick={() => setActiveMessageId(message.id)}
            />
          ))}
        </div>
      </div>

      {/* Right Main Content area. This is hidden on small screens until a message is clicked. */}
      {/* On desktop, it takes up the remaining space */}
      <div className={`flex-1 ${activeMessageId === null ? 'flex' : 'hidden md:flex'} flex-col items-center justify-center bg-gray-50`}>
        <MainChatView />
      </div>
    </div>
  );
}

// Component for a single message item in the list
function MessageItem({ message, isActive, onClick }) {
  const { avatar, name, lastMessage, time } = message;
  return (
    <div
      onClick={onClick}
      className={`flex items-center px-6 py-4 cursor-pointer transition-colors ${
        isActive ? "bg-gray-100" : "hover:bg-gray-50"
      }`}
    >
      <img
        src={avatar}
        alt={`${name}'s avatar`}
        className="w-10 h-10 rounded-full mr-4"
      />
      <div className="flex-1 overflow-hidden">
        <div className="text-sm font-semibold truncate">{name}</div>
        <div className="text-xs text-gray-500 truncate">{lastMessage}</div>
      </div>
      <div className="flex-none text-xs text-gray-400 self-start mt-1 ml-2">
        {time}
      </div>
    </div>
  );
}

// Component for the main chat view (placeholder for now)
function MainChatView() {
  return (
    <div className="flex flex-col items-center justify-center p-4 text-center">
      <div className="text-gray-300 mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="M8 10h.01" />
          <path d="M12 10h.01" />
          <path d="M16 10h.01" />
        </svg>
      </div>
      <h2 className="text-xs font-bold mb-2 text-gray-800 md:text-2xl">Your messages</h2>
      <p className="text-gray-500 mb-6 max-w-sm">Don’t miss a minute to talk to your contacts</p>
      <button className="bg-black text-white text-xs px-4 py-2 rounded-full font-semibold shadow-md transition-colors hover:bg-gray-800 md:text-sm md:px-6 md:py-3">
        Send a Message
      </button>
    </div>
  );
}
