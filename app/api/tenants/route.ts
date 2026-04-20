// 🎯 Zadanie praktyczne

// Stwórz app/api/tenants/route.ts z:

// tablicą najemców w pamięci (3-4 obiekty z id, name, floor)
// handlerem GET zwracającym całą tablicę
// handlerem POST przyjmującym name i floor, tworzącym nowego najemcę z losowym id i dodającym go do tablicy


// Stwórz app/api/tenants/[id]/route.ts z:

// handlerem GET zwracającym jednego najemcę po id lub 404 gdy nie istnieje


// Przetestuj w przeglądarce — wejdź na localhost:3000/api/tenants i localhost:3000/api/tenants/1
// Zaktualizuj app/tenants/page.tsx — zamiast JSONPlaceholder pobieraj dane z własnego endpointu /api/tenants

// import { NextResponse, NextRequest } from 'next/server';
// import { tenants } from './data';



// export async function GET(){

//     return NextResponse.json(tenants);
// }


// export async function POST(request: NextRequest){

//     const body = await request.json();

//     const newTenant = {
//         id: Math.random().toFixed(2).toString(),
//         name: body.name,
//         floor: body.floor
//     }

//     tenants.push(newTenant);

//     return NextResponse.json(newTenant, {status: 201});
// }


import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(){

    const {data, error} = await supabase
        .from ('tenants')
        .select('*')

        if (error) {
            return NextResponse.json({error: error.message}, {status: 500})
        }

    return NextResponse.json(data);
}

export async function POST(request: NextRequest){

    const body = await request.json();

    const { data, error } = await supabase
        .from('tenants')
        .insert({ name: body.name, floor: body.floor })

        if (error) {
            return NextResponse.json({error: error.message}, {status: 500})
        }

        return NextResponse.json('Pomyslnie dodano nowego najemcę!', {status: 201})
}