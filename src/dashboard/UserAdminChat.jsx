import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io(import.meta.env.VITE_API_URL, {
  auth: {
    token: localStorage.getItem("token"),
  },
});

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const UserAdminChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const [conversationId, setConversationId] = useState(null);
  const [senderId, setSenderId] = useState(null);

  const bottomRef = useRef();

  useEffect(() => {
    const initChat = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      
      const decoded = parseJwt(token);
      if (decoded && decoded.id) setSenderId(decoded.id);

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/conversation`,
          { adminId: "admin_1" },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const fetchedConversationId = res.data._id;
        setConversationId(fetchedConversationId);

        // Load previous messages
        const msgRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/messages/${fetchedConversationId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessages(msgRes.data);

        socket.emit("joinChat", fetchedConversationId);
      } catch (err) {
        console.error("Error initializing chat", err);
      }
    };
    initChat();
  }, []);

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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (!input.trim() || !conversationId || !senderId) return;

    const msg = {
      conversationId,
      senderId,
      message: input,
    };

    socket.emit("sendMessage", msg);
    // setMessages((prev) => [...prev, msg]);
    setInput("");
  };

  const handleTyping = () => {
    if (conversationId) socket.emit("typing", conversationId);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Sidebar */}
      <div className="hidden md:flex w-1/4 bg-white/70 backdrop-blur-lg border-r shadow-lg p-5">
        <div className="w-full">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Chats</h2>
          <div className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 cursor-pointer transition">
            <p className="font-medium">Admin Support</p>
            <p className="text-sm text-gray-500">Active now</p>
          </div>
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="bg-white/70 backdrop-blur-lg shadow-md px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-lg text-gray-800">Admin Chat</h2>
            <p className="text-sm text-gray-500">Online</p>
          </div>

          {typing && (
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <span className="animate-pulse">Typing</span>
              <span className="animate-bounce">.</span>
              <span className="animate-bounce delay-100">.</span>
              <span className="animate-bounce delay-200">.</span>
            </div>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-400">
          {messages.map((msg, index) => {
            const isMe = msg.senderId === senderId;

            return (
              <div
                key={index}
                className={`flex items-end ${
                  isMe ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`
                    px-4 py-2 max-w-xs md:max-w-md break-words text-sm shadow-md
                    transition-all duration-200
                    ${
                      isMe
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl rounded-br-none"
                        : "bg-white text-gray-800 rounded-2xl rounded-bl-none"
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
        <div className="bg-white/80 backdrop-blur-lg p-4 flex items-center gap-3 border-t">
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              handleTyping();
            }}
             onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            className="
              flex-1 px-4 py-2 rounded-full border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-blue-400
              transition-all duration-200 shadow-sm
            "
          />

          <button
            onClick={sendMessage}
            className="
              px-5 py-2 rounded-full text-white font-medium
              bg-gradient-to-r from-blue-500 to-blue-600
              hover:scale-105 hover:shadow-lg
              active:scale-95 transition-all duration-200
            "
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserAdminChat;
