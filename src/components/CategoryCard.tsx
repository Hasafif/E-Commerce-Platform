import { ArrowRight } from 'lucide-react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'



type CategoryData = {
    _id: string;
    categoryName: string;
    categoryDescription: string;
    categoryImage: string;
    categorySlug: string;
};



export default function CategoryCard({ categoryDescription, categoryImage, categoryName, categorySlug, _id }: CategoryData) {
    const router = useRouter();
    return (
        <div onClick={() => router.push(`/category/category-product/${_id}`)} className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800">
            <div className='relative h-64 overflow-hidden'>
                <Image src={categoryImage || '/images98.jpg'} alt='no Image' className='w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300'fill/>
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-opacity duration-300" />
            </div>
            <div className="p-6">
            <div className="flex justify-between items-start mb-4">
            <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 self-center">{categoryName} </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                Category Size: 100 Products
            </p></div>
            </div>
           
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            {categoryDescription}
          </p>
          <button
          className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          <span>View Products</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        </div>
        </div>
    )
}
