import Image from 'next/image'
import React from 'react'
import { categories } from '@/public/category/category'

const CategoryCard = () => {
  return (
    <div className='relative'>
        <div className='grid grid-cols-3 gap-5 mt-5 w-full h-full'>
            {categories.map((category) => (
            <div className="banner__slide hover:-translate-y-1" key={category.label}>
                <Image src={category.img} alt={category.label} width={500} height={500}
                // className='object-contain' quality={100} />
                className='object-contain' />
            </div>
            ))}
        </div>
    </div>
  )
}

export default CategoryCard