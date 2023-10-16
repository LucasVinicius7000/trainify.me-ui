"use client"
import { createContext, useEffect, useState } from "react"
import { getSession } from "next-auth/react";
import { toast } from "react-toastify";
import api from "@/services/api";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const { user } = await getSession();
                if (user && api.defaults.headers.common["Authorization"] == undefined) {
                    api.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
                };
            } catch (error) {
                console.log(error);
            }
        };
        fetchSession();

    }, []);


    return (
        <AuthContext.Provider value={{}}>
            {children}
        </AuthContext.Provider>
    );
}