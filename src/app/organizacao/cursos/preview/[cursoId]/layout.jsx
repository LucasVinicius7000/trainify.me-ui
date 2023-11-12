"use client"
import { Worker } from '@react-pdf-viewer/core';

export default function CursoPreviewLayout({ children }) {
    return <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <div className="w-full h-full">
            {children}
        </div>
    </Worker>
}