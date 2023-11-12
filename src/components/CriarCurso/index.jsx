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
import CardAula from "../CardAula";
import { useRouter } from 'next/navigation';
import Loading from "../Loading";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export default function CriarCurso({ id = null, OrganizacaoId, UserId, redirectionPage }) {


    useEffect(() => {
        if (id != null) {
            setNeedCreateCurso(false);
            setCursoId(id);
        }
    }, []);

    const { openSidebar } = useContext(SidebarContext);
    const [isLoading, setIsLoading] = useState(false);
    const [cursoId, setCursoId] = useState(null);
    const [aulas, setAulas] = useState([]);
    const [curso, setCurso] = useState(null);
    const [indiceAula, setIndiceAula] = useState(1);
    const [needCreateCurso, setNeedCreateCurso] = useState(true);
    const [modalNovaAula, setModalNovaAula] = useState(false);
    const [modalCancel, setModalCancel] = useState(false);

    const
        {
            register,
            handleSubmit,
            watch,
            formState: { errors }
        } = useForm();

    const router = useRouter();

    const salvarCurso = async () => {
        if (aulas.length < 1) {
            toast.warning("Adicione pelo menos uma aula antes de continuar.");
            return;
        }

        if (cursoId == null || cursoId == undefined)
            return;

        setIsLoading(true);
        try {
            let response = await api.get(`${API_HOST}/curso/ativar/${cursoId}`);
            if (response.data.isSuccess) {
                toast.success("Curso criado com sucesso.");
                router.push(redirectionPage);
            }
        } catch (error) {
            toast.error("Erro ao salvar o curso.");
        }
        setIsLoading(false);
    };

    const criarCurso = async () => {
        try {
            let response = await api.post(`${API_HOST}/curso/criar`, {
                Nome: watch("NomeCurso"),
                OrganizacaoId: OrganizacaoId,
                UsuarioCriadorId: UserId
            });
            if (response.data.isSuccess) {
                setCursoId(response?.data?.data?.id);
            }
        } catch (error) {
            toast.error("Ocorre um erro ao criar o curso.");
        }
    };

    const openModalNovaAula = async () => {
        let nomeCurso = watch("NomeCurso");
        if (nomeCurso === "") {
            toast.warning("Para adicionar uma aula, dê um nome ao seu curso.");
            return;
        }
        if (needCreateCurso) {
            await criarCurso();
            setNeedCreateCurso(false);
        };
        setModalNovaAula(true);
    };

    const buscarCurso = async (cursoId) => {
        try {
            let response = await api.get(`${API_HOST}/curso/buscar/${cursoId}`);
            if (response.data.isSuccess) {
                let cursoData = response.data.data;
                let aulaData = response.data.data?.aulas;
                setCurso(cursoData);
                setAulas(aulaData);
                let ultimaAula = aulaData[aulaData.length - 1];
                setIndiceAula(ultimaAula?.indice + 1);
            }
        } catch (error) {
            toast.error("Falha ao buscar o curso atual.");
        }
    };

    return <div className="w-full min-h-screen">
        <Loading isLoading={isLoading} />
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
                            <StyledButton onClick={() => { salvarCurso() }} className="bg-gradient-to-r from-[#149D64] to-[#149D64]">
                                <AiOutlineCheck size={20} color="#f6f6f6" />
                            </StyledButton>
                        </div>
                        <div className="">
                            <StyledButton onClick={() => router.push(redirectionPage)} className="bg-gradient-to-r from-[#E00126] to-[#E00126]">
                                <BiTrashAlt size={20} color="#f6f6f6" />
                            </StyledButton>
                        </div>
                    </div>
                </div>
            </div>
        </HeaderCriarCurso>
        <div className="w-full h-full">
            {aulas?.map((aula, index) => {
                return <CardAula
                    key={index + aula?.titulo}
                    alternativas={aula?.atividade?.alternativas}
                    enunciado={aula?.atividade?.enunciado}
                    alternativaCorreta={aula?.atividade?.alternativaCorretaId}
                    indice={aula?.indice}
                    tipoAula={aula?.tipoAula}
                    titulo={aula?.titulo}
                    pdfUrl={aula?.pdfUrl}
                    videoUrl={aula?.videoUrl}
                    reloadCurso={async () => await buscarCurso(cursoId)}
                    aulaId={aula?.id}
                />
            })}
        </div>
        <div className="w-full flex justify-center mt-5 mb-5">
            <AddAulaButton onClick={() => { openModalNovaAula() }} />
        </div>
        <CustomModal
            isOpen={modalNovaAula}
            className="bg-black/95 border-none absolute top-0 gap-5 left-0 flex flex-col w-full justify-center items-center select-none">
            <FormNovaAula
                cursoId={cursoId}
                onCancel={(newAula) => {
                    // if (newAula) {
                    //     setIndiceAula((value) => value + 1);
                    // }
                    setModalNovaAula(false);
                }}
                indiceAula={indiceAula}
                reloadCurso={async () => await buscarCurso(cursoId)}
            />
        </CustomModal>
    </div>
}