import Sidebar from "@/components/Sidebar"
import { useSession } from "next-auth/react";

export default function AdminHomeLayout({ children }) {

    return <div className="w-full h-full flex">
        <Sidebar
            items={[{
                name: "Home",
                path: "/home"
            },
            {
                name: "Listar usuários",
                path: "/usuarios"
            }]}
        >
            {children}
        </Sidebar>
    </div>
}