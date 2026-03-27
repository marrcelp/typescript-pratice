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