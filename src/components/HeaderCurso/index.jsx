

export default function HeaderCriarCurso({ children, className }) {
    return <div className={`bg-[#32464F] h-24 flex items-center z-50 flex-row p-4 ${className}`}>
        {children}
    </div>
}