import { NextResponse } from "next/server";

const isLoggedIn = true

export function middleware(request) {
    if(!isLoggedIn) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/",
        "/storage",
        "/transaction",
        "/transactions-history",
        "/settings",
    ],
}