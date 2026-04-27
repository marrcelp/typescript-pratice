// 🎯 Zadanie praktyczne
// Otwórz projekt typescript-sandbox w VS Code. Utwórz plik app/types-practice.ts i napisz w nim:

// Interface Mall (galeria handlowa) z polami: id: string, name: string, city: string, totalArea: number, isOpen: boolean
// Interface Tenant (najemca) z polami: id, name, mallId (string — do której galerii należy), floor: number, category — unia: "fashion" | "food" | "electronics" | "services"
// Funkcję describeTenant która przyjmuje Tenant i zwraca string — np. "H&M (fashion) — piętro 1"
// Tablicę tenants: Tenant[] z 2-3 przykładowymi najemcami

interface Mall {
    id: string;
    name: string;
    city: string;
    totalArea: number;
    isOpen: boolean;   
}

type Category = "fashion" | "food" | "electronics" | "services"

interface Tenant {
    id: string;
    name: string;
    mallId: string;
    floor: number;
    category: Category;
}


function describeTenant({id, name, mallId, floor, category}: Tenant): string {
    return `Najemca ${name} zaklasyfikowany jest do kategorii ${category}, sklep zlokalizowany jest na ${floor} piętrze`;
}

const tenants: Tenant[] = [
    {
        id: '1',
        name: "Nike",
        mallId: '33',
        floor: 1,
        category: 'fashion',
    }, 
    {
        id: '2',
        name: 'Adidas',
        mallId: '54',
        floor: 0,
        category: 'fashion',
    }, 
    {
        id: '3',
        name: 'McDonalds',
        mallId: '110',
        floor: 2,
        category: 'food',
    },
]

console.log(describeTenant(tenants[0]));

export type { Tenant, Category }  // typy — osobno
export { tenants }                // wartości — osobno