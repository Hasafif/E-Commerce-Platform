
import Cookies from "js-cookie";

export const create_a_new_stripe_session = async (formData: any) => {
  try {
    const res = await fetch(`/api/common/stripe_session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('token')}`
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log('Error in creating Checkout (service) =>', error);
  }
}


