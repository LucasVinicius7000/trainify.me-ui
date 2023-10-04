import React from "react"

const Input = React.forwardRef(({ type, className, ...rest }, ref) => {
    return <input
        type={type}
        className={`${className} form-input w-full`}
        ref={ref}
        {...rest}
    />
})

export default Input;