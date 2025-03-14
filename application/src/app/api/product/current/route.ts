import { NextRequest, NextResponse } from 'next/server';
import * as Action from '@/action/product'

export async function GET(request: NextRequest) {
    try{
        const products = await Action.findCurrentProducts()
        if (!products || products.length === 0) {
            return new NextResponse(JSON.stringify({ message: 'No on sale product found' }), {
              status: 404,
              headers: { 'Content-Type': 'application/json' },
            });
          }
        return new NextResponse(JSON.stringify(products), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch(error){
        return new NextResponse(JSON.stringify({ error: `Failed to get on sale products : ${error}` }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}