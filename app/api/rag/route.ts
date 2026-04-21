import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
})

const supabase = createClient(

    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest){

    const body = await request.json();
    const userPrompt = body.question;

    const embeddingResponse = await fetch ('https://api.voyageai.com/v1/embeddings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.VOYAGE_API_KEY}`
        },
        body: JSON.stringify({
            model: 'voyage-3',
            input: userPrompt
        })
    });

    const embeddingJson = await embeddingResponse.json() as { data: { embedding: number[] }[]}
    const questionEmbedding = embeddingJson.data[0].embedding;


    const { data: notices, error} = await supabase.rpc('match_notices', {
        query_embedding: questionEmbedding,
        match_count: 3
    });

    if ( error ) { 
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const context = notices
        .map((n: { title: string, content: string}) => `${n.title}: ${n.content}`)
        .join('\n\n');
}
// O CO TU CHODZI? ^