import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: "Sonali Verma",
    role: "5 reviews • 3 photos",
    rating: 5,
    text: "An excellent experience! Price per person: ₹800–1,000.",
    date: "1 week ago"
  },
  {
    name: "Neelam Bhatt",
    role: "1 review • 0 photos",
    rating: 5,
    text: "It is th🤗🤗🤗e best plat form no delivery charge are taken",
    date: "2 weeks ago"
  },
  {
    name: "Limeka Chophy",
    role: "1 review • 0 photos",
    rating: 5,
    text: "Dine in · ₹1,000–1,200\nThe food was so delicious Amazing ambiance staff was really good thank you so much for the good service 🥰🥰🥰",
    date: "2 weeks ago"
  },
  {
    name: "Himani Singh",
    role: "5 reviews • 0 photos",
    rating: 5,
    text: "Loved the place , the food was great , nice service\nFood: 5/5 | Service: 5/5 | Atmosphere: 5/5",
    date: "4 weeks ago"
  },
  {
    name: "Shri Kant Dubey",
    role: "Local Guide • 67 reviews • 35 photos",
    rating: 5,
    text: "Dining at The Royal Bite was an absolute treat! From the moment we walked in, the amazing ambience set the perfect mood for a great meal. The food was delicious, with every dish packed with flavor and cooked to perfection. Beyond the taste, the entire place was noticeably hygienic and well-maintained, which we really appreciated. To top it off, the staff was incredibly courteous and attentive, making us feel truly welcome throughout the evening. If you’re looking for a spot that nails food, service, and vibes all at once, this is it! The food was served by Dinesh ji with so much affection and modesty.\nFood: 5/5 | Service: 5/5 | Atmosphere: 5/5",
    date: "4 weeks ago"
  },
  {
    name: "Angel kashyap",
    role: "3 reviews • 0 photos",
    rating: 5,
    text: "Dine in · Dinner · ₹200–400\nThe food was good and the staff was very friendly and helpful overall experience was very nice we enjoyed a lot and we'll definitely suggest others",
    date: "5 weeks ago"
  },
  {
    name: "Priya Sharma",
    role: "Hosted a Birthday Party",
    rating: 5,
    text: "The Royal Bite truly lives up to its name! We hosted my daughter's 5th birthday, and everything from the decor to the Dal Makhani was just perfect. Highly recommend!",
    date: "2 months ago"
  },
  {
    name: "Anita Verma",
    role: "Kitty Party Organizer",
    rating: 5,
    text: "I organized a kitty party for 15 ladies here. The staff was incredibly accommodating, they arranged fun games and the food was delicious. All my friends were impressed.",
    date: "3 months ago"
  },
  {
    name: "Rahul & Neha",
    role: "Dinner Guests",
    rating: 5,
    text: "For a premium veg restaurant, this is top-tier. The Afghani Paneer Tikka is an absolute must-try. The ambience is very romantic and elegant.",
    date: "4 months ago"
  },
  {
    name: "Simran Kaur",
    role: "Family Gathering",
    rating: 4,
    text: "Great ambiance and excellent service. The food portions are generous and the staff is very polite. We loved the dessert options.",
    date: "5 months ago"
  }
];

export default function Reviews() {
  return (
    <div className="w-full pt-24 bg-royal-900/40 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white mb-6"
          >
            Customer <span className="text-gold italic">Reviews</span>
          </motion.h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Don't just take our word for it. Hear what our guests have to say about their royal experience.
          </p>
        </div>

        {/* Overall Rating Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto bg-royal-800 rounded-2xl p-8 text-center border border-royal-700 shadow-xl mb-16"
        >
          <h2 className="text-xl font-bold text-white mb-2">Google Rating</h2>
          <div className="text-5xl font-bold text-gold mb-4">4.8</div>
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-gold text-gold" />
            ))}
          </div>
          <p className="text-gray-400">Based on 250+ reviews</p>
          <a 
            href="https://g.page/r/CQruaDlO4xKtEBM/review" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block mt-6 text-gold hover:text-gold-light border-b border-gold hover:border-gold-light transition-colors pb-1"
          >
            Write a Review on Google
          </a>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-royal-800/50 backdrop-blur p-8 rounded-2xl border border-royal-700 hover:border-gold/30 transition-colors relative"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-royal-700 opacity-50" />
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} className="w-5 h-5 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-gray-300 mb-8 italic leading-relaxed whitespace-pre-line">
                "{review.text}"
              </p>
              <div className="flex justify-between items-end border-t border-royal-700 pt-6">
                <div>
                  <h4 className="font-bold text-white mb-1">{review.name}</h4>
                  <p className="text-sm text-gold">{review.role}</p>
                </div>
                <span className="text-xs text-gray-500">{review.date}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
