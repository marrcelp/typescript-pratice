'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";


export function Nav() {
    const pathname = usePathname();

    return (
        <nav>
          <Link style={{fontWeight: pathname === '/' ? 'bold' : 'normal'}} href="/">Home</Link>
          {" | "}
          <Link style={{fontWeight: pathname === '/tenants' ? 'bold' : 'normal'}} href="/tenants">Tenants</Link>
        </nav>
    )
}