"use client"
import InputFloatingLabel from "../InputFloatingLabel";
import { useForm } from "react-hook-form";
import Select from "../Select";
import { useState } from "react";
import { FaPlus, FaTimes } from 'react-icons/fa';
import { Controller } from "react-hook-form";
import Input from "../Input";
import StyledButton from "../StyledButton";

export default function FormNovaAula() {

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

    return <div className="p-6 max-w-2xl w-[95%] rounded-md bg-white shadow-md overflow-scroll no-scrollbar">
        <h1 className="font-semibold text-zinc-800 text-2xl mb-8">Nova aula</h1>

        <div className="flex flex-col justify-center items-start mt-4 gap-2">
            <h1 className="text-xs text-zinc-600">Tipo de aula: </h1>
            <Select
                name="tipoAula"
                className="max-w-4xl"
                {...register("tipoAula")}
            >
                <option selected value="">Selecione uma opção</option>
                <option value="0">Video</option>
                <option value="1">PDF</option>
                <option value="2">Atividade</option>
            </Select>
            {watch("tipoAula")?.length == "" && <p className="mt-1 font-semibold text-xs text-red-500">* O tipo da aula é obrigatório.</p>}
        </div>


        <div className="flex flex-col justify-center items-start mt-4 gap-2">
            <InputFloatingLabel
                {...register("titulo")}
                className="text-zinc-900 border-gray-300 focus:border-gray-100"
                labelClassName="focus:text-zinc-600 text-zinc-600"
                label="Título da aula: " />
            {watch("titulo")?.length == 0 && <p className="mt-1 font-semibold text-xs text-red-500">* Título da aula é obrigatório.</p>}
        </div>

        <div className="flex flex-col justify-center items-start mt-4 gap-2">
            {(watch("tipoAula") === "0" || watch("tipoAula") === "1")}

            {watch("tipoAula") === "2" && <div className="w-full">
                <InputFloatingLabel
                    {...register("enunciado")}
                    className="text-zinc-900 border-gray-300 focus:border-gray-100"
                    labelClassName="focus:text-zinc-600 text-zinc-600"
                    label="Enunciado da atividade: " />
                {watch("titulo")?.length == 0 && <p className="mt-1 font-semibold text-xs text-red-500">* Enunciado da atividade é obrigatório.</p>}

                <div className="w-full mt-4">
                    <h1 className="text-xs text-zinc-600">Alternativas: </h1>
                    {alternativas.map((_, index) => (
                        <div className="flex gap-4 items-center mb-3" key={index}>
                            <Controller
                                name={`alternativas[${index}]`}
                                control={control}
                                defaultValue=""
                                render={({ field }) => <Input
                                    type="text"
                                    {...register(`alternativa[${index}]`)}
                                    className="mt-1 text-sm block rounded-md"
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
                </div>
            </div>}


        </div>

    </div>
}