import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface IProps {
  setRatio: (value: number) => void;
}


export default function Hero({setRatio} : IProps) {
  return (
    <div className='w-full h-screen relative'>
      <Image src={'/Hero.jpeg'} alt='no Image' fill className="w-full h-full object-fill hidden md:block " onLoadingComplete={({naturalWidth,naturalHeight}) => setRatio(naturalWidth/naturalHeight)} />
      <div className='w-full flex-col md:hidden h-full relative flex items-center px-3 justify-center text-center'>
        {<Image src={'/Hero.jpeg'} alt='no image'  fill />}
      </div>
    </div>
  )
}
