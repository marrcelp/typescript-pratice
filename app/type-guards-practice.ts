// 🎯 Zadanie praktyczne
// Utwórz plik app/type-guards-practice.ts:

// Napisz funkcję formatValue(value: string | number | boolean): string która używa typeof i zwraca:

// dla stringa: tekst wielkimi literami
// dla numbera: zaokrąglony do 2 miejsc po przecinku (.toFixed(2))
// dla booleana: "tak" lub "nie"


// Stwórz discriminated union dla stanu ładowania danych:

// LoadingState — type: "loading"
// SuccessState — type: "success", pole tenants: Tenant[]
// ErrorState — type: "error", pole message: string
// Napisz funkcję getStatusMessage(state: FetchState): string która używa switch i zwraca odpowiedni komunikat dla każdego stanu


// Napisz custom type guard isTenant(user: Tenant | Admin): user is Tenant — użyj operatora in żeby sprawdzić czy obiekt ma pole mallId (które ma tylko Tenant)

function formatValue(value: string | number | boolean) {

    if (typeof value === 'string'){
        return value.toUpperCase();
    }
    if (typeof value === 'number'){
        return value.toFixed(2);
    }
    else {
        return value? 'tak' : 'nie';
    }
}

interface LoadingState {
    type: 'loading'
}

interface SuccessState {
    type: 'success',
    tenants: Tenant[]
}

interface ErrorState {
    type: 'error',
    message: string,
}

type FetchState = LoadingState | SuccessState | ErrorState;

function getStatusMessage(status: FetchState): string {
    switch (status.type) {
        case 'loading' : 
            return "Ładowanie...";

        case 'success' : 
            return `Załadowano ${status.tenants.length} najemców` 

        case 'error' : 
            return `Wystąpił błąd: ${status.message}`;
    }
}

type Category = "fashion" | "food" | "electronics" | "services"

interface Tenant {
    id: string;
    name: string;
    mallId: string;
    floor: number;
    category: Category;
}

interface Admin {
    id: string,
    name: string,
}

function isTenant(user: Tenant | Admin): user is Tenant {
    return 'mallId' in user;
}

console.log(formatValue('elo'));
console.log(formatValue(122131.52454235));