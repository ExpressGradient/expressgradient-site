import { NextResponse } from "next/server";
import redis from "../../utils/redis_client";

export async function middleware(req, ev) {
    const slug = req.nextUrl.pathname.split("/").pop();
    const ip = req.ip;

    if ((await redis.get(`${ip}:${slug}`)) === null) {
        await redis.setex(`${ip}:${slug}`, 360, "1");
        await redis.incr(`expressgradient:${slug}`);
    }

    return NextResponse.next();
}
