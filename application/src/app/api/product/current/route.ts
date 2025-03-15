import { NextRequest, NextResponse } from 'next/server';
import * as Action from '@/action/product'

/**
 * Retrieves all currently available products (on sale)
 *
 * @param request - The incoming Next.js request
 * @returns A NextResponse containing:
 *  - 200 status with JSON array of on-sale products on success
 *  - 404 status if no on-sale products are found
 *  - 500 status if server error occurs during retrieval
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
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