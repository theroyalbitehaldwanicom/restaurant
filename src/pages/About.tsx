import { motion } from 'motion/react';
import { ChefHat, Heart, Award, UtensilsCrossed } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: <ChefHat className="w-8 h-8" />,
      title: "Master Chefs",
      description: "Our culinary experts bring years of experience to create authentic, mouth-watering vegetarian dishes."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Passion for Quality",
      description: "We source only the freshest, premium ingredients to ensure every bite is a royal experience."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Elegant Ambience",
      description: "A meticulously designed interior that provides a luxurious setting for your special moments."
    },
    {
      icon: <UtensilsCrossed className="w-8 h-8" />,
      title: "Impeccable Service",
      description: "Our staff is trained to treat every guest like royalty, ensuring a seamless dining experience."
    }
  ];

  return (
    <div className="w-full pt-24 bg-royal-900/40 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white mb-6"
          >
            Our <span className="text-gold italic">Story</span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-24 h-1 bg-gold mx-auto"
          ></motion.div>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gold/20 translate-x-4 translate-y-4 rounded-2xl"></div>
            <img 
              src="/logo.png" 
              alt="The Royal Bite Best Restaurant in Haldwani Logo" 
              className="relative w-full h-[400px] md:h-[600px] object-contain p-8 rounded-2xl bg-royal-800/40 shadow-xl border border-royal-700"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6 text-gray-300 text-lg leading-relaxed"
          >
            <p>
              Founded by <strong className="text-gold font-serif text-xl">Surender Kumar Saini</strong> and led by <strong className="text-gold font-serif text-xl">Mr. Madan Lal Saini, Manager of The Royal Bite Best Restaurant in Haldwani</strong>, the brand stands on a strong vision of excellence, premium service, and global ambition.
            </p>
            <p>
              At The Royal Bite Best Restaurant in Haldwani, we didn’t just set out to create a restaurant — we set out to build a legacy. A brand that reflects elegance, consistency, and a global standard of excellence. From the very beginning, our vision has been clear: to transform The Royal Bite Best Restaurant in Haldwani into an international name, known for its premium quality and unforgettable dining experience.
            </p>
            <p>
              Every dish we serve is a reflection of our commitment to perfection. We believe that true luxury is not just about presentation, but about consistency, taste, and trust. That’s why we focus on delivering five-star quality food at the right price — making premium dining accessible without compromise.
            </p>
            <p>
              Our ingredients are carefully selected, our recipes are thoughtfully crafted, and our standards are uncompromising. From the freshness of every element to the finesse in every plate, quality is not just a promise — it is our identity.
            </p>
            <p>
              We don’t follow trends — we set benchmarks. Our team is driven by passion, guided by innovation, and committed to creating experiences that feel both luxurious and welcoming. Whether it’s a casual visit or a special celebration, every moment at The Royal Bite Best Restaurant in Haldwani is designed to feel premium.
            </p>
            <p>
              As we grow, our goal remains the same — to take our brand beyond boundaries, representing Indian hospitality on a global stage. Because for us, The Royal Bite Best Restaurant in Haldwani is not just a restaurant… <span className="text-gold font-bold italic">it’s a statement of class, quality, and ambition.</span>
            </p>
          </motion.div>
        </div>

        {/* Values Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">Why Choose Us</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">The pillars that make The Royal Bite Best Restaurant in Haldwani a premium dining destination.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-royal-800/60 p-8 rounded-2xl border border-royal-700 text-center hover:border-gold/50 transition-colors group"
            >
              <div className="w-16 h-16 bg-royal-700 rounded-full flex items-center justify-center mx-auto mb-6 text-gold group-hover:bg-gold group-hover:text-royal-900 transition-colors">
                {value.icon}
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-3">{value.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
