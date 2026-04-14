import { NextResponse, NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
})

export async function POST (request: NextRequest) {

    const body = await request.json();

    const response = await client.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        messages: [
            { role: 'user', content: body.message }

        ]
    })

    return NextResponse.json({
    reply: (response.content[0] as Anthropic.TextBlock).text
})
}