import { useState } from "react";
import { CheckCircle2, Quote, ChevronDown, ChevronUp, MessageCircleHeart, Target, Fingerprint, Network } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

export default function About() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

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
      {/* Hero Section */}
      <section className="pt-12 pb-20 lg:pt-16 lg:pb-12 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-[52px] lg:text-[64px] leading-tight font-bold text-deep-teal mb-8 font-heading tracking-tight"
          >
            We Help People Understand Themselves — And Build Lives That Actually Work
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl md:text-[24px] md:leading-[36px] text-charcoal-warm font-medium font-heading"
          >
            Meet the people behind Being You Path™ — counselling psychologists and well-being facilitators blending modern psychology, mindfulness, and practical wisdom.
          </motion.h2>
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
                 <div className="h-80 bg-gray-200 border-b border-white relative overflow-hidden group">
                   <div className="absolute inset-0 flex items-center justify-center text-gray-400 group-hover:scale-105 transition-transform duration-500 ease-out">
                     <span className="font-heading font-medium">Imran's Photo</span>
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
                       <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-[16px] border border-gray-100 shadow-sm items-start hover:shadow-md transition-all duration-300 ease-out hover:-translate-y-1">
                           <div className="w-full sm:w-24 h-40 sm:h-32 bg-gray-50 rounded-[10px] flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-100 group">
                            <img src="https://images.unsplash.com/photo-1600618528240-fb9fc964b853?auto=format&fit=crop&q=80&w=200&h=300" alt="Healing Journey through chakras" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
                          </div>
                          <div className="flex-1 flex flex-col h-full w-full">
                             <h5 className="font-heading font-semibold text-deep-teal leading-tight mb-2">1. Healing Journey through chakras</h5>
                             <p className="text-[13px] text-charcoal-warm mb-3 line-clamp-3">Explore the ancient system of energy centers. This guide provides practical methods to balance and unblock your chakras for emotional stability, grounding, and inner peace in daily life.</p>
                             <div className="mt-auto flex items-center justify-between pt-2 border-t border-gray-50">
                               <span className="font-bold text-terracotta">₹499</span>
                               <a 
                                 href={`https://wa.me/917387772573?text=${encodeURIComponent('Hello, I am interested in purchasing the book "Healing Journey through chakras".\n\nPlease find my details below:\nName: \nPhone Number: \nDelivery Address: \nCity/State/Pincode: \n\nThank you!')}`}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="text-[11px] font-bold uppercase tracking-wider bg-deep-teal text-white px-4 py-2 rounded-full hover:bg-terracotta transition-colors shadow-sm inline-block hover:-translate-y-0.5 duration-300 ease-out"
                               >
                                 Buy Now
                               </a>
                             </div>
                          </div>
                       </div>

                       {/* Book 2 */}
                       <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-[16px] border border-gray-100 shadow-sm items-start hover:shadow-md transition-all duration-300 ease-out hover:-translate-y-1">
                          <div className="w-full sm:w-24 h-40 sm:h-32 bg-gray-50 rounded-[10px] flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-100 group">
                             <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=200&h=300" alt="The essence of Wellness" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
                          </div>
                          <div className="flex-1 flex flex-col h-full w-full">
                             <h5 className="font-heading font-semibold text-deep-teal leading-tight mb-2">2. The essence of Wellness (Mind, Body, Spirit)</h5>
                             <p className="text-[13px] text-charcoal-warm mb-3 line-clamp-3">A comprehensive roadmap to integrative health. Discover how simple, daily habits can align your physical vitality with mental clarity and profound spiritual depth.</p>
                             <div className="mt-auto flex items-center justify-between pt-2 border-t border-gray-50">
                               <span className="font-bold text-terracotta">₹499</span>
                               <a 
                                 href={`https://wa.me/917387772573?text=${encodeURIComponent('Hello, I am interested in purchasing the book "The essence of Wellness (Mind, Body, Spirit)".\n\nPlease find my details below:\nName: \nPhone Number: \nDelivery Address: \nCity/State/Pincode: \n\nThank you!')}`}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="text-[11px] font-bold uppercase tracking-wider bg-deep-teal text-white px-4 py-2 rounded-full hover:bg-terracotta transition-colors shadow-sm inline-block hover:-translate-y-0.5 duration-300 ease-out"
                               >
                                 Buy Now
                               </a>
                             </div>
                          </div>
                       </div>

                       {/* Book 3 */}
                       <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-[16px] border border-gray-100 shadow-sm items-start hover:shadow-md transition-all duration-300 ease-out hover:-translate-y-1">
                          <div className="w-full sm:w-24 h-40 sm:h-32 bg-gray-50 rounded-[10px] flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-100 group">
                            <img src="https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=200&h=300" alt="The power of mindful thoughts" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
                          </div>
                          <div className="flex-1 flex flex-col h-full w-full">
                             <h5 className="font-heading font-semibold text-deep-teal leading-tight mb-2">3. The power of mindful thoughts</h5>
                             <p className="text-[13px] text-charcoal-warm mb-3 line-clamp-3">Learn to harness the space between your thoughts. Break free from anxiety loops and overthinking with proven cognitive restructuring and mindfulness exercises.</p>
                             <div className="mt-auto flex items-center justify-between pt-2 border-t border-gray-50">
                               <span className="font-bold text-terracotta">₹499</span>
                               <a 
                                 href={`https://wa.me/917387772573?text=${encodeURIComponent('Hello, I am interested in purchasing the book "The power of mindful thoughts".\n\nPlease find my details below:\nName: \nPhone Number: \nDelivery Address: \nCity/State/Pincode: \n\nThank you!')}`}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="text-[11px] font-bold uppercase tracking-wider bg-deep-teal text-white px-4 py-2 rounded-full hover:bg-terracotta transition-colors shadow-sm inline-block hover:-translate-y-0.5 duration-300 ease-out"
                               >
                                 Buy Now
                               </a>
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
                 <div className="h-80 bg-gray-200 border-b border-white relative overflow-hidden group">
                   <div className="absolute inset-0 flex items-center justify-center text-gray-400 group-hover:scale-105 transition-transform duration-500 ease-out">
                     <span className="font-heading font-medium">Tejaswini's Photo</span>
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
                className="bg-white rounded-[16px] shadow-sm border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-6 text-left flex justify-between items-center focus:outline-none hover:bg-gray-50/50 transition-colors"
                >
                  <h3 className="text-xl font-semibold text-deep-teal font-heading pr-8">{faq.question}</h3>
                  <div className="flex-shrink-0 text-terracotta">
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </button>
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-charcoal-warm leading-relaxed">
                        <div className="pt-2 border-t border-gray-50">
                          {faq.answer}
                        </div>
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
