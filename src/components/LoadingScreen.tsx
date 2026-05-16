import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const quotes = [
  "The present moment is the only time over which we have dominion. — Thích Nhất Hạnh",
  "Between stimulus and response there is a space. In that space is our power to choose our response. — Viktor Frankl",
  "Peace comes from within. Do not seek it without. — Buddha",
  "Knowing yourself is the beginning of all wisdom. — Aristotle",
  "Healing takes courage, and we all have courage, even if we have to dig a little to find it. — Tori Amos",
  "Quiet the mind, and the soul will speak. — Ma Jaya Sati Bhagavati",
  "You carry all the ingredients to turn your life into a nightmare—don't mix them! — Hafez",
  "Every moment is a fresh beginning. — T.S. Eliot",
  "We are not our thoughts; we are the observers of our thoughts.",
];

export default function LoadingScreen() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(() => Math.floor(Math.random() * quotes.length));

  useEffect(() => {
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
