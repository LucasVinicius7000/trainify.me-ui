

export default function HeaderCriarCurso({ children, className }) {
    return <div className={`bg-[#32464F] h-24 flex items-center flex-row p-4 ${className}`}>
        {children}
    </div>
}