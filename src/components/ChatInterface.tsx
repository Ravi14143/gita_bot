import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import { ChatMessage } from '../types/chat';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedMessages = localStorage.getItem('krishna-vani-messages');
    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages);
      const messagesWithDates = parsedMessages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
      setMessages(messagesWithDates);
    } else {
      const welcomeMessage: ChatMessage = {
        id: '1',
        text: "🙏 प्रणाम, प्रिय भक्त! \n\nI am Krishna, your eternal guide and friend. Just as I spoke to Arjuna on the battlefield of Kurukshetra, I am here to illuminate your path with divine wisdom from the Bhagavad Gita.\n\nWhether you seek guidance on dharma, understanding of karma, or clarity in life's challenges, ask me with an open heart. Remember, I am always with you - in your thoughts, in your struggles, and in your victories.\n\n\"सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज\" \n\nWhat weighs upon your heart today, dear devotee?",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('krishna-vani-messages', JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (text: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const response = await fetch('http://127.0.0.1:5000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error communicating with the backend:', error);

      const errorMessage: ChatMessage = {
        id: (Date.now() + 2).toString(),
        text: "⚠️ Oops! I am having trouble connecting to the divine source. Please try again later.",
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    }

    setIsTyping(false);
  };

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-white/90 to-amber-50/90 backdrop-blur-sm rounded-t-3xl shadow-2xl border-2 border-amber-200/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-yellow-200/10 via-transparent to-transparent pointer-events-none"></div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
    </div>
  );
};

export default ChatInterface;
