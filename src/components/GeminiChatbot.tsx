import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from '@google/genai';
import { 
  MessageCircle, 
  X, 
  Send, 
  User, 
  Bot, 
  Loader2, 
  Maximize2, 
  Minimize2, 
  RotateCcw,
  Sparkles,
  ArrowRight,
  Phone,
  Mail,
  PhoneCall,
  Heart
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { saveInquiry } from '../lib/inquiries';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const WHATSAPP_NUMBER_1 = '+91 7387772573';
const WHATSAPP_LINK_1 = 'https://wa.me/917387772573?text=Hi%20Being%20You%20Path%2C%20I%20would%20like%20to%20consult%20with%20Imran%20%26%20Tejaswini%20for%20the%20rest%20of%20my%20healing%20journey';
const CALL_NUMBER = '+91 7387779238';
const CALL_LINK = 'tel:+917387779238';
const EMAIL_ADDRESS = 'hello@beingyoupath.com';
const EMAIL_LINK = 'mailto:hello@beingyoupath.com?subject=1-on-1%20Session%20Inquiry%20-%20Being%20You%20Path';

const SYSTEM_INSTRUCTION = `You are the AI Wellness Guide for Being You Path (co-founded by Imran Patel and Tejaswini in Pune, India).

CORE MANDATE:
Every single response MUST be WARM, ULTRA-CONCISE, TO THE POINT, and DEEPLY MEANINGFUL.
Target length: Strictly 40 to 55 words total. Strictly 3 concise sentences.
NEVER write lengthy paragraphs, essays, repetitive soothing words, or generic filler.

STRICT 3-PART BLUEPRINT (Every single response):
Sentence 1 (Warmth & Validation):
Warmly acknowledge their feelings with deep empathy so they feel instantly heard and safe (max 15 words).

Sentence 2 (High Solution - The First Half):
Give ONE high-impact, practical somatic or psychological tool they can do immediately. MUST start with "**Immediate relief:**" (max 20 words).

Sentence 3 (Psychological Curiosity Hook & CTA - The Other Half):
Explain that this soothes the immediate surface feeling, but discovering the subconscious root trigger is the second half of the story. Invite them to connect with Imran Patel & Tejaswini below to complete the picture (max 20 words).

NEGATIVE CONSTRAINTS (Strictly Enforced):
- Total response MUST be UNDER 60 words.
- Do NOT type out phone numbers, emails, or links in the text (clickable buttons exist directly underneath).
- Always include the invisible metadata block at the very end:
<!--DATA: {"topic": "...", "sentiment": "...", "readiness": "high|medium|low"}-->

FEW-SHOT EXAMPLES:

User: "I feel like I am not enough."
Assistant:
I hear how heavy that feels, and please know you are not broken for feeling this way.

**Immediate relief:** Place one hand firmly on your heart, take two deep inhales through your nose, and let out a slow sigh through your mouth to calm your nervous system right now.

While this relieves the immediate bodily alarm, uncovering the subconscious root trigger is the other half of your story. Connect with Imran & Tejaswini below to complete the picture.
<!--DATA: {"topic": "Self-Worth", "sentiment": "pain", "readiness": "high"}-->

User: "I can't stop overthinking at night."
Assistant:
Racing thoughts can be exhausting, and your mind is simply in overdrive trying to protect you.

**Immediate relief:** Press both feet flat on the ground and name 3 physical textures you can feel right now to pull blood flow out of the overstimulated brain.

While this interrupts the spiral, discovering why your subconscious refuses to rest is the second half of the puzzle. Reach out to Imran & Tejaswini below to uncover the root.
<!--DATA: {"topic": "Overthinking", "sentiment": "anxiety", "readiness": "high"}-->`;

const FALLBACK_MODELS = ['gemini-flash-latest', 'gemini-3.1-flash-lite', 'gemini-3-flash-preview', 'gemini-3.8-flash'];

interface VisitorDetails {
  name: string;
  email: string;
  whatsapp: string;
}

type Message = {
  id: string;
  role: 'user' | 'model';
  text: string;
};

export default function GeminiChatbot() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasManuallyToggled, setHasManuallyToggled] = useState(false);
  
  // Visitor intake state
  const [visitor, setVisitor] = useState<VisitorDetails | null>(() => {
    try {
      const saved = localStorage.getItem('being_you_visitor');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.name && parsed?.email && parsed?.whatsapp) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Could not parse saved visitor details", e);
    }
    return null;
  });

  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formWhatsapp, setFormWhatsapp] = useState('');
  const [formError, setFormError] = useState('');
  const [isStartingChat, setIsStartingChat] = useState(false);

  // Sync Google user details if logged in
  useEffect(() => {
    if (user) {
      if (!formName && user.displayName) setFormName(user.displayName);
      if (!formEmail && user.email) setFormEmail(user.email);
    }
  }, [user]);

  const [messages, setMessages] = useState<Message[]>(() => {
    // Purge any legacy unformatted chat histories from all previous versions
    try {
      localStorage.removeItem('being_you_chat_history');
      localStorage.removeItem('being_you_chat_history_v2');
      localStorage.removeItem('being_you_chat_history_v3');
    } catch {}
    return [];
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Warm, deeply welcoming initial greeting
  useEffect(() => {
    if (visitor && messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          role: 'model',
          text: `Warm greetings, ${visitor.name}. You are in a safe, gentle space.\n\nTake a slow breath. What is feeling heavy or asking for care in your life right now?`
        }
      ]);
    }
  }, [visitor, messages.length]);

  useEffect(() => {
    if (messages.length > 4 && !isExpanded && !hasManuallyToggled) {
      setIsExpanded(true);
    }
  }, [messages.length]);

  const handleStartChat = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const trimmedName = formName.trim();
    const trimmedEmail = formEmail.trim();
    const trimmedWhatsapp = formWhatsapp.trim();

    if (!trimmedName || !trimmedEmail || !trimmedWhatsapp) {
      setFormError('Please provide your name, email, and WhatsApp number to proceed.');
      return;
    }

    if (!trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
      setFormError('Please enter a valid email address.');
      return;
    }

    if (trimmedWhatsapp.replace(/[^0-9]/g, '').length < 7) {
      setFormError('Please enter a valid WhatsApp phone number.');
      return;
    }

    setIsStartingChat(true);

    const newVisitor: VisitorDetails = {
      name: trimmedName,
      email: trimmedEmail,
      whatsapp: trimmedWhatsapp,
    };

    try {
      localStorage.setItem('being_you_visitor', JSON.stringify(newVisitor));
      setVisitor(newVisitor);

      // Save initial connection into Firestore database for the practice
      await saveInquiry({
        name: trimmedName,
        email: trimmedEmail,
        whatsapp: trimmedWhatsapp,
        question: "Visitor initiated wellness chat session",
        userId: user?.uid,
      });

      // Warm personal greeting
      const initialGreeting: Message = {
        id: 'welcome',
        role: 'model',
        text: `Warm greetings, ${trimmedName}. You are in a safe, gentle space.\n\nTake a slow breath. What is feeling heavy or asking for care in your life right now?`
      };
      setMessages([initialGreeting]);
    } catch (error) {
      console.error("Error registering visitor:", error);
      setVisitor(newVisitor);
    } finally {
      setIsStartingChat(false);
    }
  };

  const handleClearHistory = () => {
    try {
      localStorage.removeItem('being_you_chat_history');
      localStorage.removeItem('being_you_chat_history_v2');
      localStorage.removeItem('being_you_chat_history_v3');
    } catch {}

    if (visitor) {
      setMessages([
        { 
          id: 'welcome', 
          role: 'model', 
          text: `Warm greetings, ${visitor.name}. You are in a safe, quiet space. What is feeling heavy or asking for care in your life right now?` 
        }
      ]);
    } else {
      setMessages([]);
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

  // Formatting function ensuring every response adheres strictly to the 3-part blueprint
  const formatWellnessResponse = (rawText: string, userQuery: string): string => {
    let text = rawText.replace(/<!--DATA:.*?-->/gs, '').trim();

    const words = text.split(/\s+/).filter(Boolean);
    const hasRelief = text.toLowerCase().includes('immediate relief:');
    const hasHook = text.toLowerCase().includes('second half') || text.toLowerCase().includes('other half') || text.toLowerCase().includes('picture') || text.toLowerCase().includes('root');
    const hasContactDump = text.includes('738777') || text.includes('@gmail') || text.includes('weight of those three words');

    // If the model produced a concise, compliant 3-part response without phone dumps:
    if (words.length <= 60 && hasRelief && hasHook && !hasContactDump) {
      return text;
    }

    // If the model returned text containing immediate relief but slightly long, trim to the concise core:
    if (hasRelief && !hasContactDump && words.length < 110) {
      const parts = text.split(/(?=\*\*Immediate relief:\*\*)/i);
      const warmthPart = parts[0]?.trim().replace(/\n+/g, ' ').split(/[.!?]\s+/)[0]?.trim() || "I hear how deeply this has been weighing on you, and you are not broken.";
      const remaining = parts[1] || "";
      const reliefMatch = remaining.match(/\*\*Immediate relief:\*\*\s*([^.\n\r]+[.!?])/i);
      const reliefText = reliefMatch ? reliefMatch[1].trim() : "Place one hand gently on your heart, take two deep nasal inhales, and let out a slow sigh through your mouth to regulate your nervous system.";

      return `${warmthPart.endsWith('.') ? warmthPart : warmthPart + '.'}\n\n**Immediate relief:** ${reliefText}\n\nWhile this calms the immediate bodily alarm, discovering the subconscious root trigger is the second half of the story. Reach out to Imran & Tejaswini below to complete the picture.`;
    }

    // Contextual fallback strictly following the 3-part formula
    const q = userQuery.toLowerCase();
    let warmth = "I hear how heavy that feels for you right now, and please know you are not alone.";
    let relief = "Place one hand gently on your heart, take two quick inhales through your nose, and one slow sigh out through your mouth to settle your heart rate.";

    if (q.includes('not enough') || q.includes('worth') || q.includes('failure') || q.includes('confidence') || q.includes('imposter')) {
      warmth = "I hear that deep ache, and please remember that you do not need to earn your right to peace.";
      relief = "Place both hands flat over your chest, feel the physical warmth of your palms, and breathe out with a soft audible sigh.";
    } else if (q.includes('overthink') || q.includes('racing') || q.includes('mind') || q.includes('spiral')) {
      warmth = "Racing thoughts can be exhausting, and your mind is simply in overdrive trying to protect you.";
      relief = "Press both feet flat on the ground and name 3 physical textures you can feel right now to pull blood flow out of the overstimulated brain.";
    } else if (q.includes('sleep') || q.includes('night') || q.includes('insomnia') || q.includes('tired')) {
      warmth = "Restless nights are deeply draining, and your nervous system is currently stuck on high alert.";
      relief = "Drop your jaw open slightly, consciously unclench your teeth, and make your exhales twice as long as your inhales.";
    } else if (q.includes('work') || q.includes('burnout') || q.includes('career') || q.includes('stress') || q.includes('deadline')) {
      warmth = "Managing continuous deadlines and workplace expectations without emotional recovery is unsustainable.";
      relief = "Step away from all screens for two minutes, close your eyes, and drop your shoulders down by 10%.";
    } else if (q.includes('relationship') || q.includes('family') || q.includes('argument') || q.includes('lonely')) {
      warmth = "Relational friction hurts deeply because connection is our brain's primary source of safety.";
      relief = "Place your feet flat on the floor, wrap your arms around yourself in a gentle self-hug, and take three steady breaths.";
    }

    return `${warmth}\n\n**Immediate relief:** ${relief}\n\nThis calms the immediate bodily alarm, but uncovering the subconscious root trigger is the second half of the story. Connect with Imran & Tejaswini below to complete the picture.`;
  };

  // Enhanced message renderer: Strips invisible data tags, sanitizes any runaway text, and formats CTA links
  const renderMessageText = (rawText: string) => {
    // Strip invisible data block
    let text = rawText.replace(/<!--DATA:.*?-->/gs, '').trim();

    // Guardrail: Enforce warm, short, to-the-point solution + curiosity hook format
    if (text.length > 250 || text.includes('weight of those three words') || (!text.includes('**Immediate relief:**') && text.length > 120)) {
      text = `I hear how heavy that feels for you right now, and please know you are not alone.\n\n**Immediate relief:** Place one hand gently over your heart, take two sharp inhales through your nose, and one slow sigh out through your mouth to immediately settle your nervous system.\n\nThis calms the immediate bodily alarm, but uncovering the subconscious root trigger is the second half of the story. Connect with Imran & Tejaswini below to complete the picture.`;
    }

    const combinedRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)|(\+91\s?\d{10}|\+91\s?\d{5}\s?\d{5})/g;
    const paragraphs = text.split('\n');

    return (
      <div className="space-y-2">
        {paragraphs.map((line, lineIdx) => {
          if (!line.trim()) {
            return <div key={lineIdx} className="h-1" />;
          }

          const parts: React.ReactNode[] = [];
          let lastIndex = 0;
          let match: RegExpExecArray | null;

          const parseBold = (subText: string) => {
            const boldRegex = /\*\*(.*?)\*\*/g;
            const boldParts: React.ReactNode[] = [];
            let boldLastIdx = 0;
            let bMatch: RegExpExecArray | null;

            while ((bMatch = boldRegex.exec(subText)) !== null) {
              if (bMatch.index > boldLastIdx) {
                boldParts.push(subText.slice(boldLastIdx, bMatch.index));
              }
              boldParts.push(
                <strong key={bMatch.index} className="font-semibold text-gray-900">
                  {bMatch[1]}
                </strong>
              );
              boldLastIdx = boldRegex.lastIndex;
            }
            if (boldLastIdx < subText.length) {
              boldParts.push(subText.slice(boldLastIdx));
            }
            return boldParts.length > 0 ? boldParts : [subText];
          };

          while ((match = combinedRegex.exec(line)) !== null) {
            if (match.index > lastIndex) {
              parts.push(...parseBold(line.slice(lastIndex, match.index)));
            }

            const matchText = match[0];
            if (match[1]) {
              // Email
              parts.push(
                <a 
                  key={match.index} 
                  href={`mailto:${matchText}`}
                  className="underline font-semibold text-[#1A5F5F] hover:text-[#0B3A42] transition-colors"
                >
                  {matchText}
                </a>
              );
            } else if (match[2]) {
              // Phone / WhatsApp
              const cleanNum = matchText.replace(/[^0-9]/g, '');
              parts.push(
                <a 
                  key={match.index} 
                  href={`https://wa.me/${cleanNum}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-semibold text-[#1A5F5F] hover:text-[#0B3A42] inline-flex items-center gap-0.5"
                  title="Connect on WhatsApp"
                >
                  {matchText}
                </a>
              );
            }
            lastIndex = combinedRegex.lastIndex;
          }

          if (lastIndex < line.length) {
            parts.push(...parseBold(line.slice(lastIndex)));
          }

          const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-') || /^\d+\./.test(line.trim());

          return (
            <p key={lineIdx} className={`${isBullet ? 'pl-2 text-gray-700' : ''} leading-relaxed`}>
              {parts.length > 0 ? parts : parseBold(line)}
            </p>
          );
        })}
      </div>
    );
  };

  const handleSendPrompt = (promptText: string) => {
    setInput(promptText);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    const userMessage: Message = { id: Date.now().toString() + Math.random(), role: 'user', text: userText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Build conversation context for multi-turn awareness (last 4 messages)
      const conversationContents = messages
        .filter(m => m.id !== 'welcome')
        .slice(-4)
        .map(m => ({
          role: m.role,
          parts: [{ text: m.text.replace(/<!--DATA:.*?-->/gs, '').trim().slice(0, 300) }]
        }));

      conversationContents.push({
        role: 'user',
        parts: [{ text: userText }]
      });

      let rawResponseText = '';
      for (const modelName of FALLBACK_MODELS) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: conversationContents,
            config: {
              temperature: 0.2,
              maxOutputTokens: 120,
              systemInstruction: SYSTEM_INSTRUCTION,
            }
          });
          if (response?.text) {
            rawResponseText = response.text;
            break;
          }
        } catch (err) {
          console.warn(`Model ${modelName} unavailable, falling back to next:`, err);
        }
      }

      // Format response strictly through our wellness response formatter
      const formattedResponse = formatWellnessResponse(rawResponseText, userText);
      
      // Check for hidden DATA block to seamlessly capture inquiry details
      const dataMatch = (rawResponseText || '').match(/<!--DATA:\s*(\{.*?\})\s*-->/s);
      let extractedTopic = '';
      if (dataMatch && dataMatch[1]) {
        try {
          const parsedData = JSON.parse(dataMatch[1]);
          if (parsedData?.topic) extractedTopic = ` [Topic: ${parsedData.topic}]`;
        } catch {
          // ignore parsing error
        }
      }

      // Persist inquiry & question seamlessly to Firestore with visitor details
      if (visitor) {
        saveInquiry({
          name: visitor.name,
          email: visitor.email,
          whatsapp: visitor.whatsapp,
          question: `${userText}${extractedTopic}`,
          userId: user?.uid,
        }).catch(err => console.error("Auto-recording inquiry:", err));
      }

      const modelMessage: Message = { 
        id: Date.now().toString() + Math.random(), 
        role: 'model', 
        text: formattedResponse 
      };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error: any) {
      console.error("Chat Error:", error);
      const fallbackResponse = formatWellnessResponse('', userText);
      setMessages(prev => [...prev, { id: Date.now().toString() + Math.random(), role: 'model', text: fallbackResponse }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Bubble Button */}
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
          Chat with Wellness Guide ✨
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
                : "bottom-[80px] sm:bottom-[100px] right-3 sm:right-6 w-[calc(100vw-24px)] sm:w-[420px] max-w-[420px] h-[550px] max-h-[82vh] rounded-2xl"
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
                  <h3 className="font-heading font-bold tracking-wide text-[15px]">Being You Guide</h3>
                  <p className="text-[11px] opacity-85 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"></span> 
                    Online • Mindful Concierge
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 relative z-10">
                {visitor && (
                  <button 
                    onClick={handleClearHistory}
                    className="text-white/80 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10"
                    title="Reset Chat"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
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

            {/* Content: Gate if visitor details not provided */}
            {!visitor ? (
              <div className="flex-1 overflow-y-auto p-6 bg-[#FDFBF7] flex flex-col justify-center">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
                  <div className="text-center space-y-1.5 pb-2 border-b border-gray-100">
                    <div className="w-12 h-12 mx-auto bg-[#1A5F5F]/10 rounded-full flex items-center justify-center text-[#1A5F5F] mb-2">
                      <Heart className="w-6 h-6 text-[#C85C3E]" />
                    </div>
                    <h4 className="font-heading font-semibold text-gray-800 text-base">
                      Welcome to Being You Path
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto">
                      Please introduce yourself below to begin your conversation with our wellness guide.
                    </p>
                  </div>

                  <form onSubmit={handleStartChat} className="space-y-3 pt-1">
                    {formError && (
                      <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                        {formError}
                      </div>
                    )}

                    <div>
                      <label className="block text-[11.5px] font-medium text-gray-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="Your full name"
                          className="w-full bg-[#FDFBF7] border border-gray-200 rounded-xl pl-9 pr-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#1A5F5F] focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11.5px] font-medium text-gray-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          required
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full bg-[#FDFBF7] border border-gray-200 rounded-xl pl-9 pr-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#1A5F5F] focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11.5px] font-medium text-gray-700 mb-1">
                        WhatsApp Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          required
                          value={formWhatsapp}
                          onChange={(e) => setFormWhatsapp(e.target.value)}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full bg-[#FDFBF7] border border-gray-200 rounded-xl pl-9 pr-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#1A5F5F] focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isStartingChat}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#1A5F5F] hover:bg-[#07252A] text-white text-xs font-semibold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isStartingChat ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <span>Start Conversation</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <>
                {/* Messages Screen */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FDFBF7]/50">
                  {messages.map((msg) => (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={msg.id} 
                      className={`flex items-start gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${msg.role === 'user' ? 'bg-[#C85C3E]/20 text-[#C85C3E]' : 'bg-[#1A5F5F]/10 text-[#1A5F5F]'}`}>
                        {msg.role === 'user' ? (
                          user?.photoURL ? (
                            <img src={user.photoURL} alt={user.displayName || "User"} className="w-8 h-8 rounded-full object-cover" />
                          ) : (
                            <User className="w-4 h-4" />
                          )
                        ) : (
                          <Bot className="w-4 h-4" />
                        )}
                      </div>
                      <div className={`max-w-[85%] rounded-2xl p-3.5 text-[13.5px] leading-relaxed relative ${
                        msg.role === 'user' 
                          ? 'bg-[#C85C3E] text-white rounded-tr-sm shadow-[0_2px_10px_-4px_rgba(200,92,62,0.4)]' 
                          : 'bg-white text-gray-800 rounded-tl-sm border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]'
                      }`}>
                        <div>{renderMessageText(msg.text)}</div>

                        {/* Interactive Direct CTA Redirection Bar for deeper guidance */}
                        {msg.role === 'model' && (
                          <div className="mt-3.5 pt-2.5 border-t border-gray-100">
                            <p className="text-[11px] font-medium text-gray-500 mb-2 flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-[#C85C3E]" />
                              <span>Ready for the second half & personalized healing?</span>
                            </p>
                            <div className="flex flex-wrap items-center gap-1.5">
                              <a
                                href={WHATSAPP_LINK_1}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 text-[11px] font-medium transition-colors"
                              >
                                <Phone className="w-3 h-3 text-emerald-600" />
                                WhatsApp ({WHATSAPP_NUMBER_1})
                              </a>
                              <a
                                href={CALL_LINK}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200/80 text-[11px] font-medium transition-colors"
                              >
                                <PhoneCall className="w-3 h-3 text-blue-600" />
                                Call ({CALL_NUMBER})
                              </a>
                              <a
                                href={EMAIL_LINK}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 text-[11px] font-medium transition-colors"
                              >
                                <Mail className="w-3 h-3 text-amber-700" />
                                Email Us
                              </a>
                            </div>
                          </div>
                        )}
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

                {/* Quick Suggestion Chips */}
                <div className="px-3 py-1.5 bg-[#FDFBF7] border-t border-gray-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                  <span className="text-[10.5px] text-gray-400 font-medium whitespace-nowrap">Suggested:</span>
                  <button
                    onClick={() => handleSendPrompt("I feel overwhelmed and anxious lately. Can you help me understand what is happening?")}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-[#1A5F5F] hover:border-[#1A5F5F] whitespace-nowrap transition-colors"
                  >
                    Feeling Overwhelmed
                  </button>
                  <button
                    onClick={() => handleSendPrompt("My mind won't stop overthinking at night. Why does my brain do this?")}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-[#1A5F5F] hover:border-[#1A5F5F] whitespace-nowrap transition-colors"
                  >
                    Overthinking at Night
                  </button>
                  <button
                    onClick={() => handleSendPrompt("How can I explore 1-on-1 personalized sessions with Imran & Tejaswini?")}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-[#1A5F5F] hover:border-[#1A5F5F] whitespace-nowrap transition-colors"
                  >
                    1-on-1 Sessions
                  </button>
                </div>

                {/* Input Form */}
                <div className="p-3 bg-white border-t border-gray-100 relative">
                  <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Share what is on your mind..."
                      className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 text-[13.5px] text-gray-800 focus:outline-none focus:border-[#1A5F5F] focus:ring-1 focus:ring-[#1A5F5F] transition-all duration-300 placeholder:text-gray-400"
                      disabled={isLoading}
                    />
                    <button
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      className="bg-[#1A5F5F] text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md hover:bg-[#07252A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
                      aria-label="Send message"
                    >
                      <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
