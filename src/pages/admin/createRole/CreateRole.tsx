import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './CreateRole.module.css';
// import axios from '../../../config/axios.js';
// import useAuth from '../../../hooks/useAuth.js';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate.js';


export interface CreateRoleFormInput {
    id: number;
    roleName: string;
}

const CreateRole = () => {
    const axiosPrivate = useAxiosPrivate();
    // const { auth } = useAuth();
    const { register, handleSubmit, formState: { errors }, } = useForm<CreateRoleFormInput>()

    const onSubmit: SubmitHandler<CreateRoleFormInput> = async (data) => {
        console.log(data);
        try {
            const response = await axiosPrivate.post('/api/role',
                JSON.stringify(data),
                // {
                //     headers: {
                //         'Content-Type': 'application/json',
                //         'Authorization': `Bearer ${auth.accessToken}`
                //     },
                // }
            )
            console.log(response?.data)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <section className={styles.createRole}>
            <div className={styles.formWrapper}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className={styles.h1}>Create Role</h1>
                    <label>Role Id</label>
                    <input type='number' {...register("id", { required: true })} />
                    {errors.id?.type === "required" && (
                        <p role="alert">Role Id is required</p>
                    )}

                    <label>Role Name</label>
                    <input type='text' {...register("roleName", { required: true })} />
                    {errors.roleName?.type === "required" && (
                        <p role="alert">Role name is required</p>
                    )}
                    <input className={styles.btn} type="submit" />
                </form>
            </div>
        </section>
    );
};

export default CreateRole;