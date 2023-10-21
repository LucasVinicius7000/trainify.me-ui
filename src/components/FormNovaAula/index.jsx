"use client"
import InputFloatingLabel from "../InputFloatingLabel";
import { useForm } from "react-hook-form";
import Select from "../Select";
import { useState } from "react";
import { FaPlus, FaTimes } from 'react-icons/fa';
import { Controller } from "react-hook-form";
import Input from "../Input";
import StyledButton from "../StyledButton";
import { MdOutlineDriveFolderUpload } from 'react-icons/md';
import { fileToBase64 } from "@/utils/file-to-base64";
import Loading from "../Loading";
import { toast } from "react-toastify";
import Button from "../Button";
import api from "@/services/api";
import { MimeTypes } from "@/utils/enums";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export default function FormNovaAula({ onCancel, reloadCurso, cursoId, indiceAula = 1 }) {

    const [isLoading, setIsLoading] = useState(false);
    const [fileInput, setFileInput] = useState(null);
    const [tipoAula, setTipoAula] = useState(null);

    const
        {
            register,
            handleSubmit,
            watch,
            control,
            setValue,
            formState: { errors }
        } = useForm();

    const alternativas = watch('alternativas', []);

    const adicionarAlternativa = () => {
        const novasAlternativas = [...alternativas, ''];
        setValue('alternativas', novasAlternativas);
    };

    const removerAlternativa = (index) => {
        alternativas.splice(index, 1);
        setValue('alternativas', alternativas);
    };

    const handleDivClick = () => {
        if (fileInput) {
            fileInput.click();
        }
    };

    const salvarAula = async () => {
        setIsLoading(true);
        let listaAlternativas = [];
        let dadosAula;

        if (watch("tipoAula") == 0 && watch("arquivo")?.fileExtension == "pdf") {
            toast.error("Em uma aula de vídeo o arquivo não pode ser um PDF, por favor escolha outro arquivo antes de continuar.");
            return;
        }

        if (watch("tipoAula") == 1 && watch("arquivo")?.fileExtension != "pdf") {
            toast.error("Em uma aula de PDF o arquivo não pode ser um vídeo, por favor escolha outro arquivo antes de continuar.");
            return;
        }

        if (watch("titulo") == undefined || watch("titulo") == "") {
            toast.warning("Adicione um título a essa aula antes de continuar.");
            return;
        }
        if (watch("tipoAula") == undefined || watch("tipoAula") == "") {
            toast.warning("Selecione um tipo de aula antes de continuar.");
            return;
        }
        if (watch("tipoAula") == 0 && watch("arquivo") == undefined) {
            toast.warning("Adicione um vídeo a essa aula antes de continuar.");
            return;
        }
        if(watch("tipoAula") == 0 || watch("tipoAula") == 1){
            dadosAula = watch("arquivo");
            let mimeTypeName = dadosAula?.mimeType;
            dadosAula.mimeType = MimeTypes[mimeTypeName];
            dadosAula.Base64Arquivo = dadosAula.base64String;
            dadosAula.ExtensaoArquivo = dadosAula.fileExtension;
            dadosAula.NomeArquivo = dadosAula.fileName;
        }
        if (watch("tipoAula") == 1 && watch("arquivo") == undefined) {
            toast.warning("Adicione um arquivo a essa aula antes de continuar.");
            return;
        }
        if (watch("tipoAula") == 2) {
            if (watch("enunciado") == undefined || watch("enunciado") == "") {
                toast.warning("Adicione o enunciado da atividade antes de continuar.");
                return;
            }
            if (alternativas < 2) {
                toast.warning("Adicione no mínimo duas alternativas antes de continuar.");
                return;
            }
            if (watch("correta") == undefined || watch("correta") == "") {
                toast.warning("Selecione a alternativa correta antes de continuar.");
                return;
            }

            let quantidadeAlternativas = watch("alternativas").length;
            for (let i = 0; i < quantidadeAlternativas; i++) {
                let valorAlternativa = watch(`alternativa[${i}]`);
                if (valorAlternativa == "") {
                    toast.warn("O conteúdo das alternativas não pode ser um espaço em  branco.");
                    return;
                }
                else listaAlternativas.push(valorAlternativa);
            }

        }

        debugger;
        let payload = {
            CursoId: cursoId,
            IndiceAula: indiceAula,
            TituloAula: watch("titulo"),
            TipoAula: watch("tipoAula"),
            DadosAula: dadosAula,
            EnunciadoQuestao: watch("enunciado"),
            Alternativas: listaAlternativas,
            AlternativaCorreta: watch("correta")
        }
        
        try {
            let response = await api.post(`${API_HOST}/aula/criar`, payload);
            if(response.data.isSuccess){
                toast.success("Aula adicionada com sucesso.");
                reloadCurso();
                setIsLoading(false);
                onCancel(true);
            }

        } catch (error) {
            toast.error("Ocorre um erro ao adicionar a aula.");
            setIsLoading(false);
        }
        dadosAula = undefined;
        setValue("dadosAula", undefined);
    }

    return <div className="p-6 max-w-2xl w-[95%] rounded-md bg-white shadow-md overflow-scroll no-scrollbar">
        <Loading isLoading={isLoading} />
        <h1 className="font-semibold text-zinc-800 text-2xl mb-8">Nova aula</h1>

        <div className="flex flex-col justify-center items-start mt-4 gap-2">
            <h1 className="text-xs text-zinc-600">Tipo de aula: </h1>
            <Select
                name="tipoAula"
                className="max-w-4xl"
                {...register("tipoAula")}
            >
                <option defaultChecked value="">Selecione uma opção</option>
                <option value="0">Video</option>
                <option value="1">PDF</option>
                <option value="2">Atividade</option>
            </Select>
            {watch("tipoAula")?.length == "" && <p className="mt-1 font-semibold text-xs text-red-500">* O tipo da aula é obrigatório.</p>}
        </div>


        <div className="flex flex-col justify-center items-start mt-5 gap-2">
            <InputFloatingLabel
                {...register("titulo")}
                className="text-zinc-900 border-gray-300 focus:border-gray-100"
                labelClassName="focus:text-zinc-600 text-zinc-600"
                label="Título da aula: " />
            {watch("titulo")?.length == 0 && <p className="mt-1 font-semibold text-xs text-red-500">* Título da aula é obrigatório.</p>}
        </div>

        <div className="w-full flex flex-col justify-center items-start mt-4 gap-2">
            {(watch("tipoAula") === "0" || watch("tipoAula") === "1") && <div className="w-full">
                <div className="w-full flex-col flex justify-center items-center">
                    <div className="cursor-pointer flex-col flex justify-center items-center" onClick={handleDivClick}>
                        <MdOutlineDriveFolderUpload size={80} color="#555555" />
                        <span className="text-center">Clique aqui para adicionar um arquivo.</span>
                        <input
                            type="file"
                            className="hidden"
                            multiple={false}
                            {...register("arquivo")}
                            onChange={async (e) => {
                                if(e.target.files.length == 0) return;
                                setIsLoading(true);
                                let fileData = await fileToBase64(e);
                                if (watch("tipoAula") == 1 && fileData?.fileExtension != "pdf") {
                                    toast.error("Somente são aceitos arquivos PDF.");
                                    setIsLoading(false);
                                    return;
                                }
                                if (watch("tipoAula") == 0 && !fileData?.mimeType.includes("video")) {
                                    toast.error("Somente são aceitos arquivos de vídeo.");
                                    setIsLoading(false);
                                    return;
                                }
                                setValue("arquivo", fileData);
                                setIsLoading(false);
                                toast.success("Arquivo adicionado com sucesso.");
                            }}
                            ref={(input) => setFileInput(input)} />
                        {
                            watch("arquivo") != undefined && <span>{watch("arquivo")?.fileName}.{watch("arquivo")?.fileExtension}</span>
                        }
                    </div>
                </div>
            </div>}

            {watch("tipoAula") === "2" && <div className="w-full">
                <InputFloatingLabel
                    {...register("enunciado")}
                    className="text-zinc-900 border-gray-300 focus:border-gray-100"
                    labelClassName="focus:text-zinc-600 text-zinc-600"
                    label="Enunciado da atividade: " />
                {(watch("enunciado")?.length == 0 || watch("enunciado") == undefined) && <p className="mt-1 font-semibold text-xs text-red-500">* Enunciado da atividade é obrigatório.</p>}

                <div className="w-full mt-4">
                    <h1 className="text-xs text-zinc-600">Alternativas: </h1>
                    {alternativas.map((_, index) => (
                        <div className="flex gap-4 items-center mb-3" key={index}>
                            <Controller
                                name={`alternativas[${index}]`}
                                control={control}
                                defaultValue=""
                                autoComplete="off"
                                render={({ field }) => <Input
                                    type="text"
                                    {...register(`alternativa[${index}]`)}
                                    className="mt-1 text-sm block rounded-md"
                                    autoComplete="off"
                                />}
                            />
                            <StyledButton onClick={() => { removerAlternativa(index) }} className="h-full text-[#f6f6f6] bg-gradient-to-r from-[#E00126] to-[#E00126]">
                                <FaTimes size={18} color="#f6f6f6" />
                            </StyledButton>
                        </div>
                    ))}
                    {alternativas < 2 && <p className="mt-2 font-semibold text-xs text-red-500">* É obrigatório no mínimo duas alternativas.</p>}
                    <div className="w-full flex justify-start items-center mt-4">
                        <StyledButton className="text-[#f6f6f6] bg-gradient-to-r from-[#149D64] to-[#149D64]" onClick={adicionarAlternativa}>
                            <FaPlus />
                        </StyledButton>
                    </div>

                    <div className="w-full flex-col justify-start items-center mt-4">
                        <h1 className="text-xs text-zinc-600 mb-1">Alternativa correta: </h1>
                        <Select
                            name="tipoAula"
                            className="max-w-4xl"
                            {...register("correta")}
                        >
                            <option defaultChecked value="">Selecione a alternativa correta:</option>
                            {
                                alternativas.map((alt, index) => {
                                    return <option
                                        key={`alt${index}`}
                                        value={watch(`alternativa[${index}]`)}>
                                        {watch(`alternativa[${index}]`)}
                                    </option>
                                })
                            }
                        </Select>
                    </div>
                </div>
            </div>}

            <div className="w-full mt-4 flex items-center justify-end">
                <div className="w-full flex items-center justify-end gap-2">
                    <Button text="Cancelar"
                        onClick={() => onCancel(false)}
                        className="min-w-[110px] max-w-[110px] py-2 px-4 rounded-md w-full text-white text-sm text-center bg-gradient-to-r from-[#E00126] to-[#E00126]"></Button>
                    <Button
                        text="Salvar Aula"
                        onClick={() => salvarAula()}
                        type="submit"
                        className="min-w-[110px] max-w-[110px] py-2 px-4 text-center bg-gradient-to-r  cursor-pointer from-emerald-500 to-emerald-500 rounded-md w-full text-white text-sm hover:to-emerald-500 hover:from-emerald-500"
                    >
                    </Button>
                </div>
            </div>

        </div>

    </div>
}