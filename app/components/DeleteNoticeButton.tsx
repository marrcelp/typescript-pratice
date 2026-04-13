'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

export function DeleteNoticeButton({id}: {id: string}) {

    const [message, setMessage] = useState('');
    const router = useRouter();

    async function handleDelete() {

        const response = await fetch (`/api/notices/${id}`, {method: 'DELETE'});

        if (response.ok){
            router.refresh();
        }

        if (!response.ok){
            setMessage('Wystąpił błąd podczas usuwania ogłoszenia')
        }

    }

    return (
        <>
            <button onClick={handleDelete}>Usuń</button>
            {message && <span>{message}</span>}
        </>
    )

}