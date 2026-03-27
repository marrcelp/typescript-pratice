import { TenantCounter } from "../components/TenantCounter";

interface User {
    id: number,
    name: string,
}

export default async function TenantsPage(){

    const response = await fetch('http://localhost:3000/api/tenants/');

    if (!response.ok) {
        throw new Error (`Wystapil blad`);
    }

    const tenants = await response.json();


    return (
        <main>
            <TenantCounter/>
            <h1>Lista najemców:</h1>
            <ul>
                {tenants.map((tenant: User) => <li key={tenant.id}> {tenant.name} </li> )}
            </ul>
        </main>
    )
}