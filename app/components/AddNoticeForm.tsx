'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";


export function AddNoticeForm() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {

        e.preventDefault();
        setIsLoading(true);

        const response = await fetch('api/notices', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title, content})
        });

        if (response.ok) {
            e.preventDefault();
            setTitle('');
            setContent(''); 
            router.refresh();
        }
        setIsLoading(false);
    }


    return (
        <form onSubmit={handleSubmit}>
            <input
                value={title}
                type="text"
                placeholder="Tytuł ogłoszenia"
                onChange={(e) => setTitle(e.target.value)}
            />

            <input
                value={content}
                type="text"
                placeholder="Treść ogłoszenia"
                onChange={(e) => setContent(e.target.value)}
            />

            <button type="submit">Dodaj</button>
        </form>
    )
}