import { useState, useEffect, useRef } from "react";
import axios from "axios";

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello 👋 I am your AI assistant. Ask me anything!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/chatbot`, {
        message: input,
      });

      const botMessage = {
        sender: "bot",
        text: res.data.reply,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.log(error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Something went wrong 😢" },
      ]);
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      {/* Floating Chat Button */}

      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition duration-300"
      >
        💬
      </button>

      {/* Chat Window */}

      {open && (
        <div className="fixed bottom-20 right-6 w-96 max-h-[70vh] bg-white shadow-2xl rounded-2xl flex flex-col overflow-hidden">
          {/* Header */}

          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 font-semibold flex justify-between items-center">
            AI Assistant 🤖
            <button
              onClick={() => setOpen(false)}
              className="text-white text-lg"
            >
              ✖
            </button>
          </div>

          {/* Messages */}

          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((msg, index) => {
              const isUser = msg.sender === "user";

              return (
                <div
                  key={index}
                  className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}
                >
                  <div
                    className={`px-4 py-2 rounded-xl max-w-[75%] text-sm shadow
                    ${
                      isUser
                        ? "bg-green-500 text-white rounded-br-none"
                        : "bg-gray-200 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}

            {loading && (
              <div className="flex items-center gap-1 px-3 py-2 bg-gray-200 w-fit rounded-xl">
                <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce delay-150"></span>
                <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce delay-300"></span>
              </div>
            )}

            <div ref={chatEndRef}></div>
          </div>

          {/* Input */}

          <div className="p-3 border-t flex gap-2">
            <input
              type="text"
              placeholder="Ask anything..."
              className="flex-1 border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-green-400"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />

            <button
              onClick={sendMessage}
              className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
