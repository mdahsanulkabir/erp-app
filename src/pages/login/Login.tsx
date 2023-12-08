import { useForm, SubmitHandler } from 'react-hook-form'
import styles from './Login.module.css';
import axios from '../../config/axios';
import useAuth from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';

interface LoginFormInput {
    userEmail : string
    password : string
}

export default function Login () {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/'


    const { register, handleSubmit,formState: { errors }, } = useForm<LoginFormInput>()

    const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
        console.log(data)
        try {
            const response = await axios.post('/login',
                JSON.stringify(data),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            console.log(response?.data)
            console.log(response)
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            console.log({roles})
            setAuth({userEmail: data.userEmail, password: data.password, accessToken, roles})
            console.log(accessToken)
            navigate(from, {replace: true});
        } catch (err) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if(!err || !(err as any).response){
                console.log("no server response")
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } else if ((err as any).response?.status === 400){
                console.log("Missing Username or Password")
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } else if ((err as any).response?.status === 401) {
                console.log("Unauthorized")
            } else {
                console.log("Login failed")
            }
        }
    }

    return (
        <div className={styles.login}>
            <div className={styles.formWrapper}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className={styles.h1}>Login</h1>
                    <label>Email Address</label>
                    <input {...register("userEmail", {required : true})} />
                    {errors.userEmail?.type === "required" && (
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