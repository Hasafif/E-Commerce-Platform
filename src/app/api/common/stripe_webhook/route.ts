import connectDB from '@/DB/connectDB';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);
import AuthCheck from "@/middleware/AuthCheck";
import Order from "@/model/Order";
import Product from "@/model/Product";
import Joi from "joi";
import Cart from "@/model/Cart";
import { networkInterfaces } from 'os';


const createOrderSchema = Joi.object({
    user: Joi.string().required(),
})
async function handler(req: NextRequest) {
  //const supabase = createServerComponentClient({ cookies });
  const reqText = await req.text();
  return webhooksHandler(reqText, req);
}
export { handler as GET, handler as POST };
/*async function getCustomerEmail(customerId: string): Promise<string | null> {
  try {
    const customer = await stripe.customers.retrieve(customerId);
    return (customer as Stripe.Customer).email;
  } catch (error) {
    console.error('Error fetching customer:', error);
    return null;
  }
}*/

async function handleChargeEvent(
  event: Stripe.Event,
  type: 'created' | 'updated' | 'deleted' | 'succeeded'
) {
    return NextResponse.json({
        status: 201,
        error: 'Received',
      });
  }
  
  

async function handlePaymentEvent(
  event: Stripe.Event,
  status: 'succeeded' | 'failed' | 'created'
) {

    return NextResponse.json({
        status: 201,
        error: 'Received',
      });
}

async function handleCheckoutSessionCompleted(
  event: Stripe.Event
) {
  const session = event.data.object as Stripe.Checkout.Session;
  if (session.payment_status === 'paid') {
    const metadata = session.metadata;
   if (metadata) {
    console.log(metadata)
    const order_id = metadata.order_id;
    await connectDB();
    const up = await Order.findOneAndUpdate({_id:order_id},{isPaid:true})
    if (up) 
    { let modification;
        try {
        for (let i of up.orderItems) {
        console.log(i)
        let productID = i.product.toString();
        console.log(productID);
        let q = await Product.findById(productID).select('productQuantity');
        let new_quantity = q.productQuantity - i.qty;
        console.log(new_quantity);
        console.log(q)
        if (new_quantity<=0) { modification = await Product.findByIdAndDelete(productID)}
        else ( modification = await Product.findOneAndUpdate({_id:productID}, {productQuantity:new_quantity} ) )
    } 
    return NextResponse.json({status: 200,message: 'Order metadata updated successfully',});
} catch(error) {
console.log(error);
return NextResponse.json({status: 500,message: 'Error occured while updating products metadata',});


}
}
    else {return NextResponse.json({
        status: 500,
        message: 'Error occured while updating order metadata',
      });}
}
else {

    return NextResponse.json({
        status: 400,
        message: 'Payment metadata is not defined',
      });
}
   
  } else {
    //const dateTime = new Date(session.created * 1000).toISOString();
      return NextResponse.json({
        status: 400,
        message: 'Payment Process was not completed successfully',
      });
    } 
}

async function webhooksHandler(
  reqText: string,
  request: NextRequest
): Promise<NextResponse> {
  const sig = request.headers.get('Stripe-Signature');
  //console.log(sig)
  //console.log(request.headers)
  try {
    const event = await stripe.webhooks.constructEventAsync(
      reqText,
      sig!,
      process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET!

    );
    console.log(event.type)
    switch (event.type) {
      case 'charge.succeeded':
        return handleChargeEvent(event, 'succeeded');
      case 'charge.updated':
        return handleChargeEvent(event, 'updated');
      case 'payment_intent.succeeded':
        return handlePaymentEvent(event, 'succeeded');
      case 'payment_intent.created':
        return handlePaymentEvent(event, 'created');
      case 'checkout.session.completed':
        return handleCheckoutSessionCompleted(event);
      default:
        return NextResponse.json({
          status: 400,
          error: 'Unhandled event type',
        });
    }
  } catch (err) {
    console.error('Error constructing Stripe event:', err);
    return NextResponse.json({
      status: 500,
      error: 'Webhook Error: Invalid Signature',
    });
  }
}