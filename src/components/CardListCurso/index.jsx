"use client"
import { toast } from "react-toastify";
import CustomModal from "../Modal";
import SelectAlunos from "../SelectAlunos";
import StyledButton from "../StyledButton";
import { useState } from "react";
import api from "@/services/api";
import Loading from "../Loading";
import { useRouter } from "next/navigation";
import { GiArchiveRegister } from 'react-icons/gi';
import { AiFillEdit } from 'react-icons/ai';
import { PiEyeDuotone } from 'react-icons/pi';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export default function CardListCurso({ data }) {

    const router = useRouter()
    const [isModalAlunosOpen, setIsModalAlunosOpen] = useState(false);

    const matricularAluno = async (cursoId, alunoId) => {

        setIsModalAlunosOpen(false);

        if (!cursoId) {
            toast.error("Id do curso inválido, falha ao matricular aluno.");
            return;
        }

        if (!alunoId) {
            toast.error("Id do aluno inválido, falha ao matricular.");
            return;
        }

        try {
            let response = await api.post(`${API_HOST}/aluno/matricular/${alunoId}/${cursoId}`);

            if (!response?.response?.data?.isSuccess) {
                toast.error(response?.response?.data?.clientMessage);
            }

            if (response.data.isSuccess) {
                toast.success("Aluno matriculado sucesso.");
            }
        } catch (error) {
            console.log("Falha ao matricular aluno.");
        }
    }

    return <div className="w-full h-auto rounded-md mb-6 bg-[#E5F5DC] flex p-5 select-none justify-between items-center max-[720px]:flex-col max-[720px]:gap-3">
        <div className="flex flex-col">
            <div className="flex justify-start items-center gap-2">
                <span className="text-2xl">🎬</span>
                <h1 className='text-base text-zinc-600'>{'=>'}{data?.nome}</h1>
            </div>
            <div className="flex justify-start items-center gap-2">
                <span className="text-2xl">🧑‍🏫</span>
                <h1 className='text-base text-zinc-600'>{data?.aulas?.length} aulas.</h1>
            </div>
        </div>
        <div className="flex flex-col gap-2 max-[720px]:w-[100%] max-[720px]:items-center max-[720px]:justify-center">
            <StyledButton
                onClick={() => { setIsModalAlunosOpen(true) }} className="bg-gradient-to-r from-purple-600 to-indigo-600  w-56 h-auto text-yellow-50">
                <div className="flex gap-2 items-center justify-start w-full pl-5">
                    <GiArchiveRegister size={24} color="white" />&nbsp;Matricular Aluno
                </div>
            </StyledButton>
            <StyledButton
                onClick={() => { router.push(`./../../cursos/editar/${data?.id}`) }} className="bg-gradient-to-r from-[#ff9300] to-[#FEA400] w-56 h-auto text-yellow-50">
                <div className="flex gap-2 items-center justify-start w-full pl-5">
                    <AiFillEdit size={24} color="white" />&nbsp;Editar Curso
                </div>
            </StyledButton>
            <StyledButton
                onClick={() => { router.push(`./../../cursos/preview/${data?.id}`) }} className="bg-gradient-to-r from-[#00ff48] to-[#00ff5C] w-56 h-auto text-yellow-50">
                <div className="flex gap-2 items-center justify-start w-full pl-5">
                    <PiEyeDuotone size={24} color="white" />&nbsp;Pré-visualização
                </div>
            </StyledButton>
        </div>
        <CustomModal
            className="bg-black/75 border-none absolute top-0 left-0 flex w-full justify-center items-center"
            isOpen={isModalAlunosOpen}
            requestToClose={() => setIsModalAlunosOpen(false)}
            closeWhenClickOutsideContent={true}
        >
            <SelectAlunos
                organizacaoId={data?.organizacaoId}
                onCancel={() => setIsModalAlunosOpen(false)}
                onSelect={(cursoId, alunoId) => { matricularAluno(cursoId, alunoId) }}
                nomeCurso={data?.nome}
                cursoId={data?.id}
            />
        </CustomModal>
    </div>
}