// 🎯 Zadanie dodatkowe
// Utwórz plik app/intersection-practice-2.ts. Tym razem budujemy coś bliższego realnemu projektowi:
// 1. Stwórz interfejs BaseRecord (tak samo jak poprzednio) i dwa typy intersection:

// UserRecord = BaseRecord & { email: string; role: "admin" | "tenant" | "viewer" }
// DocumentRecord = BaseRecord & { title: string; mallId: string; status: "draft" | "published" | "archived" }

// 2. Napisz funkcję updateRecord<T extends BaseRecord>(existing: T, changes: Partial<Omit<T, keyof BaseRecord>>): T — przyjmuje istniejący
//  rekord i częściowe zmiany (bez pól BaseRecord), zwraca zaktualizowany rekord z odświeżonym updatedAt. Użyj spread operatora i as T.
// 3. Napisz funkcję getField (tak samo jak poprzednio) i użyj jej żeby pobrać email z UserRecord i status z DocumentRecord. 
// Sprawdź w konsoli że TS wie o typie zwracanej wartości (najedź myszką na zmienną w VS Code).
// 4. Przetestuj updateRecord na obu typach — zmień role w UserRecord i status w DocumentRecord. Wypisz wyniki w konsoli.

// interface BaseRecord {
//     id: string,
//     createdAt: Date,
//     updatedAt: Date,
// }

// type UserRecord = BaseRecord & { email: string, role: 'admin' | 'tenant' | 'viewer' };
// type DocumentRecord = BaseRecord & { title: string, mallId: string, status: 'draft' | 'published' | 'archived' };

// function updateRecord<T extends BaseRecord> (existing: T, changes: Partial<Omit<T, keyof BaseRecord>>): T {
//     return {
//         ...existing,
//         ...changes,
//         updatedAt: new Date(),
//     } as T
// }

// function getField<T, K extends keyof T> (obj: T, key: K): T[K] {
//     return obj[key];
// }

// const user1: UserRecord = {
//     id: '1111',
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     email: 'testowy@mail.com',
//     role: 'viewer'
// }

// const document1: DocumentRecord = {
//     id: '444',
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     title: 'umowa',
//     mallId: '333',
//     status: 'draft'
// }

// const getEmail = getField(user1, 'email');
// console.log(getEmail);

// const getDocument = getField(document1, 'status');
// console.log(getDocument);

// const updateRole = updateRecord(user1, {role: 'tenant'});
// console.log(updateRole);

// const updateStatus = updateRecord(document1, {status: 'archived'});
// console.log(updateStatus);
