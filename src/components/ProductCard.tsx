import { bookmark_product } from '@/Services/common/bookmark';
import { add_to_cart } from '@/Services/common/cart';
import { RootState } from '@/Store/store';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { BsCartPlus } from 'react-icons/bs'
import { MdFavorite } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { showToast } from '@/Store/toast';
import { Bookmark, ShoppingCart } from 'lucide-react';


type ProductData = {
    productName: string,
    productImage: string,
    productSlug: string,
    productPrice: Number,
    productFeatured: Boolean,
    productCategory: {
        categoryName: string,
        categoryDescription: string,
        _id: string,
    },
    _id: string
};


type User = {
    email : string , 
    name : string , 
    _id : string,
}


export default function ProductCard({ productName, productFeatured, productImage, productCategory, productPrice, _id, productSlug }: ProductData) {
    const router = useRouter();

    const user = useSelector((state: RootState) => state.User.userData) as User | null

    const AddToCart = async () => {
        const finalData = { productID: _id, userID: user?._id }
        const res = await add_to_cart(finalData);
        if (res?.success) {
            showToast.success({message:res?.message,duration:5000});
        } else {
            showToast.error({message:res?.message,duration:5000})
        }
    }


    const AddToBookmark  =  async () => {
        const finalData = { productID: _id, userID: user?._id }
        const res = await bookmark_product(finalData);
        if (res?.success) {
            showToast.success({message:res?.message,duration:5000});
        } else {
            showToast.error({message:res?.message,duration:5000})
        }
    }
    const [isBookmarked, setIsBookmarked] = useState(false);

    const handleBookmark = () => {
      setIsBookmarked(!isBookmarked);
      //onBookmark();
    };

    return (
        <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800">
            <div onClick={() => router.push(`/product/product-detail/${_id}`)} className='relative h-48 sm:h-64 overflow-hidden'>
                <Image src={productImage || '/images98.jpg'} alt='no Image' className='w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300' fill />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-opacity duration-300" />
            </div>

            <div className="p-4 sm:p-6">
            <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2" onClick={() => router.push(`/product/product-detail/${_id}`)}>{`Name: ${productName}`} </h3>
                <p className='text-lg font-bold text-blue-600 dark:text-blue-400' onClick={() => router.push(`/product/product-detail/${_id}`)}>{`Price: ${productPrice} $`}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Category: {productCategory.categoryName}</p>
                </div>
                <div className="flex justify-between">
                    <button onClick={AddToBookmark}    className={`p-2 rounded-md transition-colors duration-300 ${
                isBookmarked
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}>
               <Bookmark className="w-5 h-5" />
                </button>
                    <button onClick={AddToCart} 
                    className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"><ShoppingCart className="w-5 h-5" /></button>
                </div>
            </div>
        </div>
    )
}
