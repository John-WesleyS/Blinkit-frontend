import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_URL);

const UserAdminChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const conversationId = "chat_123";
  const senderId = "user_1"; // change for admin

  const bottomRef = useRef();

  // Join chat
  useEffect(() => {
    socket.emit("joinChat", conversationId);
  }, []);

  // Receive message
  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("typing", () => {
      setTyping(true);
      setTimeout(() => setTyping(false), 2000);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("typing");
    };
  }, []);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const sendMessage = () => {
    if (!input.trim()) return;

    const msg = {
      conversationId,
      senderId,
      message: input,
    };

    socket.emit("sendMessage", msg);
    setMessages((prev) => [...prev, msg]);
    setInput("");
  };

  // Typing event
  const handleTyping = () => {
    socket.emit("typing", conversationId);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* Sidebar (optional for admin) */}
      <div className="hidden md:flex w-1/4 bg-white border-r p-4">
        <h2 className="text-lg font-semibold">Chats</h2>
      </div>

      {/* Chat Section */}
      <div className="flex flex-col flex-1">
        
        {/* Header */}
        <div className="bg-white shadow p-4 flex items-center justify-between">
          <h2 className="font-semibold text-lg">Admin Chat</h2>
          {typing && <span className="text-sm text-gray-500">Typing...</span>}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, index) => {
            const isMe = msg.senderId === senderId;

            return (
              <div
                key={index}
                className={`flex ${
                  isMe ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`
                    px-4 py-2 rounded-2xl max-w-xs break-words
                    ${
                      isMe
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-gray-300 text-black rounded-bl-none"
                    }
                  `}
                >
                  {msg.message}
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="bg-white p-4 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              handleTyping();
            }}
            placeholder="Type a message..."
            className="flex-1 border rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserAdminChat;