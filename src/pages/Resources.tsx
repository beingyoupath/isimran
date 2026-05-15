import { useState, useEffect } from "react";
import { BrainCircuit, Coffee, Briefcase, HeartHandshake, Waves, ArrowRight, X, Twitter, Linkedin, Mail, Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { SkeletonLoader } from "../components/SkeletonLoader";

export default function Resources() {
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Simulate data loading for a data-heavy component
    return () => clearTimeout(timer);
  }, []);

  const blogCategories = [
    {
      id: "mind",
      title: "Mind & Thinking",
      icon: BrainCircuit,
      desc: "Overthinking, focus, decision fatigue, and cognitive load.",
      articles: [
        { 
          title: "Why You're Tired in Ways Sleep Can't Fix",
          overview: "You're getting 8 hours of sleep, but you still wake up exhausted. Sound familiar? Many of us mistake cognitive or emotional fatigue for physical tiredness, leading to a frustrating cycle of 'resting' without actually recovering.",
          body: "Physical rest isn't enough when your brain is overloaded. Cognitive fatigue happens when you have too many open loops—unanswered emails, pending decisions, or unresolved conflicts. To truly recharge, you need to identify the specific type of rest you're lacking.",
          tips: [
            "Audit Energy Drains: Write down every pending task or worry on paper to reduce cognitive load.",
            "Schedule 'Sensory Rest': Take 10 minutes in a quiet room with no screens to let your nervous system baseline.",
            "Differentiate Burnout: Notice whether you need physical sleep, or if you need absence of emotional demands."
          ],
          conclusion: "Understanding the difference between being sleepy and being depleted is the first step toward reclaiming your energy.",
          link: "#" 
        },
        { 
          title: "The 3 Types of Overthinking (And What to Do About Them)",
          overview: "Are you trapped in analysis paralysis, or constantly worrying about the future? Overthinking isn't a single habit—it's a collection of three distinct cognitive patterns.",
          body: "The three main types of overthinking are rumination (living in the past), worry (fearing the future), and over-analysis (paralysis by choice). You cannot solve an emotional block with pure logic, so trying to 'think' your way out of overthinking usually makes it worse.",
          tips: [
            "Identify Your Pattern: Recognize whether you're living in the past, the future, or trapped in 'analysis paralysis'.",
            "Set a Dedicated 'Worry Time': Contain your anxieties to a specific 15-minute window during the day to prevent constant rumination.",
            "Use Somatic Anchors: Use physical grounding techniques, like splashing cold water on your face, to interrupt circular thoughts."
          ],
          conclusion: "By identifying your specific type of overthinking, you can apply the right tool to break the cycle instead of just spinning your wheels.",
          link: "#" 
        },
        { 
          title: "Decision Fatigue: How to Protect Your Choices",
          overview: "Have you noticed that you make worse choices at the end of the day? Decision fatigue is a real psychological phenomenon where your capacity to make good choices degrades with each decision.",
          body: "Every choice you make, from what to wear to how to respond to an email, draws from the same finite pool of mental energy. When that pool runs dry, you default to the easiest option—which is usually procrastination, unhealthy habits, or poor emotional regulation.",
          tips: [
            "Automate the Trivial: Standardize daily choices like what to wear or eat so you don't waste energy on them.",
            "Prioritize Morning Decisions: Make your most important, high-stakes decisions early in the morning when your mental energy is highest.",
            "Embrace 'Good Enough': Stop trying to optimize every single outcome; sometimes a B+ decision made quickly is better than an A+ decision that takes hours."
          ],
          conclusion: "Protecting your decision-making energy isn't about making fewer choices—it's about making choices where they actually matter.",
          link: "#" 
        },
      ]
    },
    {
      id: "routines",
      title: "Daily Routines & Habits",
      icon: Coffee,
      desc: "Morning routines, procrastination, environment design.",
      articles: [
        { 
          title: "Forget Motivation: Why Environment Design Works Better",
          overview: "Explore why relying on willpower is a losing battle and how redesigning your environment makes good habits inevitable and bad habits impossible.",
          tips: [
            "Remove friction for the habits you want to build (e.g., leaving a book on your pillow).",
            "Add friction to habits you want to break (e.g., keeping your phone in another room).",
            "Use visual cues in your workspace to remind yourself of priorities."
          ],
          link: "#" 
        },
        { 
          title: "The 'Good Enough' Morning Routine",
          overview: "A realistic approach to starting your day that doesn't involve waking up at 5 AM, taking an ice bath, or meditating for an hour.",
          tips: [
            "Focus on getting just 10 minutes of sunlight immediately after waking up.",
            "Hydrate before consuming caffeine to support your nervous system.",
            "Anchor your routine around one small, achievable win."
          ],
          link: "#" 
        },
        { 
          title: "Why Willpower is a Finite Resource",
          overview: "An evidence-based look at ego depletion and why relying solely on self-control throughout the day leads to collapse in the evening.",
          tips: [
            "Understand that self-regulation consumes physical energy.",
            "Don't tackle multiple major habit changes at the same time.",
            "Rely on commitment devices rather than in-the-moment discipline."
          ],
          link: "#" 
        },
      ]
    },
    {
      id: "work",
      title: "Work & Career",
      icon: Briefcase,
      desc: "Burnout, career confusion, psychological safety.",
      articles: [
        { 
          title: "How to Tell the Difference Between Burnout and 'Just a Bad Week'",
          overview: "Learn to distinguish between temporary situational stress and deeper emotional exhaustion, recognizing the subtle signs of true burnout.",
          tips: [
            "Look out for deep cynicism and a sense of detachment from your responsibilities.",
            "Notice if extended rest (like a weekend or vacation) fails to restore your energy.",
            "Evaluate if your workload mismatches your personal values."
          ],
          link: "#" 
        },
        { 
          title: "Setting Boundaries When You're Ambitious",
          overview: "A guide for high-achievers on how to protect their time and mental well-being without compromising their professional goals.",
          tips: [
            "Communicate your boundaries clearly, focusing on productivity rather than just 'needing a break'.",
            "Identify your 'glass balls' (things you can't drop) and 'plastic balls' (things that can bounce).",
            "Practice the art of the 'graceful no'."
          ],
          link: "#" 
        },
        { 
          title: "The Signs of Low Psychological Safety in Your Team",
          overview: "Understand what psychological safety actually looks like in a workplace and how to navigate an environment where it's lacking.",
          tips: [
            "Watch for environments where silence replaces debate or curiosity.",
            "Notice if failures are punished rather than treated as learning opportunities.",
            "Find micro-allies within the organization to start building a safe sub-culture."
          ],
          link: "#" 
        },
      ]
    },
    {
      id: "relationships",
      title: "Relationships & Parenting",
      icon: HeartHandshake,
      desc: "Communication, emotional coaching, screen time.",
      articles: [
        { 
          title: "Emotional Coaching vs. Emotional Dismissing",
          overview: "Delve into communication styles that validate emotions in children and partners, compared to well-meaning but dismissive patterns.",
          tips: [
            "Acknowledge the emotion before trying to solve the problem.",
            "Avoid statements that begin with 'At least...' or 'You shouldn't feel...'.",
            "Use active listening to make the other person feel truly seen."
          ],
          link: "#" 
        },
        { 
          title: "How to Have an Argument Without Ruining the Weekend",
          overview: "Practical strategies for navigating conflict with a partner in a way that is constructive, contained, and emotionally safe.",
          tips: [
            "Avoid using absolutes like 'You always' or 'You never'.",
            "Take designated 'time-outs' when physiological arousal gets too high.",
            "Focus on a single issue at a time rather than bringing up past grievances."
          ],
          link: "#" 
        },
        { 
          title: "Managing Your Own Nervous System While Parenting",
          overview: "Why your ability to emotionally regulate yourself is the most important parenting tool you have, and how to maintain it during stress.",
          tips: [
            "Recognize your own triggers and physical signs of mounting frustration.",
            "Practice 'co-regulation'—your calm helps calm the child.",
            "Give yourself permission to step away securely for a moment to breathe."
          ],
          link: "#" 
        },
      ]
    },
    {
      id: "somatic",
      title: "Sound, Breath & Body",
      icon: Waves,
      desc: "Pranayama, sleep hygiene, nervous system regulation.",
      articles: [
        { 
          title: "The 4-Second Reset for Immediate Anxiety Relief",
          overview: "A simple, discreet breathing technique based on autonomic research that you can use anywhere to signal safety to your nervous system.",
          tips: [
            "Focus on making the exhale longer than the inhale (e.g., inhale for 4, exhale for 6).",
            "Breathe low into your diaphragm rather than shallowly into your chest.",
            "Use this technique proactively before entering stressful situations."
          ],
          link: "#" 
        },
        { 
          title: "Why Talk Therapy Sometimes Needs Somatic Tools",
          overview: "Understanding why we can't always 'think' our way out of stress, and how involving the body is crucial for processing deep anxiety.",
          tips: [
            "Notice where in your body you physically feel stress or tension.",
            "Incorporate gentle movement, like walking or stretching, when feeling stuck.",
            "Explore somatic experiencing techniques to release stored survival energy."
          ],
          link: "#" 
        },
        { 
          title: "A Practical Guide to Nervous System Down-Regulation",
          overview: "Actionable ways to shift from a sympathetic 'fight or flight' state back into a parasympathetic 'rest and digest' state.",
          tips: [
            "Expose your face and eyes to cold water to trigger the mammalian dive reflex.",
            "Engage in low-stimulation activities like reading or listening to calm music.",
            "Use weighted blankets or deep pressure therapy to encourage relaxation."
          ],
          link: "#" 
        },
      ]
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-soft-sand py-12 md:py-16 lg:py-20 text-center border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
             className="text-5xl md:text-[52px] lg:text-[64px] leading-tight font-bold text-deep-teal mb-8 font-heading tracking-tight"
          >
            Practical Well-Being — Written for the Way People Actually Live
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.1 }}
             className="text-xl md:text-[24px] md:leading-[36px] text-charcoal-warm font-medium font-heading leading-relaxed max-w-3xl mx-auto"
          >
            No jargon. No generic advice. Just honest, research-informed writing to help you think clearer and live better.
          </motion.p>
        </div>
      </section>

      {/* Blog Categories Grid */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           {isLoading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <SkeletonLoader />
                <SkeletonLoader className="hidden md:flex" />
                <SkeletonLoader className="hidden lg:flex" />
             </div>
           ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogCategories.map((category, index) => (
                   <motion.div 
                     key={category.id}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.5, delay: index * 0.1 }}
                     className="bg-white rounded-[24px] p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col hover-lift h-full"
                   >
                     <div className="flex items-center mb-6">
                       <div className="w-12 h-12 bg-soft-sand rounded-xl flex items-center justify-center mr-4">
                         <category.icon className="w-6 h-6 text-terracotta" strokeWidth={1.5} />
                       </div>
                       <h2 className="text-[20px] font-semibold text-deep-teal font-heading">{category.title}</h2>
                     </div>
                     <p className="text-charcoal-warm text-[15px] mb-6 pb-6 border-b border-gray-100 flex-grow">
                       {category.desc}
                     </p>
                     <ul className="space-y-4">
                       {category.articles.map((article, i) => (
                         <li key={i} className="flex flex-col items-start w-full">
                           <span className="font-medium text-deep-teal leading-snug mb-1.5">{article.title}</span>
                           {article.overview && (
                             <p className="text-sm text-charcoal-warm line-clamp-2 mb-2 opacity-90 leading-relaxed">
                               {article.overview}
                             </p>
                           )}
                           <button 
                             onClick={() => setSelectedArticle(article)} 
                             className="group flex items-center text-left text-terracotta hover:text-amber-glow transition-colors font-medium text-[13px] uppercase tracking-wide"
                           >
                             Read More
                             <ArrowRight className="w-3.5 h-3.5 ml-1.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                           </button>
                         </li>
                       ))}
                     </ul>
                   </motion.div>
                ))}
                
                {/* Coming Soon Card */}
                <div className="bg-soft-sand rounded-[24px] p-8 border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center min-h-[300px] h-full">
                   <h2 className="text-[20px] font-semibold text-deep-teal mb-3 font-heading">More Topics Coming Soon</h2>
                   <p className="text-charcoal-warm mb-6 text-[15px]">We publish new, practical insights regularly.</p>
                   <a href="#newsletter" className="text-terracotta font-medium hover:text-amber-glow transition-colors uppercase text-sm tracking-wide">
                      Join the newsletter &rarr;
                   </a>
                </div>
             </div>
           )}
        </div>
      </section>

      {/* Newsletter Signup Area */}
      <section id="newsletter" className="py-12 md:py-16 lg:py-20 bg-soft-sand border-t border-gray-200">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
               whileHover={{ scale: 1.01 }}
               className="bg-amber-glow/15 border border-amber-glow/30 rounded-[32px] p-10 sm:p-16 text-center shadow-sm"
             >
               <h2 className="text-[36px] font-semibold text-deep-teal mb-4 font-heading">
                 Get One Useful Thing Per Week
               </h2>
               <p className="text-lg text-charcoal-warm mb-10 max-w-2xl mx-auto">
                 One short, evidence-informed piece of well-being. No filler. No sales. Unsubscribe anytime.
               </p>
               
               {isSubscribed ? (
                 <motion.div 
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-terracotta/20"
                 >
                   <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                     <BrainCircuit className="w-8 h-8 text-green-600" />
                   </div>
                   <h3 className="text-2xl font-bold text-deep-teal mb-2 font-heading">You're on the list!</h3>
                   <p className="text-charcoal-warm mb-6">
                     We'll start sending you useful insights to <strong className="text-deep-teal">{email}</strong>. 
                     If you'd like to dive deeper and connect with our community right now, join our WhatsApp channel!
                   </p>
                   <a 
                     href="https://whatsapp.com/channel/0029VbCcrrzHAdNY1M7MEF31" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium rounded-full text-white bg-[#25D366] hover:bg-[#128C7E] transition-all uppercase tracking-wide w-full sm:w-auto shadow-md hover:shadow-lg gap-2"
                   >
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                       <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                     </svg>
                     Join WhatsApp Channel
                   </a>
                 </motion.div>
               ) : (
                 <form 
                   className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3" 
                   onSubmit={(e) => {
                     e.preventDefault();
                     setIsSubscribed(true);
                   }}
                 >
                    <input 
                      type="email" 
                      placeholder="Your email address" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-grow px-6 py-4 rounded-[50px] border border-amber-glow/50 focus:border-terracotta focus:ring focus:ring-terracotta/20 bg-white text-deep-teal outline-none transition-all text-[15px]"
                    />
                    <button 
                      type="submit"
                      className="px-8 py-4 bg-terracotta text-white font-medium rounded-[50px] hover:bg-amber-glow transition-colors whitespace-nowrap shadow-sm uppercase tracking-wide text-sm"
                    >
                      Subscribe — It's Free &rarr;
                    </button>
                 </form>
               )}
               {!isSubscribed && (
                 <p className="text-[13px] text-charcoal-warm/70 mt-6">We respect your inbox. You can unsubscribe at any time.</p>
               )}
            </motion.div>
         </div>
      </section>

      {/* Article Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pb-20">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="absolute inset-0 bg-charcoal-warm/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white rounded-[24px] shadow-2xl z-10 flex flex-col"
            >
              <div className="sticky top-0 bg-white/90 backdrop-blur-md p-6 border-b border-gray-100 flex justify-between items-center z-20 rounded-t-[24px]">
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-deep-teal pr-8 leading-tight">
                  {selectedArticle.title}
                </h3>
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="absolute right-6 top-6 text-gray-400 hover:text-terracotta transition-colors bg-gray-50 rounded-full p-2"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-8 pb-12">
                <div className="mb-8">
                  <p className="text-xl text-deep-teal font-medium mb-6 leading-relaxed">
                    {selectedArticle.overview || "This is a brief overview and SEO description of this article exploring key evidence-informed strategies and thoughtful insights perfectly built for your path of finding better well-being."}
                  </p>
                  <p className="text-charcoal-warm leading-relaxed mb-6 text-lg">
                    {selectedArticle.body || "When we try to solve internal friction with external solutions, we often miss the root cause. This guide provides evidence-backed approaches to help you navigate through these challenges effectively, moving beyond temporary fixes to build lasting resilience."}
                  </p>
                </div>

                <div className="mb-10 bg-soft-sand p-8 rounded-2xl border border-amber-glow/20">
                  <h4 className="text-lg font-bold font-heading text-deep-teal mb-6 flex items-center">
                    <BrainCircuit className="w-5 h-5 mr-3 text-terracotta" />
                    Practical Tools & Strategies
                  </h4>
                  <div className="space-y-5">
                    {selectedArticle.tips ? selectedArticle.tips.map((tip: string, idx: number) => {
                      const tipParts = tip.split(':');
                      const hasTitle = tipParts.length > 1;
                      const title = hasTitle ? tipParts[0] : '';
                      const desc = hasTitle ? tipParts.slice(1).join(':') : tip;
                      
                      return (
                      <div key={idx} className="flex items-start">
                        <div className="w-2 h-2 rounded-full bg-terracotta mt-2.5 mr-4 flex-shrink-0" />
                        <p className="text-charcoal-warm leading-relaxed text-[15px]">
                          {hasTitle ? (
                            <><strong className="text-deep-teal font-semibold">{title}:</strong>{desc}</>
                          ) : (
                            tip
                          )}
                        </p>
                      </div>
                    )}) : (
                      <>
                        <div className="flex items-start">
                          <div className="w-2 h-2 rounded-full bg-terracotta mt-2.5 mr-4 flex-shrink-0" />
                          <p className="text-charcoal-warm leading-relaxed text-[15px]"><strong className="text-deep-teal font-semibold">Grounding:</strong> Practice grounding techniques by acknowledging five things you can see around you right now.</p>
                        </div>
                        <div className="flex items-start">
                          <div className="w-2 h-2 rounded-full bg-terracotta mt-2.5 mr-4 flex-shrink-0" />
                          <p className="text-charcoal-warm leading-relaxed text-[15px]"><strong className="text-deep-teal font-semibold">Action:</strong> Remember that understanding happens at the intersection of insight and action.</p>
                        </div>
                        <div className="flex items-start">
                          <div className="w-2 h-2 rounded-full bg-terracotta mt-2.5 mr-4 flex-shrink-0" />
                          <p className="text-charcoal-warm leading-relaxed text-[15px]"><strong className="text-deep-teal font-semibold">Evidence:</strong> Focus on evidence-based practical science without the jargon.</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="mb-10">
                  <h4 className="text-lg font-bold font-heading text-deep-teal mb-3">The Takeaway</h4>
                  <p className="text-charcoal-warm leading-relaxed italic text-lg">
                    {selectedArticle.conclusion || "Taking small, intentional steps with the right tools can fundamentally shift your experience. It's not about being perfect; it's about being equipped."}
                  </p>
                </div>

                <div className="mb-10 border-t border-gray-100 pt-8 flex items-center justify-between">
                  <span className="text-sm font-semibold text-deep-teal uppercase tracking-widest">Share this Insight</span>
                  <div className="flex gap-4">
                    <a 
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin + '/resources')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:text-[#1877F2] hover:bg-[#1877F2]/10 transition-colors"
                      aria-label="Share on Facebook"
                    >
                      <Facebook className="w-4 h-4" fill="currentColor" />
                    </a>
                    <a 
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(selectedArticle.title)}&url=${encodeURIComponent(window.location.origin + '/resources')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10 transition-colors"
                      aria-label="Share on Twitter"
                    >
                      <Twitter className="w-4 h-4" fill="currentColor" />
                    </a>
                    <a 
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin + '/resources')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 transition-colors"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" fill="currentColor" />
                    </a>
                    <a 
                      href="https://www.instagram.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:text-[#E1306C] hover:bg-[#E1306C]/10 transition-colors"
                      aria-label="Share on Instagram"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a 
                      href={`mailto:?subject=${encodeURIComponent(selectedArticle.title)}&body=${encodeURIComponent("Check out this insight from Being You Path:\n\n" + window.location.origin + '/resources')}`}
                      className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:text-terracotta hover:bg-terracotta/10 transition-colors"
                      aria-label="Share via Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                
                <div className="pt-10 border-t border-gray-100 flex flex-col items-center text-center">
                  <h4 className="text-2xl font-bold text-deep-teal font-heading mb-4">Ready to apply these tools to your own life?</h4>
                  <p className="text-charcoal-warm mb-8 max-w-lg text-[15px] leading-relaxed">
                    If you're looking for personalized guidance to overcome these challenges, let's talk about how we can help you build a clearer path forward.
                  </p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      to="/contact"
                      onClick={() => setSelectedArticle(null)}
                      className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium rounded-full text-white bg-terracotta hover:bg-amber-glow transition-all uppercase tracking-widest w-full sm:w-auto shadow-md hover:shadow-lg"
                    >
                      Book A Free Clarity Call &rarr;
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
