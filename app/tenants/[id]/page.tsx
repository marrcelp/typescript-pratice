export default async function TenantPage({ params }: {params: Promise<{id: string}>}){

    const { id } = await params;
    return (
        <main>
            <h1>Najemca o id: {id} </h1>
        </main>
    )
}