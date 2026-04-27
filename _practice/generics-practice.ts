// 🎯 Zadanie praktyczne
// Otwórz app/types-practice.ts (lub utwórz nowy plik app/generics-practice.ts) i napisz:

// Funkcję getById — generyczną, przyjmuje tablicę elementów i id: string, zwraca znaleziony element lub undefined.
//  Użyj constraint żeby T musiał mieć pole id: string. Przetestuj ją na tablicy tenants z poprzedniej lekcji.

// Interfejs ApiResponse<T> — z polami data: T, status: number, message: string. Utwórz dwie przykładowe zmienne: 
// jedną z pojedynczym Tenant, drugą z tablicą Tenant[].

// Funkcję filterByCategory — przyjmuje Tenant[] i category: Category, zwraca Tenant[]. 
// To nie musi być generyczna (typ jest konkretny) — ale zastanów się dlaczego, i napisz komentarz w kodzie z odpowiedzią.

import { tenants } from "./types-practice.js";

function getById<T extends {id: string}> (elements: T[], id: string): T | undefined {
    return elements.find(element => element.id === id )
}

// type Category = "fashion" | "food" | "electronics" | "services"

// interface Tenant {
//     id: string;
//     name: string;
//     mallId: string;
//     floor: number;
//     category: Category;
// }

// const tenantss: Tenant[] = [
//     {
//         id: '1',
//         name: "Nike",
//         mallId: '33',
//         floor: 1,
//         category: 'fashion',
//     }, 
//     {
//         id: '2',
//         name: 'Adidas',
//         mallId: '54',
//         floor: 0,
//         category: 'fashion',
//     }, 
//     {
//         id: '3',
//         name: 'McDonalds',
//         mallId: '110',
//         floor: 2,
//         category: 'food',
//     },
// ]

console.log(getById(tenants, '2'));