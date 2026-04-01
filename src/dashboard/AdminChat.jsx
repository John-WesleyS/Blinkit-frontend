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
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const AdminChat = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  // const [adminId, setAdminId] = useState(null);

  const bottomRef = useRef();

  // 🔹 Get admin ID
  const [adminId] = useState(() => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const decoded = parseJwt(token);
  return decoded?.id || null;
});

  // 🔹 Fetch all conversations
  useEffect(() => {
    const fetchChats = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/conversations`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setConversations(res.data);
      } catch (err) {
        console.error("Failed to load chats:", err);
      }
    };
    fetchChats();
  }, []);

  // 🔹 When selecting a chat
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
      .catch((err) => console.error(err));
  }, [selectedChat]);

  // 🔹 Receive messages
  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      // Update active chat
      if (msg.conversationId === selectedChat?._id) {
        setMessages((prev) => [...prev, msg]);
      }

      // Update sidebar preview
      setConversations((prev) =>
        prev.map((conv) =>
          conv._id === msg.conversationId
            ? { ...conv, lastMessage: msg }
            : conv
        )
      );
    });

    return () => socket.off("receiveMessage");
  }, [selectedChat]);

  // 🔹 Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔹 Send message
  const sendMessage = () => {
    if (!input.trim() || !selectedChat) return;

    socket.emit("sendMessage", {
      conversationId: selectedChat._id,
      message: input,
    });

    setInput("");
  };

  // 🔹 Enter to send
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  // 🔹 Get userId (not admin)
  const getUserId = (participants) => {
    return participants.find((p) => p !== adminId);
  };

  return (
    <div className="flex h-screen bg-gray-100">

      {/* 🔥 SIDEBAR */}
      <div className="w-1/4 bg-white border-r overflow-y-auto shadow-md">

        <div className="p-4 font-bold text-lg border-b bg-gray-50">
          Admin Chats
        </div>

        {conversations.map((chat) => {
          const userId = getUserId(chat.participants);

          return (
            <div
              key={chat._id}
              onClick={() => setSelectedChat(chat)}
              className={`p-4 cursor-pointer border-b transition ${
                selectedChat?._id === chat._id
                  ? "bg-blue-100"
                  : "hover:bg-gray-100"
              }`}
            >
              <p className="font-semibold text-gray-800">
                User: {userId}
              </p>

              {chat.lastMessage ? (
                <p className="text-sm text-gray-500 truncate">
                  {chat.lastMessage.senderId === adminId
                    ? "You: "
                    : ""}
                  {chat.lastMessage.message}
                </p>
              ) : (
                <p className="text-sm text-gray-400">
                  No messages yet
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* 🔥 CHAT AREA */}
      <div className="flex flex-col flex-1">

        {!selectedChat ? (
          <div className="flex items-center justify-center h-full text-gray-400 text-lg">
            Select a conversation
          </div>
        ) : (
          <>
            {/* HEADER */}
            <div className="p-4 border-b bg-white shadow-sm">
              <p className="font-semibold text-gray-700">
                Chat with: {getUserId(selectedChat.participants)}
              </p>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
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
                      className={`px-4 py-2 rounded-2xl max-w-xs shadow ${
                        isAdmin
                          ? "bg-blue-500 text-white rounded-br-none"
                          : "bg-gray-200 text-gray-800 rounded-bl-none"
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
            <div className="p-4 border-t bg-white flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 border px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Type reply..."
              />

              <button
                onClick={sendMessage}
                className="bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600 transition"
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