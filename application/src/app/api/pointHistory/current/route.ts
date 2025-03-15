import { NextRequest, NextResponse } from 'next/server';
import * as Action from '@/action/pointHistory'

/**
 * Retrieves all current point history records from the database
 *
 * @param request - The incoming Next.js request
 * @returns A NextResponse containing:
 *  - 200 status with JSON array of current point history records on success
 *  - 404 status if no current point history records are found
 *  - 500 status if server error occurs during retrieval
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
    try{
        const pointHistories = await Action.findCurrentPointHistory()
        if (!pointHistories || pointHistories.length === 0) {
            return new NextResponse(JSON.stringify({ message: 'No current point records found' }), {
              status: 404,
              headers: { 'Content-Type': 'application/json' },
            });
          }
        return new NextResponse(JSON.stringify(pointHistories), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch(error){
        return new NextResponse(JSON.stringify({ error: `Failed to get point records : ${error}` }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}