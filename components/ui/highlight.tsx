'use client';
import { assets } from '@/public/assets'
import Image from 'next/image'
import React from 'react'
import { motion } from 'motion/react'

const Highlight = () => {
  return (
    <div className='grid lg:grid-cols-2 sm:grid-cols-1'>
        <div className='relative w-full lg:h-[560px] h-[350px] group overflow-hidden'>
            {/* Reveals image as initial background */}
            <motion.div initial={{ opacity:1 }} whileHover={{ opacity:0 }} transition={{ duration: 0.5 }}
            className='absolute inset-0 z-0'>
                <Image src={assets.highlight1} alt='' style={{ objectFit: "cover"}} priority />
                <Image src={assets.valourLogo} width={240} height={240} alt='' className='z-10 absolute top-0 left-4 invert' />
            </motion.div>

            {/* Product description overlay */}
            <motion.div initial={{ opacity:0 }} whileHover={{ opacity:1 }} transition={{ duration:0.5 }} 
            className='absolute inset-0 z-10 flex flex-col bg-gradient-to-r from-black to-white/10 text-white 
            pl-2 lg:pl-10 pt-2 lg:pt-10'>
                <h1 className='lg:text-5xl text-4xl font-bold'>Valour</h1>
                <p className='mt-4'>Drizzle Short-cut Stiletto Leather Boots</p>
                <p className='py-15 text-xs lg:w-[300px] w-[200px]'>This is the description of the clothing article 
                    This is the description of the clothing article This is the description of the clothing article
                </p>
                <button className='bg-white p-2 text-black w-40 absolute lg:bottom-20 bottom-5'>View Product</button>
            </motion.div>
        </div>
        <div className='relative w-full lg:h-[560px] h-[350px] group overflow-hidden'>
            {/* Reveals image as initial background */}
            <motion.div initial={{ opacity:1 }} whileHover={{ opacity:0 }} transition={{ duration: 0.5 }}
            className='absolute inset-0 z-0'>
                <Image src={assets.highlight2} alt='' objectFit='cover' priority />
                <Image src={assets.chikotaLogo} width={240} height={240} alt='' className='z-10 absolute top-0 left-4 invert' />
            </motion.div>

            {/* Product description overlay */}
            <motion.div initial={{ opacity:0 }} whileHover={{ opacity:1 }} transition={{ duration:0.5 }} 
            className='absolute inset-0 z-10 flex flex-col text-white lg:p-10 p-5 bg-gradient-to-r from-black to-white/10'>
                <h1 className='lg:text-5xl text-4xl font-bold'>Chikota</h1>
                <p className='mt-4'>Finesse Flat Bottom Mid-top Leather Martin Boots</p>
                <p className='py-15 text-xs lg:w-[300px] w-[200px]'>This is the description of the clothing article 
                    This is the description of the clothing article This is the description of the clothing article
                </p>
                <button className='bg-white p-2 text-black lg:w-40 sm:w-30 absolute lg:bottom-20 bottom-5'>View Product</button>
            </motion.div>
        </div>
    </div>
  )
}

export default Highlight