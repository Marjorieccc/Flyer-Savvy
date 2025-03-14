import { NextRequest, NextResponse } from 'next/server';
import * as Action from '@/action/priceHistory'

export async function GET(request: NextRequest, {params}:{ params: { priceHistoryID?: string } }) {
    const priceHistoryID = params?.priceHistoryID;
    const priceHistoryIDInt = priceHistoryID ? parseInt(priceHistoryID, 10) : NaN;
    if(!priceHistoryID || isNaN(priceHistoryIDInt)){
        return new NextResponse(JSON.stringify({ message: 'Price history ID is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }
    try{
        const priceHistory = await Action.findPriceHistory(priceHistoryIDInt);
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