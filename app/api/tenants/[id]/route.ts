import { NextRequest, NextResponse } from "next/server";

import { tenants } from '../data';
import { supabase } from "@/lib/supabase";

// export async function GET (request: NextRequest, {params}: {params: Promise<{id: string}>}) {
//     const {id} = await params;
//     const tenant = tenants.find(tenant => tenant.id === id);

//     if (!tenant){
//         return NextResponse.json(
//             { error: 'Nie znaleziono najemcy o podanym id'},
//             {status: 404}
//         )
//     }
//     return NextResponse.json(tenant);
// }


export async function GET (request: NextRequest, {params}: {params: Promise<{id: string}>}){

    const {id} = await params;
    const { data, error } = await supabase
        .from('tenants')
        .select('*')
        .eq('id', id)
        .single();

    if(error) {
        return NextResponse.json({error: 'Nie znaleziono najemcy o podanym id!'}, {status: 404})
    }

    return NextResponse.json(data);
}


// Mini Projekt — "Tenant Manager"
// Dodaj do projektu operację usuwania najemcy. To wymaga połączenia wszystkiego naraz:
// Zadanie 1 — DELETE endpoint
// W app/api/tenants/[id]/route.ts dodaj nową metodę DELETE która usuwa najemcę o podanym id z tablicy. Jeśli nie istnieje → 404.
// Zadanie 2 — Przycisk "Usuń" na liście
// W app/tenants/page.tsx obok każdego najemcy dodaj przycisk "Usuń". Kliknięcie powinno wywołać DELETE /api/tenants/[id] i odświeżyć listę.

// 💡 Wskazówka do Zadania 2: Przycisk będzie potrzebował onClick → Client Component. Możesz stworzyć osobny komponent DeleteButton.tsx (tak jak zrobiłeś BackButton.tsx) żeby nie zamieniać całej strony w Client Component.

// Zadanie 3 — Obsługa błędu usuwania
// Co jeśli DELETE się nie uda? Dodaj prosty komunikat błędu — np. useState z tekstem który pojawia się gdy !response.ok.
// Pokaż mi kod gdy będziesz gotowy! 🚀

// export async function DELETE (request: NextRequest, {params}: {params: Promise<{id: string}>}) {
//     const {id} = await params;
//     const tenant = tenants.find(tenant => tenant.id === id);

//     if (!tenant) {
//         return NextResponse.json(
//             { error: 'Nie znaleziono najemcy o podanym id - nie udało się usunąć najemcy'},
//             {status: 404}
//         )
//     }

//     const deletedTenant = tenants.findIndex(tenant => tenant.id === id);
//     tenants.splice(deletedTenant, 1)
//     return NextResponse.json(
//             {message: 'Usunięto najemcę o podanym id',
//              tenants: tenants
//             }
//         )
    

// }

export async function DELETE(request: NextRequest, {params}: {params: Promise<{id: string}>}){

    const { id } = await params;
    const { data, error } = await supabase
        .from('tenants')
        .delete()
        .eq('id', id)

    if (error){
        return NextResponse.json({error: 'Nie udało się usunąc najemcy o podanym id'}, {status: 404})
    }

    return NextResponse.json('Pomyślnie usunięto najemcę o podanym id', {status: 200});
}


export async function PATCH(request: NextRequest, {params}: {params: Promise<{id: string}>}){

    const body = await request.json();

    const { id } = await params;
    const { data, error } = await supabase
        .from('tenants')
        .update({name: body.name, floor: body.floor})
        .eq('id', id)

    if (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

    return NextResponse.json('Pomyslnie wprowadzono zmiany do najemcy o podanym id', {status: 200});
}