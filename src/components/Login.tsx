import useForm from '../hooks/useForm'

interface FormErrors {
    [key: string]: string
}

const Login = () => {
    const initialValues = {
        username: '',
        password: ''
    }

    const validate = (values: typeof initialValues) => {
        const errors: FormErrors = {}
        if (!values.username) {
            errors.username = 'Username is required!'
        }

        if (!values.password) {
            errors.password = 'Password is required!'
        }

        return errors
    }

    const { values, errors, isSubmitting, handleChange, handleSubmit} = useForm(initialValues, validate)

    return (
        <div className="card">
            <form onSubmit={handleSubmit}>
                <h1> Login </h1>
                <div>
                    <label htmlFor="username">
                        <input type="text" id="username" name='username' value={values.username} onChange={handleChange} placeholder="Username" />
                    </label>
                    {errors.username && <div style={{color: "red"}}>{errors.username}</div>}
                </div>
                <div>
                    <label htmlFor="password">
                        <input type="password" id="password" name='password' value={values.password} onChange={handleChange} placeholder="Password" />
                    </label>
                    {errors.password && <div style={{color: "red"}}>{errors.password}</div>}
                </div>
                <div>
                    <button type="submit" disabled={isSubmitting}> Submit </button>
                </div>
            </form>
        </div>
    )
}

export default Login