import { NextRequest, NextResponse } from 'next/server';
import * as Action from '@/action/pointHistory'

export async function GET(request: NextRequest, {params}:{ params: { pointHistoryID?: string } }) {
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