import { NextRequest, NextResponse } from 'next/server';
import * as Action from '@/action/flyer'

export async function GET(request: NextRequest) { // TODO: request object can be used to authenticate token / header
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