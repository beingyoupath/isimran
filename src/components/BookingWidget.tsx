import React, { useState } from "react";
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function BookingWidget() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Date/Time, 2: Details, 3: Confirmation

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const monthName = currentMonth.toLocaleString("default", { month: "long" });
  const year = currentMonth.getFullYear();

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
  ];

  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    // Don't allow past dates (simplified check)
    newDate.setHours(0,0,0,0);
    const today = new Date();
    today.setHours(0,0,0,0);
    
    if (newDate >= today) {
      setSelectedDate(newDate);
      setSelectedTime(null);
    }
  };

  const handleContinue = () => {
    if (selectedDate && selectedTime) setStep(2);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-[24px] border border-gray-200 overflow-hidden shadow-sm">
      <div className="flex flex-col md:flex-row">
        {/* Left Side: Summary info */}
        <div className="bg-soft-sand/50 p-8 md:w-1/3 border-b md:border-b-0 md:border-r border-gray-200">
          <h3 className="font-heading font-medium text-charcoal-warm mb-2">Simran Imran</h3>
          <h2 className="text-2xl font-semibold text-deep-teal font-heading mb-6">Free Clarity Call</h2>
          
          <div className="space-y-4 text-charcoal-warm">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-terracotta" />
              <span>30 min</span>
            </div>
            
            {step > 1 && selectedDate && selectedTime && (
              <div className="flex items-start gap-3 mt-4 pt-4 border-t border-gray-200">
                <CalendarIcon className="w-5 h-5 text-terracotta mt-0.5" />
                <span>
                  {selectedTime} <br />
                  {selectedDate.toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            )}
            
            <p className="text-sm mt-6 leading-relaxed">
              Book a no-obligation introductory call to discuss your needs, ask questions, and explore if we're the right fit for each other.
            </p>
          </div>
        </div>

        {/* Right Side: Interactive Selection */}
        <div className="p-8 md:w-2/3">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col lg:flex-row gap-8"
              >
                {/* Calendar */}
                <div className="flex-1">
                  <h3 className="font-semibold text-deep-teal mb-6 text-lg">Select a Date & Time</h3>
                  <div className="flex items-center justify-between mb-4">
                    <button onClick={handlePrevMonth} className="p-2 hover:bg-soft-sand rounded-full transition-colors text-deep-teal">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="font-medium text-deep-teal">{monthName} {year}</span>
                    <button onClick={handleNextMonth} className="p-2 hover:bg-soft-sand rounded-full transition-colors text-deep-teal">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="text-center text-xs font-semibold text-gray-400 py-2">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: firstDay }).map((_, i) => (
                      <div key={`empty-${i}`} className="p-2"></div>
                    ))}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const day = i + 1;
                      const checkDate = new Date(year, currentMonth.getMonth(), day);
                      checkDate.setHours(0,0,0,0);
                      const today = new Date();
                      today.setHours(0,0,0,0);
                      
                      const isPast = checkDate < today;
                      const isWeekend = checkDate.getDay() === 0 || checkDate.getDay() === 6;
                      const isSelected = selectedDate?.getDate() === day && selectedDate?.getMonth() === currentMonth.getMonth();
                      
                      return (
                        <button
                          key={day}
                          onClick={() => !isPast && !isWeekend && handleDateSelect(day)}
                          disabled={isPast || isWeekend}
                          className={`
                            aspect-square flex items-center justify-center rounded-full text-sm font-medium transition-all
                            ${isPast || isWeekend ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-soft-sand cursor-pointer text-charcoal-warm'}
                            ${isSelected ? 'bg-terracotta text-white hover:bg-terracotta' : ''}
                          `}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slots */}
                {selectedDate && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="lg:w-[200px] flex flex-col pt-12 lg:pt-0"
                  >
                    <div className="text-sm font-medium text-deep-teal mb-4 text-center lg:text-left">
                      {selectedDate.toLocaleDateString('default', { weekday: 'long', month: 'short', day: 'numeric' })}
                    </div>
                    <div className="flex-1 overflow-y-auto pr-2 space-y-2 max-h-[300px]">
                      {timeSlots.map(time => (
                        <div key={time} className="flex gap-2">
                          <button
                            onClick={() => setSelectedTime(time)}
                            className={`
                              flex-1 py-3 px-4 rounded-[8px] border transition-all text-sm font-medium text-center
                              ${selectedTime === time 
                                ? 'border-deep-teal bg-deep-teal text-white' 
                                : 'border-gray-200 text-deep-teal hover:border-deep-teal'}
                            `}
                          >
                            {time}
                          </button>
                          {selectedTime === time && (
                            <motion.button
                              initial={{ opacity: 0, width: 0 }}
                              animate={{ opacity: 1, width: 'auto' }}
                              onClick={handleContinue}
                              className="bg-terracotta text-white px-4 rounded-[8px] text-sm font-medium hover:bg-amber-glow transition-colors"
                            >
                              Next
                            </motion.button>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <button 
                    onClick={() => setStep(1)}
                    className="p-2 rounded-full hover:bg-soft-sand transition-colors border border-gray-200"
                  >
                    <ChevronLeft className="w-5 h-5 text-deep-teal" />
                  </button>
                  <h3 className="font-semibold text-deep-teal text-lg">Enter Details</h3>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-deep-teal mb-1">Name *</label>
                    <input required type="text" className="w-full px-4 py-3 rounded-[12px] border border-gray-300 focus:border-terracotta focus:ring focus:ring-terracotta/20 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-deep-teal mb-1">Email *</label>
                    <input required type="email" className="w-full px-4 py-3 rounded-[12px] border border-gray-300 focus:border-terracotta focus:ring focus:ring-terracotta/20 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-deep-teal mb-1">Phone Number (Optional)</label>
                    <input type="tel" className="w-full px-4 py-3 rounded-[12px] border border-gray-300 focus:border-terracotta focus:ring focus:ring-terracotta/20 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-deep-teal mb-1">Anything else we should know?</label>
                    <textarea rows={3} className="w-full px-4 py-3 rounded-[12px] border border-gray-300 focus:border-terracotta focus:ring focus:ring-terracotta/20 outline-none transition-all"></textarea>
                  </div>
                  <div className="pt-4">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className={`px-8 py-3 bg-terracotta text-white font-medium rounded-[50px] transition-colors uppercase text-sm tracking-wide ${isSubmitting ? 'animate-shimmer opacity-80 cursor-not-allowed' : 'hover:bg-amber-glow hover-lift'}`}
                    >
                      {isSubmitting ? 'Scheduling...' : 'Schedule Event'}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-semibold text-deep-teal font-heading mb-2">You're scheduled</h3>
                <p className="text-charcoal-warm">
                  A calendar invitation has been sent to your email address.
                </p>
                <button 
                  onClick={() => { setStep(1); setSelectedDate(null); setSelectedTime(null); }}
                  className="mt-8 px-6 py-2 border border-gray-300 rounded-[50px] text-charcoal-warm font-medium hover:bg-soft-sand transition-colors"
                >
                  Book another session
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
