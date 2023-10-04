

const Button = ({ text, type, className, onSubmit, onClick }) => {
    return <button className={className} onSubmit={onSubmit} type={type} onClick={onClick}>
        {text}
    </button>
}

export default Button;