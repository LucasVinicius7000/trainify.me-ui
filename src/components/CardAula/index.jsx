import StyledButton from "../StyledButton";
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import {
    defaultLayoutIcons,
    DefaultVideoLayout,
} from '@vidstack/react/player/layouts/default';
import Loading from "../Loading";
import { toast } from 'react-toastify';
import { AiOutlineDelete } from 'react-icons/ai';
import api from "@/services/api";
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';


const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export default function CardAula(
    {
        indice,
        titulo,
        tipoAula,
        alternativas,
        alternativaCorreta,
        enunciado,
        videoUrl,
        pdfUrl,
        cursoId,
        aulaId,
        reloadCurso
    }) {


    let isLoading = false;

    const deleteAula = async (cursoId, aulaId) => {
        try {
            isLoading = true;
            let response = await api.get(`${API_HOST}/aula/excluir/${aulaId}`);
            if (response.data.isSuccess) {
                toast.success("Aula removida com sucesso.");
                reloadCurso();
                isLoading = false;
            }

        } catch (error) {
            toast.error("Ocorreu um erro ao excluir a aula.");
        }
    }

    return <div className="w-full h-full mb-1 bg-[#E5F5DC] flex flex-col pb-5 select-none">
        <div className="w-full h-full flex gap-3 p-4 items-center">
            <div className="w-10 h-10 text-white font-bold">
                <StyledButton onClick={() => { }} className="cursor-auto w-full h-full bg-gradient-to-r from-[#00a1ff] to-[#00a1ff] bg-[#00a1ff]">
                    {indice}
                </StyledButton>
            </div>
            <div className="font-medium text-[#3d3b3bf9] text-lg">{titulo}</div>
        </div>
        <div className="self-center w-full h-full flex items-center justify-center">
            <div className="w-[480px] h-[270px] max-[480px]:w-full max-[480px]:h-full overflow-scroll no-scrollbar">
                {
                    tipoAula == 0 && <MediaPlayer className="z-0" viewType="video" src={videoUrl}>
                        <MediaProvider />
                        <DefaultVideoLayout icons={defaultLayoutIcons} />
                    </MediaPlayer>
                }
                {
                    tipoAula == 1 && <object type="application/pdf" className="overflow-x-hidden w-full h-full text-xl font-black rounded-md" data={pdfUrl} />
                }
                {
                    tipoAula == 2 && <div className="h-auto w-full">
                        <div className="p-5 bg-[#F0FFF0] rounded-md text-[#3d3b3bf9]">
                            <div>
                                <span className="font-black"> Questão:  </span>
                                <span>&nbsp;{enunciado}</span>
                            </div>
                            <br></br>
                            <div>
                                <span className="font-black"> Alternativa Correta:  </span>&nbsp;
                                <span className="bg-green-700 font-semibold text-yellow-50">&nbsp;&nbsp;{alternativas?.find((alt) => alt.id === alternativaCorreta).valor}&nbsp;&nbsp;</span>
                            </div>
                            <br></br>
                            <div className="h-auto w-full">
                                <span className="font-black"> Outras alternativas {"=>"}  </span>
                                <br></br>
                                <br></br>
                                {
                                    alternativas?.map((alt) => {
                                        if (alt.id != alternativaCorreta)
                                            return <span key={Math.random() + alt?.valor} className="bg-red-500 text-yellow-50 font-semibold">* {alt.valor} <br></br></span>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
        <div className="h-full ml-auto mr-5">
            <StyledButton onClick={() => { deleteAula(cursoId, aulaId) }} className="text-white font-bold h-full bg-gradient-to-r from-[#E00126] to-[#E00126]">
                Excluir Aula
            </StyledButton>
        </div>
        <Loading isLoading={isLoading} />
    </div>
}

