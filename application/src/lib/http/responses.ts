import { NextResponse } from "next/server";

export function jsonResponse (data: any, status : number):NextResponse {
    return NextResponse.json(data, {
        status,
        headers: { 'Content-Type': 'application/json' }
    });
}

export function successReponse(data: any, status:number = 200):NextResponse {
    return jsonResponse(data, status);
}

export function badRequestResponse(status : number = 400): NextResponse {
    return jsonResponse(null, status);
}

export function notFoundResponse(status : number = 404): NextResponse {
    return jsonResponse(null, status);
}

export function serverErrorReponse(status : number = 500):NextResponse {
    return jsonResponse(null, status);
}