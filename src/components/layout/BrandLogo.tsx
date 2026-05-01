import { useState } from 'react';
import { Crown } from 'lucide-react';

interface BrandLogoProps {
  className?: string;
  isFooter?: boolean;
}

export default function BrandLogo({ className = "w-16 h-16 md:w-20 md:h-20", isFooter = false }: BrandLogoProps) {
  const [imgError, setImgError] = useState(false);

  // If the user hasn't uploaded logo.png yet, gracefully fallback to the CSS design
  if (imgError) {
    return (
      <div className="flex items-center gap-3 group">
        <div className="bg-royal-900 rounded-full p-2 border border-gold flex items-center justify-center group-hover:bg-gold transition-colors duration-300">
          <Crown className="w-6 h-6 text-gold group-hover:text-royal-900 transition-colors duration-300" />
        </div>
        <div className="flex flex-col">
          <span className="font-serif text-2xl font-bold tracking-wider text-white group-hover:text-gold-light transition-colors duration-300">
            The Royal Bite
          </span>
          <span className="text-[10px] tracking-widest text-gold text-center font-medium uppercase mt-0.5 group-hover:text-white transition-colors duration-300">
            Royal Taste, Everyday Price
          </span>
        </div>
      </div>
    );
  }

  return (
    <img 
      src="/logo.png" 
      alt="The Royal Bite" 
      className={`${className} object-contain drop-shadow-[0_0_8px_rgba(212,175,55,0.3)] transition-all duration-300 rounded-full`}
      onError={() => setImgError(true)}
    />
  );
}
