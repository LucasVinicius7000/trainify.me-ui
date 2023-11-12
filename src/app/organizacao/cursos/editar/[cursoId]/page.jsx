"use client"
import CriarCurso from "@/components/CriarCurso";
import { useSession } from "next-auth/react";


export default function CursosEditar({ params }) {

    const { data, status } = useSession();
    const user = data?.user ? data?.user : undefined;

    return <CriarCurso
        redirectionPage={"./../../../organizacao/home"}
        UserId={user?.perfil?.userId}
        OrganizacaoId={user?.perfil?.id}
        editionMode={true}
        id={params.cursoId}
    />
}