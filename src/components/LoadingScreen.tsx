import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const quotes = [
  "You have power over your mind—not outside events; realize this, and you will find strength. — Marcus Aurelius",
  "People are disturbed not by things, but by the principles and notions which they form concerning things. — Epictetus",
  "The art of being wise is the art of knowing what to overlook. — William James",
  "Go slowly, mind, go slowly; everything unfolds in its own appointed season. — Kabir",
  "Do not forget to give yourself room to pause and breathe today. — Being You Path",
];

export default function LoadingScreen() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    setCurrentQuoteIndex(Math.floor(Math.random() * quotes.length));
    // Change quote every 2.5 seconds
    const quoteInterval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 2500);

    return () => {
      clearInterval(quoteInterval);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-[#FDFBF7] flex flex-col items-center justify-center p-6"
    >
      <div className="max-w-2xl text-center flex flex-col items-center">
        {/* Elegant spinner */}
        <div className="relative w-16 h-16 mb-8">
          <motion.div 
            className="absolute inset-0 border-t-2 border-[#1A5F5F] rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute inset-2 border-r-2 border-[#C85C3E] rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>
        
        <AnimatePresence mode="wait">
          <motion.p
            key={currentQuoteIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="text-xl md:text-2xl font-heading text-[#1A5F5F] italic mb-4"
          >
            {quotes[currentQuoteIndex]}
          </motion.p>
        </AnimatePresence>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-[#4A4A4A] tracking-wider uppercase text-sm font-medium mt-6"
        >
          Taking a breath...
        </motion.p>
      </div>
    </motion.div>
  );
}
