import { NextRequest, NextResponse } from 'next/server';
import * as Action from '@/action/priceHistory'

export async function GET(request: NextRequest) {
    try{
        const priceHistories = await Action.findCurrentPriceHistory()
        if (!priceHistories || priceHistories.length === 0) {
            return new NextResponse(JSON.stringify({ message: 'No current price records found' }), {
              status: 404,
              headers: { 'Content-Type': 'application/json' },
            });
          }
        return new NextResponse(JSON.stringify(priceHistories), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch(error){
        return new NextResponse(JSON.stringify({ error: `Failed to get price records : ${error}` }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}