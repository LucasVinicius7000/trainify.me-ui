"use client"
import { GiHamburgerMenu } from 'react-icons/gi';
import StyledButton from "@/components/StyledButton";
import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "@/components/Sidebar";
import HeaderCriarCurso from '@/components/HeaderCurso';
import { signOut } from "next-auth/react";
import { HiOutlineLogout } from 'react-icons/hi';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import MainLogo from "./../../../../public/main-logo2.svg";
import api from '@/services/api';
import { toast } from 'react-toastify';
import CardCurso from '@/components/CardCurso';
import { useRouter } from 'next/navigation';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;


export default function HomeAluno() {

    const router = useRouter()

    const { data, status } = useSession();
    const { openSidebar } = useContext(SidebarContext);
    const user = data?.user ? data?.user : undefined;
    const [cursos, setCursos] = useState(null);


    const listarCursos = async () => {
        if (user?.perfil?.id == undefined) {
            toast.warn("Falha ao listar cursos. Não foi possível identificar o aluno.");
            return;
        }

        try {
            let response = await api.get(`${API_HOST}/curso/listar/aluno/${user?.perfil?.id}`);
            if (response?.data?.isSuccess) {
                toast.success("Cursos listados com sucesso.");
                setCursos(response.data.data);
            }
            else if (response?.response?.data?.clientMessage) {
                toast.error(response?.response?.data?.clientMessage);
            }
            else if (response.response.data == "") throw new Error("Falha ao listar cursos.");
        } catch (error) {
            toast.error(error);
        }
    };

    useEffect(() => {
        if (user && cursos == null) {
            listarCursos();
        }
    }, [user, cursos]);

    return <div className='w-full min-h-screen'>
        <HeaderCriarCurso className="h-auto">
            <div className='w-full flex justify-start items-center'>
                <div>
                    <StyledButton onClick={() => { openSidebar() }}>
                        <GiHamburgerMenu size={20} color="#f6f6f6" />
                    </StyledButton>
                </div>

                <div className='ml-auto flex justify-center items-center gap-2'>
                    <div className='flex justify-start items-center gap-1'>
                        <span className='text-yellow-50 w-[250px] max-[480px]:w-[100%] text-center'>Bem vindo(a) ao TrainifyMe <Image className='inline' src={MainLogo} width={30} height={30} alt="Logo" /> {user?.perfil?.nome}🙋‍♂️</span>
                    </div>
                    <div className=''>
                        <StyledButton className="bg-gradient-to-r from-red-600 to-red-600" onClick={() => { signOut({ redirect: "/" }); }}>
                            <HiOutlineLogout size={20} color='#f6f6f6' />
                        </StyledButton>
                    </div>
                </div></div>
        </HeaderCriarCurso>
        <div className="w-[80%] mx-auto my-auto mt-6 p-4 space-y-4 select-none">
            <h1 className='text-zinc-600 mb-6'>Home | Meus Cursos</h1>
            <div className='w-full flex items-center justify-start flex-wrap gap-8'>
                {
                    cursos?.map((curso) => {
                        return <CardCurso
                            nomeCurso={curso?.cursoBase?.nome}
                            id={curso?.id}
                            curso={curso}
                            onClick={()=> { router.push(`home/curso/${curso?.id}`)}}
                        />
                    })
                }
            </div>
        </div>
    </div>
}