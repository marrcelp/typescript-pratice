'use client'

import { useState } from "react"

interface Message {
    role: 'user' | 'assistant',
    content: string
}

export function FaqBox(){

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);


    async function handleSubmit(e: React.FormEvent){

        e.preventDefault();
        setIsLoading(true);

        const newMessages = [...messages, {role: 'user' as const, content: message}];

        setMessages([...newMessages, {role: 'assistant' as const, content: ''}]);

        const response = await fetch('/api/faq', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                messages: newMessages
            })
        })

        // const reader = response.body!.getReader();
        // const decoder = new TextDecoder();

        // while (true) {
        //     const {done, value} = await reader.read();
        //     if (done) break;
        //     const text = decoder.decode(value);

        //     setMessages(prev => {
        //         const updated = [...prev];
        //         updated[updated.length-1] = {
        //             role: 'assistant',
        //             content: updated[updated.length-1].content + text
        //         }
        //         return updated;
        //     })
        // }

        const data = await response.json();
        
        setMessages(prev => {
            const updated = [...prev];
            updated[updated.length-1] = {
                role: 'assistant',
                content: data.reply
            };

            return updated;
        })

        setIsLoading(false);
        setMessage('');
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
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>
                        <strong>{msg.role === 'user' ? 'Ty' : 'Claude'}</strong>
                        {msg.content}
                    </li>
                ))}
            </ul>
        </form>
    )
}