import { NextResponse } from "next/server";

export function jsonResponse (data: any, status : number = 200):NextResponse {
    return NextResponse.json(data, {
        status,
        headers: { 'Content-Type': 'application/json' }
      });
}

export function successReponse(data: any, status:number):NextResponse {
    return jsonResponse(data, status);
}

export function badRequestResponse(status : number): NextResponse {
    return jsonResponse({ success: false }, status);
}

export function notFoundResponse(status : number): NextResponse {
    return jsonResponse({ success: false }, status);
}

export function serverErrorReponse(status : number):NextResponse {
    return jsonResponse({ success: false }, status);
}