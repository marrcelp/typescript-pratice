import { TenantCounter } from "../components/TenantCounter";
import { AddTenantForm } from "../components/AddTenantForm";
import Link from "next/link";

interface Tenant {
    id: string,
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
            <h1>Dodaj nowego najemcę:</h1>
            <AddTenantForm/>
            <br></br>
            <TenantCounter/>
            <h1>Lista najemców:</h1>
            <ul>
                {tenants.map((tenant: Tenant) => <li key={tenant.id}><Link href={`/tenants/${tenant.id}`}>{tenant.name}</Link></li> )}
            </ul>
        </main>
    )
}