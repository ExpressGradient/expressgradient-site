import { NextResponse } from "next/server";
import redis from "../../utils/redis_client";

export async function middleware(req, ev) {
    const slug = req.nextUrl.pathname.split("/").pop();
    const ip = req.ip;

    if ((await redis.get(`${ip}:${slug}`)) === null) {
        await fetch("http://localhost:3000/api/views", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ slug, ip }),
        });
    }

    return NextResponse.next();
}
