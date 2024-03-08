"use client"

import { SessionProvider } from "next-auth/react"

export default function UserSessionProvider({ children }) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}