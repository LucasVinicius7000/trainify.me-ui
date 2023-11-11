import Input from "../Input";
import React from "react";

const InputFloatingLabel = React.forwardRef(({ className, label, labelClassName, type, ...rest }, ref) => {
    return <div className={`relative z-0 w-full`}>
        <Input ref={ref} {...rest} placeholder=" " type={!type ? "text" : type} id="floatingLabel" className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer rounded-none h-full ${className}`} autoComplete="new-password" />
        <label htmlFor="floatingLabel" className={`absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${labelClassName}`}>{label}</label>
    </div>
});

export default InputFloatingLabel;