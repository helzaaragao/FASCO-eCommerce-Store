import { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    error?: string;
    touched?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({name,error, touched, ... props}, ref) => {

    const hasError = touched && !!error;

    return(
        <div>
            <input
                ref={ref}
                name={name}
                aria-invalid={hasError}
                aria-describedby={hasError ? `${name}-error`: undefined}
                {...props}
                className="mb-2 w-full focus:ring-1 focus:ring-blue-600 focus:outline-none"
            />
            <hr className="border-gray-400" />
            {hasError && (
                <span 
                    id={`${name}-error`} 
                    role="alert"
                    className='text-red-500 text-sm block'

                >
                    {error}
                </span>
            )}
        </div>
    )
}
)