"use client"
import HeaderCriarCurso from "@/components/HeaderCurso";
import StyledButton from "@/components/StyledButton";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiOutlineLogout } from "react-icons/hi";
import { useContext, useEffect } from "react";
import { SidebarContext } from "@/components/Sidebar";
import { useSession } from "next-auth/react";
import MainLogo from './../../../../../../public/main-logo2.svg';
import { useState } from "react";
import { signOut } from "next-auth/react";
import api from "@/services/api";
import { toast } from "react-toastify";
import CardListCurso from "@/components/CardListCurso";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export default function CursosListar() {

    const { data, status } = useSession();
    const { openSidebar } = useContext(SidebarContext);
    const user = data?.user ? data?.user : undefined;
    const [cursos, setCursos] = useState(null);

    const listarCursos = async () => {
        try {
            let organizacaoId = user?.perfil?.id;
            let response = await api.get(`${API_HOST}/curso/organizacao/buscar/${organizacaoId}`);
            if (response.data.isSuccess) {
                toast.success("Cursos listados com sucesso.");
                setCursos(response.data.data);
            }
        } catch (error) {
            toast.error("Falha ao listar cursos da organização.");
        }
    }

    useEffect(() => {
        if (user != undefined && cursos == null) {
            listarCursos();
        }
    },[cursos, user]);

    return <div className="w-full h-full">
        <HeaderCriarCurso className="h-auto">
            <div className='w-full flex justify-start items-center'>
                <div>
                    <StyledButton onClick={() => { openSidebar() }}>
                        <GiHamburgerMenu size={20} color="#f6f6f6" />
                    </StyledButton>
                </div>

                <div className='ml-auto flex justify-center items-center gap-2'>
                    <div className='flex justify-start items-center gap-1'>
                        <span className='text-yellow-50 w-[250px] max-[480px]:w-[100%] text-center'>Bem vindo(a) ao TrainifyMe <Image className='inline' src={MainLogo} width={30} height={30} alt="Logo" /> {user?.perfil?.nomeFantasia}🙋‍♂️</span>
                    </div>
                    <div className=''>
                        <StyledButton className="bg-gradient-to-r from-red-600 to-red-600" onClick={() => { signOut({ redirect: "/" }); }}>
                            <HiOutlineLogout size={20} color='#f6f6f6' />
                        </StyledButton>
                    </div>
                </div></div>
        </HeaderCriarCurso>
        <div className="w-[80%] mx-auto my-auto mt-6 p-4 space-y-4 select-none">
            <h1 className='text-zinc-600 mb-6'>| Listar Cursos</h1>
            <div className="w-full h-full">
                {
                    cursos?.map((curso) => {
                        return <CardListCurso data={curso} />
                    })
                }
            </div>
        </div>
    </div>
}