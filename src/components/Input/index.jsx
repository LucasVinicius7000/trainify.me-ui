import React from "react"

const Input = React.forwardRef(({ type, className, id, ...rest }, ref) => {
    return <input
        type={type}
        className={`${className} form-input w-full`}
        id={id}
        ref={ref}
        {...rest}
    />
})

export default Input;