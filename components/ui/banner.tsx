'use client'
import Image from 'next/image';
import React, { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { banners } from '@/public/banner/banner';

const Banner = () => {
    const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
    const [emblaRef] = useEmblaCarousel({ loop:true }, [autoplay.current]);

  return (
    // Used Embla for this UI
    <div className='relative overflow-hidden px-6 py-50 w-full cursor-pointer embla' ref={emblaRef}>
        <div className='absolute inset-0 flex'>
          {banners.map((banners) => (
            <div className='banner__slide' key={banners.label}>
              <Image src={banners.img} alt={banners.label} fill />
            </div>
          ))}
        </div>
    </div>
  )
}

export default Banner