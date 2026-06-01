'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserSupabaseClient } from '@/lib/supabase'

export default function LoginPage() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        const supabase = createBrowserSupabaseClient()

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            setError('Nieprawidłowy email lub hasło')
            setIsLoading(false)
            return
        }

        router.push('/dashboard')
    }

    return (
        <main>
            <h1>Panel admina</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Hasło"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Logowanie...' : 'Zaloguj'}
                </button>
                {error && <p>{error}</p>}
            </form>
        </main>
    )
}