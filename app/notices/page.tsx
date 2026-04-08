interface Notice {
    id: string,
    title: string,
    content: string,
    isRead: boolean
}

export default async function NoticesPage(){

    const response = await fetch('http://localhost:3000/api/notices/');

    if (!response.ok) {
        throw new Error ('Wystapil blad podczas pobierania ogloszen')
    }

    const notices = await response.json();

    return (
        <main>
            <h1>Ogłoszenia:</h1>
            <ul>{notices.map((notice: Notice) => 
                <li key={notice.id}>
                    <h2 style={{ color: notice.isRead ? 'white' : 'red' }}>{notice.title}</h2>
                    <p style={{ borderBottom: '1px solid white'}}>{notice.content}</p>
                </li>)}
            </ul>
        </main>
    )
}