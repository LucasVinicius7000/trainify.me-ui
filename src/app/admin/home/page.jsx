"use client"
import { GiHamburgerMenu } from 'react-icons/gi';
import StyledButton from "@/components/StyledButton";
import { useContext } from "react";
import { SidebarContext } from "@/components/Sidebar";

export default function AdminHome() {

    const { openSidebar } = useContext(SidebarContext);

    return <div>
        <StyledButton onClick={() => { openSidebar() }}>
            <GiHamburgerMenu size={20} color="#f6f6f6" />
        </StyledButton>
    </div>;


}