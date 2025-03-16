import { NextRequest, NextResponse } from 'next/server';
import * as Action from '@/action/priceHistory'
import * as Response from '@/lib/http/responses'

/**
 * Retrieves all current price history records from the database
 *
 * @param request - The incoming Next.js request
 * @returns A NextResponse containing:
 *  - 200 status with JSON array of current price history records on success
 *  - 404 status if no current price history records are found
 *  - 500 status if server error occurs during retrieval
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
    try{
        const priceHistories = await Action.findCurrentPriceHistory();

        if (!priceHistories || priceHistories.length === 0) {
            return Response.notFoundResponse(404);
        }

        return Response.successReponse(priceHistories, 200);

    } catch(error){
        // This is temporarily approach, it will be handle in Logging entry later on
        console.error('Server error:', error);
        return Response.serverErrorReponse(500);
    }
}