import React, { useState, useRef, useEffect } from 'react';
import { Send, X, AlertCircle, MessageCircle } from 'lucide-react';
import { sendChatMessage } from '../services/geminiChat';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! 👋 I'm TourMate AI Assistant. How can I help you plan your journey today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    // Clear any previous errors
    setError(null);

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    const userInput = inputValue;
    setMessages(prev => [...prev, userMessage]);;
    setInputValue('');
    setIsLoading(true);

    try {
      // Get response from Gemini API
      const botResponseText = await sendChatMessage(userInput);

      const botMessage = {
        id: Date.now(),
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error("Error sending message:", err);

      const errorMessage = {
        id: Date.now(),
        text: err.message || "Sorry, I encountered an error. Please try again.",
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-blue-50 dark:bg-gray-950 min-h-screen flex justify-center items-start pt-6 px-4">

      {/* Chat Container */}
      <div className="w-full max-w-3xl h-[calc(100vh-100px)] bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-800 shadow-xl rounded-2xl flex flex-col overflow-hidden">

        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shrink-0">

          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <MessageCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>

          <div>
            <h1 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              YatriSeva AI
            </h1>

            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              Travel assistant
            </p>
          </div>

        </div>

        {error && (
          <div className="mx-3 mt-3 flex items-start gap-2 rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/40 px-3 py-2 text-sm text-red-700 dark:text-red-300">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Messages */}
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto px-3 py-4 space-y-3"
        >
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <MessageCircle className="w-12 h-12 text-blue-400 dark:text-blue-500 mb-3" />

              <h2 className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Start chatting
              </h2>

              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Ask about destinations, hotels, food, or travel plans
              </p>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user'
                ? 'justify-end'
                : 'justify-start'
                }`
              }
            >
              <div
                className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${message.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-sm'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-bl-sm'
                  }`
                }
              >
                <div className="whitespace-pre-wrap">
                  {message.text}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-2xl flex gap-1">

                <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce [animation-delay:0.1s]"></span>
                <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>

              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 dark:border-gray-800 px-3 py-2 bg-white dark:bg-gray-900 shrink-0">

          <div className="flex items-center gap-2">

            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 h-10 px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none placeholder:text-gray-400 dark:placeholder:text-gray-500"
              disabled={isLoading}
            />

            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="h-10 w-10 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-blue-300 dark:disabled:bg-blue-900 transition"
            >
              <Send className="w-4 h-4" />
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Chatbot;
