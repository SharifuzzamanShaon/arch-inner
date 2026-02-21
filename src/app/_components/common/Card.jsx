import Image from 'next/image'
import React from 'react'

const Card = () => {
  return (
    <div className="relative bg-white shadow-xl p-6 rounded-b-[10px] w-80 clip-avatar">
  {/* only the bottom corners are rounded 10px, top corners stay square */}
  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
    <Image
      src="/images/avater.png"
      width={64}
      height={64}
      alt="Avatar"
      className="w-16 h-16 rounded-full border-4 border-white"
    />
  </div>
  <div className="mt-10 text-center">
    <h3 className="font-semibold text-lg">Md Rafi Islam</h3>
    <div className="flex justify-center my-2">
      {Array(5).fill(0).map((_, i) => (
        <span key={i} className="text-red-500 text-sm">★</span>
      ))}
    </div>
    <p className="text-gray-600 text-sm">
      Being a part of Arc Inner is my greatest pleasure as I have been working with really wonderful projects last 2 Years. We didn’t compromise with quality and commitment.
    </p>

    <button className="mt-4 bg-#FE5443 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition">
      Read More →
    </button>
  </div>
</div>

  )
}

export default Card