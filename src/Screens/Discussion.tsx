import { useState, useRef, useEffect } from "react";
import {
  BiSend,
  BiSearch,
  BiDotsVerticalRounded,
  BiPhone,
  BiVideo,
} from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import { PiCaretLeft, PiCaretRight } from "react-icons/pi";

// Mock data for conversations
const mockConversations = [
  {
    id: 1,
    name: "TechCorp Recruiter",
    lastMessage: "Thanks for your interest in the position!",
    timestamp: "2 min ago",
    unread: 2,
    avatar: "TC",
    online: true,
  },
  {
    id: 2,
    name: "StartupXYZ HR",
    lastMessage: "When can you start?",
    timestamp: "1 hour ago",
    unread: 0,
    avatar: "SX",
    online: false,
  },
  {
    id: 3,
    name: "Global Solutions",
    lastMessage: "We'd like to schedule an interview",
    timestamp: "3 hours ago",
    unread: 1,
    avatar: "GS",
    online: true,
  },
];

// Mock messages for active conversation
const mockMessages = [
  {
    id: 1,
    text: "Hi! I saw your profile and I'm interested in discussing a position at our company.",
    sender: "recruiter",
    timestamp: "10:30 AM",
    date: "Today",
  },
  {
    id: 2,
    text: "Hello! Thank you for reaching out. I'd love to hear more about the opportunity.",
    sender: "user",
    timestamp: "10:32 AM",
    date: "Today",
  },
  {
    id: 3,
    text: "Great! We're looking for a skilled developer for our new project. The role offers competitive salary and remote work options.",
    sender: "recruiter",
    timestamp: "10:35 AM",
    date: "Today",
  },
  {
    id: 4,
    text: "That sounds very interesting! Could you tell me more about the technical requirements and team structure?",
    sender: "user",
    timestamp: "10:38 AM",
    date: "Today",
  },
  {
    id: 5,
    text: "Of course! We use React, Node.js, and PostgreSQL. The team is small but very collaborative. Would you be available for a quick call this week?",
    sender: "recruiter",
    timestamp: "10:40 AM",
    date: "Today",
  },
];

const Discussion = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [conversations, setConversations] = useState(mockConversations);
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const messagesEndRef = useRef(null);

  // const scrollToBottom = () => {
  //       messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  //     };

  //     useEffect(() => {
  //       scrollToBottom();
  //     }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        text: newMessage,
        sender: "user",
        timeStamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        date: "Today",
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // mobile screen
  if (!selectedConversation) {
    return (
      <div className="flex flex-col bg-gradient-to-b from-slate-100 to-slate-200 h-screen">
        <div className="bg-white shadow-sm px-4 py-6">
          <h3 className="text-center text-2xl font-bold text-slate-800 mb-4">
            Discussions
          </h3>

          <div className="relative">
            <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-xl" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation)}
              className="bg-white rounded-xl p-4 mb-3 shadow-sm hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-blue-500 text-white font-bold rounded-full flex items-center justify-center">
                    {conversation.avatar}
                  </div>
                  {conversation.online && (
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-slate-800 truncate">
                      {conversation.name}
                    </h4>
                    <span className="text-xs text-slate-500 flex-shrink-0">
                      {conversation.timestamp}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-500 truncate">
                      {conversation.lastMessage}
                    </p>
                    {conversation.unread > 0 && (
                      <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="bg-white shadow-sm px-4 py-4 flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 bg-blue-500 text-white font-bold rounded-full flex items-center justify-center">
            {selectedConversation.avatar}
          </div>
          {selectedConversation.online && (
            <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          )}
        </div>

        <div className="flex-1">
          <h4 className="font-semibold text-slate-800">
            {selectedConversation.name}
          </h4>
          <p className="text-xs text-slate-500">
            {selectedConversation.online ? "Online" : "Last seen 2 hours ago"}
          </p>
        </div>

        <div className="flex gap-2 justify-end">
          <button className="p-2 text-slate-600 hover:text-blue-500 hover:bg-blue-50 rounded-full">
            <BiPhone className="text-xl" />
          </button>
          <button className="p-2 text-slate-600 hover:text-blue-500 hover:bg-blue-50 rounded-full">
            <BiVideo className="text-xl" />
          </button>
          <button className="p-2 text-slate-600 hover:text-slate-800 hover:bg-gray-50 rounded-full">
            <BiDotsVerticalRounded className="text-xl" />
          </button>

          <button
            onClick={() => setSelectedConversation(null)}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition text-base font-medium"
          >
            <FaTimes className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Main Body of the Discussion Screen */}
      <div className="flex-1 md:overflow-y-auto px-4 py-4 bg-slate-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex mb-4 ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                message.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-slate-800 shadow-sm"
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p
                className={`text-xs mt-1 ${
                  message.sender === "user" ? "text-blue-100" : "text-slate-500"
                }`}
              >
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-white border-t border-slate-200 px-4 py-4 ">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 border border-slate-200 rounded-full focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition"
          >
            <BiSend className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Discussion;
