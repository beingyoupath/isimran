import { Link, Outlet, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube, Twitter } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Workshops", path: "/workshops" },
    { name: "Resources / Blogs", path: "/resources" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="sticky top-0 z-50 flex flex-col w-full shadow-sm">
      {/* Top Utility Bar */}
      <div className="bg-[#0B3A42] text-[#FDFBF7] w-full py-2.5">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-[60px] flex justify-between items-center text-[11px] sm:text-[12px] tracking-wide font-medium opacity-90">
          <div className="flex items-center space-x-6">
            <span className="flex items-center hover:text-[#E6A157] transition-colors duration-300 cursor-pointer"><Phone className="w-3.5 h-3.5 mr-1.5 text-[#E6A157]" /> +91 7387772573, +91 7387779238</span>
            <span className="hidden sm:flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-3">
              <span className="flex items-center hover:text-[#E6A157] transition-colors duration-300 cursor-pointer"><Mail className="w-3.5 h-3.5 mr-1.5 text-[#E6A157]" /> hello@beingyoupath.com</span>
            </span>
          </div>
          <div className="flex items-center space-x-5">
            <span className="flex items-center group cursor-pointer">
              <MapPin className="w-3.5 h-3.5 mr-1.5 text-[#E6A157] group-hover:scale-110 transition-transform duration-300" />
              <span className="group-hover:text-[#E6A157] transition-colors duration-300">Pune & Online</span>
            </span>
          </div>
        </div>
      </div>
      
      {/* Main Navbar */}
      <nav className="bg-[#FDFBF7] shadow-[0_4px_30px_-10px_rgba(11,58,66,0.08)] border-b border-[#0B3A42]/5 relative z-40">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-[60px]">
          <div className="flex flex-col lg:flex-row justify-between items-center min-h-[90px] py-4 lg:py-0 gap-y-4 lg:gap-y-0">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex flex-col sm:flex-row items-center sm:items-start gap-4 hover:opacity-80 transition-opacity">
                {/* Logo Placeholder */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 border border-gray-300 flex-shrink-0">
                  <span className="text-xs font-semibold tracking-wider">LOGO</span>
                </div>
                <div className="flex flex-col justify-center items-center sm:items-start text-center sm:text-left">
                  <span className="text-[28px] font-bold font-heading text-[#0B3A42] tracking-tight leading-tight">
                    Being You Path™
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.22em] text-[#FF5F1F] drop-shadow-[0_0_8px_rgba(255,95,31,0.8)] font-bold mt-0.5">
                    Where you meet your real self™
                  </span>
                </div>
              </Link>
            </div>
            
            <div className="flex items-center flex-wrap justify-center lg:justify-end gap-x-4 md:gap-x-6 lg:gap-x-8 gap-y-3">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`group relative py-2 whitespace-nowrap font-medium tracking-[0.05em] text-[13px] md:text-[14px] transition-all duration-500 ease-out ${
                    location.pathname === link.path ? "text-[#E6A157]" : "text-[#0B3A42] hover:text-[#0B3A42]/70"
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-[#E6A157] shadow-[0_0_8px_rgba(230,161,87,0.6)] transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
                    location.pathname === link.path ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                  }`} />
                </Link>
              ))}
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="ml-2 md:ml-6 mt-2 md:mt-0"
              >
                <Link
                  to="/contact"
                  className="bg-[#0B3A42] text-[#FDFBF7] px-6 py-2.5 md:px-8 md:py-3.5 rounded-full font-medium hover:bg-[#07252A] transition-colors duration-500 uppercase text-[11px] md:text-[12px] tracking-[0.15em] shadow-[0_4px_15px_-5px_rgba(11,58,66,0.3)] hover:shadow-[0_8px_25px_-8px_rgba(11,58,66,0.5)] flex items-center justify-center relative overflow-hidden group"
                >
                  <span className="relative z-10 whitespace-nowrap">Book Consultation</span>
                  <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-[#E6A157]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0B3A42] relative text-[#FDFBF7]">
      {/* Optional Top Glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#E6A157]/40 to-transparent"></div>
      
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-[60px] pt-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 items-start w-full mb-10">
          {/* Column 1 - Brand Identity */}
          <div className="flex flex-col items-start text-left">
            <div className="flex items-center gap-4 border-b border-[#FDFBF7]/20 pb-4 mb-4">
              {/* Logo Placeholder */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/10 rounded-full flex items-center justify-center text-[#F4F1E1]/50 border border-white/20 flex-shrink-0">
                <span className="text-xs font-semibold tracking-wider">LOGO</span>
              </div>
              <div className="flex flex-col">
                <h3 className="text-3xl font-bold font-heading mb-1 tracking-tight text-[#FDFBF7]">
                  Being You Path™
                </h3>
                <p className="text-[11px] tracking-[0.2em] uppercase font-bold text-[#FF5F1F] drop-shadow-[0_0_8px_rgba(255,95,31,0.8)]">
                  Where you meet your real self™
                </p>
              </div>
            </div>
            <p className="text-[14px] leading-relaxed text-[#F4F1E1]/80 max-w-sm">
              A holistic well-being practice blending modern psychology, secular mindfulness, and explainable ancient wisdom.
            </p>
          </div>
          
          {/* Column 2 - Navigation */}
          <div className="flex flex-col items-start">
            <h4 className="text-lg font-semibold font-heading mb-6 text-[#FDFBF7] tracking-wide">Quick Links</h4>
            <div className="flex flex-col space-y-4 items-start w-full">
              {['Home', 'About', 'Services', 'Workshops', 'Resources', 'Contact'].map((item) => (
                <Link 
                  key={item} 
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                  className="text-[16px] text-[#F4F1E1]/90 hover:text-[#FF3131] hover:translate-x-2 transition-all duration-300 relative group flex items-center drop-shadow-sm hover:drop-shadow-[0_0_8px_rgba(255,49,49,0.8)]"
                >
                  <span className="w-0 h-[2px] bg-[#FF3131] absolute left-0 -bottom-1 group-hover:w-full transition-all duration-300 ease-out"></span>
                  {item}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Column 3 - Offerings */}
          <div className="flex flex-col items-start text-sm">
            <h4 className="text-lg font-semibold font-heading mb-6 text-[#FDFBF7] tracking-wide">Offerings</h4>
            <ul className="flex flex-col space-y-4 items-start text-[#F4F1E1]/80 w-full">
              {['Counselling', 'Coaching', 'Emotional Healing', 'Mindfulness', 'Workshops', 'Guided Practices'].map((offering) => (
                <li key={offering} className="hover:text-[#E6A157] transition-colors duration-300 cursor-pointer relative group flex items-center">
                  <span className="w-0 h-[1px] bg-[#E6A157] absolute left-0 -bottom-1 group-hover:w-full transition-all duration-300 ease-out"></span>
                  {offering}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 4 - Contact & Presence */}
          <div className="flex flex-col items-start text-sm">
            <h4 className="text-lg font-semibold font-heading mb-6 text-[#FDFBF7] tracking-wide">Reach Out</h4>
            <div className="flex flex-col space-y-4 items-start w-full">
              <a href="mailto:hello@beingyoupath.com" className="text-[#F4F1E1]/80 hover:text-[#E6A157] transition-colors duration-300">hello@beingyoupath.com</a>
              <a href="mailto:beingyoupath@gmail.com" className="text-[#F4F1E1]/80 hover:text-[#E6A157] transition-colors duration-300">beingyoupath@gmail.com</a>
              <a href="mailto:info@beingyoupath.com" className="text-[#F4F1E1]/80 hover:text-[#E6A157] transition-colors duration-300">info@beingyoupath.com</a>
              
              <div className="flex items-center justify-start mt-2 pt-4 border-t border-[#FDFBF7]/10 w-full gap-3">
                <a href="#" className="flex items-center text-[#F4F1E1]/80 hover:text-[#E6A157] transition-colors duration-300 group" aria-label="Google Maps">
                  <MapPin className="w-4 h-4 mr-1 text-[#E6A157] flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span>Pune</span>
                </a>
                <span className="text-[#FDFBF7]/30">|</span>
                <span className="text-[#F4F1E1]/80 flex items-center gap-2">
                  <span>Online</span>
                  {/* Google Meet Icon */}
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-emerald-400" fill="currentColor">
                    <path d="M20.082 8.784L21.464 6.38a1.5 1.5 0 00-.73-2.008l-2.61-1.306a1.5 1.5 0 00-1.782.35L14.786 5H4.5A2.5 2.5 0 002 7.5v9A2.5 2.5 0 004.5 19h10v-3l3.636 3.636a1.5 1.5 0 002.585-1.06V8.784zm-3.082 5.093v1.624h-10v-7h10v1.624L20 8.05v7.9-3.073z"/>
                  </svg>
                  {/* Zoom Icon */}
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-blue-400" fill="currentColor">
                    <path d="M4.5 5A2.5 2.5 0 002 7.5v9A2.5 2.5 0 004.5 19h11a2.5 2.5 0 002.5-2.5v-2l4 3v-11l-4 3v-2A2.5 2.5 0 0015.5 5h-11z"/>
                  </svg>
                </span>
              </div>
              
              {/* Social Media Icons beneath Reach Out */}
              <div className="flex flex-wrap items-center mt-4 gap-4">
                <a href="#" className="text-[#F4F1E1]/70 hover:text-[#E6A157] transition-all hover:scale-110 duration-300" aria-label="Facebook">
                  <Facebook className="w-5 h-5" strokeWidth={1.5} />
                </a>
                <a href="#" className="text-[#F4F1E1]/70 hover:text-[#E6A157] transition-all hover:scale-110 duration-300" aria-label="Instagram">
                  <Instagram className="w-5 h-5" strokeWidth={1.5} />
                </a>
                <a href="#" className="text-[#F4F1E1]/70 hover:text-[#E6A157] transition-all hover:scale-110 duration-300" aria-label="Reddit">
                  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-5 h-5"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.758.79 1.758 1.761 0 .36-.104.694-.287.974.015.15.022.302.022.457 0 2.806-3.1 5.082-6.93 5.082-3.83 0-6.93-2.276-6.93-5.082 0-.155.008-.307.023-.457a1.71 1.71 0 0 1-.287-.974c0-.972.79-1.76 1.758-1.76.477 0 .899.182 1.207.491 1.194-.856 2.85-1.418 4.674-1.488l.899-4.202c.038-.178.204-.306.388-.282l3.018.635a1.26 1.26 0 0 1 1.249-.933zm-4.706 7.641c-1.373 0-2.483 1.11-2.483 2.484 0 1.374 1.11 2.484 2.483 2.484 1.374 0 2.484-1.11 2.484-2.484 0-1.374-1.11-2.484-2.484-2.484zm-3.328 1.383c-.886 0-1.604.718-1.604 1.604 0 .886.718 1.604 1.604 1.604.886 0 1.604-.718 1.604-1.604 0-.886-.718-1.604-1.604-1.604zm6.656 0c-.886 0-1.604.718-1.604 1.604 0 .886.718 1.604 1.604 1.604.886 0 1.604-.718 1.604-1.604 0-.886-.718-1.604-1.604-1.604zm-3.328 3.513c-1.332 0-2.477.728-2.923 1.745-.084.19-.001.408.188.491.19.084.408-.001.491-.188.32-.73 1.144-1.258 2.244-1.258 1.1 0 1.924.528 2.244 1.258.083.189.301.272.491.188.189-.083.272-.301.188-.491-.446-1.017-1.591-1.745-2.923-1.745z"/></svg>
                </a>
                <a href="#" className="text-[#F4F1E1]/70 hover:text-[#E6A157] transition-all hover:scale-110 duration-300" aria-label="LinkedIn">
                  <Linkedin className="w-5 h-5" strokeWidth={1.5} />
                </a>
                <a href="#" className="text-[#F4F1E1]/70 hover:text-[#E6A157] transition-all hover:scale-110 duration-300" aria-label="Google">
                  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-5 h-5"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>
                </a>
                <a href="#" className="text-[#F4F1E1]/70 hover:text-[#E6A157] transition-all hover:scale-110 duration-300" aria-label="X (Twitter)">
                  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-5 h-5"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
                </a>
                <a href="#" className="text-[#F4F1E1]/70 hover:text-[#E6A157] transition-all hover:scale-110 duration-300" aria-label="YouTube">
                  <Youtube className="w-5 h-5" strokeWidth={1.5} />
                </a>
                <a href="#" className="text-[#F4F1E1]/70 hover:text-[#E6A157] transition-all hover:scale-110 duration-300" aria-label="Quora">
                  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-5 h-5"><path d="M11.965 0C5.358 0 0 5.358 0 11.965c0 5.253 3.4 9.697 8.163 11.39l.617 1.83a.475.475 0 0 0 .548.31l2.457-.597c.712.13 1.442.197 2.18.197 6.606 0 11.965-5.359 11.965-11.966S17.653 0 12.045 0c-.027 0-.054 0-.08 0zm-1.8 17.514c-3.13 0-5.368-2.618-5.368-5.694 0-3.078 2.24-5.696 5.368-5.696 3.129 0 5.367 2.618 5.367 5.696 0 3.076-2.238 5.694-5.367 5.694zm1.874-1.854l1.107 1.341c.224.271.65.26.86-.02l.623-.834a7.48 7.48 0 0 0 1.706-1.554l-.45-.66a6.113 6.113 0 0 1-1.393 1.265l-.36-.484c.668-1.536.98-3.328.98-5.044 0-4.148-1.802-7.39-6.3-7.39-4.498 0-6.3 3.242-6.3 7.39 0 4.146 1.802 7.39 6.3 7.39a6.626 6.626 0 0 0 3.227-.8z"/></svg>
                </a>
                <a href="#" className="text-[#F4F1E1]/70 hover:text-[#E6A157] font-bold transition-all hover:scale-110 duration-300 flex items-center justify-center text-[10px]" aria-label="Justdial">JD</a>
                <a href="#" className="text-[#F4F1E1]/70 hover:text-[#E6A157] font-bold transition-all hover:scale-110 duration-300 flex items-center justify-center text-[10px]" aria-label="Sulekha">SU</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="border-t border-[#FDFBF7]/10 pt-4 flex justify-center items-center">
          <p className="text-[13px] text-[#F4F1E1]/50 font-medium tracking-wide text-center">
            © 2026 Being You Path™. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      
      {/* Dialer Floating Button */}
      <motion.a
        href="tel:+917387779238"
        className="fixed bottom-[100px] right-6 z-50 flex items-center justify-center group"
        aria-label="Call Us"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#3b82f6] opacity-30 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.2s' }}></span>
        <motion.div 
          className="relative bg-[#3b82f6] text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-shadow cursor-pointer"
          whileHover={{ scale: 1.1, rotate: [-5, 5, -5, 0] }}
          transition={{ rotate: { duration: 0.4 } }}
        >
          <Phone className="w-7 h-7" />
        </motion.div>
      </motion.a>

      {/* WhatsApp Floating Button */}
      <motion.a
        href="https://wa.me/917387779238"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center group"
        aria-label="Chat on WhatsApp"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-30 animate-ping" style={{ animationDuration: '2s' }}></span>
        <motion.div 
          className="relative bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-shadow cursor-pointer"
          whileHover={{ scale: 1.1, rotate: [-5, 5, -5, 0] }}
          transition={{ rotate: { duration: 0.4 } }}
        >
          <svg
            xmlns="http://www.w3.org/200.svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-7 h-7"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
        </motion.div>
      </motion.a>
    </div>
  );
}
