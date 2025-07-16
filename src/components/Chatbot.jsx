import React, { useState, useRef, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { RiRobot3Line } from "react-icons/ri";
import { IoMdSend } from "react-icons/io";
import Logo from "../assets/DJSNSSLogo.png"; 

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Welcome to Chatbot, How can I assist you?" }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  // Handle closing the chat window
  const handleClose = async () => {
    try {
      // Call the delete chat API here
      // await fetch('your-delete-chat-api-endpoint', { method: 'DELETE' });
      setMessages([
        { sender: "bot", text: "Welcome to Chatbot, How can I assist you?" }
      ]);
      setIsOpen(false);
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  // Handle sending a message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // Add user message to chat
    const newUserMessage = { sender: "user", text: userInput };
    setMessages([...messages, newUserMessage]);
    setUserInput("");
    
    // Show loading indicator
    setIsLoading(true);

    try {
      // Call your chatbot API here
      // const response = await fetch('your-chatbot-api-endpoint', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ message: userInput })
      // });
      // const data = await response.json();

      // For now, mock a response
      setTimeout(() => {
        const botResponse = { 
          sender: "bot", 
          text: "This feature is under development. Please check back later."  // Replace with actual response from API
        };
        setMessages(prevMessages => [...prevMessages, botResponse]);
        setIsLoading(false); // Hide loading indicator
      }, 1000);
    } catch (error) {
      console.error("Error getting bot response:", error);
      setMessages(prevMessages => [
        ...prevMessages, 
        { sender: "bot", text: "Sorry, I encountered an error. Please try again later." }
      ]);
      setIsLoading(false); // Hide loading indicator
    }
  };

  // Chat bubble loading animation
  const LoadingIndicator = () => (
    <div className="mb-3 flex justify-start">
      <div className="px-4 py-2 rounded-lg max-w-[80%] bg-gray-200 text-gray-800 rounded-bl-none">
        <div className="flex space-x-1">
          <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
          <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "600ms" }}></div>
        </div>
      </div>
    </div>
  );

  return (
    <>
    {/* Chatbot Icon - Now responsive */}
    <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-0 z-40 group bg-[#0066b2] text-white p-2 lg:p-3 h-10 w-10 lg:h-12 lg:w-12 rounded-l-lg shadow-lg hover:bg-white border-y-2 border-l-2 hover:border-[#0066b2]  transition-all flex items-center justify-center"
    >
        <RiRobot3Line className="h-full w-full group-hover:text-[#0066b2]" />
    </button>

    
    <div className={`fixed bottom-20 ${isOpen? "right-5": "right-0"} z-50`}>
      {/* Chat Window - Now responsive */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl flex flex-col w-[85vw] sm:w-80 md:w-96 h-[60vh] sm:h-96 border border-gray-300">
          {/* Chat Header */}
          <div className="bg-[#0066b2] text-white px-3 sm:px-4 py-2 sm:py-3 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center justify-center gap-2">
                <img src={Logo} alt="Logo" className="h-8 aspect-square" />
                <h3 className="font-semibold text-sm sm:text-base">DJSNSS BOT</h3>
            </div>
            <button 
              onClick={handleClose}
              className="text-white bg-gray-50/20 p-1 rounded-lg hover:text-gray-200"
            >
              <IoMdClose size={18} />
            </button>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-grow p-2 sm:p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`mb-2 sm:mb-3 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg max-w-[85%] text-sm sm:text-base ${
                    msg.sender === "user" 
                      ? "bg-[#0066b2] text-white rounded-br-none" 
                      : "bg-gray-200 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            
            {/* Show loading indicator while waiting for response */}
            {isLoading && <LoadingIndicator />}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="border-t border-gray-300 p-2 sm:p-3 flex">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow px-2 sm:px-3 py-1.5 sm:py-2 text-sm sm:text-base border rounded-l-lg focus:outline-none"
              disabled={isLoading}
            />
            <button
              type="submit"
              className={`${isLoading ? 'bg-gray-400' : 'bg-[#0066b2] hover:bg-blue-500'} text-white px-3 sm:px-4 rounded-r-lg transition-colors`}
              disabled={isLoading}
            >
              <IoMdSend className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </form>
        </div>
      )}
    </div>
    </>
  );
};

export default ChatBot;