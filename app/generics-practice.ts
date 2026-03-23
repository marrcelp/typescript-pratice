// 🎯 Zadanie praktyczne
// Otwórz app/types-practice.ts (lub utwórz nowy plik app/generics-practice.ts) i napisz:

// Funkcję getById — generyczną, przyjmuje tablicę elementów i id: string, zwraca znaleziony element lub undefined.
//  Użyj constraint żeby T musiał mieć pole id: string. Przetestuj ją na tablicy tenants z poprzedniej lekcji.

// Interfejs ApiResponse<T> — z polami data: T, status: number, message: string. Utwórz dwie przykładowe zmienne: 
// jedną z pojedynczym Tenant, drugą z tablicą Tenant[].

// Funkcję filterByCategory — przyjmuje Tenant[] i category: Category, zwraca Tenant[]. 
// To nie musi być generyczna (typ jest konkretny) — ale zastanów się dlaczego, i napisz komentarz w kodzie z odpowiedzią.

import { tenants, Tenant, Category } from "./types-practice";

function getById<T extends {id: string}> (elements: T[], id: string): T | undefined {
    return elements.find(element => element.id === id )
}

interface ApiResponse<T> {
    data: T,
    status: number,
    message: string,
}

const example1: ApiResponse<Tenant[]> = {
    data: tenants,
    status: 404,
    message: 'Testowa zmienna'
}

const example2: ApiResponse<Tenant> = {
    data: {
        id: '4',
        name: "KFC",
        mallId: '112',
        floor: 3,
        category: 'food',
    },
    status: 300,
    message: 'testowa zmienna z data tenant'
}

console.log(getById(tenants, '2'));

function filterByCategory (tenants: Tenant[], category: Category): Tenant[] {
    return tenants.filter(tenant => tenant.category === category);
}
//funkcja nie musi być generyczna poniewaz zawsze zwroci ona element tablicy Tenant[], gdzie dokladnie wiemy jakie dane beda zwracane bo wczesniej deklarowalismy interface

console.log(filterByCategory(tenants, 'food'));