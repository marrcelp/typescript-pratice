import { NextResponse, NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
})

export async function POST (request: NextRequest) {

    const body = await request.json();

    const stream = client.messages.stream({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        messages: [
            { role: 'user', content: body.message }

        ]
    })

    const readableStream = new ReadableStream({
        async start(controller) {
            for await (const chunk of stream) {

                if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
                    controller.enqueue(chunk.delta.text);
                }
            }
            controller.close();
        }
    });

    return new Response(readableStream, {
        headers: {'Content-Type': 'text/plain; charset=utf-8'}
    })
}