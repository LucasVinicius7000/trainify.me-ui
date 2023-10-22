"use client"
import { useForm } from 'react-hook-form'
import { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { signIn, useSession, getSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import MainLogo from "../../public/main-logo2.svg";
import CustomModal from '@/components/Modal';
import Loading from '@/components/Loading';

export default function Login() {

  const [modalLoginOpen, setModalLoginOpen] = useState(false);
  const [shouldCloseWhenClickOutside, setShouldCloseWhenClickOutside] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const
    {
      register,
      handleSubmit,
      watch,
      formState: { errors }
    } = useForm();

  const router = useRouter();
  const { data, status } = useSession();

  const redirectByRole = (session) => {
    switch (session.user.role) {
      case "Admin":
        router.push("/admin/home");
        break;
      case "Aluno":
        router.push("/aluno/home");
        break;
      case "Organizacao":
        router.push("organizacao/home");
        break;
      default:
        router.push("/");
    }
  }

  const onSubmit = async (credentials) => {
    setShouldCloseWhenClickOutside(false);
    setIsLoading(true);
    const { email, senha } = credentials;

    const res = await signIn("credentials", {
      email,
      senha,
      redirect: false,
    });
    if (res.error) {
      toast.error("Falha ao realizar login.");
      setShouldCloseWhenClickOutside(true);
    }
    else if (res.ok && !res.error) {
      toast.success("Usuário logado com sucesso.");
      const session = await getSession();
      redirectByRole(session);
    }
    setIsLoading(false);
  };

  if (status === "authenticated") {
    if (data) {
      redirectByRole(data)
    }
  }
  else if (status === "loading") { }
  else return (
    <div className="flex min-h-screen justify-between items-center bg-[#32464F]">
      <div className="w-full flex justify-center items-center">
        <div className="flex flex-col items-center justify-center gap-8 select-none">
          <div>
            <Image
              priority
              src={MainLogo}
              height={150}
              width={150}
              alt="Logo TrainifyMe"
            />
          </div>

          <div className="flex flex-col gap-5 items-center justify-center">
            <span className="text-[#FBFBFB] text-6xl font-bold max-md:text-4xl">
              TrainifyMe
            </span>
            <span className="text-[#FBFBFB] text-xl font-normal max-md:w-60 max-md:text-center bg-[#355C53] px-1">
              Treine suas equipes e alcance a excelência ✨
            </span>
          </div>

          <Button
            text={"Começar agora"}
            className="py-2 px-1 text-center 
            bg-gradient-to-r from-[#00ff918c] to-[#00a1ff] 
            rounded-md w-2/3 text-white text-md hover:from-emerald-500
            hover:to-emerald-500"
            onClick={() => setModalLoginOpen(!modalLoginOpen)}
          />

          <CustomModal
            isOpen={modalLoginOpen}
            closeWhenClickOutsideContent={shouldCloseWhenClickOutside}
            requestToClose={() => { setModalLoginOpen(false) }}
            className="bg-black/75 border-none absolute top-0 left-0 flex w-full justify-center items-center"
          >
            <div className="p-6 max-w-sm w-full rounded-md bg-white shadow-md">
              <Loading isLoading={isLoading} />
              <div className="flex justify-center items-center">
                <span className="text-gray-700 font-semibold text-2xl">TrainifyMe</span>
              </div>
              <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                <label className="block">
                  <span className="text-gray-700 text-sm">Email ou Nome de Usuário:</span>
                  <Input
                    type="email"
                    className="mt-1 block rounded-md focus:border-indigo-600"
                    {...register("email")}
                  />
                </label>

                <label className="block mt-3">
                  <span className="text-gray-700 text-sm">Senha:</span>
                  <Input
                    type="password"
                    className="mt-1 block rounded-md focus:border-indigo-600"
                    {...register("senha")}
                    autoComplete={"true"}
                  />
                </label>

                <div className="mt-6">
                  <Button
                    text="Entrar"
                    type="submit"
                    className="py-2 px-4 text-center bg-gradient-to-r from-[#00ff918c] to-[#00a1ff] rounded-md w-full text-white text-sm hover:to-emerald-500 hover:from-emerald-500">
                  </Button>
                </div>
              </form>
            </div>
          </CustomModal>
        </div>
      </div>
    </div>
  )
}
