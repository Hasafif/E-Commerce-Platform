import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
 // const { searchParams } = new URL(request.url);
  //const filename = searchParams.get('filename');
  if (!request.body) {return NextResponse.json({message:'error'});}
  const formData = await request.formData();
  const filename = formData.get('filename');
  console.log(filename)
  const type = formData.get('type');
  console.log(type)
  const file = formData.get('file');
  const f = `${type}/${filename}`
  // ⚠️ The below code is for App Router Route Handlers only
  if (filename && file) {
  const blob = await put(f, file, {
    access: 'public',
  });
  return NextResponse.json(blob);
}
else {
    return NextResponse.json({message:'error'});
    
}
  // Here's the code for Pages API Routes:
  // const blob = await put(filename, request, {
  //   access: 'public',
  // });

  
}

// The next lines are required for Pages API Routes only
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
