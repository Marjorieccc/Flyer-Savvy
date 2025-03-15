import { NextRequest, NextResponse } from 'next/server';
import * as Action from '@/action/pointHistory'

export async function GET(request: NextRequest, {params}:{ params: { productID?: string } }) {
    const productID = params?.productID;
    const productIDInt = productID ? parseInt(productID, 10) : NaN;
    
    if (!productID || isNaN(productIDInt)) {
      return new NextResponse(
        JSON.stringify({ message: 'A valid integer Product ID is required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
    
    try{
        const pointHistory = await Action.findPointHistoryByProduct(productIDInt);
        if (!pointHistory) {
            return new NextResponse(JSON.stringify({ message: 'Point history record not found' }), {
              status: 404,
              headers: { 'Content-Type': 'application/json' },
            });
          }

        return new NextResponse(JSON.stringify(pointHistory), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch(error){
        return new NextResponse(JSON.stringify({ error: `Failed to get Point history record : ${error}` }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
    }
}