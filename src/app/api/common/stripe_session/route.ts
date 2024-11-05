import connectDB from "@/DB/connectDB";
import AuthCheck from "@/middleware/AuthCheck";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { get_product_details } from "@/Services/common/product";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
    try {
    await connectDB();
 const isAuthenticated = await AuthCheck(req);

 if (isAuthenticated) {
    let data = await req.json();
  let {orderItems,order_id,userId, email } = data
  console.log(order_id);
  let line_items = []
  let line_item = {}
  let product_data;
  for (let i of orderItems) {
    console.log(i)
    product_data = await get_product_details(i.product);
    console.log(product_data)
    line_item = {price_data: {
        currency: 'usd',
        product_data: {
        name: product_data.data.productName,
        images: [product_data.data.productImage],
        },
        unit_amount: product_data.data.productPrice*100,
    }, quantity: i.qty}
    line_items.push(line_item)
  }
  if (order_id) {
   
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items:line_items,
        metadata: { userId, email, order_id },
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
        allow_promotion_codes: true,
      });

     // console.log(session)
      return NextResponse.json({ sessionId: session.id });
    }} else {
        return NextResponse.json({ success: false, message: "You are not authorized Please login!" });
    }

} catch (error) {
      console.error("Error creating checkout session:", error);
      return NextResponse.json({ error: "Failed to create checkout session" });
    }
  } 
  
