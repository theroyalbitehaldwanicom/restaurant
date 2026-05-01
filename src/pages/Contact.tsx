import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="w-full pt-24 bg-royal-900/40 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white mb-6"
          >
            Contact & <span className="text-gold italic">Bookings</span>
          </motion.h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Reserve your table for an unforgettable dining experience. 
            For large groups or kitty parties, please contact us directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Info Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="bg-royal-800 p-8 rounded-2xl border border-royal-700">
              <h3 className="text-2xl font-serif font-bold text-white mb-8">Reach Us</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Our Location</h4>
                    <p className="text-gray-400 text-sm">Thandi Sadak, Subhash Nagar, Bhotia Parao<br/>Haldwani, Uttarakhand 263139, India</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Phone Number</h4>
                    <p className="text-gray-400 text-sm"><a href="tel:+916398698275" className="hover:text-gold transition-colors">+91 63986 98275</a></p>
                    <p className="text-gray-400 text-sm mt-1">Accepting reservations and WhatsApp queries.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Email</h4>
                    <p className="text-gray-400 text-sm"><a href="mailto:theroyalbitehaldwani@gmail.com" className="hover:text-gold transition-colors">theroyalbitehaldwani@gmail.com</a></p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gold p-8 rounded-2xl">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-royal-900/10 rounded-full flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-royal-900" />
                </div>
                <div>
                  <h4 className="font-bold text-royal-900 mb-2">Opening Hours</h4>
                  <ul className="space-y-2 text-royal-900/80 font-medium">
                    <li className="flex justify-between w-48"><span>Mon - Fri:</span> <span>11:00 AM - 11:00 PM</span></li>
                    <li className="flex justify-between w-48"><span>Saturday:</span> <span>11:00 AM - 11:00 PM</span></li>
                    <li className="flex justify-between w-48"><span>Sunday:</span> <span>11:00 AM - 11:00 PM</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-royal-800 p-8 md:p-10 rounded-2xl border border-royal-700">
              <h3 className="text-2xl font-serif font-bold text-white mb-6">Book a Table</h3>
              
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send className="w-10 h-10 text-green-500" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">Request Received!</h4>
                  <p className="text-gray-400">We will confirm your reservation shortly via phone/WhatsApp.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-gold hover:text-gold-light transition-colors"
                  >
                    Make another booking
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                      <input required type="text" className="w-full bg-royal-900 border border-royal-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-gold transition-colors" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
                      <input required type="tel" className="w-full bg-royal-900 border border-royal-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-gold transition-colors" placeholder="+91 XXXXX XXXXX" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Date</label>
                      <input required type="date" className="w-full bg-royal-900 border border-royal-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-gold text-white [color-scheme:dark] transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Guests</label>
                      <input 
                        required 
                        type="number" 
                        min="1"
                        placeholder="Enter number of guests" 
                        className="w-full bg-royal-900 border border-royal-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-gold transition-colors" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Special Requests (Optional)</label>
                    <textarea rows={4} className="w-full bg-royal-900 border border-royal-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-gold transition-colors resize-none" placeholder="Any special dietary requirements or celebration details?"></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gold text-royal-900 font-bold text-lg rounded-lg px-4 py-4 hover:bg-gold-light transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="w-6 h-6 border-4 border-royal-900/30 border-t-royal-900 rounded-full animate-spin"></span>
                    ) : (
                      "Confirm Reservation"
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
