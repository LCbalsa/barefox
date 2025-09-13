'use client'
import Image from 'next/image';
import React, { useRef, useEffect, useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { banners } from '@/public/banner/banner';

const Banner = () => {
  const autoplay = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    autoplay.current,
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <div
      className="relative overflow-hidden lg:py-50 md:py-30 py-15 cursor-pointer"
      ref={emblaRef}
    >
      <div className="absolute inset-0 flex">
        {banners.map((banner) => (
          <div className="banner__slide w-full" key={banner.label}>
            <Image src={banner.img} alt={banner.label} width={1300} height={400} 
            // className='object-contain' quality={100} />
            className='object-contain' />
          </div>
        ))}
      </div>

      {/* Buttons in bottom right */}
      <div className="absolute top-6 right-4 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === selectedIndex ? 'bg-white' : 'bg-gray-400/60'
            }`}
            onClick={() => emblaApi && emblaApi.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
