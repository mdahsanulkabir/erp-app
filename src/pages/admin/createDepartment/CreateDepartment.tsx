import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './CreateDepartment.module.css';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

interface CreateDepartmentFormInput {
    departmentName: string;
}

const CreateDepartment = () => {
    const axiosPrivate = useAxiosPrivate();
    const { register, handleSubmit,formState: { errors }, } = useForm<CreateDepartmentFormInput>()

    const onSubmit: SubmitHandler<CreateDepartmentFormInput> = async (data) => {
        console.log(data)
        try {
            const response = await axiosPrivate.post('/department',
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
        <section className={styles.createDepartment}>
            <div className={styles.formWrapper}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className={styles.h1}>Create Department</h1>
                    <label>Department Name</label>
                    <input {...register("departmentName", {required : true})} />
                    {errors.departmentName?.type === "required" && (
                        <p role="alert">Department name is required</p>
                    )}
                    {/* <label>Password</label>
                    <input {...register("password", {required : true})} /> */}
                    <input className={styles.btn} type="submit" />
                </form>
            </div>
        </section>
    );
};

export default CreateDepartment;