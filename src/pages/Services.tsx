import React, { useState, useEffect } from "react";
import { 
  CheckCircle2, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Mail, 
  Calendar, 
  Clock, 
  ExternalLink, 
  Sparkles, 
  Shield, 
  Video, 
  MapPin 
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { SkeletonLoader } from "../components/SkeletonLoader";
import { SEO } from "../components/SEO";
import BookingWidget, { CALENDLY_MAIN_URL } from "../components/BookingWidget";
import { saveInquiry } from "../lib/inquiries";

interface ServiceItem {
  title: string;
  audience: string;
  desc: string;
  whoItFor: string[];
  format: string;
  cta: string;
  image: string;
}

export default function Services() {
  const [expandedServices, setExpandedServices] = useState<number[]>([0]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Service Inquiry Modal State
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const heroSlides = [
    {
      title: "Support That Fits Your Life — Not Someone Else's Diagnosis",
      subtitle: "Tailored counseling and holistic support designed around your unique reality.",
      desc: "Whether you're managing career burnout, seeking personal growth, or looking for practical psychological tools, we meet you exactly where you are.",
      image: "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?q=80&w=2000&auto=format&fit=crop"
    },
    {
      title: "Clarity in Career and Life",
      subtitle: "Moving past confusion to deliberate action.",
      desc: "Our career counseling sessions help you align your daily work with your deeper values, transforming professional stagnation into meaningful engagement.",
      image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=2000&auto=format&fit=crop"
    },
    {
      title: "Actionable Well-being Support",
      subtitle: "When nothing's 'wrong' but everything feels heavy.",
      desc: "Overthinking, decision fatigue, and low motivation quietly drain you. Let's work together to understand these patterns and build sustainable resilience.",
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=2000&auto=format&fit=crop"
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
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const toggleExpand = (index: number) => {
    setExpandedServices(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const servicesList: ServiceItem[] = [
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
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop"
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
      image: "https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?q=80&w=1200&auto=format&fit=crop"
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
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
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
      image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?q=80&w=1200&auto=format&fit=crop"
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
      image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200&auto=format&fit=crop"
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
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop"
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
      image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1200&auto=format&fit=crop"
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
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1200&auto=format&fit=crop"
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
      image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=1200&auto=format&fit=crop"
    }
  ];

  const handleOpenInquiryModal = (service: ServiceItem) => {
    setSelectedService(service);
    setIsSubmitted(false);
  };

  const closeInquiryModal = () => {
    setSelectedService(null);
    setIsSubmitted(false);
  };

  // Submit via Email
  const handleInquiryEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const form = (e.target as HTMLElement).closest('form') as HTMLFormElement;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const name = (form.elements.namedItem('service_name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('service_email') as HTMLInputElement).value;
    const phone = (form.elements.namedItem('service_phone') as HTMLInputElement).value;
    const message = (form.elements.namedItem('service_message') as HTMLTextAreaElement).value;

    setIsSubmitting(true);

    // Asynchronously record into Firestore database
    saveInquiry({
      name,
      email,
      whatsapp: phone,
      question: `[Service Inquiry: "${selectedService?.title}"] Specific Requirements / Challenges: ${message}`
    })
      .then(() => setIsSubmitting(false))
      .catch((err) => {
        console.error("Could not record service inquiry in database:", err);
        setIsSubmitting(false);
      });

    const body = `Service Inquiry: ${selectedService?.title}%0A%0AFull Name: ${name}%0AEmail: ${email}%0APhone: ${phone}%0A%0ASpecific Requirements / Needs / Goals:%0A${message}`;
    window.location.href = `mailto:hello@beingyoupath.com?subject=Service Inquiry: ${selectedService?.title} - ${name}&body=${body}`;

    setIsSubmitted(true);
  };

  // Submit via WhatsApp
  const handleInquiryWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const form = (e.target as HTMLElement).closest('form') as HTMLFormElement;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const name = (form.elements.namedItem('service_name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('service_email') as HTMLInputElement).value;
    const phone = (form.elements.namedItem('service_phone') as HTMLInputElement).value;
    const message = (form.elements.namedItem('service_message') as HTMLTextAreaElement).value;

    setIsSubmitting(true);

    // Asynchronously record into Firestore database
    saveInquiry({
      name,
      email,
      whatsapp: phone,
      question: `[Service Inquiry via WhatsApp: "${selectedService?.title}"] Specific Requirements / Challenges: ${message}`
    })
      .then(() => setIsSubmitting(false))
      .catch((err) => {
        console.error("Could not record service inquiry in database:", err);
        setIsSubmitting(false);
      });

    const body = `*Service Inquiry: ${selectedService?.title}*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Phone:* ${phone}%0A%0A*My Requirements / Challenges:*%0A${message}`;
    const waUrl = `https://wa.me/917387772573?text=${body}`;
    const link = document.createElement('a');
    link.href = waUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setIsSubmitted(true);
  };

  return (
    <div className="bg-white">
      <SEO 
        title="Psychological Counselling & Therapy Services | Pune & Online India"
        description="Comprehensive psychological counselling & therapy in Pune (near Koregaon Park) and online therapy across India. Individual CBT, stress, self-esteem, & career counselling."
        keywords="best counselling centre in pune services, counselling services pune, online therapy india, psychological counselling pune, best psychologist in pune, self esteem therapy pune, cbt therapy india, career counselling pune, counsellor koregaon park pune, online counselling mumbai delhi bengaluru, therapy baner kothrud pune"
      />
      <h1 className="sr-only">Services at Being You Path - Best Counselling Centre in India & #1 Psychologist in Pune | Online Therapy & Psychological Care</h1>
      <p className="sr-only">Being You Path is the leading counselling centre in Pune, Maharashtra and top 5 nationwide in India. We offer an extensive array of evidence-based psychological services: CBT therapy, individual counselling, adolescent support, self-esteem coaching, relationship therapy, and corporate mental health programs in Pune and across India.</p>
      
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
                    
                    <div className="flex flex-wrap items-center gap-4">
                      <a
                        href="#appointments"
                        className="px-8 py-3.5 bg-terracotta text-white rounded-full font-semibold text-sm tracking-wide hover:bg-amber-glow transition-all shadow-md flex items-center gap-2"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Book 1-on-1 Appointment</span>
                      </a>
                      <a
                        href="#service-menu"
                        className="px-6 py-3.5 bg-deep-teal/10 hover:bg-deep-teal/15 text-deep-teal rounded-full font-semibold text-sm transition-all border border-deep-teal/20"
                      >
                        Explore Service Menu
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-6 z-30">
              <button
                onClick={prevSlide}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 hover:bg-white shadow-md text-deep-teal hover:text-terracotta backdrop-blur-md flex items-center justify-center transition-all border border-gray-100 cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-6 z-30">
              <button
                onClick={nextSlide}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 hover:bg-white shadow-md text-deep-teal hover:text-terracotta backdrop-blur-md flex items-center justify-center transition-all border border-gray-100 cursor-pointer"
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
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
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
      <section id="service-menu" className="pt-4 pb-12 md:pb-16 lg:pb-20 bg-white">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-terracotta bg-soft-sand px-3 py-1 rounded-full font-sans inline-block mb-3">
                Evidence-Based Psychological Support
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-deep-teal font-heading">
                Comprehensive Service Menu
              </h2>
              <p className="text-charcoal-warm text-sm sm:text-base mt-2">
                Click on any service to explore details, or use the inquiry button to open our dedicated service requirement form.
              </p>
            </div>

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
                        className="w-full p-6 md:p-8 flex items-center justify-between text-left hover:bg-gray-50/50 transition-colors focus:outline-none cursor-pointer"
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

                              {/* Interactive Modal Booking & Calendly Options */}
                              <div className="flex flex-wrap items-center gap-3">
                                <button
                                  type="button"
                                  onClick={() => handleOpenInquiryModal(service)}
                                  className="inline-flex items-center justify-center px-8 py-3.5 bg-terracotta text-white font-medium rounded-[50px] hover:bg-amber-glow transition-all uppercase text-sm tracking-wide shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
                                >
                                  <span>{service.cta}</span>
                                  <span className="ml-2">&rarr;</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    window.open(CALENDLY_MAIN_URL, "_blank", "noopener,noreferrer");
                                  }}
                                  className="inline-flex items-center justify-center px-5 py-3 bg-white text-deep-teal border border-deep-teal/20 font-medium rounded-[50px] hover:bg-white/90 hover:border-deep-teal transition-all text-xs tracking-wider uppercase shadow-2xs hover:-translate-y-0.5 cursor-pointer gap-2"
                                >
                                  <Calendar className="w-3.5 h-3.5 text-terracotta" />
                                  <span>Calendly Slot</span>
                                </button>
                              </div>
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

      {/* One-on-One Appointment Calendly Integration */}
      <section id="appointments" className="py-16 md:py-24 bg-soft-sand border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-terracotta bg-white px-4 py-1.5 rounded-full inline-block mb-3 font-sans shadow-2xs border border-gray-200">
              One-on-One Counseling & Direct Appointments
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-deep-teal font-heading mb-4">
              Book Your 1:1 Psychological Session
            </h2>
            <p className="text-charcoal-warm text-base sm:text-lg leading-relaxed">
              Choose your session length—including our <strong>15-Minute Free Clarity Call</strong>, 30/45-min focused therapy, or 60-min comprehensive consultation—and instantly reserve your slot via Calendly. Facilitated by our lead psychologists, <strong>Imran Hussain</strong> and <strong>Tejaswini Joshi</strong>.
            </p>
          </div>

          <BookingWidget />
        </div>
      </section>

      {/* Service Delivery Modes: Pune Clinic & Pan-India Online Therapy */}
      <section className="bg-white py-12 md:py-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="bg-soft-sand rounded-[24px] p-8 border border-gray-200 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-widest text-terracotta mb-2 inline-block">
                In-Person Psychological Counselling in Pune
              </span>
              <h3 className="text-2xl font-bold text-deep-teal font-heading mb-3">
                #1 Counselling Centre & Psychologist Clinic in Pune
              </h3>
              <p className="text-sm text-charcoal-warm leading-relaxed mb-4">
                Our peaceful counselling clinic is centrally situated near <strong>Koregaon Park</strong>, serving clients across Pune including <strong>Kalyani Nagar, Viman Nagar, Baner, Kothrud, Aundh, Shivaji Nagar, Hadapsar,</strong> and <strong>Hinjewadi</strong>. We specialize in evidence-based Cognitive Behavioral Therapy (CBT), work-stress burnout management, self-esteem therapy, and career clarity in a safe, non-judgmental environment.
              </p>
              <div className="text-xs font-medium text-deep-teal/80 bg-white p-3 rounded-xl border border-gray-200">
                📍 Private consultation rooms • Safe, non-clinical sanctuary • Flexible appointments in Pune
              </div>
            </div>

            <div className="bg-deep-teal text-white rounded-[24px] p-8 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-widest text-sage-green mb-2 inline-block">
                Online Counselling Nationwide in India
              </span>
              <h3 className="text-2xl font-bold text-white font-heading mb-3">
                Top 5 Rated Online Therapy Across India
              </h3>
              <p className="text-sm text-white/80 leading-relaxed mb-4">
                Access certified psychological support, CBT therapy, and secular mindfulness from the comfort of your home anywhere in India: <strong>Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata,</strong> and beyond. Confidential, encrypted 1-on-1 video sessions tailored around your daily professional and personal routine.
              </p>
              <div className="text-xs font-medium text-white/90 bg-white/10 p-3 rounded-xl border border-white/15">
                🔒 Encrypted, HIPAA-compliant platform • Same clinical rigor as in-person • Evening & weekend slots
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* End CTA */}
      <section className="bg-white py-12 md:py-16 lg:py-20 border-b border-gray-200">
        <div className="max-w-[800px] mx-auto px-4 text-center bg-soft-sand rounded-[24px] p-12 md:p-16">
           <h2 className="text-[36px] font-semibold text-deep-teal mb-6 font-heading">Still not sure which service fits?</h2>
           <p className="text-lg text-charcoal-warm mb-10">That's completely okay. Book a free clarity call — we'll figure it out together.</p>
           <div className="flex flex-wrap items-center justify-center gap-4">
             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
               <button
                  type="button"
                  onClick={() => {
                    window.open(CALENDLY_MAIN_URL, "_blank", "noopener,noreferrer");
                  }}
                  className="inline-flex items-center justify-center px-10 py-5 text-lg font-medium rounded-[50px] text-white bg-terracotta hover:bg-amber-glow transition-colors uppercase tracking-wide shadow-md hover:shadow-lg cursor-pointer"
                >
                  &rarr; Book Your Free 15-Min Clarity Call
                </button>
             </motion.div>
             <Link
               to="/contact"
               className="inline-flex items-center justify-center px-8 py-5 text-lg font-medium rounded-[50px] text-deep-teal bg-white border border-gray-200 hover:bg-gray-50 transition-colors uppercase tracking-wide shadow-xs"
             >
               Visit Contact Page
             </Link>
           </div>
        </div>
      </section>

      {/* 1. Interactive Service Inquiry Modal (Matching Workshop Popup Style) */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0B3A42]/80 backdrop-blur-sm"
              onClick={closeInquiryModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-soft-sand rounded-[24px] shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
            >
              {/* Modal Top Header with Selected Service Highlight */}
              <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-white">
                <div>
                  <h3 className="text-xl font-bold text-deep-teal font-heading">
                    Service Inquiry Form
                  </h3>
                  <p className="text-sm text-terracotta font-medium mt-1">
                    Inquire for: <span className="font-bold">{selectedService.title}</span>
                  </p>
                </div>
                <button
                  onClick={closeInquiryModal}
                  className="text-gray-400 hover:text-terracotta transition-colors p-2 rounded-full hover:bg-gray-100 cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 md:p-8 overflow-y-auto">
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-deep-teal font-heading mb-3">
                      Inquiry Received!
                    </h3>
                    <p className="text-charcoal-warm mb-6 leading-relaxed">
                      Thank you for your interest in <strong>{selectedService.title}</strong>. Our lead psychologists, Imran Hussain & Tejaswini Joshi, will review your details and reach out to you directly.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button
                        onClick={closeInquiryModal}
                        className="px-6 py-3 bg-deep-teal text-white rounded-full font-medium tracking-wide hover:bg-[#07252A] transition-colors cursor-pointer"
                      >
                        Close
                      </button>
                      <button
                        onClick={() => {
                          closeInquiryModal();
                          window.open(CALENDLY_MAIN_URL, "_blank", "noopener,noreferrer");
                        }}
                        className="px-6 py-3 bg-terracotta text-white rounded-full font-medium tracking-wide hover:bg-amber-glow transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Schedule on Calendly</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="service_name" className="block text-sm font-medium text-deep-teal mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="service_name"
                        name="service_name"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-terracotta focus:ring focus:ring-terracotta/20 bg-white transition-all outline-none"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="service_email" className="block text-sm font-medium text-deep-teal mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="service_email"
                        name="service_email"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-terracotta focus:ring focus:ring-terracotta/20 bg-white transition-all outline-none"
                        placeholder="you@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="service_phone" className="block text-sm font-medium text-deep-teal mb-1">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        id="service_phone"
                        name="service_phone"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-terracotta focus:ring focus:ring-terracotta/20 bg-white transition-all outline-none"
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    <div>
                      <label htmlFor="service_message" className="block text-sm font-medium text-deep-teal mb-1">
                        Requirement Description / Specific Needs *
                      </label>
                      <textarea
                        id="service_message"
                        name="service_message"
                        required
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-terracotta focus:ring focus:ring-terracotta/20 bg-white transition-all outline-none"
                        placeholder="Describe what you are navigating (e.g. career burnout, overthinking, parenting challenges, exam anxiety, or goals)..."
                      />
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                      <button
                        type="button"
                        onClick={handleInquiryEmail}
                        disabled={isSubmitting}
                        className="flex-1 py-3.5 bg-terracotta text-white rounded-xl font-semibold tracking-wide hover:bg-amber-glow transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 whitespace-nowrap px-4 flex justify-center items-center gap-2 cursor-pointer text-sm"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Send via Email</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleInquiryWhatsApp}
                        disabled={isSubmitting}
                        className="flex-1 py-3.5 bg-[#25D366] text-white rounded-xl font-semibold tracking-wide hover:bg-[#1DA851] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 whitespace-nowrap px-4 flex justify-center items-center gap-2 cursor-pointer text-sm"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-4 h-4">
                          <path d="M12.031 0C5.398 0 .016 5.378.016 12.015c0 2.128.553 4.202 1.602 6.03L0 24l6.113-1.604a11.967 11.967 0 005.918 1.564h.005c6.634 0 12.014-5.38 12.014-12.017C24.05 5.378 18.665 0 12.031 0zm0 21.964c-1.802 0-3.567-.485-5.11-1.401l-.367-.217-3.794.996 1.015-3.698-.238-.378a9.98 9.98 0 01-1.521-5.263c0-5.518 4.492-10.013 10.015-10.013 5.517 0 10.014 4.495 10.014 10.013 0 5.517-4.497 10.013-10.014 10.013zm5.494-7.514c-.301-.151-1.782-.879-2.059-.979-.276-.1-.478-.152-.678.151-.2.302-.779.979-.955 1.18-.175.201-.351.226-.652.076-.301-.151-1.272-.469-2.424-1.496-.897-.798-1.503-1.784-1.678-2.086-.176-.302-.019-.465.132-.615.136-.135.301-.351.452-.526.151-.176.201-.301.301-.502.1-.2.051-.377-.025-.527-.076-.151-.678-1.633-.929-2.235-.245-.589-.494-.509-.678-.518-.175-.008-.376-.011-.577-.011-.2 0-.527.075-.802.376-.276.301-1.054 1.029-1.054 2.508s1.079 2.909 1.23 3.11c.151.2 2.122 3.238 5.14 4.542.718.31 1.28.495 1.717.635.72.228 1.376.195 1.894.118.579-.085 1.782-.728 2.033-1.431.251-.703.251-1.306.176-1.432-.075-.125-.276-.2-.577-.35z"/>
                        </svg>
                        <span>Connect via WhatsApp</span>
                      </button>
                    </div>

                    <p className="text-center text-xs text-charcoal-warm/60 pt-1 font-sans">
                      Submissions route securely to hello@beingyoupath.com &amp; WhatsApp: +91 7387772573 / +91 7387779238
                    </p>
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
