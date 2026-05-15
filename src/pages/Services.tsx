import { useState, useEffect } from "react";
import { CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { SkeletonLoader } from "../components/SkeletonLoader";

export default function Services() {
  const [expandedServices, setExpandedServices] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
      {/* Page Header */}
      <section className="bg-soft-sand py-12 md:py-16 lg:py-20 text-center border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-[52px] lg:text-[64px] leading-tight font-bold text-deep-teal mb-8 font-heading tracking-tight"
          >
            Support That Fits Your Life — Not Someone Else's Diagnosis
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl md:text-[24px] md:leading-[36px] text-charcoal-warm font-medium font-heading max-w-3xl mx-auto mb-8"
          >
            Whether you're navigating a career crossroads, managing a team, raising children, or simply feeling more lost than you'd like to admit — there's a starting point here for you.
          </motion.h2>
          <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="text-lg text-charcoal-warm max-w-3xl mx-auto"
          >
            Every service at Being You Path™ starts with a conversation. We don't prescribe programmes before we understand people. Our work is practical, personalised, and grounded in how minds actually function.
          </motion.p>
        </div>
      </section>

      {/* Services Accordion List */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="space-y-6">
                 <SkeletonLoader />
                 <SkeletonLoader />
              </div>
            ) : (
              <div className="space-y-6">
                 {servicesList.map((service, index) => (
                    <div key={index} className="bg-soft-sand rounded-[24px] shadow-sm border border-gray-200/50 overflow-hidden hover-lift">
                      <button 
                        onClick={() => toggleExpand(index)}
                      className="w-full p-6 md:p-8 flex items-center justify-between text-left hover:bg-gray-50/50 transition-colors focus:outline-none"
                    >
                      <div>
                        <h2 className="text-[28px] md:text-[32px] font-semibold text-deep-teal font-heading leading-tight mb-2">{service.title}</h2>
                        <h3 className="text-[16px] md:text-[18px] font-medium text-terracotta font-heading">{service.audience}</h3>
                      </div>
                      <div className="flex-shrink-0 ml-4 text-terracotta bg-white p-2 rounded-full shadow-sm">
                        {expandedServices.includes(index) ? (
                          <ChevronUp className="w-6 h-6" />
                        ) : (
                          <ChevronDown className="w-6 h-6" />
                        )}
                      </div>
                    </button>

                    <AnimatePresence>
                      {expandedServices.includes(index) && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="px-6 md:px-8 pb-8 pt-4 border-t border-gray-200/50 flex flex-col md:flex-row gap-8">
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
                                className="inline-flex items-center justify-center px-8 py-3 bg-terracotta text-white font-medium rounded-[50px] hover:bg-amber-glow transition-colors uppercase text-sm tracking-wide self-start shadow-sm"
                              >
                                {service.cta} &rarr;
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
               ))}
              </div>
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
