import { BackButton } from "../../components/BackButton";
interface Tenant {
    id: string,
    name: string,
    floor: number,
}

export default async function TenantPage({ params }: {params: Promise<{id: string}>}){

    const { id } = await params;
    
    const response = await fetch(`http://localhost:3000/api/tenants/${id}`);

    if (!response.ok) {
        <p>Nie znaleziono najemcy o podanym id</p>
    }

    const tenant: Tenant = await response.json();
    return (
        <main>
            <h1>Najemca o id: {id} </h1>
            <p>Nazwa: {tenant.name}</p>
            <p>Piętro: {tenant.floor}</p>
            <BackButton/>
        </main>
    )
}