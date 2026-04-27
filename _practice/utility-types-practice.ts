// 🎯 Zadanie praktyczne
// Używając interfejsów Mall i Tenant z Lekcji 1, napisz w nowym pliku app/utility-types-practice.ts:

// NewTenant — typ do tworzenia nowego najemcy (bez id)

// TenantUpdate — typ do aktualizacji najemcy (bez id, wszystkie pola opcjonalne)

// TenantPreview — typ z samymi polami name i category (do wyświetlania na liście)

// CategoryStats — słownik gdzie klucz to Category, a wartość to number (liczba najemców). 
// Utwórz przykładowy obiekt z danymi.

// Funkcję createTenant — przyjmuje NewTenant, zwraca Tenant (dodaje id wewnątrz funkcji,
//  np. id: Math.random().toString())

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

type NewTenant = Omit<Tenant, "id">;

type TenantUpdate = Omit<Partial<Tenant>, "id">;

type TenantPreview = Pick<Tenant, "name" | "category">;

type CategoryStats = Record<Category, number>;

const stats: CategoryStats = {
    fashion: 3,
    food: 5,
    electronics: 2,
    services: 9,
}

function createTenant(tenant: NewTenant): Tenant {
    return {
        ...tenant,
        id : Math.random().toString()
    }

}

const newTenant = createTenant({
    name: 'Carhart',
    mallId: '333', 
    floor: 1,
    category: 'fashion'

});

console.log(newTenant);