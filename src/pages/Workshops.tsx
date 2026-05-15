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
  Sprout
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

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
      icon: <ShieldAlert className="w-8 h-8 text-terracotta mb-4" />
    },
    {
      title: "Focus & Attention in a Distracted World",
      desc: "Protecting attention in an environment designed to steal it.",
      icon: <Brain className="w-8 h-8 text-terracotta mb-4" />
    },
    {
      title: "Psychological Safety & Communication",
      desc: "Building environments where people speak up without fear.",
      icon: <MessageCircle className="w-8 h-8 text-terracotta mb-4" />
    },
    {
      title: "Gen Z in Your Organisation",
      desc: "Grounded in developmental psychology, not stereotypes.",
      icon: <Users className="w-8 h-8 text-terracotta mb-4" />
    },
    {
      title: "Parenting in the Digital Age",
      desc: "For parent communities, schools, and family programmes.",
      icon: <HeartHandshake className="w-8 h-8 text-terracotta mb-4" />
    },
    {
      title: "Student Resilience & Exam Readiness",
      desc: "For schools and colleges (ages 15-22).",
      icon: <GraduationCap className="w-8 h-8 text-terracotta mb-4" />
    },
    {
      title: "Habit Science for Behaviour Change",
      desc: "Applied behavioural psychology for teams or individuals.",
      icon: <Sprout className="w-8 h-8 text-terracotta mb-4" />
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

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
      {/* Hero Slider */}
      <section className="w-full bg-soft-sand pt-12 pb-12 lg:pt-16 lg:pb-16 flex justify-center">
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
      <section className="py-12 bg-soft-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
             <h2 className="text-3xl md:text-[44px] font-semibold text-deep-teal mb-4 font-heading">Workshop Themes</h2>
             <p className="text-lg text-charcoal-warm">Tailored, interactive, and grounded in behavioral science.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
             {themes.map((theme, i) => (
                <div key={i} className="bg-white p-8 rounded-[16px] border-t-4 border-t-terracotta border-x border-b border-gray-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group flex flex-col h-full cursor-pointer relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-terracotta/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="transform group-hover:scale-105 transition-all duration-300 origin-left">
                      {theme.icon}
                    </div>
                    <h3 className="text-[20px] font-semibold text-deep-teal mb-3 font-heading leading-snug group-hover:text-terracotta transition-colors duration-300 text-pretty">{theme.title}</h3>
                    <p className="text-charcoal-warm text-[15px] leading-relaxed mt-auto">{theme.desc}</p>
                  </div>
                </div>
             ))}
           </div>
        </div>
      </section>

      {/* Workshop Formats Marquee & CTA */}
      <section className="py-24 bg-white border-y border-gray-100">
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
    </div>
  );
}
