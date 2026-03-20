import React, { useEffect, useState, useRef } from "react";
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

const AdminChat = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const [adminId, setAdminId] = useState(null);
  const bottomRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = parseJwt(token);
      if (decoded && decoded.id) setAdminId(decoded.id);
    }
  }, []);

  // ✅ 1. Load all chats
  useEffect(() => {
    const fetchChats = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/conversations`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setConversations(res.data);
      } catch (err) {
        console.error("Failed to load chats:", err);
      }
    };
    fetchChats();
  }, []);

  // ✅ 2. When admin selects a chat
  useEffect(() => {
    if (!selectedChat) return;

    socket.emit("joinChat", selectedChat._id);

    const token = localStorage.getItem("token");
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/messages/${selectedChat._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("Failed to load messages:", err));
  }, [selectedChat]);

  // ✅ 3. Receive real-time messages
  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      if (msg.conversationId === selectedChat?._id) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => socket.off("receiveMessage");
  }, [selectedChat]);

  // ✅ Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ 4. Send message
  const sendMessage = () => {
    if (!input.trim() || !selectedChat) return;

    socket.emit("sendMessage", {
      conversationId: selectedChat._id,
      senderId: adminId,
      message: input,
    });

    setInput("");
  };

  return (
    <div className="flex h-screen">

      {/* LEFT SIDE → CHAT LIST */}
      <div className="w-1/4 bg-white border-r overflow-y-auto">

        <div className="p-4 font-bold text-lg border-b">
          Admin Chats
        </div>

        {conversations.map((chat) => (
          <div
            key={chat._id}
            onClick={() => setSelectedChat(chat)}
            className={`p-4 cursor-pointer border-b hover:bg-gray-100 ${
              selectedChat?._id === chat._id ? "bg-gray-200" : ""
            }`}
          >
            <p className="font-medium">
              {chat.participants.join(", ")}
            </p>

            {chat.lastMessage && (
              <p className="text-sm text-gray-500 truncate">
                {chat.lastMessage.message}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* RIGHT SIDE → CHAT WINDOW */}
      <div className="flex flex-col flex-1">

        {!selectedChat ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            Select a conversation
          </div>
        ) : (
          <>
            {/* HEADER */}
            <div className="p-4 border-b font-semibold">
              Chat: {selectedChat._id}
            </div>

            {/* MESSAGES */}
            <div className="flex-1 p-4 overflow-y-auto space-y-2">
              {messages.map((msg, i) => {
                const isAdmin = msg.senderId === adminId;

                return (
                  <div
                    key={i}
                    className={`flex ${
                      isAdmin ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`px-3 py-2 rounded max-w-xs ${
                        isAdmin
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      {msg.message}
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>

            {/* INPUT */}
            <div className="p-4 flex gap-2 border-t">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 border px-3 py-2 rounded"
                placeholder="Reply..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
              />
              <button
                onClick={sendMessage}
                className="bg-blue-500 text-white px-4 rounded"
              >
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminChat;