import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play } from 'lucide-react';

type MediaType = 'image' | 'video';
type Category = 'All' | 'Restaurant' | 'Kitty Parties' | 'Kid Parties';

interface GalleryItem {
  src: string;
  alt: string;
  type: MediaType;
  category: Category | Category[];
  rowSpan?: string;
  poster?: string;
}

const galleryItems: GalleryItem[] = [
  { src: '/gallery-1.jpeg', alt: 'Restaurant Ambience', type: 'image', category: ['Restaurant'], rowSpan: 'row-span-2' },
  { src: '/gallery-2.jpeg', alt: 'Delicious Dish', type: 'image', category: ['Restaurant'], rowSpan: 'row-span-1' },
  { src: '/gallery-3.jpeg', alt: 'Restaurant Interior', type: 'image', category: ['Restaurant'], rowSpan: 'row-span-1' },
  { src: '/gallery-4.jpeg', alt: 'Culinary Delight', type: 'image', category: ['Restaurant'], rowSpan: 'row-span-1' },
  { src: '/gallery-5.jpeg', alt: 'Fine Dining setup', type: 'image', category: ['Restaurant'], rowSpan: 'row-span-2' },
  { src: '/gallery-6.jpeg', alt: 'Special Treat', type: 'image', category: ['Restaurant'], rowSpan: 'row-span-1' },
  { src: '/gallery-7.jpeg', alt: 'Royal Ambience', type: 'image', category: ['Restaurant'], rowSpan: 'row-span-1' },
  { src: '/gallery-8.jpeg', alt: 'Elegant Setting', type: 'image', category: ['Restaurant'], rowSpan: 'row-span-2' },
  { src: '/gallery-9.jpeg', alt: 'Premium Experience', type: 'image', category: ['Restaurant'], rowSpan: 'row-span-1' },
  { src: '/gallery-10.jpeg', alt: 'Beautiful Decor', type: 'image', category: ['Restaurant'], rowSpan: 'row-span-1' },
  { src: '/gallery-11.jpeg', alt: 'Cozy Atmosphere', type: 'image', category: ['Restaurant'], rowSpan: 'row-span-2' },
  { src: '/kitty-1.jpeg', alt: 'Kitty Party Fun', type: 'image', category: ['Kitty Parties'], rowSpan: 'row-span-1' },
  { src: '/kitty-2.jpeg', alt: 'Ladies Celebration', type: 'image', category: ['Kitty Parties'], rowSpan: 'row-span-2' },
  { src: '/kitty-3.jpeg', alt: 'Kitty Party Event', type: 'image', category: ['Kitty Parties'], rowSpan: 'row-span-1' },
  { src: '/kitty-4.jpeg', alt: 'Food and Drinks', type: 'image', category: ['Kitty Parties'], rowSpan: 'row-span-1' },
  { src: '/kitty-5.jpeg', alt: 'Group Gathering', type: 'image', category: ['Kitty Parties'], rowSpan: 'row-span-2' },
  { src: '/kitty-6.jpeg', alt: 'Party Setup', type: 'image', category: ['Kitty Parties'], rowSpan: 'row-span-1' },
  { src: '/kitty-7.jpeg', alt: 'Fun Games', type: 'image', category: ['Kitty Parties'], rowSpan: 'row-span-1' },
];

const categories: Category[] = ['All', 'Restaurant', 'Kitty Parties', 'Kid Parties'];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const filteredItems = galleryItems.filter(item => 
    activeCategory === 'All' 
      ? true 
      : Array.isArray(item.category) 
        ? item.category.includes(activeCategory)
        : item.category === activeCategory
  );

  return (
    <div className="w-full pt-24 bg-royal-900/40 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        <div className="text-center mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white mb-6"
          >
            Our <span className="text-gold italic">Gallery</span>
          </motion.h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            A glimpse into the royal world. From our meticulously crafted dishes to the joyous celebrations we host.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gold text-royal-900 shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                    : 'bg-royal-800 text-gray-300 border border-royal-700 hover:border-gold hover:text-gold'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Empty State warning for categories with no images yet */}
        {filteredItems.length === 0 && (
           <motion.div 
             initial={{ opacity: 0 }} 
             animate={{ opacity: 1 }} 
             className="text-center py-20 bg-royal-800/50 rounded-2xl border border-royal-700 border-dashed"
           >
             <p className="text-gray-400 text-lg">No media uploaded in this section yet.</p>
             <p className="text-gold mt-2 text-sm">Upload images to see them here!</p>
           </motion.div>
        )}

        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-4 md:auto-rows-[250px]">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                key={item.src}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className={`relative group overflow-hidden rounded-xl bg-royal-800 ${item.rowSpan || 'row-span-1'}`}
              >
                {item.type === 'image' ? (
                  <img 
                    src={item.src} 
                    alt={item.alt} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = `https://placehold.co/600x400/1a1d24/d4af37.png?text=Upload\\n${item.src.replace('/', '')}`;
                    }}
                  />
                ) : (
                  <div className="w-full h-full relative" onClick={() => setPlayingVideo(item.src)}>
                    <video 
                      src={item.src}
                      poster={item.poster}
                      className="w-full h-full object-cover"
                      controls={playingVideo === item.src}
                      muted={playingVideo !== item.src}
                      playsInline
                    />
                    {playingVideo !== item.src && (
                      <div className="absolute inset-0 bg-royal-900/40 flex items-center justify-center transition-colors hover:bg-transparent group-hover:bg-royal-900/20 cursor-pointer">
                        <div className="w-16 h-16 bg-gold/90 rounded-full flex items-center justify-center backdrop-blur shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                          <Play className="w-8 h-8 text-royal-900 ml-1" />
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {playingVideo !== item.src && (
                  <div className="absolute inset-0 bg-gradient-to-t from-royal-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end pointer-events-none">
                    <span className="p-6 text-white font-serif font-bold text-lg">{item.alt}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}
