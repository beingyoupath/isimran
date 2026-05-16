import { Link } from "react-router-dom";
import { 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  ShieldAlert,
  Brain,
  MessageCircle,
  Users,
  HeartHandshake,
  GraduationCap,
  Sprout,
  X,
  Mail
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { SEO } from "../components/SEO";

export default function Workshops() {
  const heroSlides = [
    {
      title: "Workshops That Change How People Work, Think, and Live Together",
      subtitle: "Built for organisations, schools, and communities — not conference rooms.",
      desc: "Our workshops are not motivational speeches with soft music. They are structured, facilitated learning experiences built around real psychological frameworks, tested tools, and honest conversation. Customised to your people, your context, your goals.",
      image: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=2832&auto=format&fit=crop"
    },
    {
      title: "Facilitated Learning Grounded in Psychology",
      subtitle: "We don't just talk. We help you experience.",
      desc: "Go beyond theory. Our sessions integrate actionable behavioral science with practical tools, equipping your team with skills to self-regulate, collaborate, and adapt to high-pressure environments.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop"
    },
    {
      title: "Meaningful Connection & Engagement",
      subtitle: "Where honest conversation meets practical application.",
      desc: "Whether it's bridging the generational gap or building psychological safety, we create a structured environment where real change begins, driving sustained shifts long after the session ends.",
      image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=2940&auto=format&fit=crop"
    }
  ];

  const themes = [
    {
      title: "Stress & Burnout Prevention",
      desc: "Practical tools for regulation, recovery, and sustainable performance.",
      icon: <ShieldAlert className="w-8 h-8 text-terracotta mb-4" />,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Focus & Attention in a Distracted World",
      desc: "Protecting attention in an environment designed to steal it.",
      icon: <Brain className="w-8 h-8 text-terracotta mb-4" />,
      image: "https://images.unsplash.com/photo-1499728603263-13726abce5fd?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Psychological Safety & Communication",
      desc: "Building environments where people speak up without fear.",
      icon: <MessageCircle className="w-8 h-8 text-terracotta mb-4" />,
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Gen Z in Your Organisation",
      desc: "Grounded in developmental psychology, not stereotypes.",
      icon: <Users className="w-8 h-8 text-terracotta mb-4" />,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Parenting in the Digital Age",
      desc: "For parent communities, schools, and family programmes.",
      icon: <HeartHandshake className="w-8 h-8 text-terracotta mb-4" />,
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Student Resilience & Exam Readiness",
      desc: "For schools and colleges (ages 15-22).",
      icon: <GraduationCap className="w-8 h-8 text-terracotta mb-4" />,
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Habit Science for Behaviour Change",
      desc: "Applied behavioural psychology for teams or individuals.",
      icon: <Sprout className="w-8 h-8 text-terracotta mb-4" />,
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<{title: string, desc: string} | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRegisterEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const form = (e.target as HTMLElement).closest('form') as HTMLFormElement;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const phone = (form.elements.namedItem('phone') as HTMLInputElement).value;
    const attendees = (form.elements.namedItem('attendees') as HTMLInputElement).value;

    const body = `Workshop: ${selectedTheme?.title}%0A%0AName: ${name}%0AEmail: ${email}%0APhone: ${phone}%0AAttendees: ${attendees}`;
    window.location.href = `mailto:beingyoupath@gmail.com?subject=Workshop Registration: ${selectedTheme?.title}&body=${body}`;
    
    setIsSubmitted(true);
  };

  const handleRegisterWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const form = (e.target as HTMLElement).closest('form') as HTMLFormElement;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const phone = (form.elements.namedItem('phone') as HTMLInputElement).value;
    const attendees = (form.elements.namedItem('attendees') as HTMLInputElement).value;

    const body = `Workshop Registration:%0A%0AWorkshop: ${selectedTheme?.title}%0AName: ${name}%0AEmail: ${email}%0APhone: ${phone}%0AAttendees: ${attendees}`;
    window.open(`https://wa.me/917387779238?text=${body}`, '_blank');
    
    setIsSubmitted(true);
  };

  const closeRegistration = () => {
    setSelectedTheme(null);
    setIsSubmitted(false);
  };

  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [heroSlides.length, isHovered]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));

  return (
    <div className="bg-soft-sand">
      <SEO 
        title="Workshops & Training"
        description="Structured, facilitated learning experiences built around real psychological frameworks, tested tools, and honest conversation. Customised for your organisation, school, or community."
      />
      {/* Hero Slider */}
      <section className="w-full bg-soft-sand py-12 md:py-16 lg:py-20 flex justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div 
            className="relative rounded-[32px] overflow-hidden shadow-2xl flex flex-col bg-white"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="flex flex-col lg:flex-row w-full min-h-[600px] lg:min-h-[550px]"
              >
                {/* Image Element */}
                <div className="w-full lg:w-5/12 h-[35vh] md:h-[45vh] lg:h-auto relative shrink-0">
                  <img 
                    src={heroSlides[currentSlide].image} 
                    alt={heroSlides[currentSlide].title}
                    className="absolute inset-0 w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                {/* Text Content Area */}
                <div className="w-full lg:w-7/12 p-8 md:p-12 lg:p-16 pb-20 md:pb-24 lg:pb-16 flex flex-col items-center lg:items-start text-center lg:text-left justify-center relative z-20">
                  <div className="w-full max-w-2xl mx-auto lg:mx-0">
                    <h1 className="text-3xl md:text-[40px] lg:text-[48px] leading-tight font-bold text-deep-teal mb-6 font-heading tracking-tight">
                      {heroSlides[currentSlide].title}
                    </h1>
                    
                    <h2 className="text-xl md:text-[24px] md:leading-[32px] text-terracotta mb-6 font-semibold font-heading">
                      {heroSlides[currentSlide].subtitle}
                    </h2>

                    <p className="text-lg text-charcoal-warm mb-10 leading-relaxed">
                      {heroSlides[currentSlide].desc}
                    </p>
                    
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-6 z-30">
              <button
                onClick={prevSlide}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 hover:bg-white shadow-md text-deep-teal hover:text-terracotta backdrop-blur-md flex items-center justify-center transition-all border border-gray-100"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-6 z-30">
              <button
                onClick={nextSlide}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 hover:bg-white shadow-md text-deep-teal hover:text-terracotta backdrop-blur-md flex items-center justify-center transition-all border border-gray-100"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-6 md:bottom-8 lg:bottom-12 right-0 left-0 lg:left-auto lg:right-[29%] z-30 flex justify-center gap-3">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-8 bg-terracotta' : 'w-2.5 bg-gray-300 hover:bg-terracotta/50'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Themes Grid */}
      <section className="py-12 md:py-16 lg:py-20 bg-soft-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-10 md:mb-16">
             <h2 className="text-3xl md:text-[44px] font-semibold text-deep-teal mb-4 font-heading">Workshop Themes</h2>
             <p className="text-lg text-charcoal-warm">Tailored, interactive, and grounded in behavioral science.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
             {themes.map((theme, i) => (
                <div key={i} onClick={() => setSelectedTheme(theme)} className="bg-white rounded-[16px] border-t-4 border-t-terracotta border-x border-b border-gray-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group flex flex-col h-full cursor-pointer relative overflow-hidden">
                  <div className="h-40 w-full overflow-hidden relative">
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
                    <img src={theme.image} alt={theme.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-8 flex-grow flex flex-col relative z-20">
                    <div className="absolute inset-0 bg-gradient-to-br from-terracotta/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
                    <div className="transform group-hover:scale-105 transition-all duration-300 origin-left relative z-10">
                      {theme.icon}
                    </div>
                    <h3 className="text-[20px] font-semibold text-deep-teal mb-3 font-heading leading-snug group-hover:text-terracotta transition-colors duration-300 text-pretty relative z-10">{theme.title}</h3>
                    <p className="text-charcoal-warm text-[15px] leading-relaxed mt-auto relative z-10">{theme.desc}</p>
                  </div>
                </div>
             ))}
           </div>
        </div>
      </section>

      {/* Workshop Formats Marquee & CTA */}
      <section className="py-16 md:py-20 lg:py-24 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-[40px] font-semibold text-deep-teal font-heading">Workshop Formats</h2>
          </div>
        </div>

        {/* Marquee Container */}
        <div className="relative w-full flex overflow-hidden mb-12 py-10">
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none"></div>
          
          <div className="animate-marquee flex w-max items-stretch px-3">
            {[
              { name: "90-minute Sessions", desc: "Brief, high-impact dives into core concepts." },
              { name: "Half-day Workshops", desc: "Deep explorations with interactive exercises." },
              { name: "Full-day Workshops", desc: "Comprehensive immersions for complete framework shifts." },
              { name: "Online Sessions", desc: "Accessible global formats via Zoom or Teams." },
              { name: "In-person (Pune)", desc: "Direct, connected physical presence." },
              { name: "Hybrid Workshops", desc: "Blending digital and physical interactions." },
              { name: "Single Session", desc: "Focused intervention for a specific issue." },
              { name: "Workshop Series", desc: "Sequential learning over multiple weeks." },
              { name: "Ongoing Retainer Programmes", desc: "Continuous support and course-correction." },
              { name: "Fully Customisable Formats", desc: "Tailored entirely to your organizational needs." },
              { name: "90-minute Sessions", desc: "Brief, high-impact dives into core concepts." },
              { name: "Half-day Workshops", desc: "Deep explorations with interactive exercises." },
              { name: "Full-day Workshops", desc: "Comprehensive immersions for complete framework shifts." },
              { name: "Online Sessions", desc: "Accessible global formats via Zoom or Teams." },
              { name: "In-person (Pune)", desc: "Direct, connected physical presence." },
              { name: "Hybrid Workshops", desc: "Blending digital and physical interactions." },
              { name: "Single Session", desc: "Focused intervention for a specific issue." },
              { name: "Workshop Series", desc: "Sequential learning over multiple weeks." },
              { name: "Ongoing Retainer Programmes", desc: "Continuous support and course-correction." },
              { name: "Fully Customisable Formats", desc: "Tailored entirely to your organizational needs." }
            ].map((format, idx) => (
              <div 
                key={idx} 
                tabIndex={0}
                className="bg-soft-sand border border-gray-100 shadow-sm px-8 py-8 rounded-[24px] w-[300px] md:w-[320px] whitespace-normal flex flex-col items-center text-center mx-3 hover:shadow-md hover:-translate-y-1 transition-all duration-300 outline-none flex-shrink-0"
              >
                <h4 className="text-lg font-semibold text-deep-teal font-heading mb-3">{format.name}</h4>
                <p className="text-[14px] text-charcoal-warm leading-relaxed">{format.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <p className="text-[13px] uppercase tracking-wider text-charcoal-warm/70 font-medium mb-12">
            All workshop formats are fully customizable based on audience type, duration, delivery mode, and organizational needs.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-10 py-4 text-[13px] font-medium rounded-full text-white bg-deep-teal hover:bg-[#07252A] transition-all duration-500 uppercase tracking-[0.15em] shadow-[0_4px_15px_-5px_rgba(11,58,66,0.3)] hover:shadow-[0_8px_25px_-8px_rgba(11,58,66,0.5)] transform hover:-translate-y-0.5"
          >
            Enquire About a Workshop
          </Link>
        </div>
      </section>

      {/* Registration Modal */}
      <AnimatePresence>
        {selectedTheme && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0B3A42]/80 backdrop-blur-sm"
              onClick={closeRegistration}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-soft-sand rounded-[24px] shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-white">
                <div>
                  <h3 className="text-xl font-bold text-deep-teal font-heading">Register for Workshop</h3>
                  <p className="text-sm text-terracotta font-medium mt-1">{selectedTheme.title}</p>
                </div>
                <button
                  onClick={closeRegistration}
                  className="text-gray-400 hover:text-terracotta transition-colors p-2 rounded-full hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 md:p-8 overflow-y-auto">
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-deep-teal font-heading mb-4">Registration Received!</h3>
                    <p className="text-charcoal-warm mb-8">
                      Thank you for your interest in the <span className="font-semibold">{selectedTheme.title}</span> workshop. We will be in touch with you shortly to confirm your booking.
                    </p>
                    <button
                      onClick={closeRegistration}
                      className="px-8 py-3 bg-deep-teal text-white rounded-full font-medium tracking-wide hover:bg-[#07252A] transition-colors"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <form className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-deep-teal mb-2">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-terracotta focus:ring focus:ring-terracotta/20 bg-white transition-all outline-none"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-deep-teal mb-2">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-terracotta focus:ring focus:ring-terracotta/20 bg-white transition-all outline-none"
                        placeholder="you@company.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-deep-teal mb-2">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-terracotta focus:ring focus:ring-terracotta/20 bg-white transition-all outline-none"
                        placeholder="+91"
                      />
                    </div>
                    <div>
                      <label htmlFor="attendees" className="block text-sm font-medium text-deep-teal mb-2">Number of Attendees</label>
                      <input
                        type="number"
                        id="attendees"
                        required
                        min="1"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-terracotta focus:ring focus:ring-terracotta/20 bg-white transition-all outline-none"
                        placeholder="1"
                      />
                    </div>
                    <div className="pt-2 flex flex-col sm:flex-row gap-4">
                      <button
                        type="button"
                        onClick={handleRegisterEmail}
                        className="flex-1 py-4 bg-terracotta text-white rounded-xl font-semibold tracking-wide hover:bg-amber-glow transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 whitespace-nowrap px-4 flex justify-center items-center gap-2"
                      >
                        <Mail className="w-5 h-5" />
                        Register via Email
                      </button>
                      <button
                        type="button"
                        onClick={handleRegisterWhatsApp}
                        className="flex-1 py-4 bg-[#25D366] text-white rounded-xl font-semibold tracking-wide hover:bg-[#1DA851] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 whitespace-nowrap px-4 flex justify-center items-center gap-2"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-5 h-5"><path d="M12.031 0C5.398 0 .016 5.378.016 12.015c0 2.128.553 4.202 1.602 6.03L0 24l6.113-1.604a11.967 11.967 0 005.918 1.564h.005c6.634 0 12.014-5.38 12.014-12.017C24.05 5.378 18.665 0 12.031 0zm0 21.964c-1.802 0-3.567-.485-5.11-1.401l-.367-.217-3.794.996 1.015-3.698-.238-.378a9.98 9.98 0 01-1.521-5.263c0-5.518 4.492-10.013 10.015-10.013 5.517 0 10.014 4.495 10.014 10.013 0 5.517-4.497 10.013-10.014 10.013zm5.494-7.514c-.301-.151-1.782-.879-2.059-.979-.276-.1-.478-.152-.678.151-.2.302-.779.979-.955 1.18-.175.201-.351.226-.652.076-.301-.151-1.272-.469-2.424-1.496-.897-.798-1.503-1.784-1.678-2.086-.176-.302-.019-.465.132-.615.136-.135.301-.351.452-.526.151-.176.201-.301.301-.502.1-.2.051-.377-.025-.527-.076-.151-.678-1.633-.929-2.235-.245-.589-.494-.509-.678-.518-.175-.008-.376-.011-.577-.011-.2 0-.527.075-.802.376-.276.301-1.054 1.029-1.054 2.508s1.079 2.909 1.23 3.11c.151.2 2.122 3.238 5.14 4.542.718.31 1.28.495 1.717.635.72.228 1.376.195 1.894.118.579-.085 1.782-.728 2.033-1.431.251-.703.251-1.306.176-1.432-.075-.125-.276-.2-.577-.35z"/></svg>
                        Register via WhatsApp
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
