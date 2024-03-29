import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import React from "react";

const DatePickerFloatingLabel = React.forwardRef(({ className, label, labelClassName, ...rest }, ref) => {
    return (
        <div className="relative z-0 w-full">
            <DatePicker
                ref={ref}
                {...rest}
                className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer rounded-none ${className}`}
            />
            <label
                className={`absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-0 peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${labelClassName}`}
            >
                {label}
            </label>
        </div>
    );
});

export default DatePickerFloatingLabel;
