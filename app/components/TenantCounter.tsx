'use client'

import { useState } from 'react';

export function TenantCounter () {

    const [count, setCount] = useState(0);
    
    return (
        <>
            <button onClick ={() => setCount(count + 1)}>Pokaz szczegóły</button>
            <p>Button kliknięto: {count} razy</p>
        </>
    )
}