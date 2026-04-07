'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"



interface Props {
    id: string
}

export function DeleteTenantButton({id}: Props) {

    const [message, setMessage] = useState('');
    const router = useRouter()

    async function handleDelete(){
        const response = await fetch (`/api/tenants/${id}`, { method: 'DELETE'})

        if (response.ok){
            router.refresh();
        }

        if(!response.ok){
            setMessage('Wystąpił błąd podczas usuwania najemcy.')
        }
    }

    return (
        <>
            <button style={{color: 'red'}} onClick={handleDelete}>Usuń Najemcę</button>
            {message && <span>{message}</span>}
        </>
    )
}
