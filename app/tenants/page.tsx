import { TenantCounter } from "../components/TenantCounter";

const fakeTenants = [
    { id: '1', name: 'Nike' },
    { id: '2', name: 'Adidas' },
    { id: '3', name: 'Zara' },
]

export default async function TenantsPage(){

    const tenants = fakeTenants;

    return (
        <main>
            <TenantCounter/>
            <h1>Lista najemców:</h1>
            <ul>
                {tenants.map((tenant) => <li key={tenant.id}> {tenant.name} </li> )}
            </ul>
        </main>
    )
}