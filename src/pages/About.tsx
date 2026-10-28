import { useState, useEffect } from "react";
import { CheckCircle2, Quote, ChevronDown, ChevronUp, MessageCircleHeart, Target, Fingerprint, Network, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { SEO } from "../components/SEO";

export default function About() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const heroSlides = [
    {
      title: "We Help People Understand Themselves — And Build Lives That Actually Work",
      subtitle: "Meet the people behind Being You Path™ — counselling psychologists and well-being facilitators blending modern psychology, mindfulness, and practical wisdom.",
      desc: "Our approach integrates evidence-based behavioral science with deep empathy. We focus on real-world challenges, helping you unlock actionable insights that foster long-term resilience and emotional growth.",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2620&auto=format&fit=crop"
    },
    {
      title: "Guided by Empathy, Grounded in Science",
      subtitle: "A philosophy built on understanding the human experience.",
      desc: "We don't just offer advice; we provide tools. Our practitioners combine academic rigor with compassionate listening to create a safe space where meaningful, sustainable change can occur.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2000&auto=format&fit=crop"
    },
    {
      title: "Your Journey to Intentional Living",
      subtitle: "Moving from 'just getting by' to thriving.",
      desc: "We believe in the power of intention and self-awareness. Together, we'll navigate the complexities of your life, developing strategies that align your daily actions with your core values.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop"
    }
  ];

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length, isHovered]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I book a wellness session, and what happens during the first consultation?",
      answer: <>You can book by clicking the <strong>"Free Clarity Call"</strong> button or by contacting us via WhatsApp. Initially, we schedule a free 30-minute introductory call to understand your challenges, explain our approach, and ensure we're the right fit for your mental well-being goals. There is no commitment required at this stage.</>
    },
    {
      question: "What types of mental health counselling and life coaching services do you provide?",
      answer: "We offer customized therapeutic support grounded in modern psychology (such as Cognitive Behavioral Therapy or CBT), secular mindfulness, and behavioral science. Our services include individual well-being counselling for anxiety and stress management, career coaching for professionals, and personal development programs."
    },
    {
      question: "Do you offer corporate wellness workshops and employee mental health programs?",
      answer: "Yes, we specialize in corporate employee well-being workshops tailored for organizations. Our workshops cover topics like stress management, workplace resilience, mindful leadership, and preventing burnout. We design interactive sessions to foster healthy workplace cultures and improve overall team mental wellness."
    },
    {
      question: "How can mindfulness and resilience workshops benefit students?",
      answer: "Our student resilience workshops are designed to help young adults manage academic pressure, improve focus, and develop emotional regulation skills. Through evidence-based mindfulness training, students learn practical coping mechanisms to handle stress, reduce anxiety, and build foundational mental strength."
    },
    {
      question: "What is the cost of professional counselling sessions or corporate wellness programs?",
      answer: "Pricing is structured based on the specific service—whether you're seeking individual counselling, a series of career coaching sessions, or large-scale corporate workshops. During your free clarity call, after assessing your unique needs, we will provide a transparent and customized outline of costs before you commit."
    }
  ];

  return (
    <div className="bg-soft-sand">
      <SEO 
        title="About Being You Path | Best Counselling Centre in India"
        description="Learn about Being You Path, the best counselling centre in India. Discover our philosophy, licensed psychologists, and how modern psychology and behavioral science empower lasting well-being across India and Pune."
        keywords="about being you path, best counselling centre in india, best counselling centre india, top counselling centre india, best psychologist in india, top therapists pune, mental health experts india"
      />
      <h1 className="sr-only">About Being You Path - Best Counselling Centre in India | Expert Therapists & Psychologists</h1>
      <p className="sr-only">Meet the experienced therapists and leading mental health professionals at Being You Path, widely recognized as the best counselling centre in India. Discover our evidence-based psychological approach combining modern therapy, CBT, and behavioral science across Pune and pan-India.</p>
      
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

      {/* Our Story */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            <div className="lg:w-1/3">
              <h2 className="text-[36px] font-semibold text-deep-teal font-heading leading-tight">Our Story</h2>
            </div>
            <div className="lg:w-2/3">
              <p className="text-lg text-charcoal-warm leading-relaxed">
                Being You Path™ was born from a simple frustration: too many people are struggling with very real, very solvable problems — and the support available to them is either too clinical, too vague, or too expensive to access. We built this practice to close that gap. To offer something evidence-informed but human. Structured but personal. Grounded in research but delivered in a language people actually speak.
              </p>
            </div>
          </div>
          
          <div className="mt-12 max-w-[800px] mx-auto bg-muted-clay/10 p-12 rounded-[24px] border border-muted-clay/20 text-center relative">
             <Quote className="w-12 h-12 text-muted-clay/20 absolute top-8 left-8" />
             <p className="text-[28px] md:text-[32px] text-charcoal-warm italic font-heading font-medium leading-snug relative z-10 px-8">
               "Well-being is not a destination. It's a set of skills — and skills can be learned."
             </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-20 lg:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-[36px] font-semibold text-deep-teal mb-4 font-heading"
            >
              Why Choose Us?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg text-charcoal-warm max-w-2xl mx-auto"
            >
              How Being You Path™ stands apart from traditional therapy or generic life coaching.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <MessageCircleHeart className="w-8 h-8 text-terracotta" />,
                title: "Human First, Clinical Second",
                desc: "We ditch the heavy jargon and sterile environment. Expect warm, conversational dialogue grounded in real evidence."
              },
              {
                icon: <Target className="w-8 h-8 text-terracotta" />,
                title: "Tool-Based Approach",
                desc: "Insight alone doesn't change behavior. We equip you with actionable skills, frameworks, and nervous system anchors."
              },
              {
                icon: <Fingerprint className="w-8 h-8 text-terracotta" />,
                title: "No Cookie-Cutter Models",
                desc: "Your context matters. We blend modern CBT, mindfulness, and practical wisdom uniquely tailored to your actual life."
              },
              {
                icon: <Network className="w-8 h-8 text-terracotta" />,
                title: "Holistic Integration",
                desc: "We don't separate work, life, and mind. We look at the entire ecosystem of your well-being to create lasting change."
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-soft-sand p-8 rounded-[24px] border border-gray-100 group hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="w-14 h-14 bg-white rounded-[16px] shadow-sm flex items-center justify-center mb-6 origin-center group-hover:bg-terracotta/5"
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {feature.icon}
                  </motion.div>
                </motion.div>
                <h3 className="text-xl font-semibold text-deep-teal mb-3 font-heading leading-tight">{feature.title}</h3>
                <p className="text-charcoal-warm text-[15px] leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-12 md:py-16 lg:py-20 bg-soft-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-[800px] mx-auto mb-12 lg:mb-20">
            <h2 className="text-[36px] font-semibold text-deep-teal mb-8 font-heading">What We Believe About How People Change</h2>
            <p className="text-lg text-charcoal-warm leading-relaxed">
               Change happens at the intersection of insight and action. Understanding why you think or behave a certain way is important. But understanding alone doesn't shift anything. What moves people forward is guided practice — small, repeated actions that retrain attention, reshape habits, and gradually change how you relate to yourself and others.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.1 }}
               viewport={{ once: true, margin: "-50px" }}
               className="flex flex-col items-center text-center"
             >
               <motion.div 
                 whileHover={{ scale: 1.1, rotate: 5 }}
                 className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-md transition-shadow hover:shadow-lg"
               >
                 <span className="text-terracotta font-bold text-2xl">1</span>
               </motion.div>
               <h3 className="text-[20px] font-semibold text-deep-teal mb-4 font-heading">Modern Psychology Frameworks</h3>
               <p className="text-charcoal-warm">Positive Psychology (PERMA), Counselling Psychology, Developmental, Industrial, Clinical (where relevant).</p>
             </motion.div>
             
             <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.2 }}
               viewport={{ once: true, margin: "-50px" }}
               className="flex flex-col items-center text-center"
             >
               <motion.div 
                 whileHover={{ scale: 1.1, rotate: -5 }}
                 className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-md transition-shadow hover:shadow-lg"
               >
                 <span className="text-terracotta font-bold text-2xl">2</span>
               </motion.div>
               <h3 className="text-[20px] font-semibold text-deep-teal mb-4 font-heading">Secular Mindfulness</h3>
               <p className="text-charcoal-warm">Buddhist-rooted attention training without religion. Present-moment awareness. Metacognition. Self-compassion.</p>
             </motion.div>

             <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.3 }}
               viewport={{ once: true, margin: "-50px" }}
               className="flex flex-col items-center text-center"
             >
               <motion.div 
                 whileHover={{ scale: 1.1, rotate: 5 }}
                 className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-md transition-shadow hover:shadow-lg"
               >
                 <span className="text-terracotta font-bold text-2xl">3</span>
               </motion.div>
               <h3 className="text-[20px] font-semibold text-deep-teal mb-4 font-heading">Practical Ancient Wisdom</h3>
               <p className="text-charcoal-warm">Dinacharya (circadian biology), Pranayama (autonomic research), Sound-based relaxation, Contemplative dialogue — kept ONLY where evidence supports.</p>
             </motion.div>
          </div>
        </div>
      </section>

      {/* Meet the Practitioners */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 lg:mb-20">
              <h2 className="text-[36px] font-semibold text-deep-teal mb-4 font-heading">Meet the Practitioners</h2>
            </div>

            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.2 } }
              }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Card 1 */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                }}
                className="bg-soft-sand rounded-[24px] overflow-hidden shadow-sm flex flex-col transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md"
              >
                 <div className="pt-10 px-6 mx-auto w-full max-w-sm relative">
                   <div className="aspect-[4/5] w-full rounded-[24px] bg-white p-3 shadow-md border border-gray-100/50 group relative">
                     <div className="w-full h-full rounded-[14px] overflow-hidden relative bg-gray-100">
                       <img src="https://drive.google.com/thumbnail?id=1iTW_XmU7hqQSNtJIKRC3ApQjW2yyZnne&sz=w1000" alt="Imran" className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out" referrerPolicy="no-referrer" />
                     </div>
                   </div>
                 </div>
                 <div className="p-10 flex-grow flex flex-col">
                   <h3 className="text-[36px] font-bold text-deep-teal mb-2 font-heading">Imran</h3>
                   <p className="text-terracotta font-medium mb-6 uppercase text-sm tracking-wide">M.A. Clinical Psychology | CBT Practitioner | Mindfulness Facilitator</p>
                   <p className="text-charcoal-warm mb-8 leading-relaxed">
                     Imran specializes in person-centered cognitive behavioral therapy (CBT), an evidence-based approach focusing on the interplay between thought patterns and behavior. His experience includes NIMHANS, Mannah Wellness, and Mantra Care. Trained in Buddhist mindfulness, he incorporates breathwork and attention training into his sessions, emphasizing secular, practical, and research-supported techniques.
                   </p>
                   
                   <div className="flex flex-wrap gap-2 mb-10">
                     {["CBT", "Anxiety & Stress", "Relationship & Career Counselling", "Mindfulness", "Child & Adolescent Support", "Motivational Interviewing"].map(chip => (
                       <span key={chip} className="bg-white text-charcoal-warm border border-gray-200 text-[13px] font-medium px-4 py-1.5 rounded-full hover:border-terracotta transition-colors duration-300">
                         {chip}
                       </span>
                     ))}
                   </div>

                   <div className="mt-4 mb-4 mt-auto border-t border-gray-200 pt-8">
                     <h4 className="text-[20px] font-bold text-deep-teal mb-4 font-heading">Books by Imran</h4>
                     <div className="space-y-4">
                       {/* Book 1 */}
                       <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-[16px] border border-gray-100 shadow-sm items-center sm:items-start hover:shadow-md transition-all duration-300 ease-out hover:-translate-y-1">
                          <div className="w-28 sm:w-32 aspect-[3/4] bg-[#FDFBF7] rounded-[10px] flex-shrink-0 flex items-center justify-center border border-gray-200/60 shadow-sm p-1.5 group">
                            <img src="https://drive.google.com/thumbnail?id=14Na8ysaUXG8UnlS9X48Mcvq3PMh5mTj2&sz=w600" alt="Healing Journey through chakras" className="w-full h-full object-cover rounded-[5px] drop-shadow-sm group-hover:scale-[1.03] transition-transform duration-500 ease-out" referrerPolicy="no-referrer" />
                          </div>
                          <div className="flex-1 flex flex-col h-full w-full">
                             <h5 className="font-heading font-semibold text-deep-teal leading-tight mb-2">1. Healing Journey through chakras</h5>
                             <p className="text-[13px] text-charcoal-warm mb-3 line-clamp-3">Explore the ancient system of energy centers. This guide provides practical methods to balance and unblock your chakras for emotional stability, grounding, and inner peace in daily life.</p>
                             <div className="mt-auto flex items-center justify-between pt-2 border-t border-gray-50">
                               <span className="font-bold text-terracotta">₹499</span>
                              <div className="relative flex items-center justify-center group">
                                 <span className="absolute inline-flex h-full w-full rounded-full bg-terracotta opacity-40 animate-ping" style={{ animationDuration: '2s' }}></span>
                                 <motion.a 
                                   href={`https://wa.me/917387772573?text=${encodeURIComponent('Hello, I am interested in purchasing the book "Healing Journey through chakras".\n\nPlease find my details below:\nName: \nPhone Number: \nDelivery Address: \nCity/State/Pincode: \n\nThank you!')}`}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="relative text-[11px] font-bold uppercase tracking-wider bg-deep-teal text-white px-5 py-2 rounded-full hover:bg-terracotta transition-colors shadow-md inline-block z-10 cursor-pointer"
                                   whileHover={{ scale: 1.05, rotate: [-2, 2, -2, 0] }}
                                   whileTap={{ scale: 0.95 }}
                                   transition={{ rotate: { duration: 0.4 } }}
                                 >
                                   Buy Now
                                 </motion.a>
                              </div>
                             </div>
                          </div>
                       </div>

                       {/* Book 2 */}
                       <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-[16px] border border-gray-100 shadow-sm items-center sm:items-start hover:shadow-md transition-all duration-300 ease-out hover:-translate-y-1">
                          <div className="w-28 sm:w-32 aspect-[3/4] bg-[#FDFBF7] rounded-[10px] flex-shrink-0 flex items-center justify-center border border-gray-200/60 shadow-sm p-1.5 group">
                             <img src="https://drive.google.com/thumbnail?id=1jrQuEeXPUkF1LsxgO46CCr1uqrGKzVCm&sz=w600" alt="The essence of Wellness" className="w-full h-full object-cover rounded-[5px] drop-shadow-sm group-hover:scale-[1.03] transition-transform duration-500 ease-out" referrerPolicy="no-referrer" />
                          </div>
                          <div className="flex-1 flex flex-col h-full w-full">
                             <h5 className="font-heading font-semibold text-deep-teal leading-tight mb-2">2. The essence of Wellness (Mind, Body, Spirit)</h5>
                             <p className="text-[13px] text-charcoal-warm mb-3 line-clamp-3">A comprehensive roadmap to integrative health. Discover how simple, daily habits can align your physical vitality with mental clarity and profound spiritual depth.</p>
                             <div className="mt-auto flex items-center justify-between pt-2 border-t border-gray-50">
                               <span className="font-bold text-terracotta">₹499</span>
                              <div className="relative flex items-center justify-center group">
                                 <span className="absolute inline-flex h-full w-full rounded-full bg-terracotta opacity-40 animate-ping" style={{ animationDuration: '2s' }}></span>
                                 <motion.a 
                                   href={`https://wa.me/917387772573?text=${encodeURIComponent('Hello, I am interested in purchasing the book "The essence of Wellness (Mind, Body, Spirit)".\n\nPlease find my details below:\nName: \nPhone Number: \nDelivery Address: \nCity/State/Pincode: \n\nThank you!')}`}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="relative text-[11px] font-bold uppercase tracking-wider bg-deep-teal text-white px-5 py-2 rounded-full hover:bg-terracotta transition-colors shadow-md inline-block z-10 cursor-pointer"
                                   whileHover={{ scale: 1.05, rotate: [-2, 2, -2, 0] }}
                                   whileTap={{ scale: 0.95 }}
                                   transition={{ rotate: { duration: 0.4 } }}
                                 >
                                   Buy Now
                                 </motion.a>
                              </div>
                             </div>
                          </div>
                       </div>

                       {/* Book 3 */}
                       <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-[16px] border border-gray-100 shadow-sm items-center sm:items-start hover:shadow-md transition-all duration-300 ease-out hover:-translate-y-1">
                          <div className="w-28 sm:w-32 aspect-[3/4] bg-[#FDFBF7] rounded-[10px] flex-shrink-0 flex items-center justify-center border border-gray-200/60 shadow-sm p-1.5 group">
                            <img src="https://drive.google.com/thumbnail?id=160i1TW3o7ZDaUTxzesxuu-FE5T9KT1p8&sz=w600" alt="The power of mindful thoughts" className="w-full h-full object-cover rounded-[5px] drop-shadow-sm group-hover:scale-[1.03] transition-transform duration-500 ease-out" referrerPolicy="no-referrer" />
                          </div>
                          <div className="flex-1 flex flex-col h-full w-full">
                             <h5 className="font-heading font-semibold text-deep-teal leading-tight mb-2">3. The power of mindful thoughts</h5>
                             <p className="text-[13px] text-charcoal-warm mb-3 line-clamp-3">Learn to harness the space between your thoughts. Break free from anxiety loops and overthinking with proven cognitive restructuring and mindfulness exercises.</p>
                             <div className="mt-auto flex items-center justify-between pt-2 border-t border-gray-50">
                               <span className="font-bold text-terracotta">₹499</span>
                              <div className="relative flex items-center justify-center group">
                                 <span className="absolute inline-flex h-full w-full rounded-full bg-terracotta opacity-40 animate-ping" style={{ animationDuration: '2s' }}></span>
                                 <motion.a 
                                   href={`https://wa.me/917387772573?text=${encodeURIComponent('Hello, I am interested in purchasing the book "The power of mindful thoughts".\n\nPlease find my details below:\nName: \nPhone Number: \nDelivery Address: \nCity/State/Pincode: \n\nThank you!')}`}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="relative text-[11px] font-bold uppercase tracking-wider bg-deep-teal text-white px-5 py-2 rounded-full hover:bg-terracotta transition-colors shadow-md inline-block z-10 cursor-pointer"
                                   whileHover={{ scale: 1.05, rotate: [-2, 2, -2, 0] }}
                                   whileTap={{ scale: 0.95 }}
                                   transition={{ rotate: { duration: 0.4 } }}
                                 >
                                   Buy Now
                                 </motion.a>
                              </div>
                             </div>
                          </div>
                       </div>
                     </div>
                   </div>
                 </div>
              </motion.div>

              {/* Card 2 */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                }}
                className="bg-soft-sand rounded-[24px] overflow-hidden shadow-sm flex flex-col transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md"
              >
                 <div className="pt-10 px-6 mx-auto w-full max-w-sm relative">
                   <div className="aspect-[4/5] w-full rounded-[24px] bg-white p-3 shadow-md border border-gray-100/50 group relative">
                     <div className="w-full h-full rounded-[14px] overflow-hidden relative bg-gray-100">
                       <img src="https://drive.google.com/thumbnail?id=1gmpGHtsb2iJ0tP-_yuMI-PnArP-KnZV2&sz=w1000" alt="Tejaswini Joshi" className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out" referrerPolicy="no-referrer" />
                     </div>
                   </div>
                 </div>
                 <div className="p-10 flex-grow flex flex-col">
                   <h3 className="text-[36px] font-bold text-deep-teal mb-2 font-heading">Tejaswini Joshi</h3>
                   <p className="text-terracotta font-medium mb-6 uppercase text-sm tracking-wide">M.A. Counselling Psychology | LSE Certified | Learning & Development Specialist</p>
                   <p className="text-charcoal-warm mb-8 leading-relaxed">
                     Tejaswini brings a rare combination: the psychological depth of a trained counsellor and the real-world application of an L&D professional working inside corporate environments. Her work with Jnana Prabodhini and her ongoing role in Learning & Development within the manufacturing sector have given her firsthand experience of what well-being actually looks like inside organisations — not in theory, but in team meetings, performance reviews, and lunch breaks.
                   </p>
                   <div className="flex flex-wrap gap-2 mt-auto">
                     {["Counselling Psychology", "Employee Well-Being", "Behavioural Patterns", "L&D Facilitation", "Assessments", "Interpersonal Dynamics"].map(chip => (
                       <span key={chip} className="bg-white text-charcoal-warm border border-gray-200 text-[13px] font-medium px-4 py-1.5 rounded-full">
                         {chip}
                       </span>
                     ))}
                   </div>
                 </div>
              </motion.div>
            </motion.div>

            {/* Credentials Grid */}
            <div className="mt-12 max-w-5xl mx-auto">
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {[
                   "M.A. Clinical Psychology (Imran)",
                   "M.A. Counselling Psychology (Tejaswini)",
                   "LSE Certification — Managing People",
                   "NIMHANS-experienced practitioner",
                   "CBT-trained | Mindfulness-trained",
                   "In-person (Pune) + Online sessions worldwide",
                 ].map((badge, i) => (
                   <div key={i} className="bg-soft-sand rounded-[50px] px-5 py-3 flex items-center shadow-sm">
                      <CheckCircle2 className="w-5 h-5 text-terracotta mr-3 flex-shrink-0" />
                      <span className="text-terracotta font-medium text-[15px]">{badge}</span>
                   </div>
                 ))}
               </div>
            </div>
         </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-soft-sand border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-[36px] font-semibold text-deep-teal mb-4 font-heading">Frequently Asked Questions</h2>
            <p className="text-lg text-charcoal-warm">Common questions about getting started, our services, and pricing.</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-[16px] shadow-sm border border-gray-100 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-6 text-left flex justify-between items-center focus:outline-none hover:bg-gray-50/80 transition-colors"
                  aria-expanded={expandedFaq === index}
                >
                  <h3 className="text-xl font-semibold text-deep-teal font-heading pr-8">{faq.question}</h3>
                  <motion.div 
                    className="flex-shrink-0 text-terracotta"
                    animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <ChevronDown className="w-6 h-6" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="px-6 pb-6 text-charcoal-warm leading-relaxed">
                        <motion.div 
                          className="pt-2 border-t border-gray-100"
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        >
                          {faq.answer}
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
