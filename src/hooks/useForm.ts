import { useState } from 'react'

interface FormErrors {
    [key: string]: string
}

type FormValidator<T> = (values: T) => FormErrors

const useForm = <T>(initialValues: T, validate: FormValidator<T>) => {
    const [values, setValues] = useState<T>(initialValues)
    const [errors, setErrors] = useState<FormErrors>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const resetForm = () => {
        setValues(initialValues)
        setErrors({})
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setTimeout(() => {
            const formErrors = validate(values)
            setErrors(formErrors)
        }, 2000);
        if (Object.keys(errors).length) {
            setIsSubmitting(true)
            resetForm()
        }
    }

    return {
        values,
        errors,
        isSubmitting,
        handleChange,
        handleSubmit,
        resetForm
    }
}

export default useForm