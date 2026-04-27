import { NextResponse, NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { supabase } from "@/lib/supabase";

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
})

const tools: Anthropic.Tool[] = [
    {
        name: 'get_tenants',
        description: 'Pobiera listę wszystkich najemców centrum handlowego wraz z piętrem',
        input_schema: { type: 'object', properties: {}, required: [] }
    },
    {
        name: 'get_notices',
        description: 'Pobiera aktywne ogłoszenia centrum handlowego',
        input_schema: { type: 'object', properties: {}, required: [] }
    },
    {
        name: 'get_events',
        description: 'Pobiera nadchodzące wydarzenia w centrum handlowym',
        input_schema: { type: 'object', properties: {}, required: [] }
    },
    {
        name: 'get_parking',
        description: 'Pobiera informacje o parkingach w centrum handlowym',
        input_schema: { type: 'object', properties: {}, required: [] }
    }
];

async function runTool(toolName: string){

    const { data } = await supabase.from(
        toolName === 'get_tenants' ? 'tenants' : 
        toolName === 'get_notices' ? 'notices' : 
        toolName === 'get_events' ? 'events' : 'parking'
    ).select('*');

    return data;
}

export async function POST (request: NextRequest) {

    const body = await request.json();

    const messages: Anthropic.MessageParam[] = body.messages;

    const response = await anthropic.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        tools: tools,
        system: `Jesteś pomocnym asystentem centrum handlowego MallAssistant.
                Odpowiadaj zawsze po polsku.
                Pomagaj klientom znaleźć sklepy, sprawdzić ogłoszenia, wydarzenia i parking.
                Używaj dostępnych narzędzi żeby pobierać aktualne dane.`,
        messages
    })

    if (response.stop_reason === 'tool_use'){
        const toolUse = response.content.find(stop => stop.type === 'tool_use') as Anthropic.ToolUseBlock;
        const toolResult = await runTool(toolUse.name);
        
        const finalResponse = await anthropic.messages.create({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 1024,
            tools: tools,
            messages: [
                ...messages,
                { role: 'assistant', content: response.content },
                { 
                    role: 'user', 
                    content: [{
                        type: 'tool_result',
                        tool_use_id: toolUse!.id,
                        content: JSON.stringify(toolResult)
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

