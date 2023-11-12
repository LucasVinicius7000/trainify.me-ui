"use client"
import HeaderCriarCurso from "@/components/HeaderCurso";
import StyledButton from "@/components/StyledButton";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiOutlineLogout } from "react-icons/hi";
import { useContext } from "react";
import { SidebarContext } from "@/components/Sidebar";
import { useSession } from "next-auth/react";
import MainLogo from './../../../../public/main-logo2.svg';
import CadastrarUsuarioForm from "@/components/CadastrarUsuarioForm";
import { signOut } from "next-auth/react";

export default function HomeOrganizacao() {


    const { data, status } = useSession();
    const { openSidebar } = useContext(SidebarContext);
    const user = data?.user ? data?.user : undefined;
 
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
                        <span className='text-yellow-50 w-[250px] max-[480px]:w-[100%] text-center'>Bem vindo(a) ao TrainifyMe <Image className='inline' src={MainLogo} width={30} height={30} alt="Logo" /> {user?.perfil?.nomeFantasia}🙋‍♂️</span>
                    </div>
                    <div className=''>
                        <StyledButton className="bg-gradient-to-r from-red-600 to-red-600" onClick={() => { signOut({ redirect: "/" }); }}>
                            <HiOutlineLogout size={20} color='#f6f6f6' />
                        </StyledButton>
                    </div>
                </div></div>
        </HeaderCriarCurso>
        <div className="w-full h-full flex items-center justify-start">
            <CadastrarUsuarioForm OrganizacaoPertencenteId={user?.perfil?.id} />
        </div>
    </div>
}