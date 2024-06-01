import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './Plant.module.css';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import useGetPlants from '../../../hooks/plant/useGetPlants';

interface CreatePlantFormInput {
    plantName: string;
    plantCode: number;
}

const Plant = () => {
    const axiosPrivate = useAxiosPrivate();
    const plants = useGetPlants();
    console.log(plants)
    const { register, handleSubmit, formState: { errors }, } = useForm<CreatePlantFormInput>()

    const onSubmit: SubmitHandler<CreatePlantFormInput> = async (data) => {
        console.log(data)
        try {
            const response = await axiosPrivate.post('/plant',
                JSON.stringify(data),
            )
            console.log(response?.data)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <section className={styles.createPlant}>
            <div className={styles.formWrapper}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className={styles.h1}>Create Plant</h1>
                    <label>New Plant Information</label>
                    <input {...register("plantName", { required: true })} />
                    {errors.plantName?.type === "required" && (
                        <p role="alert">Plant name is required</p>
                    )}
                    <label>Plant Code</label>
                    <input {...register("plantCode", { required: true })} />
                    {errors.plantCode?.type === "required" && (
                        <p role="alert">Plant code is required</p>
                    )}
                    <input className={styles.btn} type="submit" />
                </form>
            </div>
        </section>
    );
};

export default Plant;