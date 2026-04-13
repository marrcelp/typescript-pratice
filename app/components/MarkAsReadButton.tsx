'use client'

import { useRouter } from "next/navigation"

interface Props {
    id: string
    isRead: boolean
}

export function MarkAsReadButton({ id, isRead }: Props) {
    const router = useRouter();

    async function handlePatch() {
        const response = await fetch(`/api/notices/${id}`, { 
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isRead: true })  
        });

        if (response.ok) {
            router.refresh();
        }
    }

    if (isRead) return null; // ← jeśli już przeczytane, nie renderuj przycisku

    return (
        <button onClick={handlePatch}>Oznacz jako przeczytane</button>
    )
}