import { brands } from '@/public/brand/brand'
import Image from 'next/image'
import React from 'react'

const Brand = () => {
  return (
    <div className="grid lg:grid-cols-6 sm:grid-cols-1">
        {brands.map((brand) => (
            <div className="flex justify-center gap-5 p-2 shadow-xl shadow-gray-200 mt-10 mb-10" key={brand.label}>
            <Image src={brand.img} alt={brand.label} width={150} height={150} />
        </div>
        ))}
    </div>
  )
}

export default Brand