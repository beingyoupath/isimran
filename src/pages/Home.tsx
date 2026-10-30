import { Link } from "react-router-dom";
import { 
  Brain, 
  GraduationCap, 
  Users, 
  Briefcase, 
  CheckCircle2, 
  ChevronRight, 
  Compass, 
  HeartHandshake, 
  Zap, 
  BookOpen, 
  Quote, 
  ChevronLeft, 
  ArrowRight, 
  BrainCircuit, 
  Coffee, 
  Star, 
  HelpCircle,
  MapPin, 
  ShieldCheck, 
  Award, 
  ChevronDown, 
  ChevronUp, 
  Globe, 
  Sparkles, 
  Clock, 
  Phone, 
  Check 
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { SEO } from "../components/SEO";
import { GOOGLE_REVIEWS } from "../data/testimonials";

export const HOME_FAQS = [
  {
    question: "Which is the best counselling centre in Pune, Maharashtra?",
    answer: "Being You Path is widely recognized as the best counselling centre in Pune, Maharashtra, holding a verified 5.0 Google Reviews rating. Located in Pune and easily accessible to residents in Koregaon Park, Kalyani Nagar, Viman Nagar, Baner, Kothrud, Aundh, and Hinjewadi, Being You Path offers compassionate, evidence-based psychological counselling, Cognitive Behavioral Therapy (CBT), work-stress management, and self-esteem therapy led by licensed psychologists Imran Hussain and Tejaswini."
  },
  {
    question: "Why is Being You Path ranked among the top 5 counselling centres in India?",
    answer: "Being You Path ranks among the top 5 counselling centres in India due to its proprietary clinical framework that integrates modern evidence-based psychology, secular mindfulness, and nervous-system somatic regulation. With top-rated in-person consultations in Pune and secure, HIPAA-compliant online therapy sessions across every Indian state, Being You Path bridges the gap between clinical science and everyday emotional relief without stigma."
  },
  {
    question: "Who is the best psychologist in Pune for stress, anxiety, and self-esteem therapy?",
    answer: "For stress, anxiety, and self-esteem therapy in Pune, clients frequently recommend Being You Path's lead psychologists, Imran Hussain and Tejaswini. As verified by dozens of 5-star Google Reviews from local working professionals and students, they excel in treating corporate burnout, chronic overthinking, panic response, imposter syndrome, and social anxiety with personalized, practical coping mechanisms that yield lasting behavioral shifts."
  },
  {
    question: "Does Being You Path provide confidential online counselling across India?",
    answer: "Yes, Being You Path conducts confidential, encrypted 1-on-1 online psychological counselling for individuals, couples, and students across India, including Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata, Pune, and Tier-2 cities. Online sessions follow the exact same personalized clinical standards as in-person therapy."
  },
  {
    question: "What specific psychological and life challenges does Being You Path treat?",
    answer: "Being You Path treats a comprehensive spectrum of mental health and lifestyle challenges: work-related burnout and deadline fatigue, generalized anxiety and panic symptoms, depression and loss of purpose, relationship and marital friction, career transitions and Gen Z workplace dilemmas, student exam stress, parental overwhelm, and emotional regulation."
  },
  {
    question: "How does Being You Path's career counselling for students and professionals work in Pune?",
    answer: "Unlike standard aptitude test firms in Pune, Being You Path pairs in-depth psychological clarity assessments with practical experiential exposure—including mini industry internships, parent-student alignment dialogue, and core values mapping. This ensures teenagers and mid-career professionals gain genuine confidence before committing to high-stakes decisions."
  },
  {
    question: "How can I book an introductory session or free clarity call with Being You Path?",
    answer: "Booking is seamless. Click 'Book Consultation' or reach out directly on WhatsApp at +91 7387772573 or +91 7387779238, or email hello@beingyoupath.com. We begin with a free 30-minute introductory clarity conversation to understand your specific needs, explain our methodology, and match you with the right psychologist."
  }
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const anchors = {
    0: { // Sunday
      morning: { emoji: "🌅", title: "Sunday Morning Stillness", body: "Before the week's planning begins, spend 2 minutes in conscious breathing. Let today be about restoration, not just preparation." },
      afternoon: { emoji: "☕", title: "Sunday Afternoon Pause", body: "Notice if the 'Sunday Scaries' are creeping in. Acknowledge the feeling without trying to fix it immediately. You are here, right now, and you are safe." },
      evening: { emoji: "🌙", title: "Sunday Evening Transition", body: "Close out the weekend deliberately. Write down one thing you're looking forward to this week. This shifts the brain from avoidance to approach motivation." }
    },
    1: { // Monday
      morning: { emoji: "🌅", title: "Monday Morning Anchor", body: "Before checking your phone, spend 90 seconds in stillness. Set a single intention for how you want to feel today, rather than what you want to achieve." },
      afternoon: { emoji: "☀️", title: "Monday Afternoon Reset", body: "Step away from the screen. Look at something distant. Take 3 deep breaths. This breaks the sympathetic nervous system's 'tunnel vision'." },
      evening: { emoji: "🌙", title: "Monday Evening Boundary", body: "Work is done. Physically close your laptop or notebook. Say aloud, 'I am leaving work for today.' This creates a clear psychological boundary." }
    },
    2: { // Tuesday
      morning: { emoji: "🌅", title: "Tuesday Morning Focus", body: "Identify your one 'frog' today—the hardest but most important task. Commit to doing it first, protecting your peak cognitive energy." },
      afternoon: { emoji: "☕", title: "Tuesday Afternoon Clarity", body: "Notice any tension in your jaw or shoulders. Consciously let it go. Action doesn't require physical tension." },
      evening: { emoji: "🌙", title: "Tuesday Evening Unwind", body: "Transition into your evening with a sensory shift. Dim the lights, play different music, or change your clothes to signal to your brain that the workday is over." }
    },
    3: { // Wednesday
      morning: { emoji: "🌅", title: "Wednesday Mid-Week Check", body: "You're halfway there. Acknowledge what hasn't gone perfectly this week and practice self-compassion. Adjust your expectations if necessary." },
      afternoon: { emoji: "☀️", title: "Wednesday Energy Audit", body: "Where is your energy right now? Rate it from 1-10. If it's low, don't push through forcefully. Take a 5-minute break to stretch or hydrate." },
      evening: { emoji: "🌙", title: "Wednesday Reconnection", body: "Mid-week can feel isolating. Send a quick message of appreciation to someone in your life. Connection is a powerful regulator of the nervous system." }
    },
    4: { // Thursday
      morning: { emoji: "🌅", title: "Thursday Morning Pace", body: "Resist the urge to rush. Move deliberately through your morning routine. Rushing signals danger to the brain; pacing signals safety." },
      afternoon: { emoji: "☕", title: "Thursday Afternoon Friction", body: "Feeling friction? Ask yourself: 'Am I making this harder than it needs to be?' Look for the path of least resistance for the rest of the day." },
      evening: { emoji: "🌙", title: "Thursday Gratitude", body: "Reflect on one thing you handled well today. Acknowledging your own competence builds self-efficacy and resilience." }
    },
    5: { // Friday
      morning: { emoji: "🌅", title: "Friday Morning Sprint", body: "Identify what absolutely must be done to close out the week peacefully. Prioritize ruthlessly. The rest can wait." },
      afternoon: { emoji: "☀️", title: "Friday Brain Dump", body: "Write down all open loops—tasks, ideas, worries. Get them out of your head and onto paper so you don't carry them into the weekend." },
      evening: { emoji: "🌙", title: "Friday Evening Shift", body: "You made it. Do something that requires absolutely no optimization or productivity. Permit yourself to just 'be'." }
    },
    6: { // Saturday
      morning: { emoji: "🌅", title: "Saturday Morning Freedom", body: "Wake up without an immediate agenda. Let your curiosity guide your first hour today instead of obligation." },
      afternoon: { emoji: "☕", title: "Saturday Afternoon Play", body: "Engage in an activity just for the joy of it. Play is essential for neuroplasticity and emotional regulation, even for adults." },
      evening: { emoji: "🌙", title: "Saturday Evening Presence", body: "Notice the people or environment around you. Put down devices and practice undivided attention. It's the highest form of connection." }
    }
  };

  const thoughtsOfTheDay = [
    "Rest is not a reward for the work done; it's the foundation for the work to come.", // Sunday
    "You don't have to have it all figured out today. Just figure out your next right step.", // Monday
    "Notice what happens when you stop trying to control the outcome and just focus on the action.", // Tuesday
    "Self-compassion isn't letting yourself off the hook—it's giving yourself the safety to try again.", // Wednesday
    "Friction is often a sign that we're pushing against our natural rhythm instead of working with it.", // Thursday
    "What you leave unfinished today does not diminish what you accomplished this week.", // Friday
    "The present moment is the only place where your life actually happens." // Saturday
  ];

  const corePaths = [
    {
      title: "Modern Psychology",
      subtitle: "Grounded in Science",
      description: "Using evidence-based therapeutic techniques like Cognitive Behavioural Therapy (CBT) and Positive Psychology, we help you understand your mind, rewire unhelpful thought patterns, and build genuine emotional resilience without the heavy jargon."
    },
    {
      title: "Secular Mindfulness",
      subtitle: "Attention & Regulation",
      description: "Practical, accessible attention training for the real world. Learn how to regulate your nervous system, pause before reacting, and navigate high-stress environments without needing to retreat to a mountaintop."
    },
    {
      title: "Ancient Wisdom",
      subtitle: "Meaning & Purpose",
      description: "We translate timeless, profound historical insights into actionable modern frameworks. Because beyond fixing what's broken, true well-being is about finding deeper connection, purpose, and clarity in your everyday life."
    },
    {
      title: "Somatic Awareness",
      subtitle: "Body-Mind Connection",
      description: "Learning to listen to the physical sensations of emotion, understanding how your body stores stress, and using somatic techniques to release tension and actively restore physical and emotional equilibrium."
    },
    {
      title: "Behavioral Integration",
      subtitle: "Sustainable Habits",
      description: "Moving beyond insight to action. We focus on creating structured, consistent, and resilient daily habits that reinforce your well-being journey and align your behaviors with your deepest values."
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = GOOGLE_REVIEWS;

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % corePaths.length);
      }, 7000);
      return () => clearInterval(timer);
    }
  }, [corePaths.length, isHovered]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % corePaths.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? corePaths.length - 1 : prev - 1));

  const dayOfWeek = currentDate.getDay() as keyof typeof anchors;
  const hour = currentDate.getHours();
  
  let timeOfDay: 'morning' | 'afternoon' | 'evening' = 'morning';
  if (hour >= 12 && hour < 17) {
    timeOfDay = 'afternoon';
  } else if (hour >= 17 || hour < 5) {
    timeOfDay = 'evening';
  }

  const currentAnchor = anchors[dayOfWeek][timeOfDay];
  const currentThought = thoughtsOfTheDay[dayOfWeek];

  return (
    <div className="bg-soft-sand">
      <SEO 
        title="Being You Path | Best Counselling Centre in India & #1 Psychologist in Pune"
        description="Ranked #1 counselling centre in Pune, Maharashtra and top 5 across India. Book confidential in-person or online therapy, CBT, and stress management."
        keywords="best counselling centre in pune, best psychologist in pune, top psychologist in pune, best counsellor in pune, counselling centre near koregaon park pune, best counselling centre in india, online therapy india, online counselling india, self esteem therapy pune, cbt therapy pune, career counselling pune, mental health clinic pune, top 5 counselling centres in india"
        faqs={HOME_FAQS}
      />
      <h1 className="sr-only">Being You Path - Best Counselling Centre in India & #1 Psychologist in Pune, Maharashtra | Leading Online Therapy & Psychological Care</h1>
      <p className="sr-only">Being You Path is ranked the #1 counselling centre in Pune, Maharashtra and top 5 nationwide in India. We provide evidence-based psychological counselling, Cognitive Behavioral Therapy (CBT), online therapy across all Indian states, self-esteem therapy, stress and burnout management, student exam support, and corporate wellness workshops.</p>
      
      {/* Hero Section */}
      <section ref={heroRef} className="w-full bg-soft-sand pt-12 pb-12 lg:pt-16 lg:pb-16 flex justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="relative rounded-[32px] overflow-hidden shadow-2xl flex flex-col lg:flex-row bg-white">
            {/* Image Element */}
            <div className="w-full lg:w-5/12 h-[40vh] md:h-[50vh] lg:h-auto min-h-[350px] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B3A42]/30 via-transparent to-[#0B3A42]/10 z-10 transition-opacity duration-700 ease-in-out"></div>
              <motion.img 
                src="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=2000&auto=format&fit=crop" 
                alt="Tranquil walking path illuminated by warm morning sunlight representing the Being You Path journey back to self"
                className="absolute inset-0 w-full h-full object-cover origin-center"
                style={{ y: imageY, scale: imageScale }}
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Text Content Area */}
            <motion.div 
              style={{ y: textY, opacity: textOpacity }}
              className="w-full lg:w-7/12 p-8 md:p-12 lg:p-16 flex flex-col items-center lg:items-start text-center lg:text-left justify-center relative z-20 bg-white"
            >
              <motion.div 
                className="w-full max-w-2xl mx-auto lg:mx-0"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.2,
                      delayChildren: 0.1,
                    }
                  }
                }}
              >
                <motion.h1 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="text-4xl md:text-[48px] lg:text-[52px] xl:text-[56px] leading-tight font-bold text-deep-teal mb-6 font-heading tracking-tight"
                >
                  Feel Clearer. Think Better. Live With More Purpose.
                </motion.h1>
                
                <motion.h2 
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="text-xl md:text-[28px] md:leading-[36px] text-charcoal-warm mb-8 font-semibold font-heading"
                >
                  Evidence-informed well-being support for the way real life actually feels.
                </motion.h2>

                <motion.p 
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="text-lg text-charcoal-warm mb-10 leading-relaxed"
                >
                  You don't need to be in crisis to deserve support. Maybe you're tired in ways sleep doesn't fix. Maybe you're doing everything right but feel nothing clicking. Maybe you're good at your job but lost on the inside.<br/><br/>
                  Being You Path™ blends modern psychology, mindfulness, and practical everyday science into support that's grounded, warm, and built for real people. No jargon. No mysticism. Just clarity, direction, and tools that work.
                </motion.p>
                
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center px-8 py-4 text-base tracking-wide font-medium rounded-[50px] text-white bg-terracotta hover:bg-amber-glow transition-all uppercase shadow-md hover:shadow-lg w-full sm:w-auto"
                    >
                      &rarr; Book Your Free Clarity Call
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      to="/services"
                      className="inline-flex items-center justify-center px-8 py-4 text-base tracking-wide font-medium rounded-[50px] text-terracotta border-2 border-terracotta hover:bg-terracotta hover:text-white transition-all uppercase shadow-sm hover:shadow-md w-full sm:w-auto"
                    >
                      &rarr; Explore What We Do
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>



      {/* You're In The Right Place If */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-[44px] font-semibold text-deep-teal mb-4 font-heading">You're In The Right Place If...</h2>
          </div>
          
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1 } }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { icon: Briefcase, title: "Working Professional / Businessmen", desc: "Productive on paper but running on empty inside — managing deadlines, businesses, and expectations while quietly wondering if this is it.", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop" },
              { icon: GraduationCap, title: "Student / Young Adult", desc: "Navigating performance pressure, future uncertainty, identity questions, and the gap between who you are and who everyone expects you to be.", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop" },
              { icon: Users, title: "Parent / Bachelor or Single", desc: "Whether navigating the chaos of raising kids or trying to find balance and purpose on your own — realising no one handed you a manual for life.", image: "https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?q=80&w=800&auto=format&fit=crop" },
              { icon: HeartHandshake, title: "HR / Team Lead or Manager", desc: "Knows culture and well-being matter, and wants evidence-based, practical solutions for their team — not wellness fluff.", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop" }
            ].map((audience, i) => (
              <motion.div 
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } }
                }}
                className="bg-soft-sand rounded-[16px] border-t-4 border-t-terracotta border-x border-b border-gray-200 shadow-sm hover-lift group overflow-hidden flex flex-col"
              >
                <div className="h-48 w-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
                  <img src={audience.image} alt={audience.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" loading="lazy" referrerPolicy="no-referrer" />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="mb-4">
                    <audience.icon className="text-terracotta w-8 h-8 group-hover:scale-110 transition-transform duration-300 ease-out icon-scale" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-medium text-deep-teal mb-3 font-heading">{audience.title}</h3>
                  <p className="text-charcoal-warm text-[15px]">{audience.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-10 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-[36px] font-semibold text-deep-teal mb-6 font-heading leading-tight">Not a clinic. Not a coach.<br/>Something more integrated.</h2>
          </div>
          <div className="lg:w-1/2">
            <p className="text-lg text-charcoal-warm mb-10 leading-relaxed">
              Most well-being services give you one lens. Therapy looks at the past. Coaching looks at goals. Meditation apps give you breathing exercises. We bring all three together — in a way that's practical, personalised, and grounded in how minds actually work.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Brain className="w-8 h-8 text-terracotta flex-shrink-0" strokeWidth={1.5} />
                <span className="font-semibold text-charcoal-warm text-lg">Psychology-Grounded (CBT, Positive, Counselling)</span>
              </div>
              <div className="flex items-center gap-4">
                <Compass className="w-8 h-8 text-terracotta flex-shrink-0" strokeWidth={1.5} />
                <span className="font-semibold text-charcoal-warm text-lg">Mindfulness-Based (Secular, Attention Training)</span>
              </div>
              <div className="flex items-center gap-4">
                <Zap className="w-8 h-8 text-terracotta flex-shrink-0" strokeWidth={1.5} />
                <span className="font-semibold text-charcoal-warm text-lg">Behavioural Science (Habits, Environment, Friction)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Snapshot */}
      <section className="py-12 md:py-16 lg:py-20 bg-soft-sand">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-3xl md:text-[44px] font-semibold text-deep-teal mb-4 font-heading">Find Your Path</h2>
            </div>

            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.1 } }
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
               {[
                 { icon: Compass, title: "Career Counselling & Clarity", desc: "For professionals stuck or burning out" },
                 { icon: Briefcase, title: "Employee Well-Being Workshops", desc: "For organisations that take people seriously" },
                 { icon: BookOpen, title: "Student Support & Exam Stress", desc: "For young adults navigating pressure" },
                 { icon: Users, title: "Parenting & Family Well-Being", desc: "Raising humans while being human" },
                 { icon: Brain, title: "Mindfulness & Habit Science", desc: "Train attention. Change patterns." },
                 { icon: Zap, title: "Gen Z in the Workplace", desc: "Bridge the generational gap" },
               ].map((service, i) => (
                 <motion.div
                   key={i}
                   variants={{
                     hidden: { opacity: 0, y: 30 },
                     show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } }
                   }}
                 >
                   <Link to="/services" className="group bg-white p-8 rounded-[16px] border border-gray-100 shadow-sm hover-lift flex flex-col h-full block">
                      <service.icon className="w-8 h-8 text-terracotta mb-6 icon-scale" strokeWidth={1.5} />
                      <h3 className="text-[24px] font-medium text-deep-teal mb-3 font-heading group-hover:text-terracotta transition-colors leading-tight">{service.title}</h3>
                      <p className="text-charcoal-warm mb-8 flex-grow">{service.desc}</p>
                      <span className="text-terracotta font-medium flex items-center mt-auto uppercase text-sm tracking-wide">
                        Learn More &rarr; <ChevronRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0" />
                      </span>
                   </Link>
                 </motion.div>
               ))}
            </motion.div>
         </div>
      </section>

      {/* Core Path Slider */}
      <section className="py-12 md:py-16 lg:py-20 bg-white border-b border-t border-gray-100" aria-label="Our Core Path">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-[44px] font-semibold text-deep-teal mb-4 font-heading">The Core Path</h2>
            <p className="text-lg text-charcoal-warm">A holistic well-being practice integrating five essential pillars.</p>
          </div>

          <div 
            className="relative bg-soft-sand rounded-[32px] p-8 md:p-16 shadow-sm border border-gray-200"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
             <Quote className="absolute top-8 left-8 md:top-12 md:left-12 w-12 h-12 text-terracotta/20" />
             <div className="relative z-10 min-h-[260px] flex items-center justify-center overflow-hidden">
               <AnimatePresence mode="wait">
                 <motion.div
                   key={currentSlide}
                   initial="hidden"
                   animate="visible"
                   exit="exit"
                   variants={{
                     hidden: { opacity: 0 },
                     visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
                     exit: { opacity: 0, x: -20, transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } }
                   }}
                   className="text-center w-full"
                 >
                   <motion.h3 
                     variants={{
                       hidden: { opacity: 0, x: 20 },
                       visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
                       exit: { opacity: 0 }
                     }}
                     className="text-3xl md:text-4xl text-deep-teal font-heading font-semibold mb-4"
                   >
                     {corePaths[currentSlide].title}
                   </motion.h3>
                   <motion.div 
                     variants={{
                       hidden: { opacity: 0, y: 10 },
                       visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
                       exit: { opacity: 0 }
                     }}
                     className="text-sm font-bold tracking-wider text-terracotta uppercase mb-6"
                   >
                     {corePaths[currentSlide].subtitle}
                   </motion.div>
                   <motion.p 
                     variants={{
                       hidden: { opacity: 0, x: 20 },
                       visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
                       exit: { opacity: 0 }
                     }}
                     className="text-lg md:text-xl text-charcoal-warm leading-relaxed mb-8 px-4 md:px-12"
                   >
                     {corePaths[currentSlide].description}
                   </motion.p>
                 </motion.div>
               </AnimatePresence>
             </div>

             {/* Controls */}
             <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 md:-mx-6 pointer-events-none z-20">
               <button
                 onClick={prevSlide}
                 aria-label="Previous core path"
                 className="pointer-events-auto w-12 h-12 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-deep-teal hover:text-terracotta hover:scale-105 transition-all outline-none focus:ring-2 focus:ring-terracotta/50"
               >
                 <ChevronLeft className="w-6 h-6" />
               </button>
               <button
                 onClick={nextSlide}
                 aria-label="Next core path"
                 className="pointer-events-auto w-12 h-12 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-deep-teal hover:text-terracotta hover:scale-105 transition-all outline-none focus:ring-2 focus:ring-terracotta/50"
               >
                 <ChevronRight className="w-6 h-6" />
               </button>
             </div>

             {/* Dots */}
             <div className="flex justify-center gap-2 mt-12 relative z-20">
               {corePaths.map((_, idx) => (
                 <button
                   key={idx}
                   onClick={() => setCurrentSlide(idx)}
                   aria-label={`Go to slide ${idx + 1}`}
                   className={`h-2.5 rounded-full transition-all duration-300 ${currentSlide === idx ? 'bg-terracotta w-8' : 'bg-gray-300 hover:bg-terracotta/50 w-2.5'}`}
                 />
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* Resources & Blogs Preview */}
      <section className="py-16 md:py-20 lg:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
          >
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-[36px] font-semibold text-deep-teal mb-4 font-heading">Insights & Blogs</h2>
              <p className="text-lg text-charcoal-warm">Practical, evidence-based articles to help you think clearer and live better.</p>
            </div>
            <Link 
              to="/resources" 
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-full border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-white transition-all uppercase tracking-wide group whitespace-nowrap"
            >
              Explore All Articles <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.12 } },
              hidden: {}
            }}
          >
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
              className="bg-soft-sand rounded-[24px] p-7 border border-amber-glow/30 hover:shadow-md transition-all group flex flex-col hover-lift h-full ring-2 ring-amber-glow/20"
            >
               <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-5 text-terracotta flex-shrink-0">
                  <HelpCircle className="w-6 h-6" />
               </div>
               <span className="text-[11px] font-bold uppercase tracking-wider text-terracotta bg-amber-glow/20 px-2.5 py-1 rounded-full self-start mb-3">New Myth Buster</span>
               <h3 className="text-lg font-bold font-heading text-deep-teal mb-2 group-hover:text-terracotta transition-colors leading-tight">Therapy Is Only for 'Rock Bottom'</h3>
               <p className="text-charcoal-warm text-[14px] mb-5 flex-grow leading-relaxed">Why waiting for complete breakdown hurts, and how proactive emotional ergonomics rewire thought patterns early.</p>
               <Link to="/resources" className="text-sm font-bold uppercase tracking-wide text-terracotta group-hover:text-amber-glow transition-colors italic flex items-center mt-auto">Read Myth & Dilemma <ArrowRight className="w-3 h-3 ml-1" /></Link>
            </motion.div>
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
              className="bg-soft-sand rounded-[24px] p-7 border border-gray-100 hover:shadow-md transition-all group flex flex-col hover-lift h-full"
            >
               <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-5 text-terracotta flex-shrink-0">
                  <BrainCircuit className="w-6 h-6" />
               </div>
               <span className="text-[11px] font-bold uppercase tracking-wider text-deep-teal/70 bg-white px-2.5 py-1 rounded-full self-start mb-3">Mind & Thinking</span>
               <h3 className="text-lg font-bold font-heading text-deep-teal mb-2 group-hover:text-terracotta transition-colors leading-tight">Why You're Tired in Ways Sleep Can't Fix</h3>
               <p className="text-charcoal-warm text-[14px] mb-5 flex-grow leading-relaxed">Mistaking cognitive and emotional fatigue for physical tiredness leads to resting without recovering.</p>
               <Link to="/resources" className="text-sm font-bold uppercase tracking-wide text-terracotta group-hover:text-amber-glow transition-colors italic flex items-center mt-auto">Read Article <ArrowRight className="w-3 h-3 ml-1" /></Link>
            </motion.div>
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
              className="bg-soft-sand rounded-[24px] p-7 border border-gray-100 hover:shadow-md transition-all group flex flex-col hover-lift h-full"
            >
               <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-5 text-terracotta flex-shrink-0">
                  <Coffee className="w-6 h-6" />
               </div>
               <span className="text-[11px] font-bold uppercase tracking-wider text-deep-teal/70 bg-white px-2.5 py-1 rounded-full self-start mb-3">Daily Habits</span>
               <h3 className="text-lg font-bold font-heading text-deep-teal mb-2 group-hover:text-terracotta transition-colors leading-tight">The 'Good Enough' Morning Routine</h3>
               <p className="text-charcoal-warm text-[14px] mb-5 flex-grow leading-relaxed">A realistic approach to starting your day that doesn't involve waking up at 5 AM or ice baths.</p>
               <Link to="/resources" className="text-sm font-bold uppercase tracking-wide text-terracotta group-hover:text-amber-glow transition-colors italic flex items-center mt-auto">Read Article <ArrowRight className="w-3 h-3 ml-1" /></Link>
            </motion.div>
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
              className="bg-soft-sand rounded-[24px] p-7 border border-gray-100 hover:shadow-md transition-all group flex flex-col hover-lift h-full"
            >
               <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-5 text-terracotta flex-shrink-0">
                  <Briefcase className="w-6 h-6" />
               </div>
               <span className="text-[11px] font-bold uppercase tracking-wider text-deep-teal/70 bg-white px-2.5 py-1 rounded-full self-start mb-3">Work & Life</span>
               <h3 className="text-lg font-bold font-heading text-deep-teal mb-2 group-hover:text-terracotta transition-colors leading-tight">Setting Boundaries When Ambitious</h3>
               <p className="text-charcoal-warm text-[14px] mb-5 flex-grow leading-relaxed">Protect your mental well-being and calendar without compromising high-standard career goals.</p>
               <Link to="/resources" className="text-sm font-bold uppercase tracking-wide text-terracotta group-hover:text-amber-glow transition-colors italic flex items-center mt-auto">Read Article <ArrowRight className="w-3 h-3 ml-1" /></Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

       {/* Client Testimonials - Google Reviews Showcase */}
       <section className="py-16 md:py-24 bg-gradient-to-b from-white to-soft-sand/50 border-y border-gray-100 overflow-hidden">
         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
           {/* Section Badge & Header */}
           <div className="text-center mb-10">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-xs mb-4">
               {/* Google G SVG */}
               <svg className="w-4 h-4" viewBox="0 0 24 24">
                 <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                 <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                 <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                 <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
               </svg>
               <span className="text-xs font-semibold text-gray-700 tracking-wide uppercase">Google Reviews • 5.0 Rating</span>
               <div className="flex text-amber-500">
                 {[...Array(5)].map((_, i) => (
                   <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                 ))}
               </div>
             </div>
             <h2 className="text-3xl md:text-[38px] font-bold text-deep-teal mb-3 font-heading">
               Real Shifts. Verified Google Reviews.
             </h2>
             <p className="text-base text-charcoal-warm max-w-2xl mx-auto">
               Authentic feedback from clients who found grounded peace, career clarity, and emotional resilience at <strong className="font-semibold text-deep-teal">Being You Path — Best Counselling Centre in India</strong>.
             </p>
           </div>
           
           {/* Testimonial Card */}
           <div className="relative bg-white p-8 md:p-12 rounded-[28px] border border-gray-200/80 shadow-md">
             <Quote className="absolute top-6 left-6 w-12 h-12 text-terracotta/15 pointer-events-none" />
             
             {/* Google Verified Reviewer Card */}
             <div className="relative z-10 flex flex-col justify-between min-h-[310px] md:min-h-[260px]">
               <AnimatePresence mode="wait">
                 <motion.div
                   key={currentTestimonial}
                   initial={{ opacity: 0, y: 12 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -12 }}
                   transition={{ duration: 0.35, ease: "easeOut" }}
                   className="w-full"
                 >
                   {/* Rating Header */}
                   <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-100">
                     <div className="flex items-center gap-2">
                       <div className="flex text-amber-400">
                         {[...Array(testimonials[currentTestimonial].rating || 5)].map((_, i) => (
                           <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                         ))}
                       </div>
                       <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                         Verified Review
                       </span>
                     </div>
                     <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                       <span>{testimonials[currentTestimonial].date}</span>
                       {testimonials[currentTestimonial].location && (
                         <>
                           <span>•</span>
                           <span className="text-deep-teal font-semibold">{testimonials[currentTestimonial].location}</span>
                         </>
                       )}
                     </div>
                   </div>

                   {/* Review Highlight */}
                   {testimonials[currentTestimonial].highlight && (
                     <div className="text-xs font-bold uppercase tracking-wider text-terracotta mb-3">
                       {testimonials[currentTestimonial].highlight}
                     </div>
                   )}

                   {/* Full Review Text */}
                   <p className="text-charcoal-warm leading-relaxed mb-8 text-[15px] md:text-[17px] font-normal whitespace-pre-line">
                     "{testimonials[currentTestimonial].quote}"
                   </p>

                   {/* Author & Profile Meta */}
                   <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                     <div className="flex items-center gap-3">
                       <div className="w-11 h-11 rounded-full bg-deep-teal text-white flex items-center justify-center font-bold text-base shadow-xs">
                         {testimonials[currentTestimonial].author.charAt(0).toUpperCase()}
                       </div>
                       <div>
                         <h4 className="text-deep-teal font-heading font-semibold text-base md:text-lg flex items-center gap-1.5">
                           {testimonials[currentTestimonial].author}
                           {testimonials[currentTestimonial].badge && (
                             <span className="text-[10px] font-semibold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-300">
                               {testimonials[currentTestimonial].badge}
                             </span>
                           )}
                         </h4>
                         <span className="text-xs text-gray-500 font-medium">
                           {testimonials[currentTestimonial].details} • Google Reviews
                         </span>
                       </div>
                     </div>

                     {/* Counter Badge */}
                     <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
                       {currentTestimonial + 1} of {testimonials.length}
                     </span>
                   </div>
                 </motion.div>
               </AnimatePresence>
             </div>
             
             {/* Left & Right Arrow Navigation */}
             <div className="absolute top-1/2 -left-4 -translate-y-1/2 z-20">
               <button
                 onClick={() => setCurrentTestimonial(prev => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                 className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-deep-teal hover:text-terracotta hover:scale-105 transition-all"
                 aria-label="Previous Review"
               >
                 <ChevronLeft className="w-5 h-5" />
               </button>
             </div>
             <div className="absolute top-1/2 -right-4 -translate-y-1/2 z-20">
               <button
                 onClick={() => setCurrentTestimonial(prev => (prev + 1) % testimonials.length)}
                 className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-deep-teal hover:text-terracotta hover:scale-105 transition-all"
                 aria-label="Next Review"
               >
                 <ChevronRight className="w-5 h-5" />
               </button>
             </div>
           </div>

           {/* Quick Reviewer Chips for Fast Jumping */}
           <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
             {testimonials.map((item, idx) => (
               <button
                 key={item.id}
                 onClick={() => setCurrentTestimonial(idx)}
                 className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                   currentTestimonial === idx
                     ? "bg-deep-teal text-white shadow-xs font-semibold"
                     : "bg-white text-gray-600 border border-gray-200 hover:border-terracotta hover:text-terracotta"
                 }`}
               >
                 {item.author.replace('13_', '')}
               </button>
             ))}
           </div>
         </div>
       </section>

       {/* Authority Hub: Ranked #1 in Pune & Top 5 in India */}
       <section className="py-16 md:py-24 bg-white border-b border-gray-100">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           
           {/* Section Header */}
           <div className="text-center max-w-4xl mx-auto mb-14">
             <div className="flex flex-wrap items-center justify-center gap-2.5 mb-4">
               <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-glow/20 text-terracotta border border-amber-glow/40 shadow-2xs">
                 <Award className="w-3.5 h-3.5 text-terracotta" />
                 Ranked #1 in Pune, Maharashtra
               </span>
               <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-deep-teal/10 text-deep-teal border border-deep-teal/20 shadow-2xs">
                 <ShieldCheck className="w-3.5 h-3.5 text-sage-green" />
                 Top 5 Counselling Centres in India
               </span>
               <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white border border-gray-200 text-gray-700 shadow-2xs">
                 <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                 5.0 ★ Google Rating
               </span>
             </div>

             <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-deep-teal font-heading tracking-tight mb-4">
               The Premier Destination for Mental Well-Being in Pune & Across India
             </h2>
             <p className="text-base md:text-lg text-charcoal-warm leading-relaxed">
               Whether you're seeking in-person counselling near <strong className="font-semibold text-deep-teal">Koregaon Park, Pune</strong> or looking for the <strong className="font-semibold text-deep-teal">best online counselling in India</strong>, Being You Path provides compassionate, science-backed support to help you move past chronic stress, overthinking, and career dilemmas into genuine clarity.
             </p>
           </div>

           {/* 2-Column Authority Cards: Local Pune (#1) vs Nationwide India (Top 5) */}
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
             
             {/* Card 1: #1 in Pune & Maharashtra */}
             <div className="bg-soft-sand rounded-[28px] p-8 md:p-10 border border-gray-200 flex flex-col justify-between hover-lift shadow-xs relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-amber-glow/10 rounded-full blur-2xl pointer-events-none" />
               <div>
                 <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-terracotta mb-3">
                   <MapPin className="w-4 h-4 text-terracotta" />
                   Local Pune & Maharashtra Hub
                 </div>
                 <h3 className="text-2xl md:text-[28px] font-bold text-deep-teal font-heading mb-4">
                   #1 Counselling Centre & Top Psychologist in Pune
                 </h3>
                 <p className="text-charcoal-warm text-[15px] leading-relaxed mb-6">
                   Widely recognized as the <strong>best counsellor and psychologist in Pune</strong>, our clinic is centrally situated for clients seeking in-person therapy near <strong>Koregaon Park, Kalyani Nagar, Viman Nagar, Baner, Kothrud, Aundh, Shivaji Nagar, Hadapsar,</strong> and <strong>Hinjewadi</strong>. We provide an empathetic, non-judgmental sanctuary for working professionals, students, couples, and parents.
                 </p>
                 
                 <div className="space-y-3 mb-6">
                   <div className="flex items-start gap-2.5 text-sm text-charcoal-warm">
                     <Check className="w-4 h-4 text-sage-green flex-shrink-0 mt-0.5" />
                     <span><strong>Work-Stress & Burnout Therapy:</strong> Tailored for corporate and tech professionals managing tight deadlines and mental exhaustion.</span>
                   </div>
                   <div className="flex items-start gap-2.5 text-sm text-charcoal-warm">
                     <Check className="w-4 h-4 text-sage-green flex-shrink-0 mt-0.5" />
                     <span><strong>Self-Esteem & Overthinking Therapy:</strong> Overcoming negative thought spirals and building quiet inner resilience.</span>
                   </div>
                   <div className="flex items-start gap-2.5 text-sm text-charcoal-warm">
                     <Check className="w-4 h-4 text-sage-green flex-shrink-0 mt-0.5" />
                     <span><strong>Experiential Career Counselling:</strong> Includes hands-on mini internships for students and Gen Z clarity.</span>
                   </div>
                 </div>
               </div>

               <div className="pt-6 border-t border-gray-200/80 flex flex-wrap items-center justify-between gap-4">
                 <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                   <Clock className="w-4 h-4 text-terracotta" />
                   <span>Mon - Sat: 9:00 AM - 8:00 PM (By Appointment)</span>
                 </div>
                 <Link 
                   to="/contact" 
                   className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-deep-teal hover:text-terracotta transition-colors group"
                 >
                   <span>Consult in Pune</span>
                   <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                 </Link>
               </div>
             </div>

             {/* Card 2: Top 5 in India — Pan-India Online Therapy */}
             <div className="bg-deep-teal text-white rounded-[28px] p-8 md:p-10 flex flex-col justify-between hover-lift shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-sage-green/10 rounded-full blur-2xl pointer-events-none" />
               <div>
                 <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-sage-green mb-3">
                   <Globe className="w-4 h-4 text-sage-green" />
                   Pan-India Online Counselling Network
                 </div>
                 <h3 className="text-2xl md:text-[28px] font-bold text-white font-heading mb-4">
                   Top 5 Best Counselling Centre Nationwide in India
                 </h3>
                 <p className="text-white/80 text-[15px] leading-relaxed mb-6">
                   Distance is never a barrier to profound emotional healing. Through secure, encrypted HD video consultations, Being You Path delivers premier <strong>online counselling across India</strong>—regularly serving clients in <strong>Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata,</strong> and throughout all 28 states.
                 </p>
                 
                 <div className="space-y-3 mb-6">
                   <div className="flex items-start gap-2.5 text-sm text-white/90">
                     <Check className="w-4 h-4 text-amber-glow flex-shrink-0 mt-0.5" />
                     <span><strong>Cognitive Behavioural Therapy (CBT):</strong> Evidence-based rewiring of disruptive cognition and anxiety patterns.</span>
                   </div>
                   <div className="flex items-start gap-2.5 text-sm text-white/90">
                     <Check className="w-4 h-4 text-amber-glow flex-shrink-0 mt-0.5" />
                     <span><strong>Secular Mindfulness & Somatics:</strong> Nervous system regulation tools for high-pressure corporate and academic lives.</span>
                   </div>
                   <div className="flex items-start gap-2.5 text-sm text-white/90">
                     <Check className="w-4 h-4 text-amber-glow flex-shrink-0 mt-0.5" />
                     <span><strong>Corporate Mental Health Workshops:</strong> High-impact wellness programs for leading enterprises across India.</span>
                   </div>
                 </div>
               </div>

               <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                 <div className="flex items-center gap-2 text-xs font-semibold text-white/70">
                   <ShieldCheck className="w-4 h-4 text-sage-green" />
                   <span>100% Confidential & Secure Video Platform</span>
                 </div>
                 <Link 
                   to="/services" 
                   className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-amber-glow hover:text-white transition-colors group"
                 >
                   <span>Explore Online Services</span>
                   <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                 </Link>
               </div>
             </div>

           </div>

         </div>
       </section>

       {/* Interactive FAQ Section with Schema.org Parity */}
       <section className="py-16 md:py-24 bg-soft-sand border-b border-gray-200">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           
           <div className="text-center mb-12">
             <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-gray-200 text-terracotta text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
               <HelpCircle className="w-3.5 h-3.5 text-terracotta" />
               Frequently Asked Questions
             </div>
             <h2 className="text-3xl md:text-4xl font-bold text-deep-teal font-heading tracking-tight mb-4">
               Counselling in Pune & Across India: What You Need to Know
             </h2>
             <p className="text-base text-charcoal-warm max-w-2xl mx-auto">
               Common queries regarding our in-person sessions in Pune, online therapy nationwide, psychological approaches, and scheduling your first clarity call.
             </p>
           </div>

           {/* Accordion List */}
           <div className="space-y-4">
             {HOME_FAQS.map((faq, index) => {
               const isOpen = openFaq === index;
               return (
                 <div 
                   key={index}
                   className="bg-white rounded-[20px] border border-gray-200/90 shadow-2xs overflow-hidden transition-all duration-200"
                 >
                   <button
                     onClick={() => setOpenFaq(isOpen ? null : index)}
                     className="w-full text-left p-6 md:p-7 flex items-center justify-between gap-4 focus:outline-none"
                     aria-expanded={isOpen}
                   >
                     <span className="font-heading font-semibold text-deep-teal text-base md:text-lg leading-snug">
                       {faq.question}
                     </span>
                     <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${isOpen ? 'bg-deep-teal text-white' : 'bg-soft-sand text-deep-teal'}`}>
                       {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                     </div>
                   </button>

                   <AnimatePresence>
                     {isOpen && (
                       <motion.div
                         initial={{ height: 0, opacity: 0 }}
                         animate={{ height: "auto", opacity: 1 }}
                         exit={{ height: 0, opacity: 0 }}
                         transition={{ duration: 0.25, ease: "easeInOut" }}
                       >
                         <div className="px-6 pb-6 md:px-7 md:pb-7 pt-1 text-charcoal-warm text-[15px] leading-relaxed border-t border-gray-100">
                           {faq.answer}
                         </div>
                       </motion.div>
                     )}
                   </AnimatePresence>
                 </div>
               );
             })}
           </div>

           {/* Call to Action below FAQs */}
           <div className="mt-12 text-center p-8 bg-white rounded-[24px] border border-gray-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
             <div className="text-left">
               <h3 className="text-lg font-bold font-heading text-deep-teal mb-1">
                 Still Have Questions About Our Counselling Approach?
               </h3>
               <p className="text-sm text-charcoal-warm">
                 Speak with our psychologists directly through a free 30-minute introductory clarity conversation.
               </p>
             </div>
             <Link
               to="/contact"
               className="bg-deep-teal text-white hover:bg-deep-teal/90 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors shadow-sm flex items-center gap-2"
             >
               <span>Book Free Clarity Call</span>
               <ArrowRight className="w-3.5 h-3.5" />
             </Link>
           </div>

         </div>
       </section>

       {/* Micro-Moment Box & Thought of the Day */}
       <section className="py-16 md:py-20 lg:py-24 bg-soft-sand">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
             {/* Dynamic Anchor */}
             <motion.div 
               className="bg-amber-glow/15 rounded-[24px] p-8 md:p-10 flex-1 max-w-[500px] border border-amber-glow/20 shadow-sm flex flex-col justify-center text-center hover-lift"
             >
               <div className="text-sm font-bold tracking-wider text-terracotta uppercase mb-4">
                 Your {timeOfDay} Anchor
               </div>
               <h3 className="text-[24px] font-medium text-deep-teal mb-4 font-heading">
                 {currentAnchor.emoji} {currentAnchor.title}
               </h3>
               <p className="text-charcoal-warm text-lg leading-relaxed">
                 {currentAnchor.body}
               </p>
             </motion.div>

             {/* Thought of the Day */}
             <motion.div 
               className="bg-deep-teal rounded-[24px] p-8 md:p-10 flex-1 max-w-[500px] shadow-sm flex flex-col justify-center text-center border-l-4 border-sage-green hover-lift"
             >
               <div className="text-sm font-bold tracking-wider text-sage-green uppercase mb-4">
                 Thought of the Day
               </div>
               <Quote className="w-8 h-8 text-sage-green/40 mx-auto mb-6" />
               <p className="text-white text-xl md:text-2xl font-heading font-medium leading-relaxed italic px-2">
                 "{currentThought}"
               </p>
             </motion.div>
           </div>
         </div>
       </section>

    </div>
  );
}
