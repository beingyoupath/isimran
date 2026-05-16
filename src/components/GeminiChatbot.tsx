import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from '@google/genai';
import { MessageCircle, X, Send, User, Bot, Loader2 } from 'lucide-react';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

type Message = {
  id: string;
  role: 'user' | 'model';
  text: string;
};

export default function GeminiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 'welcome', role: 'model', text: 'Hello! I am here to help you understand more about our holistic well-being practice.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chat, setChat] = useState<any>(null);

  useEffect(() => {
    // Initialize the chat session
    const initChat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: "You are a helpful assistant for Being You Path, a holistic well-being practice blending modern psychology, secular mindfulness, and explainable ancient wisdom. Answer questions warmly, using a positive tone.",
      },
    });
    setChat(initChat);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !chat) return;

    const userMessage: Message = { id: Date.now().toString() + Math.random(), role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chat.sendMessage({ message: userMessage.text });
      const modelMessage: Message = { id: Date.now().toString() + Math.random(), role: 'model', text: response.text || 'I could not generate a response.' };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { id: Date.now().toString() + Math.random(), role: 'model', text: 'Sorry, I encountered an error. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Bubble Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-[160px] right-6 z-50 flex items-center justify-center group ${isOpen ? 'hidden' : 'block'}`}
        aria-label="Open AI Assistant"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#1A5F5F] opacity-30 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.4s' }}></span>
        
        {/* Call to action tooltip */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-[#1A5F5F] font-medium text-[13px] px-4 py-2.5 rounded-2xl rounded-br-sm shadow-[0_4px_12px_rgba(0,0,0,0.08)] whitespace-nowrap border border-gray-100 flex items-center gap-2 opacity-0 group-hover:opacity-100 md:opacity-100 transition-opacity duration-300 pointer-events-none origin-right">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          Have a question? Ask our AI
        </div>

        <motion.div 
          className="relative bg-[#1A5F5F] text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-shadow cursor-pointer"
          whileHover={{ scale: 1.1, rotate: [-5, 5, -5, 0] }}
          transition={{ rotate: { duration: 0.4 } }}
        >
          <MessageCircle className="w-7 h-7" />
        </motion.div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-[100px] right-6 z-50 w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="bg-[#1A5F5F] text-white p-4 flex justify-between items-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
              <div className="flex items-center gap-3 relative z-10">
                <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                   <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-heading font-bold tracking-wide">Being You Assistant</h3>
                  <p className="text-[11px] opacity-80 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"></span> Online</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10 relative z-10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FDFBF7]/50">
              {messages.map((msg) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id} 
                  className={`flex items-start gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${msg.role === 'user' ? 'bg-[#C85C3E]/20 text-[#C85C3E]' : 'bg-[#1A5F5F]/10 text-[#1A5F5F]'}`}>
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`max-w-[80%] rounded-2xl p-3 text-[14px] leading-relaxed relative ${
                    msg.role === 'user' 
                      ? 'bg-[#C85C3E] text-white rounded-tr-sm shadow-[0_2px_10px_-4px_rgba(200,92,62,0.4)]' 
                      : 'bg-white text-gray-800 rounded-tl-sm border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1A5F5F]/10 text-[#1A5F5F] flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm p-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
                    <Loader2 className="w-4 h-4 animate-spin text-[#C85C3E]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="p-3 bg-white border-t border-gray-100 relative">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full px-4 py-1.5 bg-gradient-to-t from-white to-transparent w-full pointer-events-none"></div>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 text-[14px] text-gray-800 focus:outline-none focus:border-[#1A5F5F] focus:ring-1 focus:ring-[#1A5F5F] transition-all duration-300 placeholder:text-gray-400"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-[#1A5F5F] text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md hover:bg-[#07252A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
