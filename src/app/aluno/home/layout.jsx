"use client"
import Sidebar from "@/components/Sidebar";
import { Worker } from '@react-pdf-viewer/core';

export default function AlunoLayout({ children }) {
    return <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <div className="w-full h-full flex">
            <Sidebar
                items={[{
                    name: "Home | Meus Cursos",
                    path: "/aluno/home"
                }]}
            >
                {children}
            </Sidebar>
        </div>
    </Worker>
}