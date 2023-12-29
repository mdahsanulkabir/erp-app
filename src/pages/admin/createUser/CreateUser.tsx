import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './CreateUser.module.css';
import { CreateRoleFormInput as userRole } from '../createRole/CreateRole'
// import { axiosPrivate } from '../../../config/axios';
// import axios from '../../../config/axios.js';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

interface CreateUserFormInput {
    userName: string;
    userArcelikId: number;
    userSingerId: string;
    userEmail: string;
    deptId: string;
    roles: number[];
    password: string;
}

// interface userRole {
//     id: number;
//     roleName: string;
// }

const CreateUser = () => {
    const userRoles: userRole[] = [{id: 3001, roleName: 'admin'}]
    const axiosPrivate = useAxiosPrivate();
    const { register, handleSubmit, formState: { errors }, } = useForm<CreateUserFormInput>()

    const onSubmit: SubmitHandler<CreateUserFormInput> = async (data) => {
        console.log(data)
        try {
            const response = await axiosPrivate.post('/register-user',
                JSON.stringify(data),
                // {
                //     headers: { 'Content-Type': 'application/json' },
                // }
            )
            console.log(response?.data)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <section className={styles.createUser}>
            <div className={styles.formWrapper}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className={styles.h1}>Create User</h1>

                    <label>User Name</label>
                    <input {...register("userName", { required: true })} />
                    {errors.userName?.type === "required" && (
                        <p role="alert">User name is required</p>
                    )}

                    <label>User's Arcelik Id</label>
                    <input type='number' {...register("userArcelikId", { required: true })} />
                    {errors.userArcelikId?.type === "required" && (
                        <p role="alert">User Arcelik Id is required</p>
                    )}

                    <label>User's Singer Id</label>
                    <input {...register("userSingerId", { required: true })} />
                    {errors.userSingerId?.type === "required" && (
                        <p role="alert">User Singer Id is required</p>
                    )}

                    <label>User Email</label>
                    <input type='email' {...register("userEmail", { required: true })} />
                    {errors.userEmail?.type === "required" && (
                        <p role="alert">User Email is required</p>
                    )}

                    <label>User Department</label>
                    <select {...register("deptId", { required: true })}>
                        <option value="female">female</option>
                        <option value="male">male</option>
                        <option value="other">other</option>
                    </select>
                    {errors.deptId?.type === "required" && (
                        <p role="alert">User Department is required</p>
                    )}

                    <fieldset>
                        <legend>User Roles</legend>
                        {
                            userRoles?.map(userRole => (
                                <div key={userRole.id}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            {...register('roles', { required: true })}
                                            value={userRole.id}
                                        />
                                        {userRole.roleName}
                                    </label>
                                </div>
                            ))
                        }
                    </fieldset>
                    {errors.roles?.type === "required" && (
                        <p role="alert">User Role(s) is/are required</p>
                    )}

                    <input className={styles.btn} type="submit" />
                </form>
            </div>
        </section>
    );
};

export default CreateUser;