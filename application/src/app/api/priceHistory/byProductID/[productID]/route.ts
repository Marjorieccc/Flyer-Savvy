import { NextRequest, NextResponse } from 'next/server';
import * as Service from '@/service/server/priceHistory';
import * as Response from '@/lib/http/responses';

/**
 * Retrieves price history records for a specific product
 *
 * @param request - The incoming Next.js request
 * @param params - URL parameters containing the productID
 * @param params.productID - The ID of the product to retrieve price history for (string that will be parsed to integer)
 * @returns A NextResponse containing:
 *  - 200 status with JSON array of price history records on success
 *  - 400 status if productID is missing or invalid
 *  - 404 status if no price history records for the specified product are found
 *  - 500 status if server error occurs during retrieval
 */
export async function GET(
    request: NextRequest, 
    {params}: { params: { productID?: string } }
): Promise<NextResponse> {
    const productID = params?.productID;
    const productIDInt = productID ? parseInt(productID, 10) : NaN;

    if(!productID || isNaN(productIDInt)){
        return Response.badRequestResponse(400);
    }

    try{
        const priceHistory = await Service.findPriceHistoryByProduct(productIDInt);

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