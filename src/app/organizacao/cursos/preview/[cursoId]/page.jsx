"use client"
import { useRouter } from "next/navigation";
import { GiHamburgerMenu } from 'react-icons/gi';
import StyledButton from "@/components/StyledButton";
import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "@/components/Sidebar";
import HeaderCriarCurso from '@/components/HeaderCurso';
import { signOut } from "next-auth/react";
import { HiOutlineLogout } from 'react-icons/hi';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import MainLogo from "./../../../../../../public/main-logo2.svg";
import api from '@/services/api';
import { toast } from 'react-toastify';
import Curso from "@/components/Curso";
import { redirect } from "next/navigation";
import { PiEyeDuotone } from 'react-icons/pi';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export default function PreviewCurso({ params }) {

    const { data, status } = useSession();
    console.log(data);
    const { openSidebar } = useContext(SidebarContext);
    const user = data?.user ? data?.user : undefined;
    const router = useRouter();
    const [cursoData, setCursoData] = useState(null);


    const getCursoEmAndamento = async () => {

        if (!params.cursoId) {
            toast.warn("Falha ao buscar curso. (Id inválido)");
            return;
        }

        try {
            let response = await api.get(`${API_HOST}/curso/buscar/${params.cursoId}`);
            if (response.data.isSuccess) {
                setCursoData(response.data.data);
            }
        } catch (error) {
            if (typeof error === 'string') {
                toast.error(error);
            }
            else toast.error("Falha ao buscar curso.");
        }
    }

    useEffect(() => {
        if (params.cursoId && cursoData == null) {
            getCursoEmAndamento();
        }
    }, [params, cursoData]);

    return <div className='w-full h-full min-h-screen'>
        <HeaderCriarCurso className="h-auto">
            <div className='w-full flex justify-start items-center'>
                <div>
                    <StyledButton onClick={() => { openSidebar() }}>
                        <GiHamburgerMenu size={20} color="#f6f6f6" />
                    </StyledButton>
                </div>

                <div className="ml-6">
                    <div className="flex justify-center items-center gap-4 border-spacing-0.5 border-white rounded-xl border-2 p-2">
                        <PiEyeDuotone size={30} color="white" />
                        <h2 className="text-white select-none">Modo Pré-visualização</h2>
                    </div>
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
        <div className="w-[80%] h-full mx-auto my-auto mt-6 p-4 space-y-4 select-none">
            <h1 className='text-zinc-600 mb-6'>| {cursoData?.nome}</h1>
            <Curso
                curso={cursoData}
                //cursoEmAndamento={cursoData?.cursoEmAndamento}
                previewMode={true}
            />
        </div>
    </div>
}