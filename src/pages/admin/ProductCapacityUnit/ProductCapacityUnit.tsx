import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './ProductCapacityUnit.module.css';
import axios from '../../../config/axios.js';

interface CreateProductCapacityUnitFormInput {
    productCapacityUnit: string;
}

const ProductCapacityUnit = () => {
    const { register, handleSubmit,formState: { errors }, } = useForm<CreateProductCapacityUnitFormInput>()

    const onSubmit: SubmitHandler<CreateProductCapacityUnitFormInput> = async (data) => {
        console.log(data)
        try {
            const response = await axios.post('/product/getProductCapacityUnit',
                JSON.stringify(data),
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            )
            console.log(response?.data)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <section className={styles.createProductCapacityUnit}>
            <div className={styles.formWrapper}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className={styles.h1}>Create Product Capacity Unit</h1>
                    <label>Capacity Unit name</label>
                    <input {...register("productCapacityUnit", {required : true})} />
                    {errors.productCapacityUnit?.type === "required" && (
                        <p role="alert">Capacity Unit is required</p>
                    )}
                    {/* <label>Password</label>
                    <input {...register("password", {required : true})} /> */}
                    <input className={styles.btn} type="submit" />
                </form>
            </div>
        </section>
    );
};

export default ProductCapacityUnit;