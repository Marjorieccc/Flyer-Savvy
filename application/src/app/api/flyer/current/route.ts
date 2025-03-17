import { NextRequest, NextResponse } from 'next/server';
import * as Action from '@/action/flyer'
import * as Response from '@/lib/http/responses'

/**
 * Retrieves all currently active flyers from the database
 *
 * @param request - The incoming Next.js request
 * @returns A NextResponse containing:
 *  - 200 status with JSON array of current flyers on success
 *  - 404 status if no current flyers are found
 *  - 500 status if server error occurs during retrieval
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
    try{
        const flyers = await Action.findCurrentFlyers()
        
        if (!flyers || flyers.length === 0) {
            return Response.notFoundResponse(404);
        }

        return Response.successReponse(flyers, 200);

    } catch(error){
        // This is temporarily approach, it will be handle in Logging entry later on
        console.error('Server error:', error);
        return Response.serverErrorReponse(500);
    }
}