import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Gift, Utensils, Truck } from 'lucide-react';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-royal-900/80 via-royal-900/50 to-royal-900/80 z-10" />
          <img 
            src="/main-bg.jpeg" 
            alt="The Royal Bite Ambience" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
              Experience <span className="text-gold italic">Royal</span> Dining
            </h1>
            <p className="text-lg md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto font-light">
              Premium vegetarian cuisine served in an elegant ambience. Perfect for families, couples, and your special celebrations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact" 
                className="bg-gold text-royal-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gold-light transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)]"
              >
                Book Your Table Now
              </Link>
              <Link 
                to="/menu" 
                className="bg-royal-800/80 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-royal-700 transition-all border border-gold/30 hover:border-gold"
              >
                Order Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-royal-900/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-32 relative z-20">
            
            {/* Highlight 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-royal-800/90 backdrop-blur-md p-8 rounded-2xl border border-royal-700 shadow-xl group hover:border-gold/50 transition-colors"
            >
              <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mb-6 text-gold group-hover:scale-110 transition-transform">
                <Star className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white mb-3">40+ Kitty Parties</h3>
              <p className="text-gray-400 mb-6">Successfully hosted with custom decorations, games, and premium catering.</p>
              <Link to="/events" className="text-gold font-medium inline-flex items-center gap-2 hover:gap-3 transition-all">
                View Packages <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Highlight 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gold p-8 rounded-2xl border border-gold-light shadow-xl shadow-gold/20"
            >
              <div className="w-14 h-14 bg-royal-900/10 rounded-full flex items-center justify-center mb-6 text-royal-900">
                <Gift className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-royal-900 mb-3">✨ Exclusive Offer</h3>
              <p className="text-royal-900/80 mb-6 font-medium">Enjoy FLAT 20% OFF on your total bill and experience our premium five-star quality at an exceptional value.</p>
              <Link to="/contact" className="text-royal-900 font-bold inline-flex items-center gap-2 hover:gap-3 transition-all">
                Claim Offer <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Highlight 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-royal-800/90 backdrop-blur-md p-8 rounded-2xl border border-royal-700 shadow-xl group hover:border-gold/50 transition-colors"
            >
              <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mb-6 text-gold group-hover:scale-110 transition-transform">
                <Utensils className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white mb-3">Pure Veg Cuisine</h3>
              <p className="text-gray-400 mb-6">Explore our signature Hara Bhara Kebab and rich Afghani Paneer Tikka.</p>
              <Link to="/menu" className="text-gold font-medium inline-flex items-center gap-2 hover:gap-3 transition-all">
                See Full Menu <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="py-20 bg-royal-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-gold font-medium tracking-widest uppercase text-sm">About The Royal Bite</h2>
              <h3 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
                Where Culinary Art Meets Elegance
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                We believe that dining is not just about food, it is an experience. The Royal Bite was established with a singular vision: to provide the finest vegetarian delicacies in an atmosphere that makes you feel nothing short of royalty.
              </p>
              <div className="pt-4">
                <Link to="/about" className="inline-flex items-center gap-2 bg-royal-700 hover:bg-royal-900 text-white border border-royal-700 hover:border-gold px-6 py-3 rounded-full transition-all">
                  Read Our Story <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gold/20 translate-x-4 translate-y-4 rounded-2xl"></div>
              <img 
                src="/gallery-11.jpeg" 
                alt="Restaurant Interior" 
                className="relative rounded-2xl w-full h-[500px] object-cover shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Free Delivery Promise Section */}
      <section className="py-20 relative bg-royal-900 border-y border-gold/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 via-royal-900 to-royal-900 pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto text-gold border border-gold/30 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
              <Truck className="w-10 h-10" />
            </div>
            
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">
              Free Delivery Promise
              <span className="block text-gold text-2xl md:text-3xl mt-2 font-medium italic">— The Royal Bite</span>
            </h2>
            
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              At The Royal Bite, we believe a premium dining experience should come without hidden costs. We proudly offer <strong className="text-white font-bold bg-white/10 px-2 py-0.5 rounded">FREE DELIVERY on every single order</strong>.
            </p>
            
            <div className="bg-royal-800/80 backdrop-blur border border-royal-700/50 p-6 md:p-10 rounded-2xl shadow-2xl space-y-6 max-w-3xl mx-auto transform transition-all hover:border-gold/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]">
              <p className="text-gray-300 text-lg md:text-xl">
                There are <strong className="text-gold font-bold">no delivery charges, no extra fees, and no hidden costs</strong> for any guest. 
              </p>
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent my-6"></div>
              <p className="text-gray-400">
                Maintain the same pricing for dine-in and online orders. Every order must be delivered with five-star quality, proper packaging, and freshness.
              </p>
            </div>
            
            <div className="pt-6">
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-gold tracking-wider uppercase drop-shadow-md">
                “What you see is what you pay.”
              </h3>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 relative overflow-hidden bg-royal-900/60">
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Host Your Next Kitty Party With Us</h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              From exquisite decorations to fun games and special prizes for winners. We take care of everything so you can enjoy your day.
            </p>
            <Link 
              to="/events" 
              className="inline-block bg-gold text-royal-900 px-10 py-4 text-lg rounded-full font-bold shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:-translate-y-1 transition-all"
            >
              Explore Packages
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
