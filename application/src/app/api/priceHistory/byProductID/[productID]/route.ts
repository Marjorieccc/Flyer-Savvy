import { NextRequest, NextResponse } from 'next/server';
import * as Action from '@/action/priceHistory'

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
        return new NextResponse(JSON.stringify({ message: 'Product ID is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }
    try{
        const priceHistory = await Action.findPriceHistoryByProduct(productIDInt);
        if (!priceHistory) {
            return new NextResponse(JSON.stringify({ message: 'Price history record not found' }), {
              status: 404,
              headers: { 'Content-Type': 'application/json' },
            });
          }

        return new NextResponse(JSON.stringify(priceHistory), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch(error){
        return new NextResponse(JSON.stringify({ error: `Failed to get Price history record : ${error}` }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
    }
}