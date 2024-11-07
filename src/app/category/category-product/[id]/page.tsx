"use client"


import { get_product_by_category_id } from '@/Services/Admin/product'
import Loading from '@/app/loading'
import ProductCard from '@/components/ProductCard'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React, { use, useEffect, useState } from 'react'
import useSWR from 'swr'

interface pageParam {
    id: string
}



type ProductData = {
    productName: string,
    productImage: string,
    productSlug: string,
    productPrice: Number,
    productFeatured: Boolean,
    productCategory : {
        categoryName : string,
        categoryDescription  :string ,
        _id : string,
    },
    _id : string
};
  



export default function Page({ params, searchParams }: { params:any, searchParams: any }) {
    const [thisProduct , setThisProdData] =  useState<ProductData[] | []>([]);
    const [page_params,set_page_params]=useState<pageParam>(use(params))
    const { data, isLoading } = useSWR('/gettingProductOFSpecificCategoryID', () => get_product_by_category_id(page_params.id))

    useEffect(() => {
        setThisProdData(data?.data)
    }, [data])

    const CategoryName  =  thisProduct?.map((item) => {
        return item?.productCategory?.categoryName
    })
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
  
    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = thisProduct?.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(thisProduct?.length / itemsPerPage);
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
        <div className='w-full h-screen dark:text-black bg-gray-50 py-4 px-2 '>
            <div className="text-sm breadcrumbs bg-gray-900 text-white border-b-2 border-b-white">
                <ul>
                    <li>
                        <Link href={'/'}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-2 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                            Home
                        </Link>
                    </li>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-2 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        {CategoryName?.[0] || "Loading Category"}
                    </li>
                </ul>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    isLoading ? <Loading /> : <>
                         {
                                currentItems?.map((item: ProductData) => {
                                    return <ProductCard
                                        productName = {item?.productName}
                                        productPrice = {item?.productPrice}
                                        productFeatured = {item?.productFeatured}
                                        productImage = {item?.productImage}
                                        productSlug = {item?.productSlug}
                                        productCategory={item?.productCategory}
                                        _id={item?._id}
                                        key={item?._id} />
                                })
                            }
                    </>
                }
                {
                    isLoading === false && thisProduct ===  undefined || thisProduct?.length <  1 && <p className='text-2xl my-4 text-center font-semibold text-red-400'>No Product Found in this Category</p>
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
          disabled={currentPage === 1}>
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
