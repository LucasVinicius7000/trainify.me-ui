import Sidebar from "@/components/Sidebar"

export default function OrganizacaoHomeLayout({ children }) {
    return <div className="w-full h-full flex">
        <Sidebar
            items={[{
                name: "Home | Cadastrar usuários",
                path: "/organizacao/home"
            },
            {
                name: "Cadastrar curso",
                path: "/organizacao/cursos/cadastrar"
            },
            {
                name: "Listar cursos",
                path: "/organizacao/home/cursos/listar"
            }]}
        >
            {children}
        </Sidebar>
    </div>
}