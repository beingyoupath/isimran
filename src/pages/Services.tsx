import { useState, useEffect } from "react";
import { CheckCircle2, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { SkeletonLoader } from "../components/SkeletonLoader";
import { SEO } from "../components/SEO";

export default function Services() {
  const [expandedServices, setExpandedServices] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const heroSlides = [
    {
      title: "Support That Fits Your Life — Not Someone Else's Diagnosis",
      subtitle: "Tailored counseling and holistic support designed around your unique reality.",
      desc: "Whether you're managing career burnout, seeking personal growth, or looking for practical psychological tools, we meet you exactly where you are.",
      image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=2940&auto=format&fit=crop"
    },
    {
      title: "Clarity in Career and Life",
      subtitle: "Moving past confusion to deliberate action.",
      desc: "Our career counseling sessions help you align your daily work with your deeper values, transforming professional stagnation into meaningful engagement.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2940&auto=format&fit=crop"
    },
    {
      title: "Actionable Well-being Support",
      subtitle: "When nothing's 'wrong' but everything feels heavy.",
      desc: "Overthinking, decision fatigue, and low motivation quietly drain you. Let's work together to understand these patterns and build sustainable resilience.",
      image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=2940&auto=format&fit=crop"
    }
  ];

  useEffect(() => {
    if (isHovered) return;
    const sliderTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(sliderTimer);
  }, [heroSlides.length, isHovered]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Simulate data loading for a data-heavy component
    return () => clearTimeout(timer);
  }, []);

  const toggleExpand = (index: number) => {
    setExpandedServices(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const servicesList = [
    {
      title: "Career Counselling & Clarity Sessions",
      audience: "For Professionals, Career Shifters, and Anyone Who Doesn't Know What's Next",
      desc: "Sometimes the problem isn't your job — it's the mismatch between who you are and what your daily life requires of you. Career confusion, burnout, underperformance, and resentment often trace back to values misalignment, not laziness or weakness.",
      whoItFor: [
        "Corporate employees",
        "Mid-career professionals",
        "Job seekers",
        "Burnout recovery",
      ],
      format: "1:1 sessions (By appointments only) | 60 minutes | Pune or online",
      cta: "Book a Career Clarity Session",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2940&auto=format&fit=crop"
    },
    {
      title: "Employee Well-Being Workshops",
      audience: "Practical, Psychology-Based Well-Being for Organisations That Take People Seriously",
      desc: "Well-being at work isn't a perk. It's a performance strategy. Our workshops are built for organisations that want substance over a tick-box exercise. No trust falls. No generic slideshows. Real tools, real outcomes.",
      whoItFor: [
        "HR teams",
        "Team leaders",
        "Founders",
        "L&D professionals",
      ],
      format: "Half-day or full-day | Online or on-site | Customisable",
      cta: "Enquire About a Workshop",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop"
    },
    {
      title: "Gen Z in the Workplace",
      audience: "Understanding and Working With the Most Misunderstood Generation in Your Organisation",
      desc: "Gen Z isn't difficult. They're different — and difference, when you don't understand it, looks like a problem. This service helps managers and HR teams bridge the generational gap without either side pretending to be something they're not.",
      whoItFor: [
        "Managers",
        "HR teams",
        "Multi-generational teams",
      ],
      format: "Workshops (teams) | 1:1 sessions (By appointments only) (managers) | Lunch & learn",
      cta: "Book a Gen Z Workshop",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2940&auto=format&fit=crop"
    },
    {
      title: "Parenting & Family Well-Being",
      audience: "Raising Emotionally Healthy Children — When You're Also Human",
      desc: "Parenting in 2026 is a fundamentally different challenge. Screens, social comparison, academic pressure. Our sessions help parents understand their child's inner world — and their own reactions. This isn't about being perfect. It's about being regulated and responsive.",
      whoItFor: [
        "Parents of children 5-18",
        "Expecting parents",
        "Blended families",
      ],
      format: "1:1 parent sessions (By appointments only) | Parent-and-child sessions | Small group workshops",
      cta: "Book a Parenting Session",
      image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2940&auto=format&fit=crop"
    },
    {
      title: "Student Support & Exam Stress",
      audience: "For Students Who Are Doing Everything Right — But Still Feel Like They're Falling Apart",
      desc: "The pressure on students today is real, measurable, and affecting focus, sleep, motivation, and identity. Our sessions use focus training, exam psychology, routine building, and nervous system regulation — practical tools for real results.",
      whoItFor: [
        "Students aged 15+",
        "College students",
        "Exam candidates",
      ],
      format: "1:1 sessions (By appointments only) | Parent-student sessions | Group workshops",
      cta: "Book a Student Clarity Session",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2940&auto=format&fit=crop"
    },
    {
      title: "Mindfulness & Meditation (Secular, Practical)",
      audience: "Train Your Attention — Not Your Spiritual Life",
      desc: "Mindfulness is not about emptying your mind. It's about training your attention so you can notice thoughts without being controlled by them. Entirely secular and science-based. Practices fit into 3-10 minutes of a real day.",
      whoItFor: [
        "Overthinkers",
        "Distracted professionals",
        "Stress responders",
      ],
      format: "Individual coaching (By appointments only) | Group sessions | Workplace programmes",
      cta: "Try a Free Mindfulness Session",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2899&auto=format&fit=crop"
    },
    {
      title: "Functional Yoga for Mental Well-Being",
      audience: "Yoga as Nervous System Science — Not Spiritual Performance",
      desc: "The yoga we work with has nothing to do with perfect poses. It has everything to do with how physical movement and breath regulate your nervous system, reduce physiological stress, and improve mental clarity. Designed for people who sit at desks.",
      whoItFor: [
        "Desk workers",
        "Stressed professionals",
        "Anxiety responders",
      ],
      format: "Integrated into individual sessions (By appointments only) | Guided recordings | Group workshops",
      cta: "Learn More About Our Approach",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2920&auto=format&fit=crop"
    },
    {
      title: "Behavioural Change & Habit Coaching",
      audience: "Why You Keep Starting Over — And How to Finally Stop",
      desc: "Most habit advice is wrong. It focuses on motivation and willpower — both unreliable. We use leading habit science (Clear, Fogg, Wood): environment design, identity, routine architecture, and the right kind of friction.",
      whoItFor: [
        "Procrastinators",
        "Inconsistent achievers",
        "Self-sabotage patterns",
      ],
      format: "1:1 sessions (By appointments only) | Structured 4-week programme | Group workshop",
      cta: "Start Your Habit Change Session",
      image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?q=80&w=2936&auto=format&fit=crop"
    },
    {
      title: "Support for Daily Life Challenges",
      audience: "When Nothing's \"Wrong\" — But Everything Feels Heavy",
      desc: "Not every problem needs a diagnosis. Chronic overthinking, decision fatigue, low motivation, disrupted sleep, emotional flatness — these don't get a sick day. They just quietly drain you. We help you understand and respond to these patterns.",
      whoItFor: [
        "Overthinkers",
        "Sleep strugglers",
        "\"Functioning but empty\" experiencers",
      ],
      format: "1:1 sessions (By appointments only) | Ongoing support packages",
      cta: "Book a Session for Daily Life Support",
      image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=2940&auto=format&fit=crop"
    }
  ];

  return (
    <div className="bg-white">
      <SEO 
        title="Psychological Services & Therapy Options Pune | Being You Path"
        description="Explore our specialized services including Adult Counseling, Performance Coaching, Child & Adolescent Therapy, and Corporate Wellness programs in Pune."
        keywords="counselling services pune, therapy options online, adult counselling, child therapy pune, adolescent psychology pune, corporate wellness programs india, relationship coaching pune"
      />
      <h1 className="sr-only">Comprehensive Psychological Services, Online Therapy, and Counselling in Pune</h1>
      <p className="sr-only">Being You Path provides an array of mental health services including CBT, child therapy, adolescent counseling, relationship and couples therapy, anxiety management, and corporate psychological wellness programs.</p>
      
      {/* Hero Slider */}
      <section className="w-full bg-soft-sand py-12 md:py-16 lg:py-20 flex justify-center border-b border-gray-200">
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
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    currentSlide === idx 
                      ? "bg-terracotta w-8" 
                      : "bg-gray-300 hover:bg-terracotta/60"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Multi-layered Liquid Wave Transition */}
      <div className="w-full relative bg-white leading-[0] h-[60px] md:h-[120px] overflow-hidden -mt-[1px]">
        {/* Slow Wave (Layer 1) */}
        <div className="absolute top-0 left-0 w-[200%] h-full flex animate-wave-slow opacity-60">
           <svg className="w-1/2 h-full" viewBox="0 0 1440 320" preserveAspectRatio="none" fill="var(--color-soft-sand)" xmlns="http://www.w3.org/2000/svg">
             <path d="M0,0L48,42.7C96,85,192,171,288,213.3C384,256,480,256,576,213.3C672,171,768,85,864,69.3C960,53,1056,107,1152,133.3C1248,160,1344,160,1392,160L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
           </svg>
           <svg className="w-1/2 h-full" viewBox="0 0 1440 320" preserveAspectRatio="none" fill="var(--color-soft-sand)" xmlns="http://www.w3.org/2000/svg">
             <path d="M0,0L48,42.7C96,85,192,171,288,213.3C384,256,480,256,576,213.3C672,171,768,85,864,69.3C960,53,1056,107,1152,133.3C1248,160,1344,160,1392,160L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
           </svg>
        </div>
        {/* Fast Wave (Layer 2) */}
        <div className="absolute top-0 left-0 w-[200%] h-[80%] flex animate-wave">
           <svg className="w-1/2 h-full" viewBox="0 0 1440 320" preserveAspectRatio="none" fill="var(--color-soft-sand)" xmlns="http://www.w3.org/2000/svg">
             <path d="M0,0L48,21.3C96,43,192,85,288,101.3C384,117,480,107,576,106.7C672,107,768,117,864,133.3C960,149,1056,171,1152,160C1248,149,1344,107,1392,85.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
           </svg>
           <svg className="w-1/2 h-full" viewBox="0 0 1440 320" preserveAspectRatio="none" fill="var(--color-soft-sand)" xmlns="http://www.w3.org/2000/svg">
             <path d="M0,0L48,21.3C96,43,192,85,288,101.3C384,117,480,107,576,106.7C672,107,768,117,864,133.3C960,149,1056,171,1152,160C1248,149,1344,107,1392,85.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
           </svg>
        </div>
      </div>

      {/* Services Accordion List */}
      <section className="pt-4 pb-12 md:pb-16 lg:pb-20 bg-white">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="space-y-6">
                 <SkeletonLoader />
                 <SkeletonLoader />
              </div>
            ) : (
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } },
                  hidden: {}
                }}
                className="space-y-6"
              >
                 {servicesList.map((service, index) => (
                    <motion.div 
                      key={index} 
                      variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                      }}
                      className="bg-soft-sand rounded-[24px] shadow-sm border border-gray-200/50 overflow-hidden hover-lift transition-all duration-300"
                    >
                      <button 
                        onClick={() => toggleExpand(index)}
                      className="w-full p-6 md:p-8 flex items-center justify-between text-left hover:bg-gray-50/50 transition-colors focus:outline-none"
                    >
                      <div>
                        <h2 className="text-[28px] md:text-[32px] font-semibold text-deep-teal font-heading leading-tight mb-2 transition-colors duration-300">{service.title}</h2>
                        <h3 className="text-[16px] md:text-[18px] font-medium text-terracotta font-heading">{service.audience}</h3>
                      </div>
                      <motion.div 
                        className="flex-shrink-0 ml-4 text-terracotta bg-white p-2 rounded-full shadow-sm border border-gray-100"
                        animate={{ rotate: expandedServices.includes(index) ? 180 : 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                      >
                        <ChevronDown className="w-6 h-6" />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {expandedServices.includes(index) && (
                        <motion.div 
                          initial="collapsed"
                          animate="open"
                          exit="collapsed"
                          variants={{
                            open: { opacity: 1, height: "auto" },
                            collapsed: { opacity: 0, height: 0 }
                          }}
                          transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                          className="overflow-hidden"
                        >
                          <motion.div 
                            variants={{
                              collapsed: { opacity: 0, y: -10 },
                              open: { opacity: 1, y: 0 }
                            }}
                            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                            className="px-6 md:px-8 pb-8 pt-4 border-t border-gray-200/50 flex flex-col md:flex-row gap-8"
                          >
                            <div className="md:w-1/3 flex-shrink-0">
                               <div className="h-48 md:h-full min-h-[200px] bg-gray-200 rounded-[16px] overflow-hidden">
                                 <img 
                                   src={service.image} 
                                   alt={service.title}
                                   className="w-full h-full object-cover"
                                   referrerPolicy="no-referrer"
                                 />
                               </div>
                            </div>
                            
                            <div className="md:w-2/3 flex flex-col">
                              <p className="text-lg text-charcoal-warm leading-relaxed mb-6">
                                {service.desc}
                              </p>
                              
                              <div className="mb-8">
                                <h4 className="font-semibold text-deep-teal mb-4 text-lg">Who It's For:</h4>
                                <ul className="space-y-3">
                                  {service.whoItFor.map((item, i) => (
                                    <li key={i} className="flex items-start">
                                      <CheckCircle2 className="w-5 h-5 text-terracotta mr-3 flex-shrink-0 mt-1" />
                                      <span className="text-charcoal-warm text-[15px]">{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div className="bg-white/50 border border-gray-200 rounded-xl p-5 mb-8 mt-auto flex items-center">
                                <span className="font-bold text-deep-teal text-sm uppercase tracking-wide">Format:</span>
                                <span className="text-charcoal-warm text-sm ml-2">{service.format}</span>
                              </div>

                              <Link
                                to="/contact"
                                className="inline-flex items-center justify-center px-8 py-3 bg-terracotta text-white font-medium rounded-[50px] hover:bg-amber-glow transition-all uppercase text-sm tracking-wide self-start shadow-sm hover:shadow-md hover:-translate-y-0.5"
                              >
                                {service.cta} &rarr;
                              </Link>
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
               ))}
              </motion.div>
            )}
         </div>
      </section>

      {/* End CTA */}
      <section className="bg-white py-12 md:py-16 lg:py-20 border-b border-gray-200">
        <div className="max-w-[800px] mx-auto px-4 text-center bg-soft-sand rounded-[24px] p-12 md:p-16">
           <h2 className="text-[36px] font-semibold text-deep-teal mb-6 font-heading">Still not sure which service fits?</h2>
           <p className="text-lg text-charcoal-warm mb-10">That's completely okay. Book a free clarity call — we'll figure it out together.</p>
           <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
             <Link
                to="/contact"
                className="inline-flex items-center justify-center px-10 py-5 text-lg font-medium rounded-[50px] text-white bg-terracotta hover:bg-amber-glow transition-colors uppercase tracking-wide shadow-md hover:shadow-lg"
              >
                &rarr; Book Your Free Clarity Call
              </Link>
           </motion.div>
        </div>
      </section>
    </div>
  );
}
