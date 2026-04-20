import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { openingHours, parking, events } from "./data";

const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
})

const tools = [
    {
        name: 'get_opening_hours',
        description: 'Pobiera godziny i dni otwarcia sklepów w galerii',
        input_schema: {
            type: 'object' as const,
            properties: {},
            required: [],
        }
    },
    {
        name: 'get_parking',
        description: 'Pobiera ilość miejsc parkingowych oraz rodzaj dla danego parkingu w centrum handlowym',
        input_schema: {
            type: 'object' as const,
            properties: {},
            required: [],
        }
    },
    {
        name: 'get_events',
        description: 'Pobiera zaplanowane wydarzenia w centrum handlowym',
        input_schema: {
            type: 'object' as const,
            properties: {},
            required: [],
        }
    }
]

export async function POST (request: NextRequest) {

    const body = await request.json();

    const response = await client.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        messages: body.messages,
        tools: tools,
        system: `Jesteś pomocnym asystentem centrum handlowego.
                Odpowiadaj zawsze po polsku.
                Pomagaj klientom uzyskiwać informacje na temat centrum hanbdlowego i odpowiadaj na pytania o centrum.`
    })

    if (response.stop_reason === 'tool_use'){
        const toolUse = response.content.find(item => item.type === 'tool_use');

        let data;

        if (toolUse!.name === 'get_opening_hours'){
            data = openingHours
        }
        else if (toolUse!.name === 'get_parking'){
            data = parking
        } 
        else if (toolUse!.name === 'get_events'){
            data = events
        }

        const finalResponse = await client.messages.create({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 1024,
            tools: tools,
            messages: [
                ...body.messages, 
                { role: 'assistant', content: response.content},
                {
                    role: 'user',
                    content: [{
                        type: 'tool_result',
                        tool_use_id: toolUse!.id,
                        content: JSON.stringify(data)
                    }]
                }
            ]
        });

        return NextResponse.json({ reply: (finalResponse.content[0] as Anthropic.TextBlock).text });
    }

    return NextResponse.json({
        reply: (response.content[0] as Anthropic.TextBlock).text
    })
}