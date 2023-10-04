
export default function StyledButton({ children, disabled = false, className, onClick }) {
    return <button onClick={() => {
        if (disabled) return;
        else onClick();
    }} className={`${disabled ? "grayscale bg-gray-400" : "bg-gradient-to-r from-[#00ff918c] to-[#00a1ff]"} flex flex-col justify-center items-center p-2 rounded-md max-w-full max-h-full ${className}`}>
        {children}
    </button>;
}