import { NextRequest, NextResponse } from 'next/server';
import * as Service from '@/service/server/flyer'
import * as Response from '@/lib/http/responses'

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

    if(!flyerID || isNaN(flyerIDInt)) {
        //will add error message in Logging entry later on
        return Response.badRequestResponse(400);
    }
    
    try{
        const flyer = await Service.findFlyer(flyerIDInt);
        if (!flyer) {
            //will add error message in Logging entry later on
            return Response.notFoundResponse(404);
        }

        return Response.successReponse(flyer, 200);

    } catch(error){
        //will be handle in Logging entry later on
        console.error('Server error:', error);
        return Response.serverErrorReponse(500);
    }
}