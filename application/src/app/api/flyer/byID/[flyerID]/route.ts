import { NextRequest, NextResponse } from 'next/server';
import * as Action from '@/action/flyer'

export async function GET(request: NextRequest, { params }:{ params: { flyerID?: string } }) {
    const flyerID = params?.flyerID;
    const flyerIDInt = flyerID ? parseInt(flyerID, 10) : NaN;
    if(!flyerID || isNaN(flyerIDInt)){
        return new NextResponse(JSON.stringify({ message: 'Flyer ID is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }
    try{
        const flyer = await Action.findFlyer(flyerIDInt);
        if (!flyer) {
            return new NextResponse(JSON.stringify({ message: 'Flyer not found' }), {
              status: 404,
              headers: { 'Content-Type': 'application/json' },
            });
          }

        return new NextResponse(JSON.stringify(flyer), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch(error){
        return new NextResponse(JSON.stringify({ error: `Failed to get flyer : ${error}` }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
    }
}