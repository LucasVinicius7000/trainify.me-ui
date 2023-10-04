import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const protectedPaths = ["/admin", "/aluno", "/organizacao"];

export async function middleware(req, res) {

    const { pathname } = req.nextUrl;
    const token = await getToken({ req });
    const redirectUrl = new URL("/", req.url);
    let isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path));

    if (isProtectedPath) {
        if (!token) return NextResponse.redirect(redirectUrl);
        else {
            if (
                pathname.startsWith("/admin") && !token.user.role.includes("Admin") ||
                pathname.startsWith("/aluno") && !token.user.role.includes("Aluno") ||
                pathname.startsWith("/organizacao") && !token.user.role.includes("Organizacao")
            ) {
                console.log("O token do usuário não possui autorização para acessar rotas: " + pathname);
                return NextResponse.redirect(redirectUrl);
            }
        }
    }
    return NextResponse.next();
}