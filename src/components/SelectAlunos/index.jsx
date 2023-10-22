import { useEffect, useState } from "react"
import api from "@/services/api";
import { toast } from 'react-toastify';
import { HiUserCircle } from "react-icons/hi";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export default function SelectAlunos({ organizacaoId, onCancel, onSelect, nomeCurso, cursoId }) {

    const [alunos, setAlunos] = useState([]);

    useEffect(() => {

        const buscarAlunos = async () => {
            try {
                let response = await api.get(`${API_HOST}/aluno/listar/${organizacaoId}`);
                if (response.data.isSuccess) {
                    setAlunos(response.data.data);
                }
            } catch (error) {
                toast.error("Falha ao buscar alunos.");
            }
        }

        if (organizacaoId && alunos.length == 0) {
            buscarAlunos();
        }

    }, [alunos, organizacaoId]);

    return <div className="py-4 w-[25%] h-auto flex flex-col items-center justify-start rounded-md bg-[#E5F5DC]">
        <h2 className="text-center px-4 self-start text-ellipsis"> | Matriculando aluno em {nomeCurso}</h2>
        {
            alunos?.map((aluno) => {
                return <div onClick={() => onSelect(cursoId, aluno?.id)} className="cursor-pointer p-4 w-full flex items-center justify-start gap-3 hover:bg-slate-100">
        <div>
            <HiUserCircle size={30} color={aluno?.sexo == 0 ? "#87ceeb" : "#ff00ff"} />
        </div>
        <div className="text-lg">{aluno?.nome}</div>
    </div>
})
        }
    </div >
}