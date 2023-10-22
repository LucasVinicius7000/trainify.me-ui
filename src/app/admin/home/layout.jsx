import Sidebar from "@/components/Sidebar"
import { useSession } from "next-auth/react";

export default function AdminHomeLayout({ children }) {

    return <div className="w-full h-full flex">
        <Sidebar
            items={[{
                name: "Home | Cadastrar",
                path: "/admin/home"
            },
            {
                name: "Listar usuários",
                path: "/admin/usuarios"
            }]}
        >
            {children}
        </Sidebar>
    </div>
}