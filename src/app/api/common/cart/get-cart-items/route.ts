import connectDB from "@/DB/connectDB";
import { NextResponse } from "next/server";
import Cart from "@/model/Cart";
import AuthCheck from "@/middleware/AuthCheck";
import Product from "@/model/Product";
import User from "@/model/User";

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  await connectDB();
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    const registerProductModel =  await Product.init();
   const registerUserModel =  await User.init();

    if (!id) return NextResponse.json({ status: 400, success: false, message: 'Please Login !' });
    const isAuthenticated = await AuthCheck(req);

    if (isAuthenticated) {
      const getData = await Cart.find({ userID: id }).populate('userID').populate('productID');
      // console.log(getData)
      if (getData) {
        return NextResponse.json({ success: true, data: getData });
      } else {
        return NextResponse.json({ status: 204, success: false, message: 'No Cart Item found.' });
      }

    } else {
      return NextResponse.json({ success: false, message: "You are not authorized Please login!" });
    }


  } catch (error) {
    console.log('Error in getting  cart :', error);
    return NextResponse.json({ status: 500, success: false, message: 'Something went wrong. Please try again!' });
  }
}
