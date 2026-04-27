'use client';

export default function Error({error, reset}: {error: Error, reset: () => void }) {

    return (
        <>
            <p>Wystąpił błąd: {error.message}</p>
            <button onClick={reset}>Spróbuj ponownie</button>
        </>
    )
}