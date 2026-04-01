'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AddTenantForm(){
    
    const [name, setName] = useState('');
    const [floor, setFloor] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent){


        e.preventDefault();
        setIsLoading(true);

        const response = await fetch('/api/tenants', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({name, floor: Number(floor)})
        });

        if (response.ok) {
            setName('');
            setFloor('');
            router.refresh();
        }
        setIsLoading(false);

    }

    return(
        <form onSubmit={handleSubmit}>
            <input
                value = {name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nazwa Najemcy"
                type="text"
            />
            <input
                value = {floor}
                onChange={(e) => setFloor(e.target.value)}
                placeholder="Piętro"
                type="number"
            />
            <button type="submit">Dodaj</button>
        </form>
    )

}