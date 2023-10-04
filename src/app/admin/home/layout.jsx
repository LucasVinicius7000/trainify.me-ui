import Sidebar from "@/components/Sidebar"

export default function AdminHomeLayout({ children }) {

    return <div className="w-full h-full flex">
        <Sidebar>
            {children}
        </Sidebar>
    </div>
}