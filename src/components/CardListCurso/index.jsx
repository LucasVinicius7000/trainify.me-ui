"use client"
import { toast } from "react-toastify";
import CustomModal from "../Modal";
import SelectAlunos from "../SelectAlunos";
import StyledButton from "../StyledButton";
import { useState } from "react";
import api from "@/services/api";
import Loading from "../Loading";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export default function CardListCurso({ data }) {

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

            if(!response?.response?.data?.isSuccess){
                toast.error(response?.response?.data?.clientMessage);
            }
            
            if (response.data.isSuccess) {
                toast.success("Aluno matriculado sucesso.");
            }
        } catch (error) {
            console.log("Falha ao matricular aluno.");
        }
    }

    return <div className="w-full h-auto rounded-md mb-1 bg-[#E5F5DC] flex p-5 select-none justify-between items-center">
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
        <div>
            <StyledButton
                onClick={() => { setIsModalAlunosOpen(true) }} className="bg-gradient-to-r from-purple-600 to-indigo-600  w-56 h-auto text-yellow-50">Matricular aluno
            </StyledButton>

        </div>
        <CustomModal
            className="bg-black/75 border-none absolute top-0 left-0 flex w-full justify-center items-center"
            isOpen={isModalAlunosOpen}
            requestToClose={()=> setIsModalAlunosOpen(false)}
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