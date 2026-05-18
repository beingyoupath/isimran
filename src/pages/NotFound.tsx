import { SEO } from "../components/SEO";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <SEO 
        title="Page Not Found" 
        description="The page you are looking for does not exist on Being You Path."
        noindex={true}
      />
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 w-full bg-soft-sand relative overflow-hidden">
        {/* Soft Background Accents */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-terracotta/5 rounded-full blur-[100px] opacity-70"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-sage-green/10 rounded-full blur-[120px] opacity-60"></div>
        
        <motion.div 
          className="relative z-10 max-w-2xl text-center flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[120px] md:text-[180px] font-bold font-heading text-deep-teal leading-none mb-4 opacity-10">404</span>
          <h1 className="text-3xl md:text-[44px] font-semibold text-deep-teal mb-6 font-heading">We couldn't find that page</h1>
          <p className="text-lg md:text-xl text-charcoal-warm mb-10 max-w-xl">
            It looks like the path you're looking for has been moved or no longer exists. Take a deep breath, and let's guide you back.
          </p>
          <Link
            to="/"
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-deep-teal text-white rounded-full text-[15px] font-medium overflow-hidden transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-deep-teal/50"
          >
            <span className="relative z-10 flex items-center gap-2">
              Return Home
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-deep-teal via-[#0B3A42]/90 to-deep-teal opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </motion.div>
      </div>
    </>
  );
}
