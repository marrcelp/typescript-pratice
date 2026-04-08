import { NextResponse, NextRequest } from "next/server";
import { notices } from "../data";

export async function GET(_request: NextRequest, {params}: {params: Promise<{id: string}>}){

    const {id} = await params;
    const notice = notices.find(notice => notice.id === id)

    if (!notice) {
        return NextResponse.json(
            {error: 'Nie znaleziono ogłoszenia o podanym id'},
            {status: 404}
        )
    }

    return NextResponse.json(notice);

}

export async function DELETE(_request: NextRequest, {params}: {params: Promise<{id: string}>}){

    const {id} = await params;
    const notice = notices.findIndex(notice => notice.id === id)
    
    if (notice === -1) {
        return NextResponse.json(
            {error: 'Nie znaleziono ogłoszenia o podanym id'},
            {status: 404}
        )
    }

    notices.splice(notice, 1);
    return NextResponse.json(
        {
            message: 'Usunięto ogłoszenie o podanym id',
            notices: notices
        }
    )

}

export async function PATCH (request: NextRequest, {params}: {params: Promise<{id: string}>}){

    const body = await request.json();
    const { id } = await params;
    const notice = notices.find(notice => notice.id === id)

    if (!notice) {
        return NextResponse.json(
            {error: 'Nie znaleziono ogłoszenia o podanym id'},
            {status: 404}
        )
    }
    
    notice.isRead === true;
    notice.title = body.title ?? notice.title;
    notice.content = body.content ?? notice.content;

    return NextResponse.json(notice);

    
}