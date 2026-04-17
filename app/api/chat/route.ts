import { NextResponse, NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { tenants } from "../tenants/data";

const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
})

const tools = [{
    name: 'get_tenants',
    description: 'Pobiera liste wszystkich najemców centrum handlowego z ich piętrem',
    input_schema: {
        type: 'object' as const,
        properties: {},
        required: []
    }
}]

export async function POST (request: NextRequest) {

    const body = await request.json();

    // const stream = client.messages.stream({
    //     model: 'claude-haiku-4-5-20251001',
    //     max_tokens: 1024,
    //     messages: body.messages,
    //     system: `Jesteś pomocnym asystentem centrum handlowego.
    //             Odpowiadaj zawsze po polsku.
    //             Oto lista sklepów w centrum:
    //             - Nike (piętro 1)
    //             - Adidas (piętro 2)
    //             - Zara (piętro 1)
    //             Pomagaj klientom znaleźć sklepy i odpowiadaj na pytania o centrum.`
    // })

    const response = await client.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        messages: body.messages,
        tools: tools,
        system: `Jesteś pomocnym asystentem centrum handlowego.
                Odpowiadaj zawsze po polsku.
                Pomagaj klientom znaleźć sklepy i odpowiadaj na pytania o centrum.`
    })

    if (response.stop_reason === 'tool_use'){
        const toolUse = response.content.find(b => b.type === 'tool_use');

        const tenantsData = tenants;

        
        const finalResponse = await client.messages.create({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 1024,
            tools: tools,
            messages: [
                ...body.messages,
                { role: 'assistant', content: response.content },
                { 
                    role: 'user', 
                    content: [{
                        type: 'tool_result',
                        tool_use_id: toolUse!.id,
                        content: JSON.stringify(tenantsData)
                    }]
                }
            ]
        });


        return NextResponse.json({ reply: (finalResponse.content[0] as Anthropic.TextBlock).text });

    }

    return NextResponse.json({ 
        reply: (response.content[0] as Anthropic.TextBlock).text 
    });
}

    // const readableStream = new ReadableStream({
    //     async start(controller) {
    //         for await (const chunk of stream) {

    //             if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
    //                 controller.enqueue(chunk.delta.text);
    //             }
    //         }
    //         controller.close();
    //     }
    // });

    // return new Response(readableStream, {
    //     headers: {'Content-Type': 'text/plain; charset=utf-8'}
    // })
// }