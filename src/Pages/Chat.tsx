import { useEffect, useState } from "react";
import { FiPaperclip, FiSend } from "react-icons/fi";
import { PiCaretLeft } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

interface Message {
  id: number;
  text: string;
  sender: "bot" | "user";
  type?: "text" | "file";
  file?: File | null;
}

const ChatInterface: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! How can I help you today?", sender: "bot" },
    { id: 2, text: "Can you tell me about your services?", sender: "user" },
  ]);
  const [input, setInput] = useState<string>("");
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [isVisisble, setIsVisisble] = useState<boolean>(false);

  const handleSend = () => {
    if (input.trim() || attachedFile) {
      const newMessage: Message = {
        id: Date.now(),
        text: input,
        sender: "user",
        file: attachedFile,
      };
      setMessages([...messages, newMessage]);
      setInput("");
      setAttachedFile(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAttachedFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    const newMessage: Message = {
      id: Date.now(),
      text: input,
      sender: "user",
      file: attachedFile,
    };
    console.log(newMessage);
  }, [input, attachedFile]);
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div
        onClick={() => navigate("/details")}
        className="bg-gradient-to-r from-blue-400 to-blue-800 text-white text-xl font-semibold p-4 flex items-center justify-between"
      >
        <span className="text-2xl font-extrabold text-white cursor-pointer hover:text-slate-800 transition">
          <PiCaretLeft />
        </span>
        <span>
          <h3 className="font-semibold text-3xl text-white">
            {"Tech Sales Marketer/Manager".slice(0, 15)}...
          </h3>
        </span>
        <span>Chat</span>
      </div>

      {/* Messages */}
      <div className="flex-grow p-4 overflow-y-auto bg-gradient-to-b from-blue-500 to-blue-300 ">
        <div className="absolute inset-0 h-1/2 top-20">
          <svg
            className="w-full opacity-20"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="20" cy="20" r="15" fill="#fbbf24" />
            <circle cx="60" cy="60" r="10" fill="#fbbf24" />
            <circle cx="80" cy="10" r="12" fill="#4ade80" />
          </svg>
        </div>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            } mb-4`}
          >
            <div
              className={`max-w-[75%] flex flex-col p-3 rounded-lg text-white ${
                message.sender === "user"
                  ? "bg-blue-900"
                  : "bg-yellow-800 text-white"
              }`}
            >
              {message.file && (
                <a
                  href={URL.createObjectURL(message.file!)}
                  download={message.text}
                  className="text-blue-200"
                >
                  {/* Preview for Images */}
                  {message.file.type.startsWith("image/") && (
                    <img
                      src={URL.createObjectURL(message.file!)}
                      alt={message.file.name}
                      className="max-w-[150px] max-h-[150px] object-cover rounded-lg"
                    />
                  )}

                  {/* Preview for PDFs or other Documents */}
                  {message.file.type === "application/pdf" && (
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600">📄</span>
                      <span>{message.file.name}</span>
                    </div>
                  )}

                  {/* For Other File Types (e.g., .docx, .txt, etc.) */}
                  {message.file &&
                    !message.file.type.startsWith("image/") &&
                    message.file.type !== "application/pdf" && (
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-600">📎</span>
                        <span>{message.file.name}</span>
                      </div>
                    )}
                </a>
              )}

              {message.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="z-5">
        {isVisisble && (
          <input type="file" className="" onChange={handleFileChange} />
        )}

        <div className="bg-white p-4 flex items-center">
          <div>
            <label className="cursor-pointer text-gray-500 hover:text-blue-500">
              <FiPaperclip
                size={24}
                onClick={() => setIsVisisble((prev) => !prev)}
              />
            </label>
          </div>
          <input
            type="text"
            className="flex-grow border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mx-4"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
            onClick={() => {
              handleSend();
              setIsVisisble((prev) => !prev);
            }}
          >
            <FiSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
