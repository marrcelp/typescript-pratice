'use client'

import { useState } from "react"

export function ChatBox(){

    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [reply, setReply] = useState('');


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);
        setReply('');

        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({message})
        })

        const reader = response.body!.getReader();
        const decoder = new TextDecoder();
    
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const text = decoder.decode(value);
            setReply(prev => prev + text);
        }

        setIsLoading(false);
    }




    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Wpisz swój prompt"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button type='submit' disabled={isLoading}>
                {isLoading? 'Wysyłanie' : 'Wyślij'}
            </button>
            <p>{reply}</p>
        </form>
    )
}