import connectDB from "@/DB/connectDB";
import AuthCheck from "@/middleware/AuthCheck";
import { NextResponse } from "next/server";
import Product from "@/model/Product";
import { FilterQuery } from "mongoose";

export async function PUT(req: Request) {
  try {
    await connectDB();
    const isAuthenticated = await AuthCheck(req);

    if (isAuthenticated === 'admin') {
      const data = await req.json();
      const  {name , _id  , description  , slug , feature , quantity , price , categoryID } = data
      console.log(data)
      let f:FilterQuery<any>=_id 
      const saveData = await Product.findOneAndUpdate({_id:Object(_id)}, { productName : name , productDescription : description ,productSlug: slug , productPrice : price ,  productQuantity : quantity ,  productCategory : categoryID  }  , { new: true });
      console.log(saveData)
      if (saveData) {

        return NextResponse.json({ success: true, message: "product  updated successfully!" });

      } else {

        return NextResponse.json({ success: false, message: "Failed to update the product . Please try again!" });

      }

    } else {

      return NextResponse.json({ success: false, message: "You are not authorized." });

    }

  } catch (error) {

    console.log('Error in update a new product :', error);
    return NextResponse.json({ success: false, message: 'Something went wrong. Please try again!' });

  }
}
