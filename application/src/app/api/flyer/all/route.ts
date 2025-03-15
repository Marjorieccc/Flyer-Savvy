import { NextRequest, NextResponse } from 'next/server';
import * as Action from '@/action/flyer'


/**
 * Retrieves all flyers from the database
 *
 * @param request - The incoming Next.js request
 * @returns A NextResponse containing:
 *  - 200 status with JSON array of all flyers on success
 *  - 404 status if no flyers are found
 *  - 500 status if server error occurs during retrieval
*/
export async function GET(request: NextRequest):Promise<NextResponse>  { 
    try{
        const flyers = await Action.findAllFlyers();
        if (!flyers || flyers.length === 0) {
            return new NextResponse(JSON.stringify({ message: 'No flyers found' }), {
              status: 404,
              headers: { 'Content-Type': 'application/json' },
            });
          }
        return new NextResponse(JSON.stringify(flyers), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch(error){
        return new NextResponse(JSON.stringify({ error: `Failed to get flyers : ${error}` }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}