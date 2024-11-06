import Cookies from "js-cookie";
//export const origin = 'https://e-commerce-platform-6x26.vercel.app'
export const get_product_details = async (id:string) => {
    const formdata = new FormData();
    formdata.append('id',id)
    try {
      const res = await fetch(`/api/common/product/get-product-details?id=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('token')}`
          },
          //body:formdata
      })
  
      const data = await res.json();
      return data;
    } catch (error) {
      console.log('Error in getting product by ID (service) =>', error)
    }
  }