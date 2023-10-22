"use client"
import Image from "next/image";
import MainLogo from './../../../public/main-logo2.svg';
import { useState } from "react";
import styles from "./styles.module.css";
import StyledButton from "../StyledButton";
import { AiOutlineClose } from 'react-icons/ai';
import { createContext } from "react";
import { useRouter } from 'next/navigation';
import Loading from "../Loading";

export const SidebarContext = createContext({});

export default function Sidebar({ items, children }) {

    const openSidebar = () => {
        let elSidebar = document.getElementById("sidebar-el");
        elSidebar.classList.add(styles.sidebarOpening);
        elSidebar.classList.remove(styles.sidebarClosing);
    }

    const closeSidebar = () => {
        let elSidebar = document.getElementById("sidebar-el");
        elSidebar.classList.add(styles.sidebarClosing);
    }

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    return <SidebarContext.Provider value={{ openSidebar }}>
        <div className="w-full min-h-screen flex flex-row justify-start items-start">
            <Loading isLoading={isLoading} />
            <div className={`min-w-[250px] max-w-[280px] w-full bg-[#32464F]
                flex flex-col justify-start gap-4 items-center text-white min-h-screen 
                select-none z-50 absolute -translate-x-full`}
                id="sidebar-el"
            >
                <div className="w-full self-start pt-3 flex flex-row gap-16 items-center justify-center">
                    <div className="pl-4 flex flex-row w-full items-center gap-2">
                        <Image
                            src={MainLogo}
                            alt="Logo TrainifyMe"
                            width={40}
                            height={40}
                        />
                        <span className="text-[#FBFBFB] text-xl font-semibold">
                            TrainifyMe
                        </span>
                    </div>
                    <div className="w-full flex justify-end pr-6">
                        <StyledButton onClick={() => { closeSidebar(); }}>
                            <AiOutlineClose size={20} color="#f6f6f6" />
                        </StyledButton>
                    </div>
                </div>

                <hr className="border-[#94A3B8] w-[90%]" />

                {
                    items?.map((item, index) => {
                        return <div
                            key={item?.path + index}
                            className="p-2 w-[80%] text-center rounded-md hover:bg-[#16AB7A] cursor-pointer"
                            onClick={() => {
                                closeSidebar();
                                router.push(item?.path);
                            }} >{item?.name}
                        </div>
                    })
                }

            </div>
            {children}
        </div>
    </SidebarContext.Provider>
}