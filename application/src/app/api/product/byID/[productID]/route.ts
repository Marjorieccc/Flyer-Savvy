import { NextRequest, NextResponse } from 'next/server';
import * as Action from '@/action/product'

export async function GET(request: NextRequest, {params}:{ params: { productID?: string } }) {
    const productID = params?.productID;
    const productIDInt = productID ? parseInt(productID, 10) : NaN;
    if(!productID || isNaN(productIDInt)){
        return new NextResponse(JSON.stringify({ message: 'Product ID is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }
    try{
        const product = await Action.findProduct(productIDInt);
        if (!product) {
            return new NextResponse(JSON.stringify({ message: 'Product not found' }), {
              status: 404,
              headers: { 'Content-Type': 'application/json' },
            });
          }

        return new NextResponse(JSON.stringify(product), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch(error){
        return new NextResponse(JSON.stringify({ error: `Failed to get product : ${error}` }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
    }
}