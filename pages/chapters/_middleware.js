import { NextResponse } from "next/server";
import redis from "../../utils/redis_client";

export async function middleware(req, ev) {
    const slug = req.nextUrl.pathname.split("/").pop();
    const ip = req.ip;
    const originUrl = `${req.url.split("/")[0]}//${req.url.split("/")[2]}`;

    if ((await redis.get(`${ip}:${slug}`)) === null) {
        await fetch(`${originUrl}/api/views`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ slug, ip }),
        });
    }

    return NextResponse.next();
}
