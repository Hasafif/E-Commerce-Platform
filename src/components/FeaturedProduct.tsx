"use client"

import React, { useState } from 'react'
import ProductCard from './ProductCard'
import {  useSelector } from 'react-redux'

import { RootState } from '@/Store/store'
import Loading from '@/app/loading'
import { ArrowLeft, ArrowRight } from 'lucide-react'



type ProductData = {
    productName: string,
    productImage: string,
    productSlug: string,
    productPrice: Number,
    productFeatured: Boolean,
    productCategory : {
        categoryName  : string ,
        _id : string
        categoryDescription : string ,
    }
    _id : string
};
  



const FeaturedProduct  = () => {
    

    const prodData = useSelector((state: RootState) => state.Admin.product);
    const prodLoading = useSelector((state: RootState) => state.Admin.productLoading);



    const FeaturedProducts = prodData?.filter((prod : ProductData) => {
        if(prod?.productFeatured){
            return prod
        }
    })


    //const filteredProducts  =  FeaturedProducts?.slice(0, 9)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
  
    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = FeaturedProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(FeaturedProducts.length / itemsPerPage);
    const handlePageChange = (pageNumber: number) => {
      setCurrentPage(pageNumber);
    };
    const handlePrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };
    return (
        <div className='max-w-7xl mx-auto px-4 py-12'>
              <div><h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Top Products
      </h2>
      <p className='text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4'>Explore Our Wide Range of Products</p>
      </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {
                    prodLoading ? <Loading /> :
                        <>
                            {
                                currentItems?.length <  1 ? 
                                <h1 className='text-2xl font-semibold text-gray-500'>No Featured Products</h1> 
                                :
                                currentItems?.map((item: ProductData) => {
                                    return <ProductCard
                                        productName = {item?.productName}
                                        productPrice = {item?.productPrice}
                                        productFeatured = {item?.productFeatured}
                                        productImage = {item?.productImage}
                                        productCategory={item?.productCategory}
                                        productSlug = {item?.productSlug}
                                        _id={item?._id}
                                        key={item?._id} />
                                })
                            }
                        </>
                }

            </div>
             {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={handlePrevPage}
          className={`px-4 py-2 rounded-md ${
            currentPage === 1
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300'
          }`}
          disabled={currentPage === 1}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-md ${
                currentPage === index + 1
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              } transition-colors duration-300`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          onClick={handleNextPage}
          className={`px-4 py-2 rounded-md ${
            currentPage === totalPages
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300'
          }`}
          disabled={currentPage === totalPages}
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
        </div>
    )
}
export default FeaturedProduct;