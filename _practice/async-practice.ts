// 🎯 Zadanie praktyczne
// Utwórz plik app/async-practice.ts i napisz:

// 1. Funkcję delay(ms: number): Promise<void> — zwraca Promise który rozwiązuje się po ms milisekundach. Użyj new Promise(resolve => setTimeout(resolve, ms)).

// 2. Funkcję fetchFakeTenant(id: string): Promise<{id: string, name: string}> — symuluje pobieranie najemcy z API. Wewnątrz używa await delay(100) żeby zasymulować opóźnienie sieci, 
// potem zwraca obiekt { id, name: 'Tenant ' + id }.

// 3. Funkcję fetchAllTenants(): Promise<{id: string, name: string}[]> — używa Promise.all żeby pobrać najemców o id '1', '2', '3' równolegle. Zmierz czas przez console.time('fetch') 
// przed i console.timeEnd('fetch') po — powinno być ~100ms, nie ~300ms.

// 4. Funkcję safeFetch(id: string) — używa try/catch. Jeśli id === 'error' — rzuć błąd przez throw new Error('Nie znaleziono'). W catch wypisz błąd w konsoli i zwróć null.

function delay(ms: number): Promise<void>{

    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchFakeTenant(id: string): Promise<{id: string, name: string}>{
    await delay(100);
    return {id: id, name: 'Tenant' + id};
}


async function fetchAllTenants(): Promise<{id: string, name: string}[]>{
    console.time('fetch');

    const tenants = await Promise.all([
        fetchFakeTenant('1'),
        fetchFakeTenant('2'),
        fetchFakeTenant('3')
    ]);

    console.timeEnd('fetch');
    return tenants;
}

async function safeFetch(id: string){
    try {
        
        if(id === 'error') {
            throw new Error('Nie znaleziono');
        }
        const tenant = await fetchFakeTenant(id);
        return tenant;

    } catch {
        console.error('Wystapil blad');
        return null;
    }
}


// test fetchAllTenants
fetchAllTenants().then(tenants => console.log(tenants))

// test safeFetch — dobre id
safeFetch('1').then(result => console.log(result))

// test safeFetch — złe id
safeFetch('error').then(result => console.log(result))