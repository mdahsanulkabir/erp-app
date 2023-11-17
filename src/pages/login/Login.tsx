import { useForm, SubmitHandler } from 'react-hook-form'
import styles from './Login.module.css'

interface LoginFormInput {
    email : string
    password : string
}

export default function Login () {

    const { register, handleSubmit,formState: { errors }, } = useForm<LoginFormInput>()

    const onSubmit: SubmitHandler<LoginFormInput> = (data) => console.log(data)

    return (
        <div className={styles.login}>
            <div className={styles.formWrapper}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className={styles.h1}>Login</h1>
                    <label>Email Address</label>
                    <input {...register("email", {required : true})} />
                    {errors.email?.type === "required" && (
                        <p role="alert">Email is required</p>
                    )}
                    <label>Password</label>
                    <input {...register("password", {required : true})} />
                    <input className={styles.btn} type="submit" />
                </form>
            </div>
        </div>
    )
} 