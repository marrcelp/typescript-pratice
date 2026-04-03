import { NextRequest, NextResponse } from "next/server";

const tenants = [
    { id: '1', name: 'Nike', floor: 1 },
    { id: '2', name: 'Adidas', floor: 2 },
    { id: '3', name: 'Zara', floor: 1 },
]

export async function GET (request: NextRequest, {params}: {params: Promise<{id: string}>}) {
    const {id} = await params;
    const tenant = tenants.find(tenant => tenant.id === id);

    if (!tenant){
        return NextResponse.json(
            { error: 'Nie znaleziono najemcy o podanym id'},
            {status: 404}
        )
    }
    return NextResponse.json(tenant);
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

export async function DELETE (request: NextRequest, {params}: {params: Promise<{id: string}>}) {
    const {id} = await params;
    const tenant = tenants.find(tenant => tenant.id === id);

    if (!tenant) {
        return NextResponse.json(
            { error: 'Nie znaleziono najemcy o podanym id - nie udało się usunąć najemcy'},
            {status: 404}
        )
    }

    const deletedTenant = tenants.findIndex(tenant => tenant.id === id);
    tenants.splice(deletedTenant, 1)
    return NextResponse.json(
            {message: 'Usunięto najemcę o podanym id',
             tenants: tenants
            }
        )
    

}