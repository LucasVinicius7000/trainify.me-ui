import Image from "next/image";
import CursoImage from './../../../public/curso-image.jpg';
import StyledButton from "../StyledButton";

export default function CardCurso({ nomeCurso, id, curso, onClick }) {
    
    return <div className="h-auto rounded-md max-w-[250px] min-w-[200px] w-full border-gray-300 shadow-md flex flex-col justify-start items-center pb-2">
        <div className="w-full border-b-gray-300 border-b-[1px]">
            <Image
                priority
                src={CursoImage}
                alt="Imagem ilustrativa de um curso."
                className="rounded-t-md"
            />
        </div>
        <div className="pt-2 p-1 w-full max-w-[90%]">
            <div className="w-full text-ellipsis overflow-hidden whitespace-break-spaces line-clamp-3">
                <span className="overflow-hidden text-zinc-600">
                    {nomeCurso}
                </span>
            </div>
            <div className="mt-4 w-full flex justify-end">
                <StyledButton onClick={()=>{
                    onClick();
                }} className="p-1 text-yellow-50 font-medium bg-gradient-to-r from-[#00a1ff8c] to-[#00a1ff8c]" >
                    <span>{curso.statusCurso == 0 ? "Iniciar Curso" : (curso.statusCurso == 1 || curso.statusCurso == 2) ? "Continuar Curso" : "Curso Concluido"}</span>
                </StyledButton>
            </div>
        </div>
    </div>
}