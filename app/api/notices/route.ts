import { NextResponse, NextRequest } from "next/server";
import { notices } from "./data";
import { supabase } from "@/lib/supabase";

// export async function GET() {
//     return NextResponse.json(notices);
// }

export async function GET(){

    const { data, error} = await supabase
        .from('notices')
        .select('*')

    if (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

    return NextResponse.json(data);
}

// export async function POST(request: NextRequest) {

//     const body = await request.json();

//     const newNotice = {
//         id: (Math.floor(Math.random() * 99 + 1)).toString(),
//         title: body.title,
//         content: body.content,
//         isRead: false
//     }

//     notices.push(newNotice);

//     return NextResponse.json(newNotice, {status: 201});
// }

export async function POST(request: NextRequest){

    const body = await request.json();

    const {data, error} = await supabase
        .from('notices')
        .insert({ title: body.title, content: body.content})

    if (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

    return NextResponse.json('Pomyslnie dodano nowe ogloszenie!', {status: 201})

}

