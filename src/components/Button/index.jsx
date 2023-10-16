

const Button = ({ text, type, className, onSubmit, onClick, children }) => {
    return <button className={className} onSubmit={onSubmit} type={type} onClick={onClick}>
        {text}
        {children}
    </button>
}

export default Button;