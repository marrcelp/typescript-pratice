import { BackButton } from "@/app/components/BackButton";

interface Notice {
    title: string,
    content: string
}

export default async function NoticePage({params}: {params: Promise<{id: string}>}){

    const { id } = await params;

    const response = await fetch(`http://localhost:3000/api/notices/${id}`);

    if (!response.ok) {
        return <p>Nie znaleziono ogłoszenia o podanym id</p>
    }

    const notice: Notice = await response.json();

    return (
        <main>
            <h1>Ogłoszenie o id: {id} </h1>
            <p>Tytuł: {notice.title}</p>
            <p>Treść: {notice.content}</p>
            <BackButton/>
        </main>
    )
}