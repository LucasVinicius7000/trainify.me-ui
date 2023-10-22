"use client"
import React from 'react';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from '../Select';
import InputFloatingLabel from '../InputFloatingLabel';
import Button from '../Button';
import { useSession } from 'next-auth/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import api from '@/services/api';
import DatePickerFloatingLabel from '../DatePicketFloatingLabel';
import Loading from '../Loading';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

function CadastrarUsuarioForm({ OrganizacaoPertencenteId, TreinadorDoAlunoId }) {

    const { control, handleSubmit, watch, reset } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const selectedUserType = watch('userType');

    const { data, status } = useSession();
    const user = data?.user ? data?.user : undefined;

    const cadastrarUsuario = async (data) => {

        if (watch("email") == "" || watch("email") == undefined) {
            toast.warning("Adicione o email antes de continuar.");
            return;
        }

        if (watch("senha") == "" || watch("senha") == undefined) {
            toast.warning("Adicione a senha inicial do usuário antes de continuar.");
            return;
        }

        if (OrganizacaoPertencenteId == undefined) {
            toast.error("Não é possível cadastrar um usuário sem as informações da organização.");
            return;
        }

        if (watch('userType') == undefined || watch('userType') == "") {
            toast.warn("Selecione o tipo de usuário antes de continuar.");
            return;
        }


        if (watch('userType') == "Aluno") {
            if (watch("dataNascimento") == undefined || watch("dataNascimento") == "") {
                toast.warning("Selecione a data de nascimento do aluno antes de continuar.");
                return;
            }
            if (watch("nomeAluno") == undefined || watch("nomeAluno") == "") {
                toast.warning("Digite o nome aluno antes de continuar.");
                return;
            }
        }

        setIsLoading(true);

        let payload = {
            Nome: watch("nomeAluno"),
            DataNascimento: watch("dataNascimento"),
            Email: watch("email"),
            Senha: watch("senha"),
            Role: watch("userType"),
            OrganizacaoPertencenteId: OrganizacaoPertencenteId,
            Sexo: watch("sexo")
        };

        try {
            let response = await api.post(`${API_HOST}/user/criar`, payload);
            if (response.data.isSuccess) {
                toast.success("Usuário cadastrado com sucesso.");
                setIsLoading(false);
                reset();
            }
        } catch (error) {
            toast.error("Ocorreu um erro ao cadastrar o usuário.");
        }
        setIsLoading(false);
    };

    return (
        <div className="w-[80%] mx-auto my-auto mt-6 p-4 space-y-4 select-none">
            <Loading isLoading={isLoading} />
            <h1 className='text-zinc-600 mb-12'>Home | Cadastrar Usuários</h1>

            <div className="w-full relative bottom-4">
                <label htmlFor="userType" className="block">Tipo de Usuário</label>
                <Controller
                    name="userType"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <Select {...field} className="w-full border p-2 rounded">
                            <option value="">Selecione o tipo de usuário</option>
                            {(user?.role == "Organizacao" || user?.role == "Treinador") && <option value="Aluno">Aluno</option>}
                            {user?.role == "Admin" && <option value="Organizacao">Organização</option>}
                        </Select>
                    )}
                />
            </div>

            {selectedUserType === 'Aluno' && (
                <div className='w-full'>
                    <Controller
                        name="nomeAluno"
                        control={control}
                        defaultValue=""
                        autoComplete="off"
                        render={({ field }) => (
                            <InputFloatingLabel label="Nome do Aluno" {...field} type="text" className="w-full border my-3 p-2 rounded" />
                        )}
                    />
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        autoComplete="off"
                        render={({ field }) => (
                            <InputFloatingLabel label="Email" {...field} type="text" className="w-full border my-3 p-2 rounded" autocomplete="new-password" />
                        )}
                    />
                    <Controller
                        name="senha"
                        control={control}
                        defaultValue=""
                        autoComplete="off"
                        render={({ field }) => (
                            <InputFloatingLabel label="Senha" {...field} className="w-full border my-3 p-2 rounded" type="password" autocomplete="new-password" />
                        )}
                    />
                    <div className='w-full mt-4'>
                        <label htmlFor="userType" className="block">Sexo</label>
                        <Controller
                            name="sexo"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Select {...field} className="w-full border p-2 rounded">
                                    <option value="">Selecione uma opção:</option>
                                    <option value="0">Masculino</option>
                                    <option value="1">Feminino</option>
                                </Select>
                            )}
                        />
                    </div>
                    <div className='w-full mt-4'>
                        <label htmlFor="dataNascimento" className="block text-sm">Data de Nascimento</label>
                        <Controller
                            name="dataNascimento"
                            control={control}
                            defaultValue={null}
                            render={({ field }) => (
                                <DatePickerFloatingLabel
                                    selected={field.value}
                                    onChange={field.onChange}
                                    dateFormat="dd/MM/yyyy"
                                    wrapperClassName='w-full'
                                    className="w-full max-screen p-2 text-gray-700 text-sm border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer rounded-none"
                                    showYearDropdown
                                    scrollableYearDropdown
                                />
                            )}
                        />
                    </div>
                </div>

            )}

            {selectedUserType === 'Organizacao' && (
                <div className='flex flex-col gap-4'>
                    <Controller
                        name="nomeFantasia"
                        control={control}
                        defaultValue=""
                        autoComplete="off"
                        render={({ field }) => (
                            <InputFloatingLabel label="Nome Fantasia" {...field} type="text" className="w-full border p-2 rounded" />
                        )}
                    />
                    <Controller
                        name="razaoSocial"
                        control={control}
                        defaultValue=""
                        autoComplete="off"
                        render={({ field }) => (
                            <InputFloatingLabel label="Razão Social" {...field} type="text" className="w-full border p-2 rounded" />
                        )}
                    />
                    <Controller
                        name="cnpj"
                        control={control}
                        defaultValue=""
                        autoComplete="off"
                        render={({ field }) => (
                            <InputFloatingLabel label="CNPJ"  {...field} type="text" className="w-full border p-2 rounded" />
                        )}
                    />
                </div>
            )}

            <Button onClick={() => { cadastrarUsuario() }} type="submit" className="py-2 px-4 text-center bg-gradient-to-r from-[#00ff918c] to-[#00a1ff] rounded-md w-full text-white text-sm hover:to-emerald-500 hover:from-emerald-500">Cadastrar</Button>
        </div>
    );
}

export default CadastrarUsuarioForm;
