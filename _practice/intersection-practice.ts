// 🎯 Zadanie praktyczne
// Utwórz plik app/intersection-practice.ts:

// 1. Stwórz interfejs BaseRecord z polami id: string, createdAt: Date, updatedAt: Date
// 2. Używając intersection (&) zdefiniuj typy:

// TenantRecord = BaseRecord & { name: string; mallId: string; floor: number; category: Category }
// DocumentRecord = BaseRecord & { title: string; fileUrl: string; pageCount: number }


// 3. Napisz generyczną funkcję createRecord<T>(data: Omit<T, keyof BaseRecord>): T — przyjmuje dane bez pól z BaseRecord
//  i zwraca pełny rekord (dodając id, createdAt, updatedAt wewnątrz). Użyj spread operatora.
// 4. Używając keyof i indexed access — napisz funkcję getField<T, K extends keyof T>(obj: T, key: K): T[K] i przetestuj ją na TenantRecord

// interface BaseRecord {
//     id: string,
//     createdAt: Date,
//     updatedAt: Date,
// }

// type Category = "fashion" | "food" | "electronics" | "services"

// type TenantRecord = BaseRecord & {name: string, mallId: string, floor: number, category: Category};
// type DocumentRecord = BaseRecord & { title: string, fileUrl: string, pageCount: number};


// function createRecord<T> (data: Omit<T, keyof BaseRecord>): T {
//     return {
//         ...data,
//         id: Math.random().toString(),
//         createdAt: new Date(),
//         updatedAt: new Date()
//     } as T
// }

// function getField<T, K extends keyof T> (obj: T, key: K): T[K] {
//     return obj[key];
// }

// const zara = createRecord<TenantRecord> ({

//     name: 'Zara',
//     mallId: '12',
//     floor: 2,
//     category: 'fashion'
// });

// console.log(zara);