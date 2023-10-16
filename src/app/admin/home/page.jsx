"use client"
import { GiHamburgerMenu } from 'react-icons/gi';
import StyledButton from "@/components/StyledButton";
import { useContext } from "react";
import { SidebarContext } from "@/components/Sidebar";
import { fileToBase64 } from '@/utils/file-to-base64';
import { MimeTypes } from '@/utils/enums';
import api from '@/services/api';
import CriarCurso from '@/components/CriarCurso';

export default function AdminHome() {


    const { openSidebar } = useContext(SidebarContext);

    const submitFile = async ({ base64String, mimeType, fileName, fileExtension }) => {
        let mimeTypeValue = MimeTypes[`${mimeType}`];
        let response = await api.post("/Curso/teste", {
            NomeArquivo: fileName,
            ExtensaoArquivo: fileExtension,
            Base64Arquivo: base64String,
            MimeType: mimeTypeValue
        });
        return await response.data;
    }


    return <div className='w-full min-h-screen'>
        {/* <StyledButton onClick={() => { openSidebar() }}>
            <GiHamburgerMenu size={20} color="#f6f6f6" />
        </StyledButton> */}
        <CriarCurso OrganizacaoId={3} UserId={"4d5c29fb-5637-4cf7-b471-e7b4a4da56ff"}>

        </CriarCurso>
    </div>;


}