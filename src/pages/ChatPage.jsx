// src/App.jsx
import {
  FiSend,
  FiSmile,
  FiPaperclip,
  FiSearch,
  FiPhone,
  FiVideo,
  FiMoreVertical,
  FiChevronLeft,
} from "react-icons/fi";

const conversations = [
  {
    id: 1,
    name: "Travel Community",
    lastMessage: "Let’s finalize Manali ✈️",
    time: "12:45 PM",
    unread: 2,
  },
  {
    id: 2,
    name: "Aman",
    lastMessage: "Sure, sending file soon.",
    time: "11:30 AM",
    unread: 0,
  },
  {
    id: 3,
    name: "Design Team",
    lastMessage: "Gold UI looks premium.",
    time: "Mon",
    unread: 4,
  },
  {
    id: 4,
    name: "Priya",
    lastMessage: "You coming tomorrow?",
    time: "Sun",
    unread: 0,
  },
];

const messages = [
  {
    id: 1,
    fromMe: false,
    text: "Hey! UI look going well? ✨",
    time: "12:30 PM",
  },
  {
    id: 2,
    fromMe: true,
    text: "Yes, refining gold theme for softness.",
    time: "12:32 PM",
  },
];

function ChatPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br mt-16">
      {/* Outer container */}
      <div className="w-full max-w-6xl h-[650px] rounded-3xl shadow-2xl backdrop-blur bg-white/90 border border-[rgba(197,154,47,0.25)] flex overflow-hidden">
        {/* ------------------ Left Sidebar ------------------ */}
        <aside className="hidden md:flex w-1/3 flex-col border-r border-[rgba(197,154,47,0.25)] bg-white/60">
          <div className="px-5 py-4 flex items-center justify-between border-b border-[rgba(197,154,47,0.25)]">
            <h2 className="text-lg font-semibold text-[#6B5520]">Chats</h2>
            <button className="text-[#C59A2F] border border-[rgba(197,154,47,0.4)] px-3 py-1 text-sm rounded-full hover:bg-[rgba(197,154,47,0.12)]">
              New
            </button>
          </div>

          {/* Search Bar */}
          <div className="p-3">
            <div className="flex items-center gap-2 border border-[rgba(197,154,47,0.35)] bg-white rounded-full px-3 py-2">
              <FiSearch className="text-gray-600" size={15} />
              <input
                placeholder="Search chats"
                className="flex-1 text-sm text-[#6B5520] outline-none placeholder:text-gray-600 bg-transparent"
              />
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto px-2 pb-3">
            {conversations.map((chat) => (
              <button
                key={chat.id}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-2xl hover:bg-[rgba(197,154,47,0.10)] transition"
              >
                <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-semibold shadow">
                  {chat.name[0]}
                </div>

                <div className="flex-1 text-left">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium">{chat.name}</p>
                    <span className="text-xs text-gray-500">{chat.time}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-700 truncate max-w-[130px]">
                      {chat.lastMessage}
                    </p>
                    {chat.unread > 0 && (
                      <span className="min-w-[18px] h-5 bg-[#C59A2F] text-[10px] text-white rounded-full flex items-center justify-center">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* ------------------ Chat Window ------------------ */}
        <section className="flex-1 flex flex-col bg-linear-to-b">
          {/* Header */}
          <div className="px-5 py-3 border-b border-[rgba(197,154,47,0.25)] flex items-center justify-between bg-white/80">
            <div className="flex items-center gap-3">
              <button className="md:hidden p-1 border border-[rgba(197,154,47,0.4)] rounded-full text-[#C59A2F]">
                <FiChevronLeft size={17} />
              </button>

              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#C59A2F] to-[#D4AF37] flex justify-center items-center text-white shadow">
                  T
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#6B5520] border-2 border-white rounded-full" />
              </div>

              <div>
                <p className="font-semibold text-[#6B5520]">Travel Community</p>
                <p className="text-xs text-gray-500">Online • 12 members</p>
              </div>
            </div>
          </div>

          {/* Messages Section */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            <div className="flex justify-center">
              <span className="px-3 py-1 rounded-full bg-white shadow text-[11px] text-[#C59A2F]/80 border border-[rgba(197,154,47,0.25)]">
                Today
              </span>
            </div>

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.fromMe ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-sm shadow 
                  ${
                    msg.fromMe
                      ? "GOLD-bg text-white rounded-br-sm"
                      : "bg-white border border-[rgba(197,154,47,0.25)] text-[#6B5520] rounded-bl-sm"
                  }`}
                >
                  <p>{msg.text}</p>
                  <p
                    className={`text-[10px] mt-1 ${
                      msg.fromMe
                        ? "text-white/70 text-right"
                        : "text-[#C59A2F]/70"
                    }`}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-4 border-t border-[rgba(197,154,47,0.25)] bg-white/85">
            <div className="flex items-center gap-3">
              <button className="hidden sm:flex w-9 h-9 border border-[rgba(197,154,47,0.35)] rounded-full justify-center items-center text-[#C59A2F] hover:bg-[rgba(197,154,47,0.12)]">
                <FiSmile size={18} />
              </button>

              <div className="flex-1 flex items-center border border-[rgba(197,154,47,0.35)] bg-white rounded-2xl px-4 py-2">
                <input
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent outline-none text-sm text-[#6B5520] placeholder:text-[#C59A2F]/60"
                />
              </div>

              <button className="w-11 h-11 rounded-full bg-linear-to-br from-[#C59A2F] to-[#D4AF37] text-white flex items-center justify-center shadow hover:brightness-105 active:scale-95 transition">
                <FiSend size={20} />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ChatPage;
