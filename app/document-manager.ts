// 🏗️ Mini Projekt — Mall Document Manager
// Budujesz prosty system zarządzania dokumentami dla galerii handlowej. Jeden plik app/document-manager.ts, wszystko razem.

// Co zbudujesz
// Typy i interfejsy:

// 1. BaseRecord — id: string, createdAt: Date, updatedAt: Date
// 2. Role — union: "admin" | "manager" | "viewer"
// 3. UserRecord — intersection z BaseRecord + name: string, email: string, role: Role
// 4. DocumentStatus — union: "draft" | "published" | "archived"
// 5. DocumentRecord — intersection z BaseRecord + title: string, content: string, status: DocumentStatus, authorId: string, mallId: string
// 6. MallRecord — intersection z BaseRecord + name: string, city: string

// Funkcje — napisz je wszystkie:
// // Tworzy nowy rekord dowolnego typu (Lekcja 5 — createRecord z as T)
// createRecord<T>(data: Omit<T, keyof BaseRecord>): T

// // Aktualizuje rekord (Lekcja 5 — updateRecord pattern)
// updateRecord<T extends BaseRecord>(existing: T, changes: Partial<Omit<T, keyof BaseRecord>>): T

// // Pobiera element po id z dowolnej tablicy (Lekcja 2 — getById z constraint)
// findById<T extends BaseRecord>(items: T[], id: string): T | undefined

// // Filtruje dokumenty po statusie (Lekcja 3 — Pick do zwracanego typu)
// filterByStatus(docs: DocumentRecord[], status: DocumentStatus): DocumentRecord[]

// // Type guard — sprawdza czy user może edytować (admin lub manager)
// canEdit(user: UserRecord): boolean

// // Zwraca podsumowanie dokumentu (Lekcja 3 — Pick<DocumentRecord, ...>)
// getDocumentSummary(doc: DocumentRecord): Pick<DocumentRecord, "id" | "title" | "status">


// "Baza danych" i scenariusz testowy:
// // Stwórz po 2 przykładowe obiekty każdego typu używając createRecord
// // Następnie przetestuj WSZYSTKIE funkcje — po jednym console.log na każdą

interface BaseRecord {
    id: string,
    createdAt: Date,
    updatedAt: Date
}

type Role = 'admin' | 'manager' | 'viewer';

type UserRecord = BaseRecord & { name: string, email: string, role: Role };

type DocumentStatus = 'draft' | 'published' | 'archived';


type DocumentRecord = BaseRecord & { title: string, content: string, status: DocumentStatus, authorId: string, mallId: string };
type MallRecord = BaseRecord & { name: string, city: string };

function createRecord<T> (data: Omit<T, keyof BaseRecord>): T {
    return {
        ...data, 
        id: Math.random().toFixed(2).toString(),
        createdAt: new Date(),
        updatedAt: new Date()
    } as T
}

function updateRecord<T extends BaseRecord> (existing: T, changes: Partial<Omit<T, keyof BaseRecord>>): T {
    return {
        ...existing,
        ...changes,
        updatedAt: new Date()
    } as T
}
function findById<T extends BaseRecord>(items: T[], id: string): T | undefined {
    return items.find(item => item.id === id);
}

function filterByStatus (docs: DocumentRecord[], status: DocumentStatus): DocumentRecord[] {
    return docs.filter(document => document.status === status);
}

// function canEdit (user: UserRecord): boolean {
//     if (user.role === 'admin' || user.role === 'manager') {
//         return true
//     } else {
//         return false
//     }
// }

function canEdit(user: UserRecord): boolean {
    return user.role === 'admin' || user.role === 'manager'
}


function getDocumentSummary(doc: DocumentRecord): Pick<DocumentRecord, 'id' | 'title' | 'status'>{
    return {
        id: doc.id,
        title: doc.title,
        status: doc.status
    }
}

const auchan = createRecord<MallRecord> ({
    name: 'Auchan',
    city: 'Warszawa'
})
console.log(auchan);

const auchanUpdated = updateRecord(auchan, {city: 'Krakow'});
console.log(auchanUpdated);

const document1 = createRecord<DocumentRecord> ({
    title: 'umowa auchan',
    content: 'lorem test lorem testlorem testlorem test',
    status: 'draft',
    authorId: '11',
    mallId: '32'
});

const document2 = createRecord<DocumentRecord> ({

    title: 'umowa tesco',
    content: 'lorem test lorem testlorem testlorem test',
    status: 'published',
    authorId: '15',
    mallId: '355'
});

const document3 = createRecord<DocumentRecord> ({

    title: 'umowa lidl',
    content: 'lorem test lorem testlorem testlorem test',
    status: 'archived',
    authorId: '17',
    mallId: '354'
});

const documents: DocumentRecord[] = [document1, document2, document3];



const documentsFiltered = filterByStatus(documents, 'published');
console.log(documentsFiltered);

const admin = createRecord<UserRecord> ({
    name: 'Tomek',
    email: 'tomek@test.pl',
    role: 'admin'
})

const viewer = createRecord<UserRecord> ({
    name: 'Angela',
    email: 'angela@test.pl',
    role: 'viewer'
})

console.log(findById(documents, document2.id));
console.log(canEdit(admin));
console.log(canEdit(viewer));

console.log(getDocumentSummary(document3));