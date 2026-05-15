import { Phone, Mail, MapPin, ShieldCheck, UserCheck, Clock, CheckCircle2, Quote } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import React, { useState, useEffect } from "react";

export default function Contact() {
  const [showToast, setShowToast] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "I thought I was just unmotivated, but I was fundamentally burned out. The counselling sessions didn't just give me a new perspective; they rewired how I approach my life and boundaries.",
      author: "Priya S.",
      role: "Marketing Director",
    },
    {
      quote: "The 'Mindful Leadership' workshop transformed how our management team communicates. It wasn't just another offsite; we walked away with practical tools for emotional regulation that we use daily.",
      author: "Sarah K.",
      role: "HR Head",
    },
    {
      quote: "As a student facing intense exam stress, the actionable habit science and emotional regulation tools changed everything. I stopped fighting my brain and learned how to work with it.",
      author: "Ananya T.",
      role: "University Student",
    },
    {
      quote: "Our team's productivity and morale have visibly shifted since the well-being retainer program started. The approach is deeply human and incredibly effective.",
      author: "Amit D.",
      role: "Founder & CEO",
    },
    {
      quote: "I've been to several therapists before, but the blend of CBT and somatic awareness here finally helped me break free from my chronic anxiety loop. The change has been profound.",
      author: "Neha V.",
      role: "Freelance Designer",
    },
    {
      quote: "The mindfulness practices weren't spiritual fluff. They were practical nervous system anchors I could use in the middle of a high-pressure meeting. It's rare to find professionals who understand corporate anxiety so deeply.",
      author: "Rahul M.",
      role: "Software Engineer",
    },
    {
      quote: "The student resilience workshop was exactly what our seniors needed before their finals. The facilitators knew how to speak their language and offered genuine support.",
      author: "Dr. Meera J.",
      role: "School Principal",
    },
    {
      quote: "My career was stuck because of imposter syndrome. Through our 1-on-1 coaching sessions, I didn't just 'talk' about it; I learned actionable ways to rewire those limiting beliefs.",
      author: "Jason L.",
      role: "Product Manager",
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const handleSubmitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const form = (e.target as HTMLElement).closest('form') as HTMLFormElement;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const contact = (form.elements.namedItem('contact') as HTMLInputElement).value;
    const heardAbout = (form.elements.namedItem('heard_about') as HTMLSelectElement).value;
    const messageText = (form.elements.namedItem('message') as HTMLTextAreaElement).value;

    const body = `Name: ${name}%0AContact: ${contact}%0AHeard About: ${heardAbout}%0AMessage: ${messageText}`;
    window.location.href = `mailto:beingyoupath@gmail.com?subject=New Clarity Request from ${name}&body=${body}`;
    
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSubmitWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const form = (e.target as HTMLElement).closest('form') as HTMLFormElement;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const contact = (form.elements.namedItem('contact') as HTMLInputElement).value;
    const heardAbout = (form.elements.namedItem('heard_about') as HTMLSelectElement).value;
    const messageText = (form.elements.namedItem('message') as HTMLTextAreaElement).value;

    const body = `New Clarity Request:%0A%0AName: ${name}%0AContact: ${contact}%0AHeard About: ${heardAbout}%0AMessage: ${messageText}`;
    window.open(`https://wa.me/917387779238?text=${body}`, '_blank');
    
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="bg-white">
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ ease: [0.25, 0.46, 0.45, 0.94], duration: 0.4 }}
            className="fixed top-24 right-4 z-50 bg-deep-teal text-white px-6 py-4 rounded-[12px] shadow-xl flex items-center gap-3 toast-slide-in"
          >
            <CheckCircle2 className="w-5 h-5 text-sage-green" />
            <span className="font-medium">Message sent successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section className="bg-soft-sand py-12 md:py-16 lg:py-20 text-center border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
             className="text-5xl md:text-[52px] lg:text-[64px] leading-tight font-bold text-deep-teal mb-8 font-heading tracking-tight"
          >
            Let's Start With a Conversation
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.1 }}
             className="text-xl md:text-[24px] md:leading-[36px] text-charcoal-warm font-medium font-heading leading-relaxed max-w-3xl mx-auto"
          >
            Your free 15-minute clarity call — no commitment, no pressure, no clinical intake forms. Just a chat to see if we're the right fit.
          </motion.p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Contact Options Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12 lg:mb-20 max-w-5xl mx-auto">
             <a href="tel:+917387772573" className="group bg-soft-sand p-8 rounded-[24px] border border-gray-200 hover-lift text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm icon-scale">
                  <Phone className="w-8 h-8 text-terracotta" strokeWidth={1.5} />
                </div>
                <h3 className="text-[20px] font-semibold text-deep-teal mb-2 font-heading">WhatsApp / Call</h3>
                <p className="text-charcoal-warm mb-1 text-[15px]">+91 7387772573 / 7387779238</p>
                <p className="text-[13px] text-sage-green mt-2 font-medium uppercase tracking-wide">Mon to Sunday 10am to 9pm</p>
             </a>

             <a href="mailto:hello@beingyoupath.com" className="group bg-soft-sand p-8 rounded-[24px] border border-gray-200 hover-lift text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm icon-scale">
                  <Mail className="w-8 h-8 text-terracotta" strokeWidth={1.5} />
                </div>
                <h3 className="text-[20px] font-semibold text-deep-teal mb-2 font-heading">Email</h3>
                <div className="space-y-1 my-2">
                  <p className="text-charcoal-warm text-[15px]">hello@beingyoupath.com</p>
                  <p className="text-charcoal-warm text-[15px]">beingyoupath@gmail.com</p>
                  <p className="text-charcoal-warm text-[15px]">info@beingyoupath.com</p>
                </div>
                <p className="text-[13px] text-sage-green mt-3 font-medium uppercase tracking-wide">Replies within 24 hours</p>
             </a>

             <div className="group bg-soft-sand p-8 rounded-[24px] border border-gray-200 transition-all text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm icon-scale">
                  <MapPin className="w-8 h-8 text-terracotta" strokeWidth={1.5} />
                </div>
                <h3 className="text-[20px] font-semibold text-deep-teal mb-2 font-heading">In Person</h3>
                <p className="text-charcoal-warm text-[15px] mb-2">Visit our office by appointment only.</p>
                <div className="flex flex-col gap-2 mt-2">
                  <a 
                     href="https://share.google/bQZJdmxPTbKo8iwKM" 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="text-terracotta hover:text-amber-glow font-medium text-[15px] underline transition-colors"
                  >
                     Visit our Google Business Profile
                  </a>
                  <a 
                     href="https://www.google.com/maps/dir//Being+You+Path,+119%2F17,+Dr.+Sripati+Shastri+Path,+Near,+Prabhat+Rd,+Deccan+Gymkhana,+Pune,+Maharashtra+411004/@18.5201048,73.8771897,15z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x3bc2bf009a76793f:0xe544b78e3d109854!2m2!1d73.8309474!2d18.5142273?entry=ttu&g_ep=EgoyMDI2MDUxMC4wIKXMDSoASAFQAw%3D%3D" 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="text-terracotta hover:text-amber-glow font-medium text-[14px] transition-colors"
                  >
                     Get directions
                  </a>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-16 md:py-20 lg:py-24 bg-soft-sand border-y border-gray-200 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-[36px] font-semibold text-deep-teal mb-4 font-heading">Real Shifts. Real Lives.</h2>
            <p className="text-base text-charcoal-warm max-w-2xl mx-auto">Discover how our psychology-grounded approach translates to everyday clarity and resilience.</p>
          </div>
          
          <div className="relative min-h-[300px] md:min-h-[250px] bg-white p-8 md:p-12 rounded-[24px] border border-gray-200 shadow-sm">
            <Quote className="absolute top-8 left-8 w-10 h-10 text-terracotta/20" />
            <div className="relative z-10 flex flex-col items-center justify-center text-center h-full pt-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="w-full"
                >
                  <p className="text-charcoal-warm leading-relaxed mb-8 italic text-[16px] md:text-[18px]">
                    "{testimonials[currentTestimonial].quote}"
                  </p>
                  <div>
                    <h4 className="text-deep-teal font-heading font-semibold text-lg">
                      {testimonials[currentTestimonial].author}
                    </h4>
                    <span className="text-sm text-terracotta font-medium tracking-wide">
                      {testimonials[currentTestimonial].role}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Dots */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentTestimonial === idx ? "bg-terracotta w-6" : "bg-gray-200 hover:bg-terracotta/50 w-2"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10 items-start max-w-6xl mx-auto">
            
            {/* Low Friction Form */}
            <div className="lg:w-3/5 w-full">
              <div className="bg-soft-sand rounded-[32px] p-8 sm:p-12 border border-gray-200 shadow-sm">
                <h2 className="text-[30px] font-semibold text-deep-teal mb-2 font-heading">Send a Message</h2>
                <p className="text-charcoal-warm mb-8">Can't find a time that works for you? Drop us a message.</p>
                <form className="space-y-6">
                   <div>
                     <label htmlFor="name" className="block text-[15px] font-semibold text-deep-teal mb-2">Name</label>
                     <input type="text" id="name" className="w-full px-5 py-4 rounded-[12px] border border-gray-300 focus:border-terracotta focus:ring focus:ring-terracotta/20 bg-white transition-all outline-none text-[15px]" placeholder="What should we call you?" />
                   </div>
                   
                   <div>
                     <label htmlFor="contact" className="block text-[15px] font-semibold text-deep-teal mb-2">Email or WhatsApp Number</label>
                     <input type="text" id="contact" className="w-full px-5 py-4 rounded-[12px] border border-gray-300 focus:border-terracotta focus:ring focus:ring-terracotta/20 bg-white transition-all outline-none text-[15px]" placeholder="How should we reach you?" />
                   </div>

                   <div>
                     <label htmlFor="heard_about" className="block text-[15px] font-semibold text-deep-teal mb-2">How did you hear about us?</label>
                     <select id="heard_about" defaultValue="" className="w-full px-5 py-4 rounded-[12px] border border-gray-300 focus:border-terracotta focus:ring focus:ring-terracotta/20 bg-white transition-all outline-none appearance-none text-charcoal-warm text-[15px]">
                        <option value="" disabled>Please select one</option>
                        <option value="friend">Referred by friend/colleague</option>
                        <option value="instagram">Instagram</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="google">Google Search</option>
                        <option value="other">Other</option>
                     </select>
                   </div>

                   <div>
                     <label htmlFor="message" className="block text-[15px] font-semibold text-deep-teal mb-2">What's going on for you right now? (Optional)</label>
                     <textarea id="message" rows={4} className="w-full px-5 py-4 rounded-[12px] border border-gray-300 focus:border-terracotta focus:ring focus:ring-terracotta/20 bg-white transition-all outline-none resize-none text-[15px]" placeholder="A brief sentence or two is completely fine."></textarea>
                   </div>

                   <div className="flex flex-col sm:flex-row gap-4 mt-8">
                     <button type="button" onClick={handleSubmitEmail} className="flex-1 bg-terracotta text-white font-medium text-[15px] py-4 rounded-[50px] hover:bg-amber-glow transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 uppercase tracking-wide flex justify-center items-center gap-2">
                        <Mail className="w-5 h-5" />
                        Send via Email
                     </button>
                     <button type="button" onClick={handleSubmitWhatsApp} className="flex-1 bg-[#25D366] text-white font-medium text-[15px] py-4 rounded-[50px] hover:bg-[#1DA851] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 uppercase tracking-wide flex justify-center items-center gap-2">
                        <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-5 h-5"><path d="M12.031 0C5.398 0 .016 5.378.016 12.015c0 2.128.553 4.202 1.602 6.03L0 24l6.113-1.604a11.967 11.967 0 005.918 1.564h.005c6.634 0 12.014-5.38 12.014-12.017C24.05 5.378 18.665 0 12.031 0zm0 21.964c-1.802 0-3.567-.485-5.11-1.401l-.367-.217-3.794.996 1.015-3.698-.238-.378a9.98 9.98 0 01-1.521-5.263c0-5.518 4.492-10.013 10.015-10.013 5.517 0 10.014 4.495 10.014 10.013 0 5.517-4.497 10.013-10.014 10.013zm5.494-7.514c-.301-.151-1.782-.879-2.059-.979-.276-.1-.478-.152-.678.151-.2.302-.779.979-.955 1.18-.175.201-.351.226-.652.076-.301-.151-1.272-.469-2.424-1.496-.897-.798-1.503-1.784-1.678-2.086-.176-.302-.019-.465.132-.615.136-.135.301-.351.452-.526.151-.176.201-.301.301-.502.1-.2.051-.377-.025-.527-.076-.151-.678-1.633-.929-2.235-.245-.589-.494-.509-.678-.518-.175-.008-.376-.011-.577-.011-.2 0-.527.075-.802.376-.276.301-1.054 1.029-1.054 2.508s1.079 2.909 1.23 3.11c.151.2 2.122 3.238 5.14 4.542.718.31 1.28.495 1.717.635.72.228 1.376.195 1.894.118.579-.085 1.782-.728 2.033-1.431.251-.703.251-1.306.176-1.432-.075-.125-.276-.2-.577-.35z"/></svg>
                        Send via WhatsApp
                     </button>
                   </div>
                   <p className="text-center text-[13px] text-charcoal-warm mt-4">We'll reply within 24 hours.</p>
                </form>

                {/* Trust Badges under form */}
                <div className="grid grid-cols-2 gap-y-6 mt-12 pt-10 border-t border-gray-300/50">
                  <div className="flex items-center text-[14px] text-charcoal-warm font-medium">
                    <Clock className="w-5 h-5 text-terracotta mr-3" strokeWidth={1.5} /> Free 15-min call
                  </div>
                  <div className="flex items-center text-[14px] text-charcoal-warm font-medium">
                    <ShieldCheck className="w-5 h-5 text-terracotta mr-3" strokeWidth={1.5} /> Private & confidential
                  </div>
                  <div className="flex items-center text-[14px] text-charcoal-warm font-medium">
                    <UserCheck className="w-5 h-5 text-terracotta mr-3" strokeWidth={1.5} /> Qualified practitioners
                  </div>
                  <div className="flex items-center text-[14px] text-charcoal-warm font-medium">
                    <CheckCircle2 className="w-5 h-5 text-terracotta mr-3 flex-shrink-0" strokeWidth={1.5} /> Honest if not the right fit
                  </div>
                </div>
              </div>
            </div>

            {/* Micro Moment / Info Sidebar */}
            <div className="lg:w-2/5 w-full flex flex-col gap-8">
               <motion.div 
                 whileHover={{ scale: 1.02 }}
                 className="bg-amber-glow/15 border border-amber-glow/20 rounded-[32px] p-10 relative overflow-hidden"
               >
                 <h3 className="text-[20px] font-semibold text-deep-teal mb-6 font-heading relative z-10">
                   Before You Reach Out
                 </h3>
                 <p className="text-charcoal-warm mb-6 relative z-10 text-[15px] leading-relaxed">
                   A quick check-in: Notice your jaw. Are your teeth clenched? Take a tiny breath in, and let your jaw drop open slightly. 
                 </p>
                 <p className="text-charcoal-warm relative z-10 text-[15px] leading-relaxed">
                   Reaching out is often the hardest part. You've already done the work of deciding to seek support. We'll take it from here.
                 </p>
               </motion.div>

               <div className="bg-white rounded-[32px] p-10 border border-gray-200">
                 <h3 className="text-[20px] font-semibold text-deep-teal mb-8 font-heading">What happens next?</h3>
                 <ol className="space-y-8">
                   <li className="flex items-start">
                     <span className="w-10 h-10 rounded-full bg-soft-sand text-terracotta font-heading font-bold flex items-center justify-center mr-5 flex-shrink-0">1</span>
                     <div>
                       <h4 className="font-semibold text-deep-teal text-[16px] mb-1">You reach out</h4>
                       <p className="text-[14px] text-charcoal-warm">Via the form, WhatsApp, or email.</p>
                     </div>
                   </li>
                   <li className="flex items-start">
                     <span className="w-10 h-10 rounded-full bg-soft-sand text-terracotta font-heading font-bold flex items-center justify-center mr-5 flex-shrink-0">2</span>
                     <div>
                       <h4 className="font-semibold text-deep-teal text-[16px] mb-1">We schedule a quick call</h4>
                       <p className="text-[14px] text-charcoal-warm">A 15-minute chat to understand your needs and explain our approach.</p>
                     </div>
                   </li>
                   <li className="flex items-start">
                     <span className="w-10 h-10 rounded-full bg-soft-sand text-terracotta font-heading font-bold flex items-center justify-center mr-5 flex-shrink-0">3</span>
                     <div>
                       <h4 className="font-semibold text-deep-teal text-[16px] mb-1">Decide together</h4>
                       <p className="text-[14px] text-charcoal-warm">If we're not the right fit, we will tell you and try to refer you to someone who is.</p>
                     </div>
                   </li>
                   <li className="flex items-start">
                     <span className="w-10 h-10 rounded-full bg-soft-sand text-terracotta font-heading font-bold flex items-center justify-center mr-5 flex-shrink-0">4</span>
                     <div>
                       <h4 className="font-semibold text-deep-teal text-[16px] mb-1 uppercase">APPOINTMENT BOOKING AS PER NEXT AVAILABLE SCHEDULE</h4>
                       <p className="text-[14px] text-charcoal-warm">If we are a fit for you, we will book an appointment as per our next available schedule.</p>
                     </div>
                   </li>
                 </ol>
               </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
