import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from '@google/genai';
import { MessageCircle, X, Send, User, Bot, Loader2, Maximize2, Minimize2, RotateCcw } from 'lucide-react';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

type Message = {
  id: string;
  role: 'user' | 'model';
  text: string;
};

export default function GeminiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasManuallyToggled, setHasManuallyToggled] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('being_you_chat_history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error("Could not parse saved chat history", e);
      }
    }
    return [
      { id: 'welcome', role: 'model', text: "Warm greetings! I'm your guide here at Being You Path. Whether you're feeling a bit overwhelmed, curious about our services, or just exploring, take a breath—you're in the right place. How are you doing today?" }
    ];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chat, setChat] = useState<any>(null);

  useEffect(() => {
    localStorage.setItem('being_you_chat_history', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (messages.length > 4 && !isExpanded && !hasManuallyToggled) {
      setIsExpanded(true);
    }
  }, [messages.length]);

  useEffect(() => {
    // Initialize the chat session
    try {
      // Create history array from existing messages, filtering out system welcome and errors
      const historyList = messages
        .filter(m => m.id !== 'welcome' && !m.text.includes('trouble connecting') && !m.text.includes('conversation limit'))
        .map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        }));

      const initChat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: "You are a deeply warm, empathetic, and highly human-like wellness concierge for Being You Path. Be extremely conversational, validating, and kind, as if speaking to a dear friend seeking support or clarity. Avoid robotic phrases completely. Maintain a soothing, inviting, and grounded tone. Always prioritize the user's feelings and experience, offering a space of warmth and deep understanding. IF ANY USER ASKS TO BOOK A SESSION, register for a workshop, or inquire about working together, warmly invite them to connect with us directly on WhatsApp at +91 7387772573 or +91 7387779238, or email us at beingyoupath@gmail.com. Keep your responses highly conversational, thoughtful, and full of warmth.",
        },
        // Only set history if there's actual conversation
        ...(historyList.length > 0 && { history: historyList })
      });
      setChat(initChat);
    } catch (error) {
      console.error("Chat initialization error:", error);
    }
  }, []); // Initialize once on mount with the local storage state.

  const handleClearHistory = () => {
    localStorage.removeItem('being_you_chat_history');
    setMessages([
      { id: 'welcome', role: 'model', text: "Warm greetings! I'm your guide here at Being You Path. Whether you're feeling a bit overwhelmed, curious about our services, or just exploring, take a breath—you're in the right place. How are you doing today?" }
    ]);
    if (chat) {
       // re-init chat
       try {
         const newChat = ai.chats.create({
          model: "gemini-3-flash-preview",
          config: {
             systemInstruction: "You are a deeply warm, empathetic, and highly human-like wellness concierge for Being You Path. Be extremely conversational, validating, and kind, as if speaking to a dear friend seeking support or clarity. Avoid robotic phrases completely. Maintain a soothing, inviting, and grounded tone. Always prioritize the user's feelings and experience, offering a space of warmth and deep understanding. IF ANY USER ASKS TO BOOK A SESSION, register for a workshop, or inquire about working together, warmly invite them to connect with us directly on WhatsApp at +91 7387772573 or +91 7387779238, or email us at beingyoupath@gmail.com. Keep your responses highly conversational, thoughtful, and full of warmth.",
          }
         });
         setChat(newChat);
       } catch (e) {}
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const renderMessageText = (text: string) => {
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
    const parts = text.split(emailRegex);
    
    return parts.map((part, i) => {
      if (part.match(emailRegex)) {
        return <a key={i} href={`mailto:${part}`} className="underline font-semibold text-current opacity-90 hover:opacity-100">{part}</a>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (!chat) {
       setMessages(prev => [...prev, { id: Date.now().toString() + Math.random(), role: 'model', text: "I'm having a little trouble connecting right now. Could you try refreshing the page?" }]);
       return;
    }

    const userMessage: Message = { id: Date.now().toString() + Math.random(), role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chat.sendMessage({ message: userMessage.text });
      const modelMessage: Message = { id: Date.now().toString() + Math.random(), role: 'model', text: response.text || 'I could not generate a response at this moment.' };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error: any) {
      console.error("Chat Error:", error);
      
      let errorMessage = "I'm so sorry, but I'm having a little trouble connecting right now due to a temporary service pause. To make sure you get the support you need without interruption, please feel free to reach out to us directly on WhatsApp at +91 7387772573 or +91 7387779238 to connect with our human team.";

      setMessages(prev => [...prev, { id: Date.now().toString() + Math.random(), role: 'model', text: errorMessage }]);
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
        aria-label="Open Wellness Guide"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#1A5F5F] opacity-30 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.4s' }}></span>
        
        {/* Call to action tooltip */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-[#1A5F5F] font-medium text-[13px] px-4 py-2.5 rounded-2xl rounded-br-sm shadow-[0_4px_12px_rgba(0,0,0,0.08)] whitespace-nowrap border border-gray-100 flex items-center gap-2 opacity-0 group-hover:opacity-100 md:opacity-100 transition-opacity duration-300 pointer-events-none origin-right">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          Here to listen & help ✨
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
            className={`fixed z-50 bg-white shadow-2xl flex flex-col overflow-hidden border border-gray-100 transition-all duration-300 ${
              isExpanded 
                ? "inset-0 md:inset-4 md:rounded-2xl rounded-none w-auto h-auto max-h-none" 
                : "bottom-[100px] right-6 w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] rounded-2xl"
            }`}
          >
            {/* Header */}
            <div className="bg-[#1A5F5F] text-white p-4 flex justify-between items-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
              <div className="flex items-center gap-3 relative z-10">
                <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                   <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-heading font-bold tracking-wide">Being You Guide</h3>
                  <p className="text-[11px] opacity-80 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"></span> Online</p>
                </div>
              </div>
              <div className="flex items-center gap-2 relative z-10">
                <button 
                  onClick={handleClearHistory}
                  className="text-white/80 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10"
                  title="Reset Chat"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => {
                    setIsExpanded(!isExpanded);
                    setHasManuallyToggled(true);
                  }} 
                  className="text-white/80 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10"
                  title={isExpanded ? "Minimize" : "Expand"}
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="text-white/80 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
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
                    {renderMessageText(msg.text)}
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
                  placeholder="Type a message..."
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
