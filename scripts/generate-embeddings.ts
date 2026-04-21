import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function generateEmbeddings() {

    // 1. Pobierz wszystkie ogłoszenia bez embeddingu
    const { data: notices, error } = await supabase
        .from('notices')
        .select('id, title, content')
        .is('embedding', null);

    if (error) {
        console.error('Błąd pobierania ogłoszeń:', error);
        return;
    }

    console.log(`Znaleziono ${notices.length} ogłoszeń bez embeddingu`);

    // 2. Dla każdego ogłoszenia wygeneruj embedding i zapisz
    for (const notice of notices) {
        const text = `${notice.title} ${notice.content}`;

        const response = await fetch('https://api.voyageai.com/v1/embeddings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.VOYAGE_API_KEY}`
            },
            body: JSON.stringify({
                model: 'voyage-3',
                input: text
            })
        });

        const json = await response.json() as { data: { embedding: number[] }[] };
        const embedding = json.data[0].embedding;

        const { error: updateError } = await supabase
            .from('notices')
            .update({ embedding })
            .eq('id', notice.id);

        if (updateError) {
            console.error(`Błąd zapisywania embeddingu dla id ${notice.id}:`, updateError);
        } else {
            console.log(`✓ Embedding wygenerowany dla: ${notice.title}`);
        }
    }

    console.log('Gotowe!');
}

generateEmbeddings();