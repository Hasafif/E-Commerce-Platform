import Cookies from "js-cookie";
let origin = 'https://e-commerce-platform-6x26.vercel.app'
//origin = 'http://localhost:3000'
export const get_product_details = async (id:string) => {
    const formdata = new FormData();
    formdata.append('id',id)
    try {
      const res = await fetch(`${origin}/api/common/product/get-product-details?id=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('token')}`
          },
      })
  
      const data = await res.json();
      return data;
    } catch (error) {
      console.log('Error in getting product by ID (service) =>', error)
    }
  }