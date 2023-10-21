"use client"
import HeaderCriarCurso from "../HeaderCurso";
import InputFloatingLabel from "../InputFloatingLabel";
import { BsPencilSquare } from "react-icons/bs";
import MainLogo from "./../../../public/main-logo2.svg";
import Image from "next/image";
import { SidebarContext } from "@/components/Sidebar";
import { AiOutlineCheck } from "react-icons/ai";
import { BiTrashAlt } from "react-icons/bi";
import { useContext, useEffect } from "react";
import StyledButton from "../StyledButton";
import { useState } from "react";
import AddAulaButton from "../AddAulaButton";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import api from "@/services/api";
import { getSession } from "next-auth/react";
import CustomModal from "../Modal";
import FormNovaAula from "../FormNovaAula";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export default function CriarCurso({ id = null, OrganizacaoId, UserId }) {
    
    

    useEffect(() => {
        if (id != null) {
            setCursoId(id);
        }
    }, []);

    const { openSidebar } = useContext(SidebarContext);
    const [cursoId, setCursoId] = useState(null);
    const [aulas, setAulas] = useState([]);
    const [needCreateCurso, setNeedCreateCurso] = useState(true);
    const [modalNovaAula, setModalNovaAula] = useState(false);
    const
        {
            register,
            handleSubmit,
            watch,
            formState: { errors }
        } = useForm();

    const onSubmit = (data) => {
    };

    const criarCurso = async () => {
        try {
            let response = await api.post(`${API_HOST}/curso/criar`, {
                Nome: watch("NomeCurso"),
                OrganizacaoId: OrganizacaoId,
                UsuarioCriadorId: UserId
            });
            if(response.data.isSuccess){
                setCursoId(response?.data?.data?.id);
                toast.success("Curso criado com sucesso.");
            }
        } catch (error) {
            toast.error("Ocorre um erro ao criar o curso.");
        }
    };
 
    const openModalNovaAula = async () => {
        let nomeCurso = watch("NomeCurso");
        if(nomeCurso === "") {
            toast.warning("Para adicionar uma aula, dê um nome ao seu curso.");
            return;
        }
        if(needCreateCurso){
            await criarCurso();
            setNeedCreateCurso(false);
        };
        setModalNovaAula(true);
    };

    return <div className="w-full min-h-screen">
        <HeaderCriarCurso className="sticky top-0 w-full px-10 max-[500px]:p-0">
            <div className="absolute right-4 top-2">
                <Image
                    src={MainLogo}
                    alt="Logo TrainifyMe"
                    width={30}
                    height={30}
                />
            </div>
            <div className="flex flex-row w-full max-[550px]:w-full max-[500px]:pl-4">
                <div className="flex flex-row w-full items-center justify-center gap-4">
                    <div className="flex flex-row w-[80%] items-center justify-center gap-4 max-[500px]:w-full">
                        <BsPencilSquare className="text-gray-300 self-center w-7 h-7" />
                        <InputFloatingLabel
                            {...register("NomeCurso")}
                            className="focus:text-gray-50 text-gray-300 border-gray-400 focus:border-gray-50"
                            labelClassName="focus:text-gray-50 text-gray-300"
                            label="Nome do curso" />
                    </div>
                    <div className="w-full flex flex-row items-center justify-end gap-2 relative max-[500px]:top-5 right-6 max-[500px]:w-auto max-[500px]:right-2">
                        <div className="">
                            <StyledButton className="bg-gradient-to-r from-[#149D64] to-[#149D64]">
                                <AiOutlineCheck size={20} color="#f6f6f6" />
                            </StyledButton>
                        </div>
                        <div className="">
                            <StyledButton className="bg-gradient-to-r from-[#E00126] to-[#E00126]">
                                <BiTrashAlt size={20} color="#f6f6f6" />
                            </StyledButton>
                        </div>
                    </div>
                </div>
            </div>
        </HeaderCriarCurso>
        <div className="w-full flex justify-center mt-10">
            <AddAulaButton onClick={() => { openModalNovaAula() }} />
        </div>
        <CustomModal isOpen={modalNovaAula} className="bg-black/95 border-none absolute top-0 gap-5 left-0 flex flex-col w-full justify-center items-center select-none">
            <FormNovaAula cursoId={cursoId} onCancel={()=> setModalNovaAula(false)} />
        </CustomModal>
    </div>
}