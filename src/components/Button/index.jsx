

const Button = ({ text, type, className, onSubmit, onClick, children, disabled = false }) => {
    return <button className={className} disabled={disabled} onSubmit={onSubmit} type={type} onClick={onClick}>
        {text}
        {children}
    </button>
}

export default Button;