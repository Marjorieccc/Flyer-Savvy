import { NextRequest, NextResponse } from 'next/server';
import * as Service from '@/service/server/pointHistory'
import * as Response from '@/lib/http/responses'

/**
 * Retrieves a specific point history record by its ID
 *
 * @param request - The incoming Next.js request
 * @param params - URL parameters containing the pointHistoryID
 * @param params.pointHistoryID - The ID of the point history record to retrieve (string that will be parsed to integer)
 * @returns A NextResponse containing:
 *  - 200 status with JSON point history object on success
 *  - 400 status if pointHistoryID is missing or invalid
 *  - 404 status if point history record with specified ID is not found
 *  - 500 status if server error occurs during retrieval
 */
export async function GET(
    request: NextRequest, 
    {params}: { params: { pointHistoryID?: string } }
): Promise<NextResponse> {
    const pointHistoryID = params?.pointHistoryID;
    const pointHistoryInt = pointHistoryID ? parseInt(pointHistoryID, 10) : NaN;

    if(!pointHistoryID || isNaN(pointHistoryInt)){
        return Response.badRequestResponse(400);
    }
    
    try{
        const pointHistory = await Service.findPointHistory(pointHistoryInt);
        
        if (!pointHistory) {
            return Response.notFoundResponse(404);
        }

        return Response.successReponse(pointHistory, 200);

    } catch(error){
        // This is temporarily approach, it will be handle in Logging entry later on
        console.error('Server error:', error);
        return Response.serverErrorReponse(500);
    }
}