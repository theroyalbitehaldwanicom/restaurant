import { motion } from 'motion/react';
import { PartyPopper, Music, Gift, Cake, Sparkles, PhoneCall } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Events() {
  const packages = [
    {
      name: "Classic Kitty",
      price: "₹499/person",
      features: [
        "Welcome Drink (1 type)",
        "2 Starters (1 Paneer, 1 Veg)",
        "Main Course (2 Veg, 1 Dal)",
        "Breads & Rice",
        "1 Dessert",
        "Reserved Party Area (3 hours)"
      ]
    },
    {
      name: "Royal Celebration",
      price: "₹799/person",
      popular: true,
      features: [
        "Welcome Drink (2 types)",
        "3 Starters (1 Paneer, 2 Veg)",
        "Main Course (3 Veg, 1 Dal)",
        "Assorted Breads & Biryani",
        "2 Desserts (1 Hot, 1 Cold)",
        "Custom Table Decor & Games",
        "Special Gift for Winner"
      ]
    },
    {
      name: "Premium Banquet",
      price: "Custom",
      features: [
        "For 30+ Guests",
        "Extensive Buffet Menu",
        "Private Hall Booking",
        "Custom Theme Decoration",
        "Live Mocktail Counter",
        "Entertainment & Host",
        "Surprise Gifts"
      ]
    }
  ];

  return (
    <div className="w-full pt-24 bg-royal-900/40 pb-20">
      
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 mb-20 text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="inline-flex items-center gap-2 bg-royal-800 border border-gold/30 px-4 py-2 rounded-full text-gold text-sm font-medium mb-6"
        >
          <PartyPopper className="w-4 h-4" />
          <span>40+ Successful Parties Hosted</span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-serif font-bold text-white mb-6"
        >
          Unforgettable <span className="text-gold italic">Events & Parties</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto"
        >
          Whether it's a vibrant ladies kitty party, a milestone birthday, or an intimate gathering, we provide the perfect venue, extraordinary food, and flawless execution.
        </motion.p>
      </section>

      {/* Feature Grid */}
      <section className="bg-royal-800 py-20 border-y border-royal-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-royal-900 rounded-2xl border border-royal-700">
              <Gift className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Gifts for Winners</h3>
              <p className="text-sm text-gray-400">Exciting prizes for kitty party game winners.</p>
            </div>
            <div className="text-center p-6 bg-royal-900 rounded-2xl border border-royal-700">
              <Music className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Fun Games</h3>
              <p className="text-sm text-gray-400">Engaging activities organized by our staff.</p>
            </div>
            <div className="text-center p-6 bg-royal-900 rounded-2xl border border-royal-700">
              <Sparkles className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Custom Decor</h3>
              <p className="text-sm text-gray-400">Thematic table and room decorations.</p>
            </div>
            <div className="text-center p-6 bg-royal-900 rounded-2xl border border-royal-700">
              <Cake className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Celebration Cakes</h3>
              <p className="text-sm text-gray-400">Customized cakes available on pre-order.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">Event Packages</h2>
          <p className="text-gold font-medium">✨ Ask about our 20% OFF introductory group offer! ✨</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative bg-royal-800 rounded-2xl border flex flex-col ${
                pkg.popular 
                ? 'border-gold shadow-[0_0_30px_rgba(212,175,55,0.15)] md:-translate-y-4' 
                : 'border-royal-700'
              } p-8`}
            >
              {pkg.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold text-royal-900 font-bold px-4 py-1 rounded-full text-sm">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-serif font-bold text-white mb-2">{pkg.name}</h3>
              <div className="mb-6">
                <span className="text-3xl font-bold text-gold">{pkg.price}</span>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                {pkg.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3 text-gray-300">
                    <Sparkles className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link 
                to="/contact"
                className={`w-full py-3 rounded-xl font-bold text-center transition-colors ${
                  pkg.popular 
                  ? 'bg-gold text-royal-900 hover:bg-gold-light' 
                  : 'bg-royal-700 text-white hover:bg-royal-600'
                }`}
              >
                Enquire Now
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 mt-24 text-center bg-gold rounded-3xl p-10 md:p-16">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-royal-900 mb-4">Planning a large event?</h2>
        <p className="text-royal-900/80 mb-8 text-lg font-medium">Let us help you organize everything from the menu to the execution.</p>
        <a href="tel:+916398698275" className="inline-flex items-center gap-3 bg-royal-900 text-white px-8 py-4 rounded-full font-bold hover:bg-royal-800 transition-colors">
          <PhoneCall className="w-5 h-5" /> Call Event Manager
        </a>
      </section>

    </div>
  );
}
