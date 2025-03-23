import { NextRequest, NextResponse } from 'next/server';
import * as Service from '@/service/server/priceHistory'
import * as Response from '@/lib/http/responses'

/**
 * Retrieves current price history records
 * Note: This appears to be misnamed as priceHistory but is using priceHistory actions
 *
 * @param request - The incoming Next.js request
 * @returns A NextResponse containing:
 *  - 200 status with JSON array of current price history records on success
 *  - 404 status if no current price history records are found
 *  - 500 status if server error occurs during retrieval
 */
export async function GET(request: NextRequest, {params}:{ params: { priceHistoryID?: string } }): Promise<NextResponse> {
    const priceHistoryID = params?.priceHistoryID;
    const priceHistoryIDInt = priceHistoryID ? parseInt(priceHistoryID, 10) : NaN;

    if(!priceHistoryID || isNaN(priceHistoryIDInt)){
        return Response.badRequestResponse(400);
    }

    try{
        const priceHistory = await Service.findPriceHistory(priceHistoryIDInt);
        
        if (!priceHistory) {
            return Response.notFoundResponse(404);
        }

        return Response.successReponse(priceHistory, 200);

    } catch(error){
        // This is temporarily approach, it will be handle in Logging entry later on
        console.error('Server error:', error);
        return Response.serverErrorReponse(500);
    }
}