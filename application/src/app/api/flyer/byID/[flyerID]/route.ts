import { NextRequest, NextResponse } from 'next/server';
import * as Action from '@/action/flyer'

/**
 * Retrieves a specific flyer by its ID
 *
 * @param request - The incoming Next.js request
 * @param params - URL parameters containing the flyerID
 * @param params.flyerID - The ID of the flyer to retrieve (string that will be parsed to integer)
 * @returns A NextResponse containing:
 *  - 200 status with JSON flyer object on success
 *  - 400 status if flyerID is missing or invalid
 *  - 404 status if flyer with specified ID is not found
 *  - 500 status if server error occurs during retrieval
 */
export async function GET(request: NextRequest, 
    { params }:{ params: { flyerID?: string } }
):Promise<NextResponse> {
    const flyerID = params?.flyerID;
    const flyerIDInt = flyerID ? parseInt(flyerID, 10) : NaN;
    if(!flyerID || isNaN(flyerIDInt)){
        return new NextResponse(JSON.stringify({ message: 'Flyer ID is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }
    try{
        const flyer = await Action.findFlyer(flyerIDInt);
        if (!flyer) {
            return new NextResponse(JSON.stringify({ message: 'Flyer not found' }), {
              status: 404,
              headers: { 'Content-Type': 'application/json' },
            });
          }

        return new NextResponse(JSON.stringify(flyer), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch(error){
        return new NextResponse(JSON.stringify({ error: `Failed to get flyer : ${error}` }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
    }
}