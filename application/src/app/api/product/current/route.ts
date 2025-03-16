import { NextRequest, NextResponse } from 'next/server';
import * as Action from '@/action/product'
import * as Response from '@/lib/http/responses'

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
        const products = await Action.findCurrentProducts();
        
        if (!products || products.length === 0) {
            return Response.notFoundResponse(404);
        }

        return Response.successReponse(products, 200);

    } catch(error){
        // This is temporarily approach, it will be handle in Logging entry later on
        console.error('Server error:', error);
        return Response.serverErrorReponse(500);
    }
}