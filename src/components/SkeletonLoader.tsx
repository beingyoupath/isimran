import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

const quotes = [
  "Authenticity is the daily practice of letting go of who we think we're supposed to be and embracing who we are.",
  "The privilege of a lifetime is to become who you truly are.",
  "Self-realization is the greatest service you can render the world.",
  "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
  "Your genuine self is the compass that guides you to your true purpose."
];

interface SkeletonLoaderProps {
  className?: string;
}

export function SkeletonLoader({ className = "" }: SkeletonLoaderProps) {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`w-full max-w-4xl mx-auto p-6 md:p-8 bg-soft-sand rounded-[24px] border border-gray-200/50 shadow-sm flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden ${className}`}>
      {/* Shimmer Effect */}
      <div className="absolute inset-0 z-0 animate-shimmer pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-2xl text-center space-y-12">
        {/* Skeleton content */}
        <div className="space-y-6 flex flex-col items-center opacity-40">
          <div className="h-8 bg-charcoal-warm/20 rounded-full w-3/4 max-w-md mx-auto"></div>
          <div className="h-4 bg-charcoal-warm/20 rounded-full w-full max-w-lg mx-auto"></div>
          <div className="h-4 bg-charcoal-warm/20 rounded-full w-5/6 max-w-md mx-auto"></div>
          
          <div className="flex gap-4 justify-center pt-4 w-full">
            <div className="h-10 bg-charcoal-warm/20 rounded-full w-24"></div>
            <div className="h-10 bg-charcoal-warm/20 rounded-full w-24"></div>
            <div className="h-10 bg-charcoal-warm/20 rounded-full w-24"></div>
          </div>
        </div>

        {/* Quotes */}
        <div className="h-[80px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={quoteIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-deep-teal font-medium text-lg md:text-xl italic font-heading px-4"
            >
              "{quotes[quoteIndex]}"
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
