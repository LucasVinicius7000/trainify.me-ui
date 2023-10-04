import { createContext, useEffect, useState } from "react"
import { parseCookies } from "nookies";


export const AuthContext = createContext({});

export function AuthProvider({ children }) {

    async function signIn(email, password){
        
    }

    return (
        <AuthContext.Provider value={{}}>
            {children}
        </AuthContext.Provider>
    );
}