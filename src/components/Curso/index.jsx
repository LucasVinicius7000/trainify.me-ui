"use client"
import NavigationAulaButton from "../NavigationAulaButton"
import { MediaPlayer, MediaProvider, MediaPlayerInstance } from '@vidstack/react';
import {
    defaultLayoutIcons,
    DefaultVideoLayout,
} from '@vidstack/react/player/layouts/default';
import { useEffect, useState } from "react";
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import Alternativa from "../Alternativa";
import { useStore } from "@vidstack/react";
import { useRef } from "react";
import { toast } from "react-toastify";
import api from "@/services/api";

export default function Curso({ curso, cursoEmAndamento, previewMode = false }) {

    const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
    const mediaRef = useRef(null);
    const { duration } = useStore(MediaPlayerInstance, mediaRef);
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const [aulaAtual, setAulaAtual] = useState(null);

    useEffect(() => {
        if (aulaAtual == null && curso) {
            let primeiraAula = curso?.aulas.filter((aula) => aula?.indice == 1);
            setAulaAtual(primeiraAula[0]);
        }
    }, [curso]);

    const navigateAula = async (navigate) => {
        let indiceAtual = aulaAtual?.indice;
        if (!navigate) {
            let aulaAnterior = curso?.aulas.find((aula) => aula.indice == (indiceAtual - 1));
            if (aulaAnterior == null || aulaAnterior == undefined) return;
            setAulaAtual(aulaAnterior);
        }
        else { 
            debugger;
            let proximaAula = curso?.aulas.find((aula) => aula.indice == (indiceAtual + 1));
            if (cursoEmAndamento?.statusCurso != 3 && !previewMode) {
                await concluirAulaAtual(aulaAtual, cursoEmAndamento.id);
            }
            if (proximaAula == null || proximaAula == undefined) return;
            setAulaAtual(proximaAula);
        }
    }

    const concluirAulaAtual = async (aula, cursoId) => {
        try {
            let response = await api.get(`${API_HOST}/aula/concluir?cursoAndamentoId=${cursoId}&indiceAulaAtual=${aula?.indice}`);
            if(response?.data?.isSuccess){
                toast.success(response?.data?.clientMessage);
            }
        } catch (error) {
            toast.error("Falha ao concluir aula atual.");
        }
    }

    return <div
        className="w-full h-auto p-2 rounded-lg bg-[#F4F4F4] flex-col justify-center items-center pt-8 pb-4">
        <div className="w-full mb-8 flex justify-center items-center">
            <div className="w-[80%] flex">
                <span className="font-bold text-xl max-[480px]:text-sm text-center">Aula: [{aulaAtual?.indice}]</span>&nbsp;
                <h1 className="font-medium text-xl text-zinc-800 max-[480px]:text-sm">| {aulaAtual?.titulo}</h1>
            </div>
        </div>
        <div className="w-full flex justify-center items-center">
            <div className="w-[80%] h-[550px] max-[480px]:w-full max-[480px]:h-full">
                {
                    aulaAtual?.tipoAula == 0 && <MediaPlayer
                        controls={false}
                        className="z-0"
                        viewType="video"
                        load="eager"
                        preload="auto"
                        ref={mediaRef}
                        src={aulaAtual?.videoUrl}
                    >
                        <MediaProvider />
                        <DefaultVideoLayout asChild icons={defaultLayoutIcons} />
                    </MediaPlayer>
                }
                {
                    aulaAtual?.tipoAula == 1 && <div className="w-full h-[550px] max-[960px]:h-[480px]">
                        <Viewer
                            fileUrl={aulaAtual?.pdfUrl}
                            plugins={[
                                defaultLayoutPluginInstance,
                            ]}
                            theme={{
                                theme: 'dark',
                            }}
                        />
                    </div>
                }
                {
                    aulaAtual?.tipoAula == 2 && <div className="overflow-scroll no-scrollbar rounded-md bg-white w-full h-full">
                        <div className="bg-zinc-800 sticky top-0 text-yellow-50 p-2 rounded-md py-6">| {aulaAtual?.atividade?.enunciado}</div>
                        {
                            aulaAtual?.atividade?.alternativas?.map((alt) => {
                                return <Alternativa
                                    onClick={() => { }}
                                    isCorreta={alt.valor == aulaAtual?.atividade?.alternativaCorreta?.valor}
                                    texto={alt?.valor}
                                />
                            })
                        }
                    </div>
                }

            </div>
        </div>

        <div className="px-4 mt-8 w-full flex justify-between">
            {
                aulaAtual?.indice > 1 ? <NavigationAulaButton
                    direction={false}
                    content={'Aula Anterior'}
                    onClick={() => navigateAula(false)}
                /> : <div></div>
            }
            <NavigationAulaButton
                content={'Próxima Aula'}
                onClick={() => navigateAula(true)}
            />
        </div>
    </div>
}