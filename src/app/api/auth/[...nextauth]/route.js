import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';

const API_HOST = process.env.API_HOST;

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                senha: { label: "Senha", type: "password" }
            },
            async authorize(credentials, req) {
                const res = await fetch(`${API_HOST}/Auth/login`, {
                    method: "POST",
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                });
                const user = await res.json();
                if (res.ok && user) {
                    return user?.data;
                }
                return null;
            }
        }),
    ],
    pages: {
        signIn: "/"
    },
    jwt: {
        maxAge: 60 * 60 * 24 * 30,
    },
    callbacks: {
        async jwt({ token, user }) {
            if(user) token.user = user;
            return token;
        },
        async session({ session, token }) {
            session.user = token?.user;
            return session;
        },
    },
});

export { handler as GET, handler as POST }