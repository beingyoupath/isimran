import { Phone, Mail, MapPin, ShieldCheck, UserCheck, Clock, CheckCircle2, Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import React, { useState, useEffect } from "react";
import { SEO } from "../components/SEO";
import { GOOGLE_REVIEWS } from "../data/testimonials";
import { saveInquiry } from "../lib/inquiries";

export default function Contact() {
  const [showToast, setShowToast] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const heroSlides = [
    {
      title: "Let's Start With a Conversation",
      subtitle: "Your free clarity call.",
      desc: "No commitment, no pressure, no clinical intake forms. Just a 15-minute chat to understand your context and see if we're the right fit for your journey.",
      image: "https://images.unsplash.com/photo-1543269664-7eef42226a21?q=80&w=2940&auto=format&fit=crop"
    },
    {
      title: "Here to Listen, Ready to Guide",
      subtitle: "Professional support in Pune and online.",
      desc: "Whether you prefer face-to-face interactions or the comfort of your own space, we offer flexible session formats designed to fit seamlessly into your life.",
      image: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?q=80&w=2938&auto=format&fit=crop"
    },
    {
      title: "Reach Out Today",
      subtitle: "Taking the first step is often the hardest part.",
      desc: "But it doesn't have to be complicated. Drop us a message on WhatsApp, send an email, or book a call directly. We make the process simple and human.",
      image: "https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=2942&auto=format&fit=crop"
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

  const testimonials = GOOGLE_REVIEWS;

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

    const email = contact.includes('@') ? contact : `${name.toLowerCase().replace(/[^a-z0-9]/g, '') || 'client'}@beingyoupath.client`;
    const whatsapp = !contact.includes('@') ? contact : '';

    // Asynchronously persist inquiry in Firestore
    saveInquiry({
      name,
      email,
      whatsapp,
      question: `[Source: Contact Page | Heard via: ${heardAbout}] ${messageText}`
    }).catch(err => console.error("Could not record inquiry in database:", err));

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

    const email = contact.includes('@') ? contact : `${name.toLowerCase().replace(/[^a-z0-9]/g, '') || 'client'}@beingyoupath.client`;
    const whatsapp = !contact.includes('@') ? contact : '';

    // Asynchronously persist inquiry in Firestore
    saveInquiry({
      name,
      email,
      whatsapp,
      question: `[Source: Contact Page via WhatsApp | Heard via: ${heardAbout}] ${messageText}`
    }).catch(err => console.error("Could not record inquiry in database:", err));

    const body = `New Clarity Request:%0A%0AName: ${name}%0AContact: ${contact}%0AHeard About: ${heardAbout}%0AMessage: ${messageText}`;
    const waUrl = `https://wa.me/917387779238?text=${body}`;
    const link = document.createElement('a');
    link.href = waUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="bg-white">
      <SEO 
        page="contact"
        title="Contact & Book Consultation | Best Counselor & Psychologist in Pune"
        description="Book your in-person counselling session in Pune (near Koregaon Park, Baner, Kothrud, Hinjewadi) or confidential online therapy across India. Call +91 7387772573 or chat on WhatsApp with Pune's trusted psychologists."
      />
      <h1 className="sr-only">Contact Being You Path - Ranked Best Counselor & #1 Psychologist in Pune & Top 5 in India | Book Therapy & Consultation</h1>
      <p className="sr-only">Connect with Being You Path, recognized as the best counselling centre, top psychologist, and trusted normal psychologist talk therapy practice in Pune, Maharashtra. Schedule your in-person therapy session in Pune or confidential online consultation across India today.</p>
      
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
                <h3 className="text-[20px] font-semibold text-deep-teal mb-2 font-heading">In Person (Pune Clinic)</h3>
                <p className="text-charcoal-warm text-[15px] mb-1 font-medium">Deccan Gymkhana & Koregaon Park Access</p>
                <p className="text-charcoal-warm/70 text-[13px] mb-2">Private sessions by appointment only.</p>
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

      {/* Verified Google Reviews Showcase */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-soft-sand/60 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-xs mb-3">
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
            <h2 className="text-3xl md:text-[36px] font-bold text-deep-teal mb-3 font-heading">
              Real Voices. Verified Google Reviews.
            </h2>
            <p className="text-base text-charcoal-warm max-w-2xl mx-auto">
              Read authentic experiences from 10 verified reviewers who reached out for stress relief, self-esteem therapy, career clarity, and psychological care at Being You Path.
            </p>
          </div>

          <div className="relative bg-white p-8 md:p-12 rounded-[28px] border border-gray-200/80 shadow-md">
            <Quote className="absolute top-6 left-6 w-12 h-12 text-terracotta/15 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col justify-between min-h-[300px] md:min-h-[250px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="w-full"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-gray-100">
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

                  {testimonials[currentTestimonial].highlight && (
                    <div className="text-xs font-bold uppercase tracking-wider text-terracotta mb-3">
                      {testimonials[currentTestimonial].highlight}
                    </div>
                  )}

                  <p className="text-charcoal-warm leading-relaxed mb-8 text-[15px] md:text-[17px] font-normal whitespace-pre-line">
                    "{testimonials[currentTestimonial].quote}"
                  </p>

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

                    <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
                      {currentTestimonial + 1} of {testimonials.length}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

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
    </div>
  );
}
