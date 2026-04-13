'use client'

import { useRouter } from "next/navigation";

export function BackButton() {

    const router = useRouter();

    return (
        <button style={{ border: '1px solid white', cursor: 'pointer' }} onClick={() => router.back()}>Wróć</button>
    )
}