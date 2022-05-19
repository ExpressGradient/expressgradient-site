import { NextResponse } from "next/server";
import redis from "../../utils/redis_client";
import { URL } from "url";

export async function middleware(req, ev) {
    const slug = req.nextUrl.pathname.split("/").pop();
    const ip = req.ip;
    const baseURL = new URL("/", req.url);

    if ((await redis.get(`${ip}:${slug}`)) === null) {
        await fetch(`${baseURL.origin}/api/views`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ slug, ip }),
        });
    }

    return NextResponse.next();
}
