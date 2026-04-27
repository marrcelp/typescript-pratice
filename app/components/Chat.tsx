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



    return (
        <>
        </>
    )
}

