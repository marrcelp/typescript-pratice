'use client'

import { useState } from "react";

interface Message {
    role: 'assistant' | 'user',
    content: string
}

export function Chat(){

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();
        setIsLoading(true);

        const newMessages = [...messages, {role: 'user' as const, content: message}];

        setMessages([...newMessages, {role: 'assistant' as const, content: ''}]);

        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                messages: newMessages
            })
        })

        
        const data = await response.json();

        setMessages(prev => {
            const updated = [...prev];
            updated[updated.length-1] = {
                role: 'assistant',
                content: data.reply
            }
            return updated;
        })
        

        setIsLoading(false);
        setMessage('');
    }



    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Wiadomość"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit" disabled={isLoading}>
                {isLoading? 'Wysyłanie' : 'Wyślij'}
            </button>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>
                        <strong>{msg.role === 'user' ? 'Ty' : 'Asystent'}</strong>
                        {msg.content}
                    </li>
                ))}
            </ul>
        </form>
    )
}

