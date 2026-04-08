import { NextResponse, NextRequest } from "next/server";
import { notices } from "./data";

export async function GET() {
    return NextResponse.json(notices);
}

export async function POST(request: NextRequest) {

    const body = await request.json();

    const newNotice = {
        id: (Math.floor(Math.random() * 99 + 1)).toString(),
        title: body.title,
        content: body.content,
        isRead: false
    }

    notices.push(newNotice);

    return NextResponse.json(newNotice, {status: 201});
}