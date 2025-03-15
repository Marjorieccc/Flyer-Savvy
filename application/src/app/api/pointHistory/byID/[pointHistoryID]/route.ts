import { NextRequest, NextResponse } from 'next/server';
import * as Action from '@/action/pointHistory'

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
        return new NextResponse(JSON.stringify({ message: 'Point history ID is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }
    try{
        const pointHistory = await Action.findPointHistory(pointHistoryInt);
        if (!pointHistory) {
            return new NextResponse(JSON.stringify({ message: 'Point history record not found' }), {
              status: 404,
              headers: { 'Content-Type': 'application/json' },
            });
          }

        return new NextResponse(JSON.stringify(pointHistory), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch(error){
        return new NextResponse(JSON.stringify({ error: `Failed to get Point history record : ${error}` }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
    }
}