import { NextRequest, NextResponse } from 'next/server';
import * as Action from '@/action/pointHistory'

export async function GET(request: NextRequest) {
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